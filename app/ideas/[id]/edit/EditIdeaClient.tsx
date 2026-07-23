"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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

export default function EditIdeaClient({ id }: { id: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("joop");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIdea() {
      if (!id) {
        setError("No idea id in URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("the_roastery_ideas")
        .select("id, title, problem, description, owner, status")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const idea = data as Idea;
      setTitle(idea.title ?? "");
      setProblem(idea.problem ?? "");
      setDescription(idea.description ?? "");
      setOwner(idea.owner ?? "joop");
      setStatus(idea.status ?? "active");
      setLoading(false);
    }

    loadIdea();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("the_roastery_ideas")
      .update({
        title,
        problem,
        description,
        owner,
        status,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Could not save changes.");
      return;
    }

    router.push(`/ideas/${id}`);
  }

  if (loading) {
    return <p className="text-sm text-neutral-500">Loading idea...</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/ideas")}
          className="text-emerald-700 underline"
        >
          ← Back to ideas
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">Title</label>
        <input
          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-orange-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          What problem are we solving?
        </label>
        <textarea
          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-orange-400"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700">
          Description
        </label>
        <textarea
          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-orange-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Owner</label>
          <select
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-orange-400"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <option value="joop">Joop</option>
            <option value="farrah">Farrah</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Status</label>
          <select
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-orange-400"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="on_hold">On Hold/Canceled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push(`/ideas/${id}`)}
          className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}