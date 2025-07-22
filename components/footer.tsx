import React from "react";
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="OngukaMatt Foods Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-bold">OngukaMatt</span>
            </div>
            <p className="text-sm text-muted-foreground">Authentic African cuisine delivered to your doorstep.</p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-foreground">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Customer Service</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-foreground">
                  Chat with Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Working Hours</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-muted-foreground">Monday - Friday: 9am - 10pm</li>
              <li className="text-muted-foreground">Saturday: 10am - 10pm</li>
              <li className="text-muted-foreground">Sunday: 10am - 8pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RADING TECHNOLOGIES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
