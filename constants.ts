export type StoryOption = {
  type: "preset" | "custom";
  label: string;
};

export type StyleOption = {
  name: string;
  image: string;
};

export const storyOptions: StoryOption[] = [
  { type: "preset", label: "👉 What is a Function in Python?" },
  { type: "preset", label: "👉 How Do Variables Work in JavaScript / TypeScript?" },
  { type: "preset", label: "👉 What Does 'Clean Code' Mean in Programming?" },
  { type: "preset", label: "👉 Why Do We Need Algorithms in Math?" },
  { type: "preset", label: "👉 What’s the Scientific Method?" },
  { type: "preset", label: "👉 Key Events that Shaped History" },
  { type: "preset", label: "👉 How to Learn Faster & Stay Productive" },
  { type: "preset", label: "👉 What Makes a Startup Succeed?" },
  { type: "preset", label: "👉 What is Machine Learning & Why It Matters" },
  { type: "preset", label: "👉 What is Design Thinking in Creativity?" },
  { type: "custom", label: "✍️ Write Your Own Prompt" },
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
