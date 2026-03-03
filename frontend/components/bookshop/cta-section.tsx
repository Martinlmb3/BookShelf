import Link from "next/link"

export function CTASection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/50 px-6 py-16 text-center lg:px-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative">
            <h2 className="text-balance text-2xl font-bold text-foreground lg:text-3xl">
              Ready to organize your library?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join thousands of developers and bibliophiles who trust BookVault to manage their
              physical and digital collections. Free forever for individuals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create Account
              </Link>
              <Link
                href="/browse"
                className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Browse Guest Mode
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
