"use client";

import * as React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Idea = {
  id: string;
  title: string;
  problem: string | null;
  description: string | null;
  platform: string | null;
  pricing: string | null;
  status: string | null;
  owner: string | null;
  created_at: string;
};

export default function Page() {
  const supabase = createClient();

  const [idea, setIdea] = React.useState<Idea | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const id = window.location.pathname.split("/").pop();

    async function loadIdea() {
      if (!id) return;

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
  }, [supabase]);

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
        <Image
          src="/images/roastery-logo.png"  // public/images/roastery-logo.png
          alt="The Roastery logo"
          width={240}
          height={240}
/>
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
      <div className="rounded-lg border border-neutral-700 bg-sky-200 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{idea.title}</h1>
      </div>

    <button
      onClick={() => router.push(`/ideas/${idea.id}/edit`)}
      className="px-3 py-1 bg-sky-500 rounded border border-neutral-600 text-sm"
      >
      Edit idea
    </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
        <p className="text-s text-neutral-500 mb-1">Status</p>
      <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
          idea.status === "completed"
          ? "bg-gray-200 text-gray-700"
          : idea.status === "on_hold"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800"
         }`}
        >
          {idea.status === "completed"
            ? "Completed"
            : idea.status === "on_hold"
            ? "On Hold"
            : "Active"}
        </span>
      </div>

        <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
          <p className="text-s text-neutral-500 mb-1">Platform</p>
          <p>{idea.platform || "Unspecified"}</p>
        </div>

        <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
          <p className="text-s text-neutral-500 mb-1">Pricing notes</p>
          <p>{idea.pricing || "None yet"}</p>
        </div>

        <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
          <p className="text-s text-neutral-500 mb-1">Created</p>
          <p>{new Date(idea.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
        <p className="text-s text-neutral-500 mb-2">Problem</p>
        <p className="text-sm text-neutral-700">
          {idea.problem || "No problem entered yet."}
        </p>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
        <p className="text-s text-neutral-500 mb-2">Description</p>
        <p className="text-sm text-neutral-700">
          {idea.description || "No description entered yet."}
        </p>
      </div>

      <div className="rounded-lg border border-neutral-700 bg-sky-50 p-4">
        <p className="text-s text-neutral-500 mb-2">Owner</p>
        <p className="text-sm text-neutral-700">
          {idea.owner || "No owner entered yet."}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <a href="/ideas" className="text-purple-400 underline">
          ← Back to Main
        </a>
      </div>

    </main>
  );
}