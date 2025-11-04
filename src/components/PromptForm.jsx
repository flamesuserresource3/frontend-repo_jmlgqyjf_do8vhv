import { useState } from "react";
import { Wand2, LayoutGrid, Palette } from "lucide-react";

export default function PromptForm({ onGenerate }) {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("modern");
  const [primary, setPrimary] = useState("indigo");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ name, style, primary, prompt });
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">Describe your website</label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A landing page for an AI startup offering chatbots and analytics. Include hero, features, pricing, and contact sections."
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <Wand2 size={18} className="absolute right-3 top-3 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Site name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome AI"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><Palette size={16}/> Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
              <option value="playful">Playful</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2"><LayoutGrid size={16}/> Primary color</label>
            <select
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="indigo">Indigo</option>
              <option value="sky">Sky</option>
              <option value="emerald">Emerald</option>
              <option value="violet">Violet</option>
              <option value="rose">Rose</option>
              <option value="amber">Amber</option>
            </select>
          </div>

          <div className="md:col-span-3 flex items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-500">Tip: be specific about sections you want, tone, and audience.</p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              <Wand2 size={16} /> Generate
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
