"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const [titles, setTitles] = React.useState([
    "VIDEOS",
    "YOUTUBE SHORTS",
    "TIKTOK VIDEOS",
    "INSTAGRAM REELS",
    "SHORT VIDEOS",
  ]);

  const [currentTitleIndex, setCurrentTitleIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2000); // smooth reading speed

    return () => clearInterval(intervalId);
  }, [titles]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[Inter]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image + Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/uhd-laser.jpg"
            alt="AI Video Creation"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="animate-pulse block text-white drop-shadow-lg">
              {titles[currentTitleIndex]}
            </span>
            <small className="text-white drop-shadow-md">
              KNOWLEDGE VIDEO GENERATOR
            </small>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl mx-auto italic">
            Learn by creating. Share your knowledge with the world.
          </p>

          {/* Subhead */}
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
            Turn coding concepts into short, engaging videos for TikTok, YouTube Shorts, and Instagram Reels.
            Download, share, and teach while you learn.
          </p>

          {/* CTA */}
          <Link href="/dashboard/create-video">
            <Button
              type="submit"
              className="w-1/2 bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg transition duration-200"
            >
              Start Creating
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
