import { Search } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl3 border border-dashed border-slate-200 px-6 py-16 text-center dark:border-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
        <Search className="text-slate-400" size={20} aria-hidden="true" />
      </div>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}
