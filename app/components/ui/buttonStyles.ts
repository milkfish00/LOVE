// Utility to produce consistent button class names across the app
// Variants: primary (brand), secondary (light), outline, link
// Sizes: sm, md, lg

type ButtonVariant = "primary" | "secondary" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "full" | "lg";

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  radius: ButtonRadius = "full"
): string {
  const base = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "transition-colors",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-yellow-500",
    "focus-visible:ring-offset-2",
    "ring-offset-white",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
  ];

  const byVariant: Record<ButtonVariant, string[]> = {
    primary: ["bg-[#FFD58B]", "text-gray-900", "hover:bg-[#f9d597]"],
    secondary: ["bg-white", "text-gray-900", "hover:bg-gray-100"],
    outline: [
      "border",
      "border-gray-300",
      "text-gray-700",
      "hover:text-gray-900",
      "hover:border-gray-400",
      "bg-transparent",
    ],
    link: [
      "text-gray-900",
      "underline",
      "underline-offset-4",
      "hover:text-yellow-700",
      "p-0",
      "h-auto",
    ],
  };

  const bySize: Record<ButtonSize, string[]> = {
    sm: ["px-4", "py-2", "text-sm"],
    md: ["px-6", "py-3", "text-base"],
    lg: ["px-8", "py-4", "text-lg"],
  };

  const byRadius: Record<ButtonRadius, string[]> = {
    full: ["rounded-full"],
    lg: ["rounded-lg"],
  };

  return [
    ...base,
    ...byVariant[variant],
    ...bySize[size],
    ...byRadius[radius],
  ].join(" ");
}


