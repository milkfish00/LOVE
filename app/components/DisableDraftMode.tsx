"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Only show the disable draft mode button when outside of Presentation Tool
  const isInsidePresentationTool =
    typeof window !== "undefined" && window.top !== window.self;
  if (isInsidePresentationTool) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable} className="fixed z-100 bottom-4 right-4 bg-[#ff0000] text-white px-4 py-2 rounded shadow  transition">
          Disable draft mode
        </button>
      )}
    </div>
  );
}
