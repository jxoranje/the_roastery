export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold">The Roastery Ideas</h1>
        <p className="text-neutral-400">
          Capture and track ideas for Joop and Farrah. 
          Here we track the ideas and keep track of what we're doing.
        </p>
        <a
          href="/ideas"
          className="inline-block px-4 py-2 rounded bg-orange-500 text-black font-semibold"
        >
          Log In and View ideas
        </a>
      </div>
    </main>
  );
}