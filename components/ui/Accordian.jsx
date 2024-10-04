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
                <span className={`transform transition-transform duration-700 text-violet-600 font-bold text-2xl w-4 text-right`}>
                    {isOpen ? "-" : "+"}
                </span>
            </button>
            <div
                className={`bg-violet-200 overflow-hidden transition-max-height duration-700 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
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
                content="Pave provides a range of services designed to boost your business's efficiency and visibility, including internal collaboration solutions like Slack and SharePoint implementation, as well as branding and identity development. With expertise in UX/UI design, web development, and content creation, Pave ensures your business not only operates smoothly but also stands out in the digital marketplace, helping you engage more effectively with your audience and drive growth."
            />
            <Accordion
                title="How can Pave help my business grow?"
                content="Over 70% of consumers research a business online before making a purchase decision. For your business, this means that having a strong online presence is no longer optional—it's essential for growth. In today’s fast-paced digital world, leveraging digital tools allows you to reach a wider audience, improve efficiency, and stay competitive. Without embracing these solutions, you risk falling behind competitors who are already capitalizing on technology to attract and retain customers. By adopting digital strategies, you not only open the door to new growth opportunities but also ensure your business remains relevant in an increasingly connected market."
            />
            <Accordion
                title="What industries do you specialize in?"
                content="In an era where technology drives nearly every aspect of life, Pave helps your business stay ahead by specializing in industries that are shaping the future, including technology, e-commerce, healthcare, education, and hospitality. By focusing on these forward-thinking sectors, Pave enables you to leverage cutting-edge digital solutions, powerful branding, and innovative design strategies that keep you competitive and push your business to the forefront of your industry. Our expertise in these dynamic industries ensures that we provide tailored services that meet the unique challenges and unlock growth opportunities specific to your market."
            />
            <Accordion
                title="How can I contact Pave for a consultation?"
                content="You can easily contact Pave for a consultation by scheduling a meeting through our website by clicking one of the CTAs, sending us a message directly above the FAQ section, or emailing us at info@paveconsultings.com."
            />
            <Accordion
                title="What makes Pave different from other IT service providers?"
                content="With a retention rate of 96% and years of experience in our specialized fields, Pave ensures that your business not only operates efficiently but also achieves sustainable growth. Our tailored solutions help you build strong customer relationships and create memorable experiences that keep your audience coming back. By combining cutting-edge technology, branding, and UX/UI design, we make sure your business not only stands out in the market but also gains long-term relevance and customer loyalty."
            />
        </div>
    );
};

export default AccordionExample;
