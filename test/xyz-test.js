const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("XYZ", function () {
  it("Should return the contractURI", async function () {
    const XYZ = await ethers.getContractFactory("XYZ");
    const xyz = await XYZ.deploy();
    await xyz.deployed();
    expect(await greeter.contractURI()).to.include("https://ipfs.io");
  });
});
