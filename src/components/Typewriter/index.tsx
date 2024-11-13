"use client";
import React, { useState, useEffect } from "react";
import "./style.css";

const DEFAULT_MS = 30;

export interface ITypewriterProps {
  text: string | string[];
  speed?: number;
  loop?: boolean;
  random?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onFinished?: () => void;
  onStart?: () => void;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  backgroundColor?: string;
  erase?: boolean; // New prop to enable/disable erasing
}

export default function Typewriter({
  text,
  speed = DEFAULT_MS,
  loop = false,
  random = DEFAULT_MS,
  delay = DEFAULT_MS,
  cursor = true,
  cursorChar = "▎",
  onFinished = () => {},
  onStart = () => {},
  textColor = "#2d3748", // Default text color (gray-800)
  fontSize = "1.5rem", // Default font size (text-2xl)
  fontFamily = "monospace", // Default font family (font-mono)
  backgroundColor = "#f7fafc", // Default background color (gray-100)
  erase = true, // Default to true to enable erasing
}: ITypewriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  if (!Array.isArray(text)) text = [text];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentTextIndex === 0 && !isErasing) onStart();
      if (!isErasing) {
        if (currentTextIndex < text[currentStringIndex].length) {
          setCurrentTextIndex(currentTextIndex + 1);
        } else {
          if (erase) {
            setIsErasing(true);
          } else {
            if (currentStringIndex < text.length - 1) {
              setTimeout(() => {
                setCurrentTextIndex(0);
                setCurrentStringIndex(currentStringIndex + 1);
              }, delay);
            } else {
              if (loop) {
                setTimeout(() => {
                  setCurrentTextIndex(0);
                  setCurrentStringIndex(0);
                }, delay);
              } else {
                onFinished();
              }
            }
          }
        }
      } else {
        if (currentTextIndex > 0) {
          setCurrentTextIndex(currentTextIndex - 1);
        } else {
          setIsErasing(false);
          if (currentStringIndex < text.length - 1) {
            setCurrentStringIndex(currentStringIndex + 1);
          } else {
            if (loop) {
              setCurrentStringIndex(0);
            } else {
              onFinished();
            }
          }
        }
      }
    }, speed + Math.random() * random);

    return () => clearTimeout(timeout);
  }, [
    currentTextIndex,
    currentStringIndex,
    text,
    speed,
    random,
    delay,
    loop,
    onFinished,
    onStart,
    isErasing,
    erase,
  ]);

  return (
    <div className="typewriter-container" style={{ backgroundColor }}>
      <span
        aria-live="polite"
        aria-atomic="true"
        className="typewriter-text"
        style={{ color: textColor, fontSize, fontFamily }}
      >
        {text[currentStringIndex].substring(0, currentTextIndex)}
        {cursor && <span className="typewriter-cursor">{cursorChar}</span>}
      </span>
    </div>
  );
}
