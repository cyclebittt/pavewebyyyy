'use client'

import { useState } from "react";

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-xl overflow-hidden">
            <button
                className={`bg-violet-200 flex justify-between items-center w-full p-5 md:py-5 md:px-8 text-left`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-medium">{title}</h3>
                <span className={`transform transition-transform duration-500 text-violet-600 font-bold text-2xl`}>
                    {isOpen ? "-" : "+"}
                </span>
            </button>
            <div
                className={`bg-violet-200 overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
            >
                <p className="px-5 md:px-8 pb-5 text-neutral-600">{content}</p>
            </div>
        </div>
    );
};

const AccordionExample = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Accordion
                title="What services does Pave offer?"
                content="At Pave, we help businesses grow by providing innovative IT solutions tailored to your specific needs. Whether you're looking to streamline operations, enhance security, or adopt cutting-edge technologies, our team works closely with you to identify and implement solutions that optimize efficiency and productivity. By leveraging advanced tools such as cloud computing, AI."
            />
            <Accordion
                title="How can Pave help my business grow?"
                content="At Pave, we help businesses grow by providing innovative IT solutions tailored to your specific needs. Whether you're looking to streamline operations, enhance security, or adopt cutting-edge technologies, our team works closely with you to identify and implement solutions that optimize efficiency and productivity. By leveraging advanced tools such as cloud computing, AI."
            />
            <Accordion
                title="What industries do you specialize in?"
                content="At Pave, we help businesses grow by providing innovative IT solutions tailored to your specific needs. Whether you're looking to streamline operations, enhance security, or adopt cutting-edge technologies, our team works closely with you to identify and implement solutions that optimize efficiency and productivity. By leveraging advanced tools such as cloud computing, AI."
            />
            <Accordion
                title="How can I contact Pave for a consultation?"
                content="At Pave, we help businesses grow by providing innovative IT solutions tailored to your specific needs. Whether you're looking to streamline operations, enhance security, or adopt cutting-edge technologies, our team works closely with you to identify and implement solutions that optimize efficiency and productivity. By leveraging advanced tools such as cloud computing, AI."
            />
            <Accordion
                title="What makes Pave different from other IT service providers?"
                content="At Pave, we help businesses grow by providing innovative IT solutions tailored to your specific needs. Whether you're looking to streamline operations, enhance security, or adopt cutting-edge technologies, our team works closely with you to identify and implement solutions that optimize efficiency and productivity. By leveraging advanced tools such as cloud computing, AI."
            />
        </div>
    );
};

export default AccordionExample;
