"use client";

import * as React from "react";
import { useParams } from "next/navigation";
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

export default function IdeaDetail() {
  const supabase = createClient();
  const params = useParams();
  const id = params?.id as string;

  const [idea, setIdea] = React.useState<Idea | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    async function loadIdea() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("the_roastery_ideas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setIdea(data as Idea);
      }

      setLoading(false);
    }

    loadIdea();
  }, [id, supabase]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <p className="text-sm text-neutral-400">Loading idea...</p>
      </main>
    );
  }

  if (error || !idea) {
    return (
      <main className="max-w-3xl mx-auto p-8 space-y-4">
        <h1 className="text-2xl font-semibold">Idea details</h1>
        <p className="text-red-500">{error || "Idea not found."}</p>
        <a href="/ideas" className="text-emerald-400 underline">
          ← Back to ideas
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{idea.title}</h1>
        <a href="/ideas" className="text-emerald-400 underline">
          ← Back to ideas
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-500 mb-1">Status</p>
          <p>{idea.status || "idea"}</p>
        </div>

        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-500 mb-1">Platform</p>
          <p>{idea.platform || "Unspecified"}</p>
        </div>

        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-500 mb-1">Pricing notes</p>
          <p>{idea.pricing || "None yet"}</p>
        </div>

        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-500 mb-1">Created</p>
          <p>{new Date(idea.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
        <p className="text-xs text-neutral-500 mb-2">Problem</p>
        <p className="text-sm text-neutral-200">
          {idea.problem || "No problem entered yet."}
        </p>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
        <p className="text-xs text-neutral-500 mb-2">Description</p>
        <p className="text-sm text-neutral-200">
          {idea.description || "No description entered yet."}
        </p>
      </div>
    </main>
  );
}