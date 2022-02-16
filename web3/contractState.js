const extensionContractAddress = process.env.NEXT_PUBLIC_MANIFOLD_EXTENSION_ADDRESS;
const contract = require("../artifacts/contracts/XYZManifoldExtension.sol/XYZManifoldExtension.json");

export default async function getContractState(web3Provider) {
    const extensionContract = new web3Provider.eth.Contract(contract.abi, extensionContractAddress);
    const contractState = await extensionContract.methods.getContractState().call();
    return { contractState};
}
