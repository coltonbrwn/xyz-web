import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log(`rendered using Manifold Extension Address: ${ process.env.NEXT_PUBLIC_MANIFOLD_EXTENSION_ADDRESS }`)
  return <Component {...pageProps} />
}

export default MyApp
