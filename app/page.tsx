export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            The Roastery
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Collect, shape, and track ideas.
          </h1>
          <p className="text-lg text-neutral-600">
            A simple place for Joop and Farrah to save ideas, refine them, and mark them complete.
          </p>
          <div className="flex gap-3">
            <a
              href="/ideas"
              className="rounded bg-sky-500 px-5 py-3 font-semibold text-black"
            >
              Review Current Slate
            </a>
            <a
              href="/ideas/new"
              className="rounded bg-sky-200 px-5 py-3 font-semibold text-neutral-black"
            >
              Add new idea
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}