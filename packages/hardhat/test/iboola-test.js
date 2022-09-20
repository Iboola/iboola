const { ethers } = require("hardhat");
// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


// await expect(contract.call()).to.emit(contract, "Event");
// Solidity events can contain arguments, and you can assert the presence of certain argument values in an event that was emitted. For example, to assert that an event emits a certain unsigned integer value:

// await expect(contract.call())
//   .to.emit(contract, "Uint")
//   .withArgs(3);

// Sometimes you may want to assert the value of the second argument of an event, but you want to permit any value for the first argument. This is easy with withArgs because it supports not just specific values but also predicates. For example, to skip checking the first argument but assert the value of the second:

// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// await expect(contract.call())
//   .to.emit(contract, "TwoUints")
//   .withArgs(anyValue, 3);


// You can also easily write tests that assert whether a contract call reverted (or not) and what sort of error data to expect along with the revert.

// The most simple case asserts that a revert happened:

// await expect(contract.call()).to.be.reverted;
// await expect(contract.call()).not.to.be.reverted;
// await expect(contract.call()).to.be.revertedWith("Some revert message");
// await expect(contract.call()).not.to.be.revertedWith("Another revert message");

// The revertedWithCustomError matcher allows you to assert that a transaction reverted with a specific custom error:

// await expect(contract.call()).to.be.revertedWithCustomError(
//   contract,
//   "SomeCustomError"
// );

// Further, just as events can have arguments, so too can custom error objects, and, just as with events, you can assert the values of these arguments. To do this, use the same .withArgs() matcher, and the same predicate system:

// await expect(contract.call())
//   .to.be.revertedWithCustomError(contract, "SomeCustomError")
//   .withArgs(anyValue, "some error data string");


// This package enhances the standard numerical equality matchers (equal, above, within, etc) such that you can seamlessly mix and match contract return values with regular Numbers. For example:

// expect(await token.balanceOf(someAddress)).to.equal(1);

// Often times, a transaction you're testing will be expected to have some effect on a wallet's balance, either its balance of Ether or its balance of some ERC-20 token. Another set of matchers allows you to verify that a transaction resulted in such a balance change:

// await expect(() =>
//   sender.sendTransaction({ to: someAddress, value: 200 })
// ).to.changeEtherBalance(sender, "-200");

// await expect(token.transfer(account, 1)).to.changeTokenBalance(
//   token,
//   account,
//   1
// );

// await expect(() =>
//   sender.sendTransaction({ to: receiver, value: 200 })
// ).to.changeEtherBalances([sender, receiver], [-200, 200]);

// await expect(token.transferFrom(sender, receiver, 1)).to.changeTokenBalances(
//   token,
//   [sender, receiver],
//   [-1, 1]
// );

// yarn add --dev xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts

// "chai@^4.2.0" "ethers@^5.0.0" hardhat@^2.9.4"

// let instance, tokenInstance, tokenAddr, instanceAddr;
// let deployer, binOwner, generator, collector, recycler;

const category = { 
  COLLECTOR: 0,
  GENERATOR: 1,
  RECYCLER: 2,
  BINOWNER: 3,
  SOLD: 4
}

let bins = [];
let binId = 0;
let wasteArray = [];
let wasteId = 0;

let data = {
  token: {},
  instance: {},
  instanceAddr: "",
  tokenAddr: "",
  deployer: {},
  binOwner: {},
  generator: {},
  collector: {},
  recycler: {}
}

async function fetchBin () {
  const result = await data.instance?.bins(binId);
  console.log("fetchBin", result);
  return result;
  // expect(result).to.equal(who);
}

async function fetchProfile (category, address) {
  const result = await data.instance?.getProfile(category, address);
  console.log("fetchProfile", result);
  return result;
}

async function registerNewBin() {
  await data.instance?.connect(data.binOwner).registerBin()
      .then((result) => {
        if(result) {
          binId = bins.length;
          bins.push(result);
        }
      })
}

async function registerCollector(category) {
  await data.instance?.connect(data.collector).signUpAsWasteCollector();
  const result = await fetchProfile(category, data.collector.address);
  console.log("registerCollector", data.collector.address);
  expect(result?.isRegistered).to.be.true;
}

async function whitelist(address, category) {
  await data.instance?.connect(data.deployer).whitelistuser(address, category);
  const result = await fetchProfile(category, address);
  return result;
}

async function generateWaste() {
  const link = "http://unsafelink.link";
  await data.instance?.connect(data.generator).generateWaste(link);
  const totalWasteGenerated = await data.instance?.totalWasteGenerated();
  console.log("totalWasteGenerated", totalWasteGenerated);
  expect(totalWasteGenerated).to.equal(1);
  const result = await data.instance?.garbages(0);
  console.log("generateWaste", result);
  return result;
}

async function collectWaste() {
  await data.instance?.connect(data.collector).collectWaste(binId, wasteId);
  const result = await data.instance?.garbages(category.COLLECTOR);
  console.log("Should collect waste data", result);
  return result;
}

async function recycle() {
  await data.instance?.connect(data.recycler).recycle(binId, wasteId);
  const result = await data.instance?.garbages(category.RECYCLER);
  return result;
}

describe("IBoola", function () {
  
  async function loadFixtures() {
    const [deployer, binOwner, generator, collector, recycler] = await ethers.getSigners();
    const IBoola = await ethers.getContractFactory("IBoolaContract");
    const Token = await ethers.getContractFactory("IBoolaToken");
    const tokenInstance = await Token.deploy();
    const tokenAddr = tokenInstance.address;
    const instance = await IBoola.deploy(tokenAddr);
    const instanceAddr = instance.address;

    data.token = tokenInstance;
    data.instance = instance;
    data.instanceAddr = instanceAddr;
    data.tokenAddr = tokenAddr;
    data.deployer = deployer;
    data.collector = collector;
    data.generator = generator;
    data.recycler = recycler;
    data.binOwner = binOwner;
  }


  describe("Testing IBoola contract", function () {
    it("Should sign up a new bin", async function () {
      await loadFixtures();
      await registerNewBin(data.instance, data.binOwner);

      const result = await fetchBin(data.instance, category.BINOWNER, data.binOwner.address );
      expect(result).to.equal(data.binOwner.address);
    });

    it("Should sign up collector successfully", async function () {
      await registerCollector(category.COLLECTOR);
    });

    it("Should whitelist user successfully", async function () {
      const result = await whitelist(data.collector.address, category.COLLECTOR)
      expect(result.isRegistered).to.be.true;
      expect(result.approval).to.be.true;
    });

    it("Should generate waste data", async function () {
      await whitelist(data.generator.address, category.GENERATOR);
      const result = await generateWaste();
      expect(result[0].generator).to.equal(data.generator.address); 
    });

    it("Should collect waste data", async function () {
      const result = await collectWaste();
      expect(result[0].generator).to.equal(data.generator.address); 
    });

  });
});