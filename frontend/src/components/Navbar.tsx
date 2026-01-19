export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-white/40 backdrop-blur-[20px]">
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
        <div className="shrink-0 text-2xl font-bold">
          shrtn
        </div>
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex gap-8 text-neutral-400">
          <a className="hover:text-black cursor-pointer">Features</a>
          <a className="hover:text-black cursor-pointer">How it works</a>
          <a className="hover:text-black cursor-pointer">Pricing</a>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button className="hidden lg:block rounded-lg px-4 py-2 text-sm hover:bg-neutral-100">
            Log in
          </button>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
};