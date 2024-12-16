import React, { useEffect } from "react";

const CalendlyEmbed = ({ url }) => {
    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute(
            "src",
            "https://assets.calendly.com/assets/external/widget.js"
        );
        head.appendChild(script);
    }, []);

    return (
        <div
            className="calendly-inline-widget w-full"
            data-url={url}
            data-resize={true}
        // style={{ minWidth: '800px', height: '900px' }}
        ></div>
    );
};

export default CalendlyEmbed;