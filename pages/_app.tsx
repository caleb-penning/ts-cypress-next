import '../styles/globals.css'
import '../styles/feedback.css'
import '../styles/todos.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
