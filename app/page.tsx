import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <Image
          src="/images/roastery-logo.png"
          alt="The Roastery logo"
          width={360}
          height={360}
          priority
          className="mb-8 h-auto w-full max-w-[280px] sm:max-w-[360px]"
        />

        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            The Roastery
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Collect, shape, and track ideas.
          </h1>

          <p className="text-lg text-neutral-600">
            A centralized place to capture ideas, refine them, and move them
            from first thought to finished work.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <a
              href="/ideas"
              className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-black shadow-sm transition hover:bg-sky-400"
            >
              Review Current Slate
            </a>

            <a
              href="/ideas/new"
              className="rounded-full bg-sky-200 px-5 py-3 font-semibold text-neutral-900 shadow-sm transition hover:bg-sky-100"
            >
              Add new idea
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}