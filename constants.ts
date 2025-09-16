export type StoryOption = {
  type: "preset" | "custom";
  label: string;
};

export type StyleOption = {
  name: string;
  image: string;
};

export const storyOptions: StoryOption[] = [
  { type: "preset", label: "JavaScript / TypeScript" },
  { type: "preset", label: "Python" },
  { type: "preset", label: "Programming Concepts" },
  { type: "preset", label: "Math" },
  { type: "preset", label: "Science" },
  { type: "preset", label: "History" },
  { type: "preset", label: "Productivity & Learning" },
  { type: "preset", label: "Business & Startups" },
  { type: "preset", label: "AI & Machine Learning" },
  { type: "preset", label: "Design & Creativity" },
  { type: "custom", label: "Custom Prompt" },
];

export const styleOptions: StyleOption[] = [
  { name: "Artistic", image: "/images/artistic.jpg" },
  { name: "Realistic", image: "/images/realistic.jpg" },
  { name: "Fantasy", image: "/images/fantasy.png" },
  { name: "Dark", image: "/images/dark.jpg" },
  { name: "Water Color", image: "/images/watercolor.jpg" },
  { name: "GTA", image: "/images/gta.jpg" },
  { name: "Comic", image: "/images/comic.jpg" },
  { name: "Paint", image: "/images/paint.jpg" },
];
