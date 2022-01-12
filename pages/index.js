import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'

import Splashpage from './splash'

export default class Index extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>XYZ</title>
          <meta name="description" content="An artist-run Label DAO" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Splashpage />
      </div>
    )
  }
}
