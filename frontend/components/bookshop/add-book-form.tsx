"use client"

import { useState, useRef } from "react"
import { Upload, Link2, Info, Save, Sparkles } from "lucide-react"

export function AddBookForm() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [externalUrl, setExternalUrl] = useState("")
  const [isbn, setIsbn] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")
  const [year, setYear] = useState("")
  const [description, setDescription] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  function handleFile(file: File) {
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  function handleSave() {
    // In a real app this would submit to an API
    alert("Book saved successfully!")
  }

  function handleCancel() {
    setCoverPreview(null)
    setExternalUrl("")
    setIsbn("")
    setTitle("")
    setAuthor("")
    setPages("")
    setYear("")
    setDescription("")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Dashboard</span>
        <span className="text-muted-foreground">{">"}</span>
        <span className="text-muted-foreground">Collection</span>
        <span className="text-muted-foreground">{">"}</span>
        <span className="text-primary">Add New Book</span>
      </nav>

      {/* Main Form Card */}
      <div className="rounded-xl border border-border bg-card">
        {/* Header */}
        <div className="border-b border-border px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Save className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Add New Book to Collection</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Fill in the metadata below to catalog a new title in your personal library.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex flex-col gap-8 px-6 py-6 lg:px-8">
          {/* Book Cover Image */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              Book Cover Image
              <span className="text-muted-foreground">
                <Upload className="h-3.5 w-3.5" />
              </span>
            </label>
            <div
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : coverPreview
                    ? "border-border bg-secondary/30"
                    : "border-border bg-secondary/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {coverPreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="h-40 w-auto rounded-lg object-cover shadow-lg"
                  />
                  <button
                    onClick={() => {
                      setCoverPreview(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mb-3 h-8 w-8 text-primary/60" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Click to upload</span>{" "}
                    or drag and drop
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    PNG, JPG or WEBP (Max. 800x1200px)
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileSelect}
              />
              {!coverPreview && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 rounded-lg border border-primary/40 bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
                >
                  Browse Files
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="relative mt-4">
              <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="Paste external image URL here (e.g. https://example.com/cover.jpg)"
                className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* ISBN */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              ISBN-13
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Info className="h-2.5 w-2.5" />
              </span>
            </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="978-3-16-148410-0"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">
              Enter the 13-digit ISBN found on the back cover.
            </p>
          </div>

          {/* Title and Author */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Book Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Great Gatsby"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Pages and Year */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Total Pages</label>
              <div className="relative">
                <input
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="350"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  pgs
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Publication Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Synopsis / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief summary of the book's plot or key themes..."
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Save className="h-4 w-4" />
              Save Book
            </button>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="mt-6 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Pro Tip: Auto-Fill</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Entering a valid ISBN will attempt to automatically fetch the title, author, description,
            and cover image from the Global Book Registry API.
          </p>
        </div>
      </div>
    </div>
  )
}
