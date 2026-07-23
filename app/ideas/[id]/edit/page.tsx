"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Idea = {
  id: string;
  title: string;
  problem: string | null;
  description: string | null;
  platform: string | null;
  pricing: string | null;
  status: string | null;
  owner: string | null;
};

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const router = useRouter();

  const [idea, setIdea] = React.useState<Idea | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadIdea() {
      // If for some reason params.id is missing, bail out but stop loading
      if (!params.id) {
        setError("No idea id in URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("the_roastery_ideas")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          setError(error.message);
          setIdea(null);
        } else {
          setIdea(data as Idea);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load idea.");
      } finally {
        setLoading(false);
      }
    }

    loadIdea();
  }, [params.id, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-neutral-500">Loading idea...</p>
        </div>
      </main>
    );
  }

  if (error || !idea) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold text-neutral-900">Edit idea</h1>
          <p className="mt-4 text-red-600">{error || "Idea not found."}</p>
          <button
            onClick={() => router.push("/ideas")}
            className="mt-6 text-emerald-700 underline"
          >
            ← Back to ideas
          </button>
        </div>
      </main>
    );
  }

  // For now, keep your existing edit form component here:
  // <EditIdeaClient idea={idea} /> or whatever you had before.
  // I’ll just stub it so the page compiles.
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Edit idea</h1>
        <p className="mb-2 text-sm text-neutral-500">
          You can update the details for “{idea.title}”.
        </p>
        {/* Replace this with your real form component */}
        <pre className="mt-4 rounded-xl bg-neutral-100 p-4 text-xs">
          {JSON.stringify(idea, null, 2)}
        </pre>
        <button
          onClick={() => router.push(`/ideas/${idea.id}`)}
          className="mt-6 text-emerald-700 underline"
        >
          ← Back to idea
        </button>
      </div>
    </main>
  );
}