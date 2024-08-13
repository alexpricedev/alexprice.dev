import cn from "classnames";

export const SwitchBar = () => (
  <button
    title="Go on, click me!"
    className={cn(
      "px-4 py-3 text-sm block w-full",
      "bg-neutral-50 border-t border-neutral-200",
      "hover:bg-neutral-200",
    )}
  >
    You're viewing my work profile. Switch to the personal view 👉
  </button>
);
