import Web3 from 'web3'

const extensionContractAddress = process.env.NEXT_PUBLIC_MANIFOLD_EXTENSION_ADDRESS;
const contract = require("../artifacts/contracts/XYZManifoldExtension.sol/XYZManifoldExtension.json");

async function mintExisting(provider, priceWei) {
    const web3 = new Web3(provider)
    const extensionContract = new web3.eth.Contract(contract.abi, extensionContractAddress)
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const fromAddress = accounts[0]
    const txHash = await extensionContract.methods.mintExisting().send({
        from: fromAddress,
        value: priceWei
    })
    return txHash
}

export default mintExisting;


