import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Briefcase, Lightbulb, Calendar, Printer, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import RevealImage from "@/components/reveal-image"
import RevealText from "@/components/reveal-text"
import MagneticButton from "@/components/magnetic-button"
import FadeIn from "@/components/fade-in"
import StaggerContainer from "@/components/stagger-container"

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden noise-bg">
        <div className="absolute inset-0 z-0">
          <Image src="/sol/bg.jpg" alt="Services & Products" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="jp-title text-5xl md:text-6xl text-white mb-6">
              <RevealText text="Services & Products" />
            </h1>
            <p className="jp-subtitle text-xl text-white/80 mb-8">
              Comprehensive creative solutions tailored to elevate your brand and business.
            </p>
          </div>
        </div>

        {/* Japanese-inspired vertical text decoration */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
          <p className="vertical-text jp-subtitle text-[10rem] text-red-500 pointer-events-none">サービス</p>
        </div>
      </section>

      {/* Consultancy Section */}
      <section id="consultancy" className="py-24 dot-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="h-10 w-10 text-primary" />
                <SectionHeading title="Consultancy" className="mb-0" />
              </div>

              <FadeIn delay={200}>
                <p className="jp-subtitle text-muted-foreground">
                  Our strategic business consulting services help you identify opportunities, overcome challenges, and
                  achieve your business goals. We work closely with you to develop tailored strategies that drive growth
                  and success.
                </p>
              </FadeIn>

              <StaggerContainer baseDelay={300} staggerDelay={100} className="space-y-4">
                {[
                  "Strategic Planning and Development",
                  "Operations Planning and Improvement",
                  "Business Skills and Management Training",
                  "Market Research and Analysis",
                  "Financial Planning and Management",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="jp-subtitle">{item}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            <RevealImage
              src="/sol/9.jpg"
              alt="Consultancy Services"
              width={800}
              height={600}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section id="branding" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealImage
              src="/sol/branding.jpg"
              alt="Branding Services"
              width={800}
              height={600}
              className="order-2 md:order-1"
              delay={300}
            />

            <div className="space-y-8 order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <Lightbulb className="h-10 w-10 text-primary" />
                <SectionHeading title="Branding" className="mb-0" />
              </div>

              <FadeIn delay={200}>
                <p className="jp-subtitle text-muted-foreground">
                  Your brand is more than just a logo—it's the perception people have of your business. We help you
                  create a compelling brand identity that communicates your values, mission, and unique selling
                  proposition.
                </p>
              </FadeIn>

              <StaggerContainer baseDelay={300} staggerDelay={100} className="space-y-4">
                {[
                  "Brand Strategy and Positioning",
                  "Logo Design and Visual Identity",
                  "Brand Guidelines and Standards",
                  "Brand Messaging and Voice",
                  "Brand Experience Design",
                  "Brand Audit and Refresh",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="jp-subtitle">{item}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Events Planning Section */}
      <section id="events" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-10 w-10 text-primary" />
                <SectionHeading title="Events" className="mb-0" />
              </div>

              <FadeIn delay={200}>
                <p className="jp-subtitle text-muted-foreground">
                  From concept to execution, we provide comprehensive event planning and management services that create
                  memorable experiences for your audience. Our attention to detail ensures fl memorable experiences for
                  your audience. Our attention to detail ensures flawless execution every time.
                </p>
              </FadeIn>

              <StaggerContainer baseDelay={300} staggerDelay={100} className="space-y-4">
                {[
                  "Corporate Events and Conferences",
                  "Product Launches and Exhibitions",
                  "Weddings and Social Gatherings",
                  "Venue Selection and Management",
                  "Catering and Entertainment",
                  "Event Promotion and Marketing",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="jp-subtitle">{item}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            <RevealImage
              src="/sol/1.jpg"
              alt="Events Planning Services"
              width={800}
              height={600}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Printing Section */}
      <section id="printing" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealImage
              src="/sol/printing.jpeg"
              alt="Printing Services"
              width={800}
              height={600}
              className="order-2 md:order-1"
              delay={300}
            />

            <div className="space-y-8 order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <Printer className="h-10 w-10 text-primary" />
                <SectionHeading title="Printing" className="mb-0" />
              </div>

              <FadeIn delay={200}>
                <p className="jp-subtitle text-muted-foreground">
                  Our state-of-the-art printing services deliver high-quality materials that make a lasting impression.
                  From business cards to large format displays, we ensure exceptional quality and attention to detail.
                </p>
              </FadeIn>

              <StaggerContainer baseDelay={300} staggerDelay={100} className="space-y-4">
                {[
                  "Business Cards and Stationery",
                  "Brochures and Flyers",
                  "Posters and Banners",
                  "Promotional Materials",
                  "Custom Packaging",
                  "Large Format Printing",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="jp-subtitle">{item}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
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
                <Image
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
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary diagonal-pattern">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Process"
            subtitle="We follow a structured approach to ensure exceptional results for every project."
            center
          />

          <StaggerContainer baseDelay={200} staggerDelay={100} className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We begin by understanding your business, goals, and target audience.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "We develop a tailored strategy to address your specific needs and challenges.",
              },
              {
                step: "03",
                title: "Creation",
                description: "Our creative team brings your vision to life with innovative solutions.",
              },
              {
                step: "04",
                title: "Delivery",
                description: "We execute the project with precision and attention to detail.",
              },
            ].map((item, index) => (
              <div key={index} className="jp-card">
                <div className="text-5xl font-display font-bold text-primary/20 mb-6">{item.step}</div>
                <h3 className="jp-card-title text-xl mb-4">{item.title}</h3>
                <p className="jp-card-content text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="jp-title text-4xl md:text-5xl mb-8">Ready to Get Started?</h2>
          <p className="jp-subtitle max-w-2xl mx-auto mb-12  text-lg">
            Contact us today to discuss how we can help your business grow and succeed with our comprehensive services.
          </p>
          
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-foreground text-foreground hover:bg-white/10 px-8 py-6 text-lg"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
         
        </div>
      </section>
    </>
  )
}

