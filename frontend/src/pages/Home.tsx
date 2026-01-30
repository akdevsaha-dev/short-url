import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
    </div>
  );
};
