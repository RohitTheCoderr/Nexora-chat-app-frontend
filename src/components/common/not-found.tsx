import { cn } from "@/lib/utils.ts";
import { ArrowLeft, Home, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { NexoraMark } from "./logo-setup.tsx";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.tsx";

export function NotFound({ title = "Page not found" }: { title?: string }) {
  useEffect(() => {
    const stored = window.localStorage.getItem("nexora-theme");
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-canvas-glow opacity-60" />

      {/* Floating decorative orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* Logo mark */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-raised">
            <MessageSquare
              className="h-7 w-7 text-primary-foreground"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* 404 typography */}
        <div className="relative mb-6">
          <h1
            className={cn(
              "font-display text-[8rem] font-extrabold leading-none tracking-tighter text-transparent",
              "bg-brand-gradient bg-clip-text",
              "sm:text-[10rem]",
            )}
          >
            404
          </h1>
          <div className="absolute inset-0 -z-10 select-none font-display text-[8rem] font-extrabold leading-none tracking-tighter text-foreground/[0.03] sm:text-[10rem]">
            404
          </div>
        </div>

        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          We couldn't find the page you're looking for. It might have been
          moved, deleted, or the link is broken.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-xl bg-brand-gradient px-6 text-sm font-semibold shadow-raised transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-xl px-6 text-sm font-semibold"
          >
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Link>
          </Button>
        </div>

        {/* Footer hint */}
        <div className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
          <NexoraMark className="h-5 w-5 rounded-lg" />
          <span>Nexora — Conversations that stay connected</span>
        </div>
      </div>
    </div>
  );
}
