"use client";
import React from "react";
import { useVideo } from "@/context/video";
import { Button } from "@/components/ui/button";
import { storyOptions, styleOptions } from "@/constants";
import Image from "next/image";
import { Loader2Icon, Sparkles, Palette } from "lucide-react";
import LoadingModal from "@/components/modal/loading";
import RemotionPlayer from "@/components/video/remotion-player";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function CreateVideoPage() {
  const {
    selectedStory,
    selectedStyle,
    customPrompt,
    handleStorySelect,
    handleStyleSelect,
    handleCustomPromptChange,
    handleSubmit,
    loading,
    images,
    audio,
    captions,
  } = useVideo();

  const canGenerate =
    (!!selectedStory || !!customPrompt?.trim()) && !!selectedStyle;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Controls */}
      <div className="order-2 lg:order-1">
        <div className="p-8 lg:p-10 bg-gray-900 text-white font-[Inter]">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Create a Short Video
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Perfect for Instagram Reels, TikTok, YouTube Shorts, and quick
              visual learning.
            </p>
          </div>

          {/* Story / Prompt */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 opacity-80" />
              <h2 className="text-xl font-semibold tracking-tight">
                Story Blueprint
              </h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Pick a ready-made concept or write your own prompt.
            </p>

            <TooltipProvider delayDuration={150}>
              <div
                className="
                  grid gap-3 sm:gap-4
                  [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
                "
              >
                {storyOptions.map((story) => (
                  <div key={story.label}>
                    {story.type === "custom" ? (
                      <input
                        type="text"
                        value={customPrompt}
                        onChange={handleCustomPromptChange}
                        placeholder="Describe your idea…"
                        className={`w-full min-h-12 bg-gray-800/80 placeholder-gray-400 text-white border text-sm rounded-xl px-3 py-2
                          focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70
                          ${
                            selectedStory === "Custom Prompt"
                              ? "border-blue-500"
                              : "border-gray-700"
                          }`}
                      />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleStorySelect(story.label)}
                            variant="outline"
                            aria-pressed={selectedStory === story.label}
                            className={`
                              w-full h-auto min-h-12 px-3 py-2 rounded-xl text-sm text-left
                              whitespace-normal break-words leading-snug
                              border-2 transition-all
                              ${
                                selectedStory === story.label
                                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                  : "bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                              }
                            `}
                          >
                            {/* clamp to 2 lines so it never overflows */}
                            <span className="line-clamp-2">{story.label}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="max-w-xs text-xs leading-relaxed"
                        >
                          {story.label}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>

          {/* Style */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 opacity-80" />
              <h2 className="text-xl font-semibold tracking-tight">
                Visual Style
              </h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Choose the look &amp; feel for your short.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {styleOptions.map((style) => {
                const selected = selectedStyle === style.name;
                return (
                  <button
                    key={style.name}
                    onClick={() => handleStyleSelect(style.name)}
                    aria-label={`Select ${style.name} style`}
                    aria-selected={selected}
                    className={`relative group cursor-pointer rounded-2xl transition-all duration-200 aspect-square overflow-hidden outline-none
                      ring-offset-4 ring-offset-gray-900
                      ${
                        selected
                          ? "ring-4 ring-blue-500 scale-[1.01]"
                          : "hover:scale-[1.02] focus:ring-4 focus:ring-blue-400/60"
                      }
                    `}
                  >
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className={`object-cover transition-transform duration-200 ${
                        selected ? "scale-105" : "group-hover:scale-105"
                      }`}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority={false}
                    />
                    <div
                      className={`absolute inset-0 flex items-end p-3 transition
                      ${
                        selected
                          ? "bg-black/10"
                          : "bg-black/35 group-hover:bg-black/25"
                      }`}
                    >
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium
                        ${
                          selected
                            ? "bg-blue-600/90 text-white"
                            : "bg-gray-900/70 text-gray-100"
                        }`}
                      >
                        {style.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate */}
          <div className="space-y-2">
            <Button
              onClick={handleSubmit}
              disabled={!canGenerate || loading}
              className={`w-full h-12 rounded-xl text-base font-semibold tracking-tight transition
                ${
                  canGenerate && !loading
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-green-900/40 cursor-not-allowed"
                }`}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <Loader2Icon size={22} className="mr-3 animate-spin" />
                  Generating…
                </span>
              ) : (
                "Generate Short"
              )}
            </Button>
            <p className="text-[11px] text-gray-400">
              Tip: Strong prompts mention{" "}
              <span className="text-gray-200">topic</span>,{" "}
              <span className="text-gray-200">tone</span>, and{" "}
              <span className="text-gray-200">target platform</span>.
            </p>
          </div>

          <LoadingModal />
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex justify-center items-center min-h-[60vh] bg-black order-1 lg:order-2">
        {images && audio && captions ? (
          <div className="flex justify-center p-6 lg:p-10 w-full">
            <RemotionPlayer />
          </div>
        ) : (
          <div className="text-center px-8 py-12 font-[Inter]">
            <h3 className="text-xl font-semibold tracking-tight text-gray-200">
              No Preview Available
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-md mx-auto">
              Choose a{" "}
              <span className="text-gray-100 font-medium">Story Blueprint</span>{" "}
              and a{" "}
              <span className="text-gray-100 font-medium">Visual Style</span>,
              then click{" "}
              <span className="text-gray-100 font-medium">Generate Short</span>{" "}
              to see your video here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
