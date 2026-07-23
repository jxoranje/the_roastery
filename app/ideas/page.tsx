"use client";

import * as React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Idea = {
  id: string;
  title: string;
  problem: string | null;
  description: string | null;
  owner: string | null;
  status: string | null;
};

export default function IdeasPage() {
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadIdeas() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("the_roastery_ideas")
        .select("id, title, problem, description, owner, status")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setIdeas((data as Idea[]) || []);
      setLoading(false);
    }

    loadIdeas();
  }, []);

  function getOwnerLabel(owner: string | null) {
    if (owner === "joop") return "Joop";
    if (owner === "farrah") return "Farrah";
    return "Unassigned";
  }

  function getStatusLabel(status: string | null) {
    if (status === "on_hold") return "On Hold";
    if (status === "completed") return "Completed";
    return "Active";
  }

  function getStatusClass(status: string | null) {
    if (status === "on_hold") return "bg-yellow-100 text-yellow-800";
    if (status === "completed") return "bg-gray-200 text-gray-700";
    return "bg-green-100 text-green-800";
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <p className="text-sm text-neutral-500">Loading ideas...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-semibold">The Roastery Ideas</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              The Roastery
            </p>
            <h1 className="text-3xl font-bold text-neutral-900">
              Ideas
            </h1>
          </div>

          <Link
            href="/ideas/new"
            className="rounded bg-orange-500 px-4 py-2 font-semibold text-black"
          >
            + Add new idea
          </Link>
        </div>

        {ideas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-neutral-500">
            No ideas yet. Add one to get started.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {idea.title}
                  </h2>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(
                      idea.status
                    )}`}
                  >
                    {getStatusLabel(idea.status)}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                  <span className="rounded-full bg-neutral-100 px-2 py-1">
                    {getOwnerLabel(idea.owner)}
                  </span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
                  {idea.problem || idea.description || "No details entered yet."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}