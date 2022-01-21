import React  from 'react'
import { useWeb3React } from '@web3-react/core'
import { Zora, generateMetadata, constructMediaData, constructBidShares, sha256FromBuffer } from '@zoralabs/zdk'
import * as ethers from 'ethers'
import contentMetadata from '../metadata-test.json'
import mockContent from '../mock-content.json'

export default class StorageDemo extends React.Component {

    constructor() {
      super()
      this.state = {}
    }

    mintNFT = async () => {
        const signer = this.provider.getSigner()
        const zora = new Zora(signer, 4);
        const meta = generateMetadata("catalog-20210202", contentMetadata);
        const contentHash = sha256FromBuffer(Buffer.from(JSON.stringify(mockContent)))
        const metadataHash = sha256FromBuffer(Buffer.from(meta))
        const mediaData = constructMediaData(
            'https://xyz-church-test.s3.amazonaws.com/mock-content.txt',
            'https://xyz-church-test.s3.amazonaws.com/metadata-test.json',
            contentHash,
            metadataHash
        )
        const bidShares = constructBidShares(10, 90, 0);

        const tx = await zora.mint(mediaData, bidShares);
        return new Promise((resolve) => {
            zora.media.on("Transfer", (from, to, tokenId) => {
                if (from === "0x0000000000000000000000000000000000000000" && to === tx.from ) {
                    resolve(tokenId);
                }
            }); 
        });
    }
  
    async componentDidMount() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = this.provider.getSigner()
        // 
    }   

    render() {
        return (
            <div>
                <h3>HI</h3>
                <button onClick={ this.mintNFT }>
                    mint
                </button>
            </div>
        )
    }
}