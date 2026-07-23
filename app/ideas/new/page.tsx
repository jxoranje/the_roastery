"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NewIdeaPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [pricing, setPricing] = useState("");
  const [status, setStatus] = useState("idea");
  const [owner, setOwner] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSaving(true);
  setError(null);
  setSuccess(null);
  router.push("/ideas");

  const { data, error } = await supabase
    .from("the_roastery_ideas")
    .insert([
      {
        title,
        problem,
        description,
        platform,
        pricing,
        status,
        owner,
      },
    ]);

  setSaving(false);

  if (error) {
    console.error("Insert error:", error);
    setError(error.message);
  } else {
    setSuccess("Idea saved!");
    setTitle("");
    setProblem("");
    setDescription("");
    setPlatform("");
    setPricing("");
    setStatus("idea");
    setOwner("owner");
  }
}

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-6">
      <Image
  src="/images/roastery-logo.png"  // public/images/roastery-logo.png
  alt="The Roastery logo"
  width={240}
  height={240}
/>
      <h1 className="text-2xl font-semibold">Add a new idea</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">What problem are we solving?</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-white text-black"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-white text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Platform</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white text-black"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="web">Web App</option>
              <option value="iphone">iPhone</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white text-black"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="idea">Idea</option>
              <option value="researching">Researching</option>
              <option value="building">Building</option>
              <option value="on_hold">On hold/Canceled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pricing notes</label>
            <input
              className="w-full border rounded px-3 py-2 bg-white text-black"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Idea Owner</label>
            <select
              className="w-full border rounded px-3 py-2 bg-white"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
>
              <option value="Joop">Joop</option>
              <option value="Farrah">Farrah</option>
          </select>
          </div>
        </div>

<div className="flex gap-3">
  <button
    type="submit"
    className="px-4 py-2 rounded bg-sky-200 text-black font-semibold"
  >
    Save idea
  </button>

  <button
    type="button"
    onClick={() => router.push("/ideas")}
    className="px-4 py-2 rounded border border-neutral-600 text-sm"
  >
    Cancel
  </button>
</div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-grey-600 text-sm mt-2">{success}</p>}
      </form>
    </main>
  );
}