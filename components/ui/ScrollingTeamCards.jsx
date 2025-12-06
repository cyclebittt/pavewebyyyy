"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export const ScrollingTeamCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Richtung setzen
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }

      // Geschwindigkeit setzen
      if (speed === "fast") {
        containerRef.current.style.setProperty(
          "--animation-duration",
          "20s"
        );
      } else if (speed === "normal") {
        containerRef.current.style.setProperty(
          "--animation-duration",
          "40s"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-duration",
          "80s"
        );
      }

      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "font-proxima scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[244px] md:w-[332px] max-w-full relative rounded-2xl flex-shrink-0 shadow-md"
            key={item.name}
          >
            <div className="bg-white p-4 rounded-2xl flex flex-col gap-5">
              <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.name || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{item.name}</h2>
                <p className="text-neutral-600 text-base md:text-xl">
                  {item.role}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
