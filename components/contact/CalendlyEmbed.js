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
            className="calendly-inline-widget h-[720px] w-full md:w-[600px]"
            data-url={url}
            // style={{ minWidth: '800px', height: '900px' }}
        ></div>
    );
};

export default CalendlyEmbed;