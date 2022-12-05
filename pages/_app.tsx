import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Hydrate, Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </Navbar>
    </QueryClientProvider>
  )
}
