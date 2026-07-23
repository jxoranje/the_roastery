"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import EditIdeaClient from "./EditIdeaClient";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  if (!params.id) {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold text-neutral-900">Edit idea</h1>
          <p className="mt-4 text-red-600">No idea id in URL.</p>
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

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            The Roastery
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            Edit idea
          </h1>
          <p className="mt-2 text-neutral-600">
            Update the details for this idea.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <EditIdeaClient id={params.id} />
        </div>
      </div>
    </main>
  );
}