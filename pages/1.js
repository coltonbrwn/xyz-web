import React  from 'react'
import { useWeb3React } from '@web3-react/core'
import * as ethers from 'ethers'

export default class StorageDemo extends React.Component {

    constructor() {
      super()
      this.state = {}
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