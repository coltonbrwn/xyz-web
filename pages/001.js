import React  from 'react'
import Link from 'next/link'
import Img from 'next/image'
import detectEthereumProvider from '@metamask/detect-provider';
import { createAlchemyWeb3  } from '@alch/alchemy-web3';
import web3 from 'web3';

import mintExisting from '../web3/mintExisting';
import getContractState from '../web3/contractState';

import FundingSplitsSVG from '../components/funding-splits-svg';
import EditionsIconSVG from '../components/editions-icon-svg';

export default class StorageDemo extends React.Component {

    constructor() {
      super()
      this.state = {
          hasError: false,
          isWalletConnected: false,
          walletAddress: '',
          contractState: {},
          transactionPending: false,
          isModalOpen: false,
          txHash: null
      }
      this.web3Provider = null;
    }

    async componentDidMount() {
        try {
            this._fetchContractViewData();
            this.web3Provider = await detectEthereumProvider();
            const accounts = await this.web3Provider.request({ method: 'eth_requestAccounts' });
            this.setState({
                isWalletConnected: true,
                walletAddress: accounts[0]
            })
        } catch(e) {
            console.log(e)
        }
    }

    onMintButtonClick = async () => {
        if (
            ! this.state.contractState.price ||
            this._isSoldOut() ||
            this.state.transactionPending
        ) {
            return;
        }

        try {
            this.setState({
                transactionPending: true
            })
            const { transactionHash: txHash } = await mintExisting(this.web3Provider, Number(this.state.contractState.price))
            this._fetchContractViewData()
            this._showSuccessModal()
            this.setState({
                transactionPending: false,
                txHash
            })
        } catch (e) {
            alert(String(e.message))
            this.setState({
                hasError: e,
                transactionPending: false
            })
        }
    }

    onConnectWalletClick = async () => {
        if (this.state.isWalletConnected) {
            return
        }
        this._metamaskInit()
    }

    _fetchContractViewData = async () => {
        const alchemyProvider = createAlchemyWeb3( process.env.NEXT_PUBLIC_STAGING_ALCHEMY_KEY );
        const { contractState } = await getContractState(alchemyProvider);
        this.setState({
            contractState
        })
    }

    _showSuccessModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    _hideSuccessModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    
    _numRemaining() {
        let numRemaining;
        if (this.state.contractState.numMinted) {
            numRemaining = this.state.contractState.maxMint - this.state.contractState.numMinted;
            numRemaining = numRemaining < 0 ? 0 : numRemaining;
            return String(numRemaining)
        }
    }

    _isSoldOut() {
        let isSoldOut;
        if (this.state.contractState.numMinted) {
            isSoldOut = (this.state.contractState.maxMint - this.state.contractState.numMinted) <= 0;
            return Boolean(isSoldOut)
        }
    }

    _generateEtherscanUrl() {
        const network = process.env.NEXT_PUBLIC_NETWORK_NAME
        const contractAddress = process.env.NEXT_PUBLIC_MANIFOLD_CONTRACT_ADDRESS
        return `https://${ network === 'rinkeby' ? 'rinkeby.' : ''}etherscan.io/token/${ contractAddress }`
    }

    _generateTransactionUrl() {
        const network = process.env.NEXT_PUBLIC_NETWORK_NAME
        return `https://${ network === 'rinkeby' ? 'rinkeby.' : ''}etherscan.io/tx/${ this.state.txHash }`
    }

    _metamaskInit = async () => {
        if (!this.web3Provider) {
            this.setState({
                isWalletConnected: false,
                isSelectingWalletType: false
            })
            alert('No ethereum provider found. Is metamask installed?')
        }
        try {
            const accounts = await this.web3Provider.request({ method: 'eth_requestAccounts' });
            this.setState({
                isWalletConnected: true,
                walletAddress: accounts[0],
                transactionPending: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const numRemaining = this._numRemaining() || '-';
        const maxMint = this.state.contractState.maxMint || '-';
        const price = this.state.contractState.price ? web3.utils.fromWei(String(this.state.contractState.price), 'ether') : '-';

        let buttonText, isButtonActive;
        if (this._isSoldOut()) {
            buttonText = 'Sold Out'
        } else if (this.state.transactionPending) {
            buttonText = 'Transaction Pending...'
        } else {
            buttonText = 'Mint'
            isButtonActive = true;
        }

        return (
            <div className="mint-page">

                { this.state.isModalOpen ? (
                    <div id="modal">
                        <div className="modal-inner">
                            <h1>🎉Hooray!</h1>
                            <div className="modal-split-layout">
                                <img src="/media/c1.png" />
                                <div>
                                    <h4>
                                        Welcome to XYZ! Your token has been successfully minted.
                                    </h4>
                                    <h4>
                                        Thank you for supporting independent art and music on the blockchain.
                                    </h4>
                                    <h4>
                                        Next, head on over to <a href="https://discord.gg/XmCFR2vJ" target="_blank" rel="noreferrer">the discord</a>, get verified and learn how to contribute.
                                    </h4>
                                </div>
                            </div>
                            <p>
                                etherescan transaction: &nbsp;
                                <a href={ this._generateTransactionUrl() } target="_blank" rel="noreferrer">
                                    { this.state.txHash }
                                </a>
                            </p>
                            <div className='button-container' onClick={ this._hideSuccessModal }>
                                Close
                            </div>
                        </div>
                    </div>
                ) : '' }

                <div className="outer-container">
                    <div className='header'>
                        <div className="logo">
                            <h1>
                                <Link href="/">
                                    <a>XYZ / 001</a>
                                </Link>
                            </h1>
                        </div>
                        <div className="links">
                            {
                                this.state.isWalletConnected ? (
                                    <span>{ `${this.state.walletAddress.slice(0, 6)}...${ this.state.walletAddress.slice(-4)} `}</span>
                                ) : (
                                    <a onClick={ this.onConnectWalletClick }>
                                        connect wallet
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className="mint-main">
                        <div className="content-container">
                            <div className="row">
                                <div className="col-3">
                                    <img className='album-img' src="/media/c1.png" />
                                    <audio controls>
                                        <source src="/media/self-reflection-short.mp3" type="audio/mp3"></source>
                                    </audio>
                                </div>
                                <div className="col-3 mint-info-wrapper">

                                    <div>
                                        <h2>Self Reflection EP</h2>
                                        <p>Colt</p>
                                        <div className="editions-icon">
                                            <EditionsIconSVG />
                                            <div className="editions-remaining">
                                                <strong>{ numRemaining }/{ maxMint }</strong>                 
                                                <small>editions remaining</small>                           
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <p>
                                        In addition to a limited ERC-1155 token, you'll recieve 1 $WAV governance token, giving you voting rights for the use of the pooled funds. You'll also access to a free lossless version of the music via the DAO.<br/> <Link href="/"><strong><a>Learn More</a></strong></Link>
                                    </p>

                                    <div className="mint-button-container">
                                        <div
                                            className={`mint-button-bg button-container ${ isButtonActive ? '' : '--inactive' }`}
                                            onClick={ this.onMintButtonClick }
                                        >
                                            { buttonText }
                                        </div>
                                        <div>
                                            <strong>Price:</strong>
                                            &nbsp;
                                            <span>{ price } ETH </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="splits">
                        <div className="content-container">
                            <div className="row">
                                <div className="col-1">
                                    <h5>Funding Splits</h5>
                                    <FundingSplitsSVG />
                                </div>
                                <div className="col-1">
                                    <h5>Supporters</h5>
                                    <p>
                                        View activity on <strong><a href={ this._generateEtherscanUrl() } target="_blank" rel="noreferrer">Etherscan→</a></strong>
                                    </p>
                                    <br/>
                                    <p>
                                        Minting will grant you membership access to our <strong><a href="https://discord.gg/XmCFR2vJ" target="_blank" rel="noreferrer">Discord→</a></strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='media-description'>
                        <div className="content-container">
                            <div className="flex">
                                <div>
                                    <h5>Description</h5>
                                    <p>&nbsp;</p>
                                    <p>
                                    Music by Colton Brown
                                    </p>
                                    <p>
                                    Written and recorded in Panama City / Mexico City
                                    </p>
                                    <p>
                                        Mixed in Brooklyn, NY
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Artwork by Ricky Alba
                                    </p>
                                    <p>
                                        Mastered by Connor Dalton
                                    </p>
                                    <p>&nbsp;</p>

                                </div>
                                <div>
                                    <h5>
                                        Token details
                                    </h5>
                                    <p>&nbsp;</p>
                                    <p>
                                        Token adheres to the ERC-1155 token standard and utilizes manifold.xyz smart-contracts via their extension pattern.
                                        All future releases from XYZ will be part of this same ERC-1155 collection, with the present release being token ID #1.
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        The audio is stored on arweave and therefore is limited to 10MB per upload, or about 4 minutes of playtime. To accomodate this restriction the three songs have been shortened and combined into a single file.
                                        The full lossless version will be provided on request for any token holder. The music can also be found on Spotify and Bandcamp.
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Owners of this token also have claim to 1 $WAV token, the governance token of the DAO. As long as the purchaser maintains posession of the token, they are rights-bearing DAO members and can participate in treasury decisions or ideation sessions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-content">
                        <div className="content-container">
                            <div className="main">
                                <h1>ALBUM CONCEPT</h1>
                                <h6>
                                    This music was written over the course of the last two years while living abroad in Panama. When the Pandemic hit it became clear my travel plans were about to be warped; I found myself on uncertain ground as airports were closed and the rest of the world faded from view. Surrounded by so much newness: the haze of the pandemic, a different language, a new relationship, I began to find an identity in sound.
                                </h6>
                                <h6>
                                    <i>Self Reflection</i> is a personal diary of a shimmering of emotions that washed over me in that time. From chaos came excitement; separation revealed the beauty of quiet existence. Struggle can pass through us, can lead us towards something new. Self Reflection is part of the process.
                                </h6>
                            </div>
                            <div className="sub">
                                <div className="row">
                                    <div className="col-1">
                                        <h3>1. Repeater  [3:35]</h3>
                                        <p>
                                            The first track on the EP is named after the sound of the echoing lead synth that appears throughout the track. With Repeater I wanted to explore the sound of the computer. Mysterious, complex and unwieldy, computers are pathways to infinite worlds. Digital voice samples appear throughout, hinting at the myriad identities living beyond the physical. The angular, unusual melody that opens the piece carries the frantic phrasing of telephone communication or algorithmic flurry.
                                        </p>
                                    </div>
                                    <div className="col-1">
                                        <h3>2. Crystal Silence [4:00]</h3>
                                        <p>
                                        The second track centers around a sample of jazz pianist Chick Corea’ Crystal Silence on the album Return to Forever. It’s hauntingly beautiful recording that has followed me throughout my life. Corea was a master at crafting a recognizable sonic world, a dreamlike plane of existence accessible through his playing. The title of the piece and the album hint at a recognition of music’s transcendent power; Chick Corea passed away in February 2021. 
                                        </p>
                                    </div>
                                    <div className="col-1">
                                        <h3>3. Gomez [4:26]</h3>
                                        <p>
                                            Gomez is a dance track steeped in personal history and nostalgia, containing fragments of ideas from various periods of life including when I lived Los Angeles. It samples ‘Mint Green’ by pianist Andrew Shapiro and features live guitar. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="streaming">
                        <div className="content-container">
                            <h1>Follow Along:</h1>
                            <div className="row">
                                <div className='col-1'>
                                    <h6>
                                        <a href="https://open.spotify.com/album/5LjVSAnuO3SIE4vvqJPIbH?si=DXzGoDi3SA6FXvOlYOQN8Q" target="_blank" rel="noreferrer">
                                            Spotify
                                        </a>
                                    </h6>
                                    <h6>
                                        <a href="https://music.apple.com/us/album/self-reflection-ep/1604336854" target="_blank" rel="noreferrer">
                                            Apple
                                        </a>
                                    </h6>

                                    <h6>
                                        <a href="https://soundcloud.com/colt_sound/sets/self-reflection-ep-1" target="_blank" rel="noreferrer">
                                            Soundcloud
                                        </a>
                                    </h6>

                                    <h6>
                                        <a href="https://coltsound.bandcamp.com/album/self-reflection-ep" target="_blank" rel="noreferrer">
                                            Bandcamp
                                        </a>
                                    </h6>
                                </div>
                                
                                <div className='col-1'>
                                    <h6>
                                        <a href="https://twitter.com/colt_xyz" target="_blank" rel="noreferrer">
                                            Twitter
                                        </a>
                                    </h6>

                                    <h6>
                                        <a href="https://www.instagram.com/colt_sound" target="_blank" rel="noreferrer">
                                            Instagram
                                        </a>
                                    </h6>
                                    <h6>
                                        <a href="https://discord.gg/XmCFR2vJ" target="_blank" rel="noreferrer">
                                            Discord
                                        </a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}