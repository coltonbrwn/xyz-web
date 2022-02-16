require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.NEXT_PUBLIC_STAGING_ALCHEMY_KEY; // Alchemy API Url
const web3 = createAlchemyWeb3(API_URL);

async function main() {
  const contractFactory = await hre.ethers.getContractFactory('XYZManifoldExtension');
  const mainContract = process.env.NEXT_PUBLIC_MANIFOLD_CONTRACT_ADDRESS;
  const contract = await contractFactory.deploy(mainContract);
  const { address:contractAddress } = await contract.deployed();
  
  console.log("You need this address for minting!");
  console.log("Contract deployed to:", contractAddress);
  console.log(`Etherscan verification command:   npx hardhat verify --contract contracts/XYZManifoldExtension.sol:XYZManifoldExtension --network rinkeby "${ contractAddress }" ${ mainContract }`);

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });