// Utility functions for program-related functionality

// Color mapping utility function for programs
export const getProgramColors = (slug: string) => {
  const programColors: Record<string, { color: string; textColor: string }> = {
    infants: { color: "bg-[#E68978]", textColor: "text-white" },
    toddlers: { color: "bg-[#EB9D73]", textColor: "text-white" },
    twos: { color: "bg-[#F4BC5C]", textColor: "text-white" },
    threes: { color: "bg-[#859989]", textColor: "text-white" },
    "fours-and-fives": { color: "bg-[#445f80]", textColor: "text-white" },
    sixes: { color: "bg-[#A085A0]", textColor: "text-white" },
  };

  return (
    programColors[slug] || {
      color: "bg-gray-500",
      textColor: "text-white",
    }
  );
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
