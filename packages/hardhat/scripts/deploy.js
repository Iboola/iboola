// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");
  // console.log("Deploying IBool Token and Main ontract");

  /**
   * BSC Testnet 
   * IBoolaToken deployed to 0x463F282E7360E8a866Dee0c1803362000D576D4e
   * WasteToWealth contract deployed to 0xfF8b1979536f47219715F4d4B67302B1b7b7c87B
   * 
   * Celo testnet
   * ============
   * Successfully generated 21 typings!
   * IBoolaToken deployed to 0xAaa8CDc0d80A7b3D1d6cd5CdeC366Bb9588dbc5c
   * WasteToWealth contract deployed to 0xe26F1162d275F298F5709f9247035A1Ad5c8e53f
  */

  const IBoolaToken = await hre.ethers.getContractFactory("IBoolaToken");
  const iBoola = await IBoolaToken.deploy();
  await iBoola.deployed();
  const tokenAddr = iBoola.address;
  console.log("IBoolaToken deployed to", tokenAddr);

  // const WasteToWealthLib = await hre.ethers.getContractFactory("WasteToWealthLib");
  // const lib = await WasteToWealthLib.deploy();
  // await lib.deployed();
  // console.log("WasteToWealthLib deployed to", lib.address);

  const WasteToWealth = await hre.ethers.getContractFactory("WasteToWealth");
  const wasteToWealth = await WasteToWealth.deploy(tokenAddr);
  await wasteToWealth.deployed();
  console.log("WasteToWealth contract deployed to", wasteToWealth.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
