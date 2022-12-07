import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
          <ReactQueryDevtools />
        </Hydrate>
      </Navbar>
    </QueryClientProvider>
  )
}
