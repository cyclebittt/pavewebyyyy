"use client";

import React from "react";
import { ScrollingTeamCards } from "../ui/ScrollingTeamCards";

export function Teams({ direction }) {
    return (
        (<div
            className="font-proxima flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <ScrollingTeamCards items={teams} direction={direction} speed="slow" />
        </div>)
    );
}

const teams = [
    {
        image: "https://images.unsplash.com/photo-1663893364107-a6ecd06cf615?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alice",
        role: "Developer",
    },
    {
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1442&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Bob",
        role: "Designer",
    },
    {
        image: "https://images.unsplash.com/photo-1631016380968-a41fc77435e7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Charlie",
        role: "Project Manager",
    },
    {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "David",
        role: "Marketing Specialist",
    },
    {
        image: "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Emily",
        role: "Product Owner",
    },
    {
        image: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Frank",
        role: "UI/UX Designer",
    },
    {
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Grace",
        role: "Quality Assurance Engineer",
    },
];


