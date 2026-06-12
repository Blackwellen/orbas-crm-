import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount)
}

export function formatDate(date: string | Date, format = "dd MMM yyyy") {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export function formatRelativeTime(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 7) return formatDate(d)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "just now"
}

export function truncate(str: string, length = 50) {
  return str.length > length ? str.slice(0, length) + "…" : str
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
}

export function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
