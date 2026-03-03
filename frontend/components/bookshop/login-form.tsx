"use client"

import { useState } from "react"
import Link from "next/link"
import { AtSign, Lock, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [stayLoggedIn, setStayLoggedIn] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      {/* Form Card */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access your digital library</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {/* Username / Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Username / Email
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.reader"
                className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Link href="#" className="text-xs font-medium text-primary hover:underline">
                Reset password?
              </Link>
            </div>
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

          {/* Stay Logged In */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-secondary accent-primary"
            />
            <span className="text-sm text-muted-foreground">Stay logged in</span>
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Login to Account
          </button>

          {/* Divider */}
          <div className="my-1 h-px bg-border" />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            New bibliophile?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Create your shelf
            </Link>
          </p>
        </form>
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
