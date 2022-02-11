import Link from 'next/link'
import React from 'react'

export default class Splash extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
        <div className="full-height">
            <div className="splash-outer">
                <div className="splash-left">
                    <div className="XYZ-logo">
                        <svg viewBox="0 0 2356 1223" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M447.493 553.187C535.732 406.616 671.24 214.34 800.446 12.6083C800.446 9.45622 798.87 7.88021 795.719 7.88021C787.84 7.88021 704.329 56.7371 666.513 108.746C598.759 256.893 519.975 400.312 442.766 545.307L143.387 25.2165C137.084 11.0322 135.509 9.45619 132.357 9.45619C126.054 9.45619 121.327 15.7603 105.571 34.6727C77.2084 74.0735 80.3597 77.2256 80.3597 88.2577L386.042 624.108C266.29 817.96 133.933 1022.84 0 1218.27C0 1221.42 1.57568 1223 4.72704 1223C12.6054 1223 103.995 1175.72 141.811 1123.71C225.322 939.314 308.833 780.135 390.769 633.564L723.238 1215.12C724.813 1219.85 726.389 1223 729.54 1223C734.267 1223 746.873 1210.39 779.962 1161.53C786.265 1152.08 787.84 1144.2 786.265 1139.47L447.493 553.187Z" fill="black"/>
                            <path d="M1267.17 661.933C1383.77 441.289 1508.25 219.068 1634.3 6.30417C1634.3 3.15205 1631.15 0 1628 0C1620.12 0 1527.16 67.7693 1497.22 105.594C1424.74 285.262 1347.53 469.657 1262.44 652.477L964.637 18.9124C959.91 7.88021 958.334 3.15208 955.183 3.15208C950.456 3.15208 944.153 9.45616 926.82 31.5206C892.155 74.0734 892.155 78.8016 892.155 85.1058L1185.23 685.573C1183.66 939.314 1183.66 1193.06 1183.66 1207.24C1183.66 1211.97 1185.23 1213.54 1189.96 1213.54C1197.84 1213.54 1215.17 1200.94 1229.35 1185.18C1260.86 1152.08 1267.17 1131.59 1267.17 1123.71V661.933Z" fill="black"/>
                            <path d="M2200.01 88.2577C2234.67 88.2577 2267.76 88.2578 2285.09 81.9536L1684.76 1126.86L1642.22 1196.21C1642.22 1197.78 1648.52 1205.66 1650.09 1205.66C1653.25 1205.66 1717.85 1204.09 1779.3 1204.09C1798.21 1204.09 2223.64 1205.66 2244.13 1205.66C2278.79 1205.66 2288.25 1204.09 2300.85 1196.21C2324.49 1169.42 2356 1122.13 2356 1117.41C2356 1115.83 2354.42 1114.25 2352.85 1114.25C2349.7 1114.25 2316.61 1122.13 2236.25 1122.13H1747.79C1728.88 1122.13 1717.85 1125.29 1706.82 1134.74L2307.15 72.4974L2313.46 63.0413C2326.06 48.857 2346.55 20.4885 2346.55 14.1843C2346.55 12.6083 2346.55 9.45619 2341.82 9.45619C2338.67 9.45619 2310.31 11.0322 2266.19 11.0322C2245.7 11.0322 1829.72 9.45619 1807.66 9.45619C1785.6 9.45619 1774.57 14.1843 1761.97 28.3686C1724.15 70.9215 1716.27 81.9536 1716.27 88.2577C1716.27 89.8337 1719.42 91.4098 1721 91.4098C1724.15 91.4098 1739.91 88.2577 1766.7 88.2577H2200.01Z" fill="black"/>
                        </svg>
                    </div>
                    <img
                        className="coordinates-bg"
                        src="/images/coordinate-bg.png"
                    />
                    <img
                        className="x-axis-bg"
                        src="/images/x-axis.png"
                    />
                    <img
                        className="y-axis-bg"
                        src="/images/y-axis.png"
                    />
                </div>
                <div className="splash-right">
                    <div className="splash-content">
                        <h3> XYZ IS AN INTERNET-NATIVE MUSIC LABEL AND ARTIST COLLECTIVE.</h3>
                        <h3> OUR INAUGURAL RELEASE is a 50-edition NFT featuring MUSIC BY <i><a target="_blank" rel="noreferrer" href="https://www.instagram.com/colt_sound/">COLT</a></i> AND ARTWORK BY <i><a target="_blank" rel="noreferrer" href="https://www.instagram.com/con_cristal/">RICKY ALBA</a></i>.</h3>
                        <h3> 50% OF THE SALE PROCEEDS WILL FLOW TO THE DAO.</h3>
                        <h3> AT CLOSING, SUPPORTERS WILL BE GRANTED ACCESS TO THE DAO WHERE WE WILL COLLECTIVELY DECIDE HOW TO SPEND THE POOLED FUNDS.</h3>
                        <h3> SOUND LIKE FUN? <u>minting starts 2/14</u></h3>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
