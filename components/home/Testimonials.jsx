"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/InfiniteMovingCards";

export function Testimonials({ direction }) {
    return (
        (<div
            className="font-proxima flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards items={testimonials} direction={direction} speed="slow" />
        </div>)
    );
}

const testimonials = [
    {
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "John Doe",
        twitterUsername: "@JohnDoeDev",
        twitterLink: "https://twitter.com/JohnDoeDev",
        quote:
            "The development process was seamless, and the UI/UX design exceeded my expectations. The attention to detail and user-friendly interface truly stood out!"
    },
    {
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Emily Smith",
        twitterUsername: "@EmilyUXExpert",
        twitterLink: "https://twitter.com/EmilyUXExpert",
        quote:
            "Working with the team was an amazing experience. The final product was not only visually stunning but also highly functional, with intuitive navigation throughout."
    },
    {
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Michael Lee",
        twitterUsername: "@MikeTechGuru",
        twitterLink: "https://twitter.com/MikeTechGuru",
        quote:
            "The combination of development expertise and beautiful design created an exceptional user experience. Every aspect of the project was handled with great care."
    },
    {
        image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Sarah Williams",
        twitterUsername: "@SarahUIUX",
        twitterLink: "https://twitter.com/SarahUIUX",
        quote:
            "From the smooth functionality to the clean and modern design, the final result was beyond impressive. The team's ability to deliver on both fronts was outstanding!"
    },
    {
        image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "David Johnson",
        twitterUsername: "@DavidCreativeDev",
        twitterLink: "https://twitter.com/DavidCreativeDev",
        quote:
            "I was amazed by the seamless development process and the sleek, intuitive design. The end product was flawless and delivered an exceptional user experience."
    }
];


