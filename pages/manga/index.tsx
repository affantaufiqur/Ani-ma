import Head from 'next/head'

export default function MangaRoute() {
  return (
    <main>
      <Head>
        <title>Manga</title>
        <meta
          name="description"
          content="Browse manga"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <section>hello from mangaroute</section>
    </main>
  )
}
