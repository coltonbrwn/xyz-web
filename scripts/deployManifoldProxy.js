const hre = require("hardhat");

async function main() {
  const XYZ = await hre.ethers.getContractFactory("XYZ");
  const xyz = await XYZ.deploy();

  await xyz.deployed();

  console.log("Manifold Proxy deployed to:", xyz.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
