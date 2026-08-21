import { MessageCircle, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/common/app-layout.tsx";

function ChatPage() {
  return (
    <AppLayout
      title="Chats"
      subtitle="Stay connected and continue your conversations"
    >
      <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-soft text-primary">
            <MessageCircle className="h-10 w-10" />
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Under Development
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            Chats are coming soon
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            We&apos;re working on bringing real-time conversations to Nexora.
            Your chats will be available here very soon.
          </p>

          <div className="mx-auto mt-8 h-1.5 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ChatPage;