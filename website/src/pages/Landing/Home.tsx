import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

function Home() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);

  const { user , logout } = useAuth();

  const navigate = useNavigate();
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <div className="flex gap-4">
        {user ? (
          <Button onClick={() => logout() }>
            logout
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>login</Button>
            <Button onClick={() => navigate("/register")}>register</Button>
          </>
        )}
      </div>

      <Profile />
    </>
  );
}

export default Home;
