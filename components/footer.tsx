import Link from "next/link"
import { Mail, Phone, Twitter, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16 relative">
      <div className="noise-animation"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl font-display font-bold">
              <span className="glitch-text" data-text="SOLFIT">
                SOLFIT
              </span>
            </h3>
            <p className="text-muted-foreground max-w-md">
              Business consultants, Brand & Events Managers as well as the originators of your branding and printing
              solutions.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:solfitsolutions2019@gmail.com" className="hover:text-foreground transition-colors">
                  solfitsolutions2019@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+256772344419" className="hover:text-foreground transition-colors">
                  +256 772 344 419
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+256754577401" className="hover:text-foreground transition-colors">
                  +256 754 577 401
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold">Follow</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SolFit Solutions Limited. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                DESIGN • BRANDING • EVENTS • PRINTING
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

