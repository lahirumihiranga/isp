import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 z-0">
      <div className="max-w-3xl mx-auto mt-18">
        <div className="space-y-2 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Have a question or want to work together? Fill out the form below
            and we'll get back to you soon.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
