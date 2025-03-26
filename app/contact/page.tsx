"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import RevealText from "@/components/reveal-text"

import FadeIn from "@/components/fade-in"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden noise-bg">
        <div className="absolute inset-0 z-0">
          <Image src="/sol/bg.jpg" alt="Contact Us" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              <RevealText text="Contact Us" delay={1000}/>
            </h1>
            <p className="text-xl text-white/80 mb-8">Let's discuss how we can help elevate your brand and business.</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 dot-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                title="Get In Touch"
                subtitle="Fill out the form below and we'll get back to you as soon as possible."
              />

              <FadeIn delay={1050}>
                <form onSubmit={handleSubmit} className="space-y-8 mt-12">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+256 772 344 419"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-border focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        Service Interested In
                      </label>
                      <Select value={formData.service} onValueChange={handleSelectChange}>
                        <SelectTrigger className="border-border focus:border-primary">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-400 dark:bg-gray-800">
                          <SelectItem value="consultancy">Consultancy</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="events">Events Planning</SelectItem>
                          <SelectItem value="printing">Printing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>

              
                    <Button
                      type="submit"
                      className="px-8 py-6 border border-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                 

                  {isSubmitted && (
                    <div className="p-6 bg-primary/10 text-primary border border-primary/20">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </FadeIn>
            </div>

            <div className="space-y-12">
              <div>
                <SectionHeading title="Contact Information" subtitle="Here's how you can reach us directly." />

                <FadeIn delay={300} className="space-y-8 mt-12">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mr-6">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Phone</h3>
                      <p className="text-muted-foreground">+256 772 344 419</p>
                      <p className="text-muted-foreground">+256 754 577 401</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mr-6">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Email</h3>
                      <p className="text-muted-foreground">solfitsolutions2019@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mr-6">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Office Location</h3>
                      <p className="text-muted-foreground">Plot 1
</p>
                      <p className="text-muted-foreground">
Span House (Behind Worker's House)
</p>
                      <p className="text-muted-foreground">

Room No. 106</p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <div className="h-80 bg-secondary border border-border overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7585018998616!2d32.58054777615596!3d0.31374669968318547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc7e2b8153a7%3A0xeeafa7741ab6383c!2sSpan%20House!5e0!3m2!1sen!2sug!4v1742989382639!5m2!1sen!2sug" 
    width="700" 
    height="450" 
    style={{ border: 0 }} // Changed to an object
    allowFullScreen // Corrected attribute
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade" // Corrected attribute
  ></iframe>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

