import { useState } from "react"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export function LogoutButton() {
  const navigate = useNavigate()
  const {logout} = useAuth();
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      await logout()
    //   toast({
    //     title: "Logged out successfully",
    //     description: "You have been logged out of your account.",
    //   })
      navigate("/")
    } catch (error) {
    //   toast({
    //     title: "Error logging out",
    //     description: "Please try again.",
    //     variant: "destructive",
    //   })
    console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogout} variant="outline" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging out
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </>
      )}
    </Button>
  )
}
