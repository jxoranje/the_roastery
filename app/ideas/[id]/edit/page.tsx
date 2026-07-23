"use client";

import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Idea = {
  id: string;
  title: string;
  description: string | null;
  problem: string | null;
  owner: string | null;
  status: string | null;
};

export default function EditIdeaPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("joop");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    async function loadIdea() {
      const { data, error } = await supabase
        .from("the_roastery_ideas")
        .select("id, title, description, problem, owner, status")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const idea = data as Idea;
      setTitle(idea.title ?? "");
      setDescription(idea.description ?? "");
      setProblem(idea.problem ?? "");
      setOwner(idea.owner ?? "Joop");
      setStatus(idea.status ?? "active");
      setLoading(false);
    }

    if (id) {
      loadIdea();
    }
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
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto space-y-6">
             <Image
             src="/images/roastery-logo.png"  // public/images/roastery-logo.png
             alt="The Roastery logo"
             width={240}
             height={240}
                />
        <h1 className="text-2xl font-semibold">Edit idea</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full border rounded px-3 py-2 bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

            <div>
            <label className="block text-sm font-medium mb-1">What problem are we solving?</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-white text-black"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 bg-white min-h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Owner</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            >
              <option value="joop">Joop</option>
              <option value="farrah">Farrah</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
            <option value="active">Active</option>
            <option value="on_hold">On Hold/Canceled</option>
            <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded bg-orange-500 text-black font-semibold"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={() => router.push(`/ideas/${id}`)}
              className="px-4 py-2 rounded border border-neutral-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}