import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  useEffect(() => {
    document.title = "Login Page"
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login({ email, password })
      // No need for manual role-based navigation
      // AuthGuard will handle redirect based on role
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid credentials")
    }
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-semibold mb-2">Login Page</h1>
      <p>Welcome to the Login Page!</p>

      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/register")}>Register</Button>
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-6 w-96"
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  )
}

export default Login
