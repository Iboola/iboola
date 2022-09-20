// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./libraries/IBoolaLib.sol";
import "./deps/Context.sol";
import "./deps/Ownable.sol";
import "./deps/IERC20.sol";

/**
 * @title IBoolaContract
 * @author Bobeu: https://github.com/bobeu
 * A smart contract that will tokenize the disposal and collection of waste. 
    Users get a token when they dispose of their waste in a waste bin, collectors 
    get token for collecting waste and taking them to the waste recyclers 

    The process of tokenization happens when the waste drops in the waste bin. Every
    waste bin has a unique wallet ID which will receive the token at the end of evacuation.
    The owners of the waste bin will have a DAO. 

    *Wallet 
    *Token (iBoola token) which would be paired against either Avalanche, Celo or Polygon 
    *New users get 10 $IBT after sign up 
    *Community of waste bins will have a DAO 
    Waste generators get 10% collectors get 65 while the iBoola team gets 25% 
    Decimals: use standard 18 decimals 

    Mintable: not mintable

    Ownership privilege :  30% locked for 5 years, 20% for dev team 45% for  initial circulation, 
    5% for presale 

    PSEUDO
    ======
    Parties:
        o Waste generators.
        o Collectors.
        o Recyclers.

    o When waste is disposed or evacuated, then reward collectors.
    o Each waste bin has a unique identifer and an owner.
    o On sign up, user gets 10 $IBT Token.
    o Waste collectors own a DAO.
    o Waste bin owners own a DAO.
    o Reward sharing formula Note - It is configurable. The owner account is able to 
        set each of these fields.
        - Waste generators 10%.
        - Collectors 65%.
        - Team 25%.
 */
contract IBoolaContract is Context, Common, Ownable {

    ///@dev New sign up reward
    uint public newSignUpReward;

    ///@dev iBoola Token
    address public token;

    ///@dev Total waste generated to date
    uint256 public totalWasteGenerated;

    ///@dev Collector reward
    uint public collectorReward;

    ///@dev Total bin registered to date
    uint public binCounter;

    ///@dev Price of recycled waste
    uint public price;

    /**
        @dev Array of bins 
            { Contain bins which contain collected wastes which contains wastedata}
            @notice Bins in this list are owned by addresses.
    */
    BinData[] public bins;
    
    mapping (Share=>uint8) public formula;
    

    /**
        @dev Mapping of Generated and Recycled Waste State -> binId (binCounter) -> WasteData
        Keys type: 
            o State
            o uint256

        value:
           array of struct(s) 
     */
    mapping (State=>WasteData[]) private _garbages;
    
    /**
        @dev Mapping of Waste State -> user -> profile
        Keys type: 
            o State
            o address

        value:
            struct 
     */
    mapping (Category=>mapping(address=>Profile)) private profiles;

    /**
        @dev Sign up fees for different category.
            @notice - It can be configured to suit any category.
     */
    mapping (Category=>uint256) public signUpFees;

    ///@dev Rewards
    // mapping(address=>uint) public rewards;


    modifier validateWasteId(uint binId, uint wasteId, State state, string memory errorMessage) {
        if(state == State.COLLECTED) {
            if(wasteId >= bins[binId].bin.length) revert InvalidWasteId();
        } else if(state == State.GENERATED) {
            require(wasteId < _garbages[state].length, "Invalid wasteId");
        } else {
            if(binId >= bins.length) revert InvalidBinID();
        }

        // require(wasteId < bins[binId].bin.length, "Errror");
        // require(bins[binId].bin[wasteId].state == state, errorMessage);
        _;
    }

    ///Checks user's existence
    modifier isApproved(Category cat, address who) {
        if(!_getApproval(cat, who)) revert UserAlreadyNotExist();
        _;
    }

    ///@dev Validates category
    modifier validateCategory(uint8 cat) {
        require(cat < 4, "Invalid category");
        _;
    }

    //Checks that the size of wastes not greater than 50
    modifier validateSize(uint[] memory wasteIDs, string[] memory wastedata) {
        (uint8 low, uint8 high) = (0, 50);
        wastedata.length == 0 ? require(
            wasteIDs.length > low && wasteIDs.length <= high, 
            "invalid"
        ) : require(wastedata.length > low && wastedata.length <= high, "invalid");
        _;
    }

    constructor (address _token) { 
        token = _token;
        newSignUpReward = 10 * (10 ** 18);
        profiles[Category.BINOWNER][_msgSender()].approval = true;
        formula[Share.COLLECTOR] = 65;
        formula[Share.GENERATOR] = 10;
        formula[Share.TEAM] = 25;
    }

    /**
        @notice Sign up function. 
                o Caller must not already be a member. 
    */
    function signUpAsWasteCollector(string memory location, string memory _address) public {
       require(!profiles[Category.COLLECTOR][_msgSender()].isRegistered, "Already sign up");
       IBoolaLib.registerCollector(profiles, _msgSender(), location, _address);
       IERC20(token).approve(_msgSender(), newSignUpReward);
    }

    function getProfile(uint category, address who) public view returns(Profile memory _profile) {
        require(category < 5, "Invalid");
        _profile = profiles[Category(category)][who];
    }

    /**
        @dev Adds new bin.
            @notice Caller must already be approves as BinOwner .
    */
    function registerBin() public payable {
        require(!profiles[Category.BINOWNER][msg.sender].isRegistered, "Already registered");
        uint binId = IBoolaLib.registerNewBin(bins, _msgSender());
        profiles[Category.BINOWNER][msg.sender].isRegistered = true;
        binCounter ++;
        emit RegisteredBin(binId, _msgSender());
    }

    /**
        @dev Removes bin at binId.
            @notice Caller must already be approves as BinOwner .
    */
    function removeBin(uint binId) public isApproved(Category.BINOWNER, _msgSender()) {
        address _owner = _getBinOwner(binId);
        if(_msgSender() != owner()) require(_msgSender() == _owner, "Not Authorized");
        
        IBoolaLib.removeBin(bins, binId);
    }

    /**@dev Returns list of wastes under each 'State'
        i.e Generated waste data, Collected waste data, ...rest
    */
    function garbages(uint8 _category) public view returns(WasteData[] memory _data) {
        require(_category < 3, "Invalid selecetor");
        _data = _garbages[State(_category)];
    }

    ///@dev Return owner of bin at binId. 
    function _getBinOwner(uint binId) private view returns(address) {
        return bins[binId].owner;
    }

    /**
        @dev Whitelist user
            Note Admin privilege.
                cat should reference the Category enum.
     */
    function whitelistuser(address who, uint8 category) public onlyOwner validateCategory(category) {
        IBoolaLib.setStatus(profiles, who, true, Category(category));
    }

    /**
        @dev Blacklist user
            Note Admin privilege.
                cat should reference the Category enum.
     */
    function blacklistUser(address who, uint8 category) public onlyOwner validateCategory(category){
        IBoolaLib.setStatus(profiles, who, false, Category(category));
    }

    /**
        @dev Set new fee
            @notice To perfectly select the right category,
                category parameter should not be greater than 4.
     */
    function setFee(uint8 category, uint newFee) public onlyOwner {
        require(category < 4, "Invalid category");
        signUpFees[Category(category)] = newFee;
    }

    /**
        @dev Generates new waste. 
        @notice Each waste is unique to another.
            Note To successfully generate waste, bin id must be provided.
                    This represents the destination where wastes are dumped.
     */
    function generateWaste(string memory _data) public isApproved(Category.GENERATOR, _msgSender()) {
        State state = State.GENERATED;
        totalWasteGenerated ++;
        uint nonce = totalWasteGenerated;
        IBoolaLib.portToMap(
            _garbages, 
             WasteData(
                keccak256(abi.encodePacked(bytes(_data), nonce)), 
                address(0), 
                _msgSender(), 
                address(0),
                state
            ), 
            state
        );
    }

    function _empty() internal pure returns(Empty memory empty) {
        uint[] memory wasteIds = new uint[](0);
        string[] memory wastedata = new string[](0);
        empty = Empty(wasteIds, wastedata);
    }

    ///@dev Generates multiple waste data
    function generateMultipleWaste(string[] memory data) public validateSize(_empty().wasteIds, data) {
        for (uint i=0; i < data.length; i++) {
            generateWaste(data[i]);
        }
    }

    /**
        @dev Gets approval for user 'who'
            @param cat - Category of user e.g COLLECTOR etc
            @param who - Address of user.
    */
    function _getApproval(Category cat, address who) internal view returns(bool) {
        return profiles[cat][who].approval;
    }

    /**
        @dev Collect waste.
            Note : Only generated waste can be collected
            @param binId - Bin where the waste is located.
            @param wasteId - Which waste to collect.
                    Note - Every waste is unique to another.
                            To make purchase of manure easy, wastes are recycled
                            in 50s.
     */
    function recycle(uint binId, uint wasteId) internal isApproved(Category.RECYCLER, _msgSender()) validateWasteId(binId, wasteId, State.COLLECTED, "Invalid waste pointer") {
        WasteData memory outWaste = IBoolaLib.popFromArray(bins, binId, wasteId);
        IBoolaLib.portToMap(_garbages, outWaste, State.RECYCLED);
        uint amount = collectorReward;

        (uint collector, uint generator, uint team) = IBoolaLib.split(formula, amount);
        IERC20(token).approve(outWaste.collector, collector);
        IERC20(token).approve(outWaste.generator, generator);
        IERC20(token).approve(address(this), team);

    }

    ///@notice Can recycle wastes greater than 0 but less than 51
    function recycleMultiple(uint binId, uint[] memory wasteIds) public validateSize(wasteIds, _empty().wastedata) {
        for (uint i = 0; i < wasteIds.length; i++) {
            recycle(binId, wasteIds[i]);
        }
    }


    /**@notice Withdraw reward if any {IBoola Token}
        Note - Caller must have previous reward otherwise it fails.
     */
    function withdraw() public {
        uint rewardBal = IERC20(token).allowance(address(this),_msgSender());
        if(rewardBal == 0) revert NothingToWithdraw();
        IERC20(token).transferFrom(address(this), _msgSender(), rewardBal);
    }

    /**
        @dev Collect waste for disposal. 
            Note: Caller must be an approved waste collector.
                must supply the following:
                    o @param binId - Location of bin to deposit collected waste. ie bin index
                    o @param wasteId - Identifier for waste collected.
     */

    function collectWaste(uint binId, uint wasteId) public isApproved(Category.COLLECTOR, _msgSender()) validateWasteId(binId, wasteId, State.GENERATED, "Invalid waste pointer") {
        require(profiles[Category.COLLECTOR][_msgSender()].isRegistered,"Not allowed");
        State _state = State.GENERATED;
        require(_garbages[_state].length > wasteId, "wasteId out of bound");
        WasteData memory outWaste = IBoolaLib.popFromMapping(_garbages, wasteId, _state);
        IBoolaLib.portToArray(bins, binId, outWaste, State.COLLECTED);

    }

    //See `collectWaste()` except that this runs mulitple time.
    function collectMultipleWaste(uint binId, uint[] memory wasteIds) public validateSize(wasteIds,_empty().wastedata) {
        for (uint i = 0; i < wasteIds.length; i++) {
            collectWaste(binId, wasteIds[i]);
        }
    }

    /**@notice Buy recycled waste in form of manure
        NOTE: Only recycled waste can be bought.
        If available manure cannot cover requested volume, buyer simply 
        purchased available volume.
     */
    function buyRecycled(uint volume) public payable {
        uint len = _garbages[State.RECYCLED].length;
        uint actualVolume;
        State _s = State.RECYCLED;
        require(len > 0 && len >= volume, "Not available");
        for(uint i = 0; i < volume; i++) {
            WasteData memory wd = _garbages[_s][i];
            if(wd.recycler != address(0)) {
                actualVolume ++;
                profiles[Category.SOLD][_msgSender()].purchased.push(WasteData(
                    wd.value,
                    wd.collector,
                    wd.generator,
                    wd.recycler,
                    wd.state
                ));
                delete _garbages[_s][i];
            }
        }
        uint amtToPay = price * actualVolume;
        require(msg.value >= amtToPay, "IValue");
        
     }

    ///@dev Sets new price for recycled waste.
    function setPrice(uint newPrice) public onlyOwner {
        price = newPrice;
    }


    ///@dev Sets new sign up reward. Note With access modifier
    function setSignUpReward(uint newReward) public onlyOwner{
        newSignUpReward = newReward;
    }

    ///@dev Sets new sign up reward. Note With access modifier
    function setCollectorUpReward(uint newReward) public onlyOwner{
        collectorReward = newReward;
    }


}
