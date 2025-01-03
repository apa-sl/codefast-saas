import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  const isLoggedIn = true;
  const name = "Adam";

  return (
    <main>
      <header className="bg-base-200">
        <div className="flex justify-between items-center px-8 py-2 max-w-3xl mx-auto">
          <div className="font-bold">CodeFast SaaS</div>
          <nav className="space-x-4 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </nav>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </div>
      </header>
      <section className="px-8 py-32 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl lg: text-5xl font-extrabold mb-6">
          Collect customer feedback to build better products
        </h1>
        <div className="opacity-80 mb-10">
          Create a feedback board in minutes, build products your customers will
          love!
        </div>
      </section>
    </main>
  );
}
