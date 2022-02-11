require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.STAGING_ALCHEMY_KEY; // Alchemy API Url
const web3 = createAlchemyWeb3(API_URL);

async function main() {
  const contractFactory = await hre.ethers.getContractFactory('XYZManifoldExtension');
  const mainContract = process.env.MANIFOLD_CONTRACT_ADDRESS;
  const contract = await contractFactory.deploy(mainContract);
  const { address:contractAddress } = await contract.deployed();
  
  console.log("You need this address for minting!");
  console.log("Contract deployed to:", contractAddress);
  
  return contractAddress;
}

async function registerExtension( extensionAddress ) {
  const extensionJsonInterface = require('../artifacts/contracts/XYZManifoldExtension.sol/XYZManifoldExtension.json');
  const ExtensionContract = new web3.eth.Contract( extensionJsonInterface );

  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });