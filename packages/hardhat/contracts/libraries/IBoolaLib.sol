// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "../interfaces/Common.sol";

library IBoolaLib {
  /**
    @dev Sign up new collector
      @param self - Storage
      @param newCollector - Address of new Collector to add.
   */

  function registerCollector(
    mapping (Common.Category=>mapping(address=>Common.Profile)) storage self, 
      address newCollector, 
      string memory location, 
      string memory _address
    ) internal {
      Common.Category _c = Common.Category.COLLECTOR;
      self[_c][newCollector].transactionTime = _now();
      self[_c][newCollector].wasteCount = 0;
      self[_c][newCollector].approval = false;
      self[_c][newCollector].isRegistered = true;
      self[_c][newCollector].metadata = abi.encode(location, _address);
  }

  /**
    @dev Dual function: 
            o Recycles collected waste.
            o Generate new waste.
   */
  function portToMap(
    mapping (Common.State=>Common.WasteData[]) storage self, 
    Common.WasteData memory inWaste,
    Common.State state
  ) internal {
    self[state].push(Common.WasteData(
        inWaste.value,
        inWaste.collector,
        inWaste.generator,
        inWaste.recycler,
        state
      )
    );
  }

  ///@dev Moves waste to bin
  function portToArray(Common.BinData[] storage self, uint binId, Common.WasteData memory inWaste, Common.State state) internal {
    self[binId].bin.push(Common.WasteData(
      inWaste.value,
      inWaste.collector,
      inWaste.generator,
      inWaste.recycler,
      state
    )
    );
  }

  ///@dev Removes waste at 'wasteId' from bin at 'binId' in bin array at hashmap 'self'
  function popFromMapping(mapping (Common.State=>Common.WasteData[]) storage self, uint wasteId, Common.State state) internal returns(Common.WasteData memory _waste) {
    _waste = self[state][wasteId];
    delete self[state][wasteId];
  }

  ///@dev Removes waste at 'wasteId' from bin at 'binId' in bin array 'self'
  function popFromArray(Common.BinData[] storage self, uint binId, uint wasteId) internal returns(Common.WasteData memory _waste) {
    _waste = self[binId].bin[wasteId];
    delete self[binId].bin[wasteId];
  }

  /**
    @dev Sets collectors status to either true or false
    @param value - Value to set status to.
    @param who - User to set status for.
    @param self - storage.
      Note : If value is true, collector's status must be false vice versa.
   */
  function setStatus(mapping (Common.Category=>mapping(address=>Common.Profile)) storage self, address who, bool value, Common.Category cat) internal {
    bool prevStatus = _previousStatus(self, who, cat);
    if(value) {
      if(prevStatus) revert Common.UserAlreadyExist();
      self[cat][who].approval = true;
    } else {
      if(!prevStatus) revert Common.UserAlreadyNotExist();
      self[cat][who].approval = false;
    }
  }

  function _previousStatus(mapping (Common.Category=>mapping(address=>Common.Profile)) storage self, address who, Common.Category cat) private view returns(bool) {
    return self[cat][who].approval;
  }

  /**
    @dev Registers new bin with owner.
        @param owner - Bin Owner
        @param self - Storage
        @return newId 
   */
  function registerNewBin(Common.BinData[] storage self, address owner) internal returns(uint newId) {
    newId = self.length;
    self.push();
    self[newId].owner = owner;
  }

  /**
    @dev Removes bin from bin array.
      @notice binId must be less than the bin array at any time since arrays are zero-based.
      @param self - Storage
   */
  function removeBin(Common.BinData[] storage self, uint binId) internal {
    (uint len, Common.BinData memory wasteBin)  = (self.length, self[binId]);
    if(wasteBin.bin.length == 0) revert Common.EmptyBin();
    for(uint i = 0; i < len; i++) {
      if(wasteBin.bin[i].state < Common.State.RECYCLED) {
        revert Common.CannotDeleteBinInEngagedMode();
      }
    } 
    delete self[binId];
  }

  function split(mapping (Common.Share=>uint8) storage self, uint amount) internal view returns(uint collector, uint generator, uint team) {
    collector = (self[Common.Share.COLLECTOR] * amount) / 100;
    generator = (self[Common.Share.GENERATOR] * amount) / 100;
    team = (self[Common.Share.TEAM] * amount) / 100;

  }

  function _now() internal view returns(uint32) { return uint32(block.timestamp); }

}