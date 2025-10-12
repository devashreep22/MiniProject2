import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const [role, setRole] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registering...");
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-2">Register Page</h1>
        <p className="mb-4">Welcome to the Register Page!</p>

        <div className="flex gap-4 mb-6">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/")}>Home</Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-96">
          <Input type="text" placeholder="Username" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />

          <select
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>

          {role === "farmer" && (
            <div className="flex flex-col gap-2">
              <Input type="text" placeholder="Farm Name" />
              <Input type="text" placeholder="Farm Address" />
              <Input type="text" placeholder="Crop Types" />
            </div>
          )}

          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  );
}

export default Register;
