"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Users, Award, Clock, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import PerformantMarquee from "@/components/performant-marquee"
import { delay, motion } from "framer-motion"
import RevealImage from "@/components/reveal-image"
import RevealText from "@/components/reveal-text"
import AnimatedImage from "@/components/animated-image"
import SplitText from "@/components/split-text"
import LogoCarousel from "@/components/logo-carousel"
import LogoMarquee from "@/components/logo-marquee"
import SectionHeading from "@/components/section-heading"
import StaggerContainer from "@/components/stagger-container"
import Image from "next/image"

// Animation variants
const fadeIn = {
  delay:900,
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  // Refs for scroll animations
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [activeSection, setActiveSection] = useState(0)

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.classList.add("smooth-scroll")

    return () => {
      document.documentElement.classList.remove("smooth-scroll")
    }
  }, [])

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const scrollElements = document.querySelectorAll(".scroll-reveal")
    scrollElements.forEach((el) => observer.observe(el))

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Testimonials data
  const testimonials = [
    {
      quote:
        "SolFit transformed our brand identity and helped us stand out in a crowded market. Their attention to detail is unmatched.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechCorp",
      rating: 5,
    },
    {
      quote:
        "The team at SolFit delivered an exceptional event that exceeded all our expectations. Professional, creative, and highly recommended!",
      author: "Michael Chen",
      position: "CEO, Innovate Solutions",
      rating: 5,
    },
    {
      quote:
        "Working with SolFit has been a game-changer for our business. Their strategic approach to branding has helped us grow by 40% this year.",
      author: "David Oyelowo",
      position: "Founder, Nexus Enterprises",
      rating: 5,
    },
  ]

  // Replace the logos array with this:
  const partnerLogos = [
    {
      alt: "Logo 1",
      src: "/logos/local.png" // Replace with the actual image path
    },
    {
      alt: "Logo 2",
      src: "/logos/logo1.jpg" // Replace with the actual image path
    },
    {
      alt: "Logo 3",
      src: "/logos/logo2.jpg" // Replace with the actual image path
    },
    {
      alt: "Logo 4",
      src: "/logos/logo4.jpg" // Replace with the actual image path
    },
    {
      alt: "Logo 5",
      src: "/logos/muk.jpg" // Replace with the actual image path
    },
    {
      alt: "Logo 6",
      src: "/logos/ucc.png" // Replace with the actual image path
    }
  ,
    {
      alt: "Logo 6",
      src: "/logos/usaid.jpg" // Replace with the actual image path
    }
  ]

  return (
    <>
      {/* Creative Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <div className="home-hero-shape"></div>
          <div className="home-hero-shape"></div>
          <div className="home-hero-shape"></div>

          <div className="home-hero-image">
           
                <img
              src="/sol/11.jpg"
              alt="Consultancy Services"
          
             
            />
          </div>
        </div>

        <motion.div className="home-hero-content" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1
            className="font-display text-[15vw] leading-[0.9] mb-6 font-black tracking-tight"
            
                  >
             <RevealText className="text-orange-600 dark:text-gray-50 -z-1000 mix-blend-difference" text="SOLFIT" delay={800}/>
          </motion.h1>
          <RevealText className="text-xl max-w-xl font-light" delay={900} text="We are an award-winning creative agency specializing in branding, events planning, and printing solutions that
            elevate your business to new heights"  />
            
          <motion.div className="home-hero-buttons" variants={fadeIn}>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 text-lg"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-orange-600 text-primary text-orange-600 hover:text-orange-700 hover:bg-primary/50 rounded-none px-8 py-6 text-lg"
            >
              <Link href="/services">Our Services</Link>
          
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="scroll-indicator-text text-xs">SCROLL</span>
          <div className="scroll-indicator-line"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about-section" className="creative-section bg-secondary">
        <div className="container mx-auto px-4">
          <div className="creative-section-grid">
            <div className="creative-section-title scroll-reveal">
              <RevealText delay={300} className="font-display  text-4xl md:text-5xl  mb-4 font-bold" text="We Create Experiences" />
              <div className="h-1 w-24 bg-red-600/60"></div>
            </div>

            <div className="creative-section-content scroll-reveal">
              <p className="text-xl mb-8">
                Our team of creative professionals is dedicated to transforming your vision into reality with innovative
                solutions and meticulous attention to detail.
              </p>
              <p  className=" text-xl tracking-tight font-jp">
                For over a decade, SolFit Solutions has been at the forefront of design innovation, creating memorable
                brand experiences and executing flawless events that leave lasting impressions.
              </p>
              <Button asChild className="rounded-none border border-primary bg-primary mt-8 text-primary-foreground hover:bg-primary/90">
                <Link href="/services">
                  Discover Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="creative-section-image scroll-reveal">
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-red-400 mix-blend-multiply"></div>
                <AnimatedImage
                delay={500}
              src="/sol/Alice/4.jpg"
              alt="Consultancy Services"
            priority={true}
            width={1200}
            height={700}
             
            />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - NEW */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
        <div className="creative-section-title scroll-reveal">
            
            <RevealText className="font-display text-4xl md:text-5xl mb-4 font-bold"  text="OUR PARTNERS" delay={100}/>
            <div className="h-1 w-24 bg-orange-500"></div>
          </div>
        
     <LogoMarquee logos={partnerLogos}/>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="creative-section">
        
        <div className="container mx-auto px-4">
          <div className="creative-section-title text-center scroll-reveal">
            <h2 className="font-display text-4xl md:text-5xl mb-4 font-bold">Our Expertise</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We offer comprehensive creative solutions tailored to your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                title: "Consultancy",
                description:
                  "Strategic business consulting to help you identify opportunities and overcome challenges.",
                href: "/services#consultancy",
                delay: 0,
                icon: <Users className="h-8 w-8 mb-4 text-primary" />,
              },
              {
                title: "Branding",
                description: "Comprehensive branding solutions that communicate your unique value proposition.",
                href: "/services#branding",
                delay: 100,
                icon: <Award className="h-8 w-8 mb-4 text-primary" />,
              },
              {
                title: "Events",
                description: "End-to-end event planning and management services for memorable experiences.",
                href: "/services#events",
                delay: 200,
                icon: <Clock className="h-8 w-8 mb-4 text-primary" />,
              },
              {
                title: "Printing",
                description: "High-quality printing services for all your marketing and promotional materials.",
                href: "/services#printing",
                delay: 300,
                icon: <Zap className="h-8 w-8 mb-4 text-primary" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="card p-6 border border-border bg-card hover:border-primary transition-all duration-500 scroll-reveal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                {service.icon}
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href={service.href} className="inline-flex items-center text-primary font-medium hover:underline">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="overflow-hidden">
        <PerformantMarquee
          text="DESIGN • BRANDING • EVENTS • PRINTING • CONSULTANCY • CREATIVITY • INNOVATION • EXCELLENCE •"
          className="py-12 bg-primary text-primary-foreground"
        />
      </div>

      {/* Process Section - NEW */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4 font-bold">Our Process</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a structured approach to ensure exceptional results for every project.
            </p>
          </div>

          <div className="relative">
            {/* Process line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-24 relative">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "We begin by understanding your business, goals, and target audience to create a solid foundation for your project.",
                  align: "right",
                },
                {
                  step: "02",
                  title: "Strategy",
                  description:
                    "Our team develops a tailored strategy that addresses your specific needs and challenges, setting clear objectives.",
                  align: "left",
                },
                {
                  step: "03",
                  title: "Creation",
                  description:
                    "Our creative professionals bring your vision to life with innovative solutions and meticulous attention to detail.",
                  align: "right",
                },
                {
                  step: "04",
                  title: "Delivery",
                  description:
                    "We execute the project with precision, ensuring every element meets our high standards of quality and excellence.",
                  align: "left",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col ${item.align === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-full md:w-1/2 relative">
                    {/* Process dot */}
                    <div className="absolute left-1/2 top-0 w-8 h-8 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block z-10"></div>

                    <div
                      className={`p-8 bg-card border border-border ${item.align === "left" ? "md:pr-16" : "md:pl-16"}`}
                    >
                      <div className="text-5xl font-display font-bold text-primary/20 mb-4">{item.step}</div>
                      <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="creative-section">
      <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Products"
            subtitle="Explore our range of high-quality products designed to elevate your brand and marketing efforts."
            center
          />

          <StaggerContainer baseDelay={200} staggerDelay={100} className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Business Cards",
                description: "Premium business cards that make a lasting first impression.",
                image: "/sol/bizcard.jpg",
              },
              {
                title: "Brochures & Flyers",
                description: "Eye-catching promotional materials that effectively communicate your message.",
                image: "/sol/broc.jpg",
              },
              {
                title: "Posters & Banners",
                description: "Large format displays that grab attention and increase visibility.",
                image: "/sol/bill.png",
              },
              {
                title: "Stationery",
                description: "Professional letterheads, envelopes, and notepads that reinforce your brand identity.",
                image: "/sol/stat.jpg",
              },
              {
                title: "Promotional Items",
                description: "Branded merchandise that increases brand awareness and customer loyalty.",
                image: "/sol/prom.jpg",
              },
              {
                title: "Custom Packaging",
                description: "Distinctive packaging solutions that enhance the unboxing experience.",
                image: "/sol/pack.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="jp-card overflow-hidden hover:border-primary transition-colors duration-300">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="jp-card-title text-xl mb-2">{item.title}</h3>
                  <p className="jp-card-content text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
          <div className="flex py-8 justify-center">
  <Button  className="border text-foreground border-gray-400 p-4">
  <Link href="/services">Explore products and services</Link>
    
  </Button>
</div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4 font-bold">Client Testimonials</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 border border-border relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl font-serif text-primary/20 absolute top-4 left-4">"</div>
                <p className="text-lg mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="creative-section bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="font-display text-5xl md:text-7xl mb-8 font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready?
          </motion.h2>
          <motion.p
            className="text-accent-foreground/80 max-w-2xl mx-auto mb-12 text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's collaborate to create exceptional experiences that elevate your business and captivate your audience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 px-8 py-6 text-lg"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

