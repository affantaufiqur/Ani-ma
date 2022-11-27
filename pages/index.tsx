import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <div className="mx-auto container">
          <h1 className="text-4xl text-center py-24">Hello</h1>
        </div>
      </main>
    </div>
  )
}
