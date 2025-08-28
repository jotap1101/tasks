"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    let toastId: string | number | undefined;

    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          toastId = toast.loading("Saindo...");
        },
        onError: (ctx) => {
          if (toastId) {
            toast.dismiss(toastId);
          }

          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          if (toastId) {
            toast.dismiss(toastId);
          }

          toast.success("Você saiu com sucesso!");
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex w-full justify-start"
    >
      {children}
    </Button>
  );
}
