import { Link, Lock, Sparkle, Zap } from "lucide-react";
import { NexoraLogo } from "./logo-setup.tsx";
import illustration from "../../assets/auth-illustration.jpg";
import { ThemeToggle } from "./theme-toggle.tsx";

const highlights = [
  {
    icon: Zap,
    title: "Real-time by default",
    copy: "Messages, presence and typing land instantly.",
  },
  {
    icon: Lock,
    title: "Private conversations",
    copy: "End-to-end care for every thread you start.",
  },
  {
    icon: Sparkle,
    title: "Calm by design",
    copy: "A quiet interface built for long conversations.",
  },
];

export function AuthLayout({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-canvas-glow p-10 lg:flex lg:flex-col lg:justify-between">
        <Link to="/login" className="relative z-10">
          <NexoraLogo size="lg" />
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl leading-[1.1] font-bold">
            Conversations that stay connected.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Nexora keeps the people you talk to most within one calm, fast
            workspace — with presence, receipts and a thread history that never
            feels noisy.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((h) => (
              <li key={h.title} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface text-primary shadow-soft">
                  <h.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <img
          src={illustration}
          alt="Abstract illustration of connected conversations"
          width={1024}
          height={1280}
          loading="lazy"
          className="pointer-events-none absolute -right-20 -bottom-24 w-[30rem] max-w-none rounded-3xl opacity-90 select-none"
        />
        <p className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nexora. Built for better conversations.
        </p>
      </aside>

      <main className="relative flex min-h-screen flex-col justify-center px-5 py-10 sm:px-10">
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <NexoraLogo showTagline />
          </div>
          <div className={compact ? "" : ""}>{children}</div>
        </div>
      </main>
    </div>
  );
}
