"use client";

import { useState } from "react";

import { profile, services } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  interface ContactPayload {
    firstname: string;
    lastname: string;
    email: string;
    service: string;
    message: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData(event.currentTarget);
    const payload: ContactPayload = {
      firstname: String(formData.get("firstname") || ""),
      lastname: String(formData.get("lastname") || ""),
      email: String(formData.get("email") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message");
      }

      setSubmitSuccess(true);
      (event.target as HTMLFormElement).reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Unexpected error while sending the message");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="section-wrap pt-14">
      <div className="container mx-auto grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="surface-card p-7 sm:p-10">
          <span className="chip">Contact</span>
          <h1 className="h1-fluid mt-4 text-primary">
            Share what you need built
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed muted-text">
            Include scope, constraints, and timeline. You will get a direct
            implementation plan with milestones.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="text" name="firstname" placeholder="First name" required />
              <Input type="text" name="lastname" placeholder="Last name" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="email"
                name="email"
                placeholder="Work email"
                required
              />

              <Select name="service" required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose discussion topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Discussion topic</SelectLabel>
                    {services.map((service) => (
                      <SelectItem key={service.title} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              name="message"
              className="min-h-[180px]"
              placeholder="What are you building, and what timeline matters most?"
              required
            />

            <div className="space-y-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>

              {submitSuccess ? (
                <p className="text-sm font-semibold text-teal">
                  Message sent successfully.
                </p>
              ) : null}

              {submitError ? (
                <p className="text-sm font-semibold text-red-400">
                  Error: {submitError}
                </p>
              ) : null}
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <section className="surface-card p-6">
            <h2 className="h3-fluid text-primary">Collaboration topics</h2>
            <ul className="mt-4 space-y-3 text-sm muted-text">
              {services.map((service) => (
                <li key={service.title}>
                  <p className="font-semibold text-primary">{service.title}</p>
                  <p className="muted-text">{service.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-card p-6">
            <h2 className="h3-fluid text-primary">Direct contact</h2>
            <p className="mt-4 text-sm muted-text">{profile.name}</p>
            <p className="text-sm muted-text">{profile.location}</p>
            <p className="mt-2 text-sm">
              <a href={`mailto:${profile.email}`} className="link-inline">
                {profile.email}
              </a>
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[0.08em]">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-inline">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-inline">
                GitHub
              </a>
              <a href={profile.upwork} target="_blank" rel="noopener noreferrer" className="link-inline">
                Upwork
              </a>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default ContactPage;
