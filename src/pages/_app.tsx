import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.error("hereh")
    const windowLog = console.log
    console.log = function (...args) {
      windowLog(...args)
      console.warn("biyatch", arguments)
    }
  }, [])

  return <Component {...pageProps} />
}
