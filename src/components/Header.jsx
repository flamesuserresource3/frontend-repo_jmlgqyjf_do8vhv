import { Rocket, Sparkles } from "lucide-react";

export default function Header({ apiKey, onApiKeyChange }) {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              FlameSite AI <Sparkles size={16} className="text-amber-500" />
            </h1>
            <p className="text-xs text-slate-500 leading-tight">Generate a complete website from a single prompt</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-full sm:w-auto">
          <label className="block text-xs font-medium text-slate-600 mb-1">DeepSeek API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="ds_sk_..."
            className="w-full sm:w-[320px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <p className="mt-1 text-[11px] text-slate-500">Your key stays in your browser. Use a server for production calls.</p>
        </div>
      </div>
    </header>
  );
}
