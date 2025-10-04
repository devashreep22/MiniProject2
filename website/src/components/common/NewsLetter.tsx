import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate subscription
    setTimeout(() => {
      setIsSubmitting(false)
    //   toast({
    //     title: "Subscribed!",
    //     description: "You've been added to our newsletter.",
    //   })
      setEmail("")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
      </p>
    </form>
  )
}
