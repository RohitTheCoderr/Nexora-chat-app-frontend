import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 0.5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster
          position="top-right"
          theme="light"
          richColors
          toastOptions={{
            classNames: {
              toast: "rounded-xl border text-sm shadow-lg bg-white",
              title: "font-medium",
              description: "text-xs",

              success:
                "bg-[var(--toast-success-bg)] text-[var(--toast-success-text)] border-[var(--toast-success-border)]/30",

              error:
                "bg-[var(--toast-error-bg)] text-[var(--toast-error-text)] border-[var(--toast-error-border)]/30",

              info: "bg-[var(--toast-info-bg)] text-[var(--toast-info-text)] border-[var(--toast-info-border)]/30",

              warning:
                "bg-[var(--toast-warning-bg)] text-[var(--toast-warning-text)] border-[var(--toast-warning-border)]/30",
            },
          }}
        />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
