import Head from 'next/head'

export default function AnimeRoute() {
  return (
    <main>
      <Head>
        <title>Anime</title>
        <meta
          name="description"
          content="Browse anime"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <section>hello from animeroute</section>
    </main>
  )
}
