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
        ""
      ) : (
        <button type="button" onClick={disable}>
    
        </button>
      )}
    </div>
  );
}
