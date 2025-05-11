"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsFour() {
  const faqItems = [
    {
      id: "item-1",
      question: "How secure are the links I create?",
      answer:
        "Our links use military-grade AES-256 encryption and are transmitted over secure HTTPS connections. The encryption keys are generated client-side and never stored on our servers, ensuring end-to-end security for your shared content.",
    },
    {
      id: "item-2",
      question: "How do I set an expiration time for my links?",
      answer:
        "When generating a secure link, you can select an expiration time ranging from 1 hour to 90 days. Once the link expires, the content becomes permanently inaccessible, even to users who previously had access to it.",
    },
    {
      id: "item-3",
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.",
    },
    {
      id: "item-4",
      question: "Can I password-protect my shared links?",
      answer:
        "Yes, you can add password protection to any secure link you create. Recipients will need to enter the password before they can access the content, adding an additional layer of security to your shared files.",
    },
    {
      id: "item-5",
      question: "What file types can I share securely?",
      answer:
        "Our platform supports all file types with a maximum size of 10GB per file on premium plans. This includes documents, images, videos, audio files, archives, and more. Free accounts can share files up to 1GB in size.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Can't find what you're looking for? Contact our{" "}
            <Link href="#" className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
