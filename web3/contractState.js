import Web3 from 'web3'

const extensionContractAddress = '0xA9Ad7e6234D52Ea19ccD1FDE69Eb0Bff2f354709';
const contract = require("../artifacts/contracts/XYZManifoldExtension.sol/XYZManifoldExtension.json");

async function getContractState(provider) {
    const web3 = new Web3(provider)
    const extensionContract = new web3.eth.Contract(contract.abi, extensionContractAddress);
    const contractState = await extensionContract.methods.getContractState().call();
    return contractState;
}

export default getContractState;


