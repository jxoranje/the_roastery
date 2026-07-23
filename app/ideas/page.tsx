"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  async function handleLogout() {
    await supabase.auth.signOut({ scope: "local" });
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-neutral-500">Loading ideas...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold text-neutral-900">
            The Roastery Ideas
          </h1>
          <p className="mt-4 text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                The Roastery
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                Ideas
              </h1>
              <p className="max-w-2xl text-neutral-600">
                A calm place for Joop and Farrah to collect, shape, and track ideas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/ideas/new"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 font-semibold text-black shadow-sm transition hover:bg-sky-400"
              >
                + Add new idea
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-3 font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {ideas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white/70 p-10 text-neutral-500 shadow-sm">
            No ideas yet. Add one to get started.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="group rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700">
                    {idea.title}
                  </h2>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                      idea.status
                    )}`}
                  >
                    {getStatusLabel(idea.status)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1">
                    {getOwnerLabel(idea.owner)}
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">
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