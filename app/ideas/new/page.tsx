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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase.from("the_roastery_ideas").insert([
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
      return;
    }

    setSuccess("Idea saved!");
    router.push("/ideas");
  }

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
                Add a new idea
              </h1>
              <p className="max-w-2xl text-neutral-600">
                Capture the idea, describe the problem, and keep it moving.
              </p>
            </div>

            <div className="hidden md:block">
              <Image
                src="/images/roastery-logo.png"
                alt="The Roastery logo"
                width={140}
                height={140}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Title
              </label>
              <input
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                What problem are we solving?
              </label>
              <textarea
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Description
              </label>
              <textarea
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Platform
                </label>
                <select
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="web">Web App</option>
                  <option value="iphone">iPhone</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Status
                </label>
                <select
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Pricing notes
                </label>
                <input
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Idea Owner
                </label>
                <select
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-sky-400"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="joop">Joop</option>
                  <option value="farrah">Farrah</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-black transition hover:bg-sky-400 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save idea"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/ideas")}
                className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-neutral-600">{success}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}