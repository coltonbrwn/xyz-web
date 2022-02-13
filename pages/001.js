import React  from 'react'
import Link from 'next/link'
import { useWeb3React } from '@web3-react/core'
import * as ethers from 'ethers'

import MintButtonSVG from '../components/mint-button-svg';
import FundingSplitsSVG from '../components/funding-splits-svg';
import EditionsIconSVG from '../components/editions-icon-svg';

export default class StorageDemo extends React.Component {

    constructor() {
      super()
      this.state = {}
    }

    render() {
        return (
            <div className="mint-page">
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
                            connect wallet
                        </div>
                    </div>
                    <div className="mint-main">
                        <div className="content-container">
                            <div className="row">
                                <div className="col-3">
                                    <img className='album-img' src="/media/c1.png" />
                                    <audio controls>
                                        <source src="/media/self-reflection.mp3" type="audio/mp3"></source>
                                    </audio>
                                </div>
                                <div className="col-3 mint-info-wrapper">

                                    <div>
                                        <h2>Self Reflection EP</h2>
                                        <p>Colt</p>
                                        <div className="editions-icon">
                                            <EditionsIconSVG />
                                            <div className="editions-remaining">
                                                <strong>50/50</strong>                 
                                                <small>editions remaining</small>                           
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div>
                                        <p>
                                            In addition to a limited ERC-1155 token, you’ll recieve 1 $WAV governance token, giving you voting rights for the use of the pooled funds.<br/> <a href="/faq">Learn more</a>
                                        </p>
                                        <div className="mint-button">
                                            <MintButtonSVG />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}