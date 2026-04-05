// Utility functions for program-related functionality

// Brand color palette from logo - 10 unique colors for programs (randomized order)
const brandColorPalette = [
  { color: "bg-[#e68979]", textColor: "text-white" }, // Coral
  { color: "bg-[#6a9b8a]", textColor: "text-white" }, // Sage Green
  { color: "bg-[#445f80]", textColor: "text-white" }, // Navy Blue
  { color: "bg-[#F79A6B]", textColor: "text-white" }, // Peach
  { color: "bg-[#edc35d]", textColor: "text-white" }, // Muted Teal
  { color: "bg-[#A684A3]", textColor: "text-white" }, // Purple
  { color: "bg-[#E3AC4A]", textColor: "text-white" }, // Gold
  { color: "bg-[#81AA8E]", textColor: "text-white" }, // Muted Green
  { color: "bg-[#eb9d73]", textColor: "text-white" }, // Orange
  { color: "bg-[#80739C]", textColor: "text-white" }, // Dark Purple
];

// Subtle versions for inactive states - slightly lighter versions
const subtleColorPalette = [
  { color: "bg-[#e99f91]", textColor: "text-white" }, // Lighter Coral
  { color: "bg-[#8EB5A5]", textColor: "text-white" }, // Lighter Sage
  { color: "bg-[#627A99]", textColor: "text-white" }, // Lighter Navy
  { color: "bg-[#FCBA97]", textColor: "text-white" }, // Lighter Peach
  { color: "bg-[#F0D687]", textColor: "text-white" }, // Lighter Teal
  { color: "bg-[#BFA4B9]", textColor: "text-white" }, // Lighter Purple
  { color: "bg-[#EEC67D]", textColor: "text-white" }, // Lighter Gold
  { color: "bg-[#9DBE9F]", textColor: "text-white" }, // Lighter Muted Green
  { color: "bg-[#f0b89c]", textColor: "text-white" }, // Lighter Orange
  { color: "bg-[#9E8CB0]", textColor: "text-white" }, // Lighter Dark Purple
];

// Color mapping utility function for programs - assigns unique colors by index
export const getProgramColors = (indexOrSlug: number | string) => {
  const index = typeof indexOrSlug === "number" ? indexOrSlug : 0;
  const colorIndex = index % brandColorPalette.length;
  return brandColorPalette[colorIndex];
};

// Get subtle colors for inactive states
export const getSubtleColors = (indexOrSlug: number | string) => {
  const index = typeof indexOrSlug === "number" ? indexOrSlug : 0;
  const colorIndex = index % subtleColorPalette.length;
  return subtleColorPalette[colorIndex];
};

// Icon mapping for learning areas
export const iconMap: Record<number, any> = {
  0: "BookOpen",
  1: "Target",
  2: "Star",
  3: "Users",
  4: "Heart",
  5: "Activity",
  6: "Music",
  7: "Palette",
  8: "Smile",
};

// Helper function to extract text from Sanity rich text blocks
export const extractTextFromRichText = (richText: any[]): string => {
  if (!richText || !Array.isArray(richText) || richText.length === 0) {
    return "";
  }

  return richText
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text || "").join("");
      }
      return "";
    })
    .join(" ");
};
