import { useState, useCallback } from "react";

interface ToastProps {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

type ToastOptions = Omit<ToastProps, "id">;

let count = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback(
    ({ ...props }: ToastOptions) => {
      const id = String(count++);
      const newToast = { id, ...props };

      setToasts((toasts) => [...toasts, newToast]);

      return {
        id,
        dismiss: () => {
          setToasts((toasts) => toasts.filter((t) => t.id !== id));
        },
      };
    },
    [setToasts]
  );

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      setToasts((toasts) => toasts.filter((t) => t.id !== toastId));
    } else {
      setToasts([]);
    }
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}

export const toast = {
  success: (description: string, options?: Omit<ToastOptions, "description">) => {
    console.log("Success:", description);
    // This is a placeholder. In a real app, you would use a toast library.
    return { id: String(count++) };
  },
  error: (description: string, options?: Omit<ToastOptions, "description">) => {
    console.error("Error:", description);
    // This is a placeholder. In a real app, you would use a toast library.
    return { id: String(count++) };
  },
};
