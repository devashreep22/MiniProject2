import { useState } from "react"
import { Star } from "lucide-react"

interface LoyaltyCardProps {
  user: {
    name: string
    email: string
    id: string
  }
  loyaltyInfo: {
    memberSince: string
    points: number
    tier: string
    cardNumber: string
  }
}

export function LoyaltyCard({ loyaltyInfo }: LoyaltyCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="h-56 w-full cursor-pointer perspective sm:w-96"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setFlipped(!flipped)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={flipped ? "Show front of loyalty card" : "Show back of loyalty card"}
    >
      <div
        className={`relative h-full w-full transform-style-3d transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute h-full w-full backface-hidden rounded-xl bg-gradient-to-br from-green-600 to-green-800 p-6 text-white shadow-xl">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">CMU Farmers Market</h3>
                <div className="flex items-center gap-1">
                  <Star
                    className={`h-5 w-5 ${
                      loyaltyInfo.tier === "Bronze"
                        ? "text-amber-400"
                        : loyaltyInfo.tier === "Silver"
                          ? "text-slate-300"
                          : "text-yellow-300"
                    }`}
                    fill="currentColor"
                  />
                  <span className="font-medium">{loyaltyInfo.tier}</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-green-100">Loyalty Rewards Card</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-green-100">Card Number</p>
              <p className="font-mono text-lg tracking-wider">{loyaltyInfo.cardNumber}</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-green-100">Card Holder</p>
                {/* <p className="text-lg font-medium">{user.name}</p> */}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-100">Member Since</p>
                <p>{loyaltyInfo.memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute h-full w-full rotate-y-180 backface-hidden rounded-xl bg-gradient-to-br from-green-700 to-green-900 p-6 text-white shadow-xl">
          <div className="flex h-full flex-col justify-between">
            <div className="text-center">
              <h3 className="text-xl font-bold">Current Points</h3>
              <p className="mt-2 text-4xl font-bold">{loyaltyInfo.points}</p>
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white/10 p-3">
                <p className="text-sm font-medium">Bronze: 0-499 points</p>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <p className="text-sm font-medium">Silver: 500-999 points</p>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <p className="text-sm font-medium">Gold: 1000+ points</p>
              </div>
            </div>

            <p className="text-center text-xs text-green-100">
              Tap card to flip • Present this card at checkout to earn and redeem points
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
