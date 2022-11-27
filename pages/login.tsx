import Head from 'next/head'
import FormWrapper from '../components/Form/FormWrapper'

export default function LoginRoute() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="login"
          content="login user"
        />
      </Head>
      <main className="w-screen h-screen bg-black-shaft-900">
        <section className="mx-auto container relative">
          <div className="bg-port-gore-900/60 backdrop-blur-lg w-[24rem] rounded-full h-96 absolute left-[75rem] blur-3xl top-64" />
          <div className="flex flex-col  justify-center h-screen">
            <section className="py-10">
              <h1 className="font-chillax text-port-gore-500 text-4xl">Ani-ma</h1>
            </section>
            <section className="flex flex-col gap-y-2 font-general-sans">
              <h1 className="text-4xl font-semibold tracking-wide leading-normal text-white">Welcome Back !</h1>
              <p className="text-sm text-black-shaft-300 font-medium tracking-wide">Please login into your account.</p>
            </section>
            <section className="py-12 w-1/2">
              <form
                action="/api/login"
                method="POST"
              >
                <section className="flex flex-col gap-y-4">
                  <FormWrapper>
                    <label
                      htmlFor="email"
                      className="text-sm text-black-shaft-200 tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="rounded-lg focus:border-blue-100 border-black-shaft-800 bg-black-shaft-900 text-white"
                      placeholder="naruto@konoha.com"
                    />
                  </FormWrapper>
                  <FormWrapper>
                    <label
                      htmlFor="password"
                      className="text-sm text-black-shaft-200 tracking-wide"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="rounded-lg focus:border-blue-100 border-black-shaft-800 bg-black-shaft-900 text-white"
                      placeholder="*********"
                    />
                  </FormWrapper>
                </section>
                <button
                  type="submit"
                  className="bg-port-gore-800/40 hover:bg-port-gore-900 transition-all duration-150 w-full rounded-md py-4 text-white mt-4"
                >
                  <p className="text-port-gore-50 hover:text-port-gore-100 font-medium text-lg">Login</p>
                </button>
              </form>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
