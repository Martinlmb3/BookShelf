"use client"

import { useState } from "react"
import Link from "next/link"
import { User, AtSign, Lock, ShieldCheck, Rocket, Eye, EyeOff } from "lucide-react"

export function SignupForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Join the collection</h1>
        <p className="mt-2 text-muted-foreground">
          Create your account to start managing your library.
        </p>
      </div>

      {/* Code-editor styled card */}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card">
        {/* Editor Title Bar */}
        <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">SignUpController.java</span>
          </div>
        </div>

        {/* Editor Content / Form */}
        <div className="px-6 py-6">
          {/* Decorative Code Lines */}
          <div className="mb-6 font-mono text-xs leading-relaxed">
            <span className="text-primary/60">@RestController</span>
            <br />
            <span className="text-accent">public class</span>{" "}
            <span className="text-foreground">{"RegistrationProcess {"}</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 flex items-center gap-1 font-mono text-sm text-foreground">
                <span className="text-accent">String</span>
                <span className="font-bold">full_name;</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-1 font-mono text-sm text-foreground">
                <span className="text-accent">String</span>
                <span className="font-bold">email_address;</span>
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dev@bookshop.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 flex items-center gap-1 font-mono text-sm text-foreground">
                <span className="text-accent">{"char[]"}</span>
                <span className="font-bold">password;</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 flex items-center gap-1 font-mono text-sm text-foreground">
                <span className="text-accent">boolean</span>
                <span className="font-bold">match_confirmed;</span>
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Rocket className="h-4 w-4" />
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in here
              </Link>
            </p>
          </form>

          {/* Closing Brace */}
          <div className="mt-4 font-mono text-xs text-foreground">{"}"}</div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
          <span className="uppercase tracking-wider">SSL Secured</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="h-3 w-3" />
          <span className="uppercase tracking-wider">Spring Security</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono">{"{ }"}</span>
          <span className="uppercase tracking-wider">AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  )
}
