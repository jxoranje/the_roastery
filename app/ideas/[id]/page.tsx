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
        <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <Image
            src="/images/roastery-logo.png"
            alt="The Roastery logo"
            width={180}
            height={180}
          />
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              The Roastery
            </p>
            <h1 className="text-3xl font-bold text-neutral-900">Idea details</h1>
            <p className="text-red-600">{error || "Idea not found."}</p>
          </div>
          <a href="/ideas" className="inline-flex text-emerald-700 underline">
            ← Back to ideas
          </a>
        </div>
      </main>
    );
  }

  const currentStatus = idea.status ?? "active";
  const statusLabel =
    currentStatus === "completed"
      ? "Completed"
      : currentStatus === "on_hold"
        ? "On Hold"
        : "Active";
  const statusClass =
    currentStatus === "completed"
      ? "bg-gray-200 text-gray-700"
      : currentStatus === "on_hold"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                The Roastery
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                {idea.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}
                >
                  {statusLabel}
                </span>
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                  {idea.owner || "No owner"}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/ideas/${idea.id}/edit`)}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-sky-400"
            >
              Edit idea
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Platform
            </p>
            <p className="text-neutral-800">{idea.platform || "Unspecified"}</p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Pricing notes
            </p>
            <p className="text-neutral-800">{idea.pricing || "None yet"}</p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Created
            </p>
            <p className="text-neutral-800">
              {new Date(idea.created_at).toLocaleString()}
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Owner
            </p>
            <p className="text-neutral-800">{idea.owner || "No owner entered yet."}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Problem
          </p>
          <p className="text-neutral-700 leading-7">
            {idea.problem || "No problem entered yet."}
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Description
          </p>
          <p className="text-neutral-700 leading-7">
            {idea.description || "No description entered yet."}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-white/70 bg-white/80 px-6 py-4 shadow-sm backdrop-blur">
          <a href="/ideas" className="text-emerald-700 underline">
            ← Back to ideas
          </a>
        </div>
      </div>
    </main>
  );
}