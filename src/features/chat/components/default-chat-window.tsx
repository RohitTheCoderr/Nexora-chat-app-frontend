import { MessageCircle } from "lucide-react";

function DefaultChatWindow() {
  return (
    <div className="hidden min-w-0 flex-1 flex-col items-center justify-center px-8 text-center md:flex">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary shadow-soft">
        <MessageCircle className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">
        Your conversations live here
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Select a conversation from the left to start messaging.
      </p>
    </div>
  );
}

export default DefaultChatWindow;
