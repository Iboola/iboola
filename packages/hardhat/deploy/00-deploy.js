// deploy/00_deploy_my_contract.js

// const { ethers } = require("hardhat");

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = await deploy("IBoolaTokenV", {
    from: deployer,
    args: [],
    log: true,
  });

  await deploy("IBoolaContractV", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    args: [ token.address ],
    log: true,
  });

  // await deploy("SupportToken", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   //args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  // });

  // Getting a previously deployed contract
  // const Greeter = new ethers.Contract("Greeter", deployer);

  // await Greeter.setGreeting("Hello Celo!");

  /*
  // If you want to send value to an address from the deployer
  
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some CELO to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
    value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
    LibraryName: **LibraryAddress**
  });
  */

//   Generating typings for: 0 artifacts in dir: types for target: web3-v1
// Successfully generated 42 typings!
// deploying "IBoolaTokenV" (tx: 0x3560170f91544678deb72f7fdb485f681a6584901ed57c2cf8aa239c42bef824)...: deployed at 0x6984495194dad4C9d8e6f99EAd5Bd3b1783aF024 with 1702714 gas
// deploying "IBoolaContractV" (tx: 0x0a0e8349e42a75f77aec755a89a75ae94a9764e0c67839127e79f6e7a458f994)...: deployed at 0xd6a981aAC71aC3A4825B5851EaE08b6F842C53c9 with 5135526 gas
// Done in 22.22s.

// Generating typings for: 0 artifacts in dir: types for target: web3-v1
// Successfully generated 19 typings!
// deploying "IBoolaTokenV" (tx: 0xe79c98215118a16b1d5ae652799c29e875ae208e49037cdcd864203e9d8358d7)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 894734 gas
// deploying "IBoolaContractV" (tx: 0xd39b1a804b1cf86b856ae3e1c2d002020679b5b7a3dc92eca73b5bedba4982ce)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 2774142 gas

// Successfully generated 19 typings!
// deploying "IBoolaTokenV" (tx: 0x84e39de416dd94cd46ed5196d8768b3d5bd8126be6b563e4427ad42020cada5a)...: deployed at 0xb1E11FEBc6670c3476eab3D36541D7d0DE144416 with 888234 gas        
// deploying "IBoolaContractV" (tx: 0x3eef0dc016d9991e6cb8e387684f0d1a2409109150d4eaa81d41436c820bdf5b)...: deployed at 0x5787A4BBAea58db3152fEA60662e69ad7b167Ba5 with 2765042 gas    
// Done in 23.81s.

};

module.exports.tags = ["IBoolaTokenV", "IBoolaContractV"];
