import Web3 from 'web3'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import jsonInterface from '../contracts/Storage.json'

export default class StorageDemo extends React.Component {

  constructor() {
    super()
    this.state = {
      storageVal: '',
      inputValue: undefined
    }
  }

  async componentDidMount() {
    const web3 = new Web3(window.ethereum)
    const address = '0x7b16F885661454Cc223799E20Cb2E3fc3E089D0F'
    this.storageContract = new web3.eth.Contract(jsonInterface.abi, address)
    var result = await this.storageContract.methods.retrieve().call()
    this.setState({
      storageVal: result
    })
  }

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onButtonClick = async () => {
    const inputValueInt = parseInt(this.state.inputValue)
    if (inputValueInt || inputValueInt === 0) {
      console.log('legit')
      this.setState({
        inputValue: inputValueInt
      })
      try {
        var result = await this.storageContract.methods.store(inputValueInt).send({ from: '0x0D610B788a324D3372641A9B7f1EE9f42E83f73C' })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return (
      <div>
        <main className="main">
          <div>
            Storage Value:
          </div>
          <h1>
            { this.state.storageVal }
          </h1>
        </main>

        <div className="main">
          <input onChange={ this.onInputChange } value={ this.state.inputValue }/>
          <button onClick={ this.onButtonClick } >
            Set Value
          </button>
        </div>
      </div>
    )
  }
}
