import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { InputBox } from "./InputBox";
import { useAuthStore } from "../store/authStore";
export const SigninComp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setAgree(true);
    }
  }, []);
  useEffect(() => {
    if (agree && email) {
      localStorage.setItem("remember_email", email);
    } else {
      localStorage.removeItem("remember_email");
    }
  }, [agree, email]);
  const signin = useAuthStore((state) => state.signin);
  const loading = useAuthStore((state) => state.isSigningIn);
  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }
    const success = await signin({ email, password });
    if (success) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mt-20 h-[70vh] w-105">
        <div className="mb-2 text-3xl/9 font-medium tracking-tight text-zinc-500">
          Welcome to Shrtn
        </div>
        <div className="flex flex-col">
          <InputBox
            label="Email address"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
          />
          <div className="relative">
            <InputBox
              ref={passwordRef}
              value={password}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••• •••••• •••••"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-18.5 text-zinc-400 hover:text-zinc-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mt-5 flex w-full items-center gap-4">
            <input
              className="h-4 w-4"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-sm font-light ">Remember me</label>
          </div>
          <button
            onClick={handleSubmit}
            className={
              "mt-6 flex h-10 w-full items-center justify-center gap-2 border bg-cyan-300 text-center text-sm font-semibold text-neutral-700 hover:bg-cyan-200"
            }
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <div className="flex items-center">
                Continue <ChevronRight size={15} />
              </div>
            )}
          </button>
        </div>

        <div className="mt-10 text-center">
          <span className="mr-1 text-sm font-light text-neutral-500">
            Not using shrtn yet?
          </span>
          <Link
            to={"/signup"}
            className="text-sm font-semibold text-zinc-800 hover:text-zinc-500"
          >
            Create an account now.
          </Link>
        </div>
      </div>
    </div>
  );
};
