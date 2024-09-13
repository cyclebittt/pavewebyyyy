"use client";

import { cn } from "@/lib/utils";
import { Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        (<div
            ref={containerRef}
            className={cn(
                "font-proxima scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
                className
            )}>
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}>
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 shadow-md p-5 md:w-[420px]"
                        style={{
                            background:
                                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                        }}
                        key={item.name}>

                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 aspect-square rounded-full overflow-hidden">
                                        <img src={item.image} alt="" className="w-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-neutral-600 text-sm">{item.twitterUsername}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-6 aspect-square text-neutral-400">
                                    <Twitter />
                                </div>
                            </div>
                            <p className="text-neutral-600">{item.quote}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>)
    );
};
