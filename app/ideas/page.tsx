"use client";

import * as React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Idea = {
  id: string;
  title: string;
  problem: string | null;
  description: string | null;
  platform: string | null;
  pricing: string | null;
  status: string | null;
  created_at: string;
};

const STATUS_COLUMNS = [
  { key: "idea", label: "Ideas" },
  { key: "researching", label: "Researching" },
  { key: "building", label: "Building" },
  { key: "on_hold", label: "Canceled/On hold" },
  { key: "completed", label: "Completed" },
];

export default function IdeasPage() {
  const supabase = createClient();

  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadIdeas() {
      const { data, error } = await supabase
        .from("the_roastery_ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setIdeas((data ?? []) as Idea[]);
      }

      setLoading(false);
    }

    loadIdeas();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  function handleLogin() {
    window.location.href = "/auth/login";
  }

  const ideasByStatus: Record<string, Idea[]> = {};
  for (const { key } of STATUS_COLUMNS) {
    ideasByStatus[key] = [];
  }
  for (const idea of ideas) {
    const key = idea.status ?? "idea";
    if (!ideasByStatus[key]) {
      ideasByStatus[key] = [];
    }
    ideasByStatus[key].push(idea);
  }

if (error) {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-4">
                        <h1 className="text-2xl font-semibold">The Roastery | Idea Tracker</h1>
        <p className="text-red-500">Error loading ideas: {error}</p>
      </div>
    </main>
  );
}

return (
  <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <Image
  src="/images/roastery-logo.png"  // public/images/roastery-logo.png
  alt="The Roastery logo"
  width={240}
  height={240}
/>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">

          <h1 className="text-2xl font-semibold">The Roastery | Idea Tracker</h1>
          
        <a
          href="/ideas/new"
          className="px-4 py-2 rounded bg-sky-500 text-black font-semibold"
        >
          + Add new idea
        </a>
        </div>

        <a
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-400 text-black text-sm"
          >
            Log out
        </a>
      </div>

      <section className="space-y-6">
        {STATUS_COLUMNS.map((column) => (
          <div key={column.key} className="space-y-3">
            <h2 className="text-lg font-semibold">{column.label}</h2>

            {ideasByStatus[column.key].length === 0 ? (
              <p className="text-sm text-neutral-500">
                No ideas here yet.
              </p>
            ) : (
              <div className="space-y-3">
                {ideasByStatus[column.key].map((idea) => (
                  <article
                    key={idea.id}
                    className="rounded-lg border border-sky-50 bg-grey-400 p-4 hover:border-sky-500 cursor-pointer"
                  >
                    <a href={`/ideas/${idea.id}`} className="block space-y-2">
                      <h3 className="text-sm font-semibold">
                        {idea.title}
                      </h3>

                      {idea.problem && (
                        <p className="text-xs text-neutral-900">
                          {idea.problem.length > 160
                            ? idea.problem.slice(0, 160) + "..."
                            : idea.problem}
                        </p>
                      )}

                      <div className="mt-2 flex justify-between items-center text-xs text-neutral-900">
                        <span>{idea.platform || "Unspecified"}</span>
                        <span>
                          {new Date(
                            idea.created_at,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  </main>
);
}