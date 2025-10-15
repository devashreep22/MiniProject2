import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Bell, Menu, X } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from "@/context/AuthContext"

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const popRef = useRef<HTMLDivElement | null>(null)
  const { user, logout } = useAuth()

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return

    const onDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (popRef.current && !popRef.current.contains(target)) {
        setOpen(false)
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <header className="flex h-16 items-center gap-2 border-b bg-background px-3 lg:gap-4 lg:px-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="shrink-0 lg:flex">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden flex-1 items-center md:flex lg:mx-4">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full bg-muted pl-10 pr-4" />
        </div>
      </div>

      <div className="flex flex-1 items-center md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search documents..." className="w-full bg-muted pl-9 pr-3 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-2">
        <div className="relative ml-1">
          <button onClick={() => setOpen((s) => !s)} aria-haspopup="dialog" aria-expanded={open}>
            <Avatar className="h-8 w-8 lg:ml-2">
              <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                {user?.name?.[0]?.toUpperCase() ?? user?.name?.[0]?.toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Popover card */}
          {open && (
            <div
              ref={popRef}
              className="absolute right-0 top-11 w-80 rounded-lg bg-popover p-4 shadow-lg z-50"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm text-muted-foreground">{user?.email}</div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col items-center py-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-green-500 text-white text-xl">
                    {user?.name?.[0]?.toUpperCase() ?? user?.name?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-3 text-lg font-medium">Hi, {user?.name ?? user?.name}</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div><strong>name:</strong> {user?.name}</div>
                <div><strong>Email:</strong> {user?.email ?? '—'}</div>
                <div><strong>Role:</strong> {user?.role}</div>
              </div>

              <div className="mt-3 grid gap-2">
                <Button
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
