import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/BookShop - logo.svg"
                alt="BookShop Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-foreground">BookShop</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The modern standard for managing personal book collections. Built with Java Spring
              Boot and designed for the web.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="/collection"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  API Docs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Community
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {"© 2024 BookShop. All rights reserved."}
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-muted-foreground">Service Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
