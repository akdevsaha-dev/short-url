import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

export const Home = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
    </div>
  );
};
