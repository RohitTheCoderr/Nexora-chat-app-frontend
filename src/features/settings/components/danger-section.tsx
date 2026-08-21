import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function DangerSection() {
  return (
    <section className="rounded-3xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6">
      <h2 className="text-base font-semibold text-destructive">Danger zone</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Deleting your account removes every conversation, file and connection permanently.
      </p>
      <Button variant="outline" className="mt-4 rounded-xl border-destructive/40 text-destructive">
        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete account
      </Button>
    </section>
  );
}
