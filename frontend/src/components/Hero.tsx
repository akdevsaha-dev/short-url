import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { HashLink } from "react-router-hash-link";
export const Hero = () => {
  return (
    <div className="min-h-[200vh] pt-16 w-full bg-white">
      <div className="items-center w-full flex flex-col ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.1 } }}
          className="md:w-[55%] w-[90%] h-[80vh] flex justify-center flex-col  items-center"
        >
          <div className="lg:text-7xl md:text-6xl text-4xl font-bold md:px-0 px-10  text-center">
            Shorten links, <span className="text-neutral-500">expand</span> your
            reach
          </div>
          <div className="text-center mt-10 font-md text-lg text-neutral-400">
            Transform long, unwieldy URLs into clean, memorable links. Track
            every click and optimize your marketing with powerful analytics.
          </div>
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0, transition: { duration: 0.1, delay: 0.2 } }}
            className="flex justify-center w-full mt-10"
          >
            <div className="w-[70%]  flex justify-center gap-10">
              <HashLink
                to={"/#start"}
                className="flex gap-2 items-center bg-black text-white w-47 justify-center py-3 rounded-md"
              >
                <div>Start for free</div>
                <MoveRight size={14} />
              </HashLink>
              <div className="items-center flex text-neutral-800 border-2 border-neutral-300  w-47 justify-center py-3 rounded-md">
                See how it works
              </div>
            </div>
          </motion.div>
          <div className="text-neutral-400 mt-10 font-light">
            Trusted by <span className="text-black font-semibold">50,000+</span>{" "}
            marketers worldwide
          </div>
        </motion.div>
        <div className="w-[70%] ">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 0.2, delay: 0.4 },
            }}
            className="w-full min-h-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-x border-t border-neutral-200 rounded-t-3xl"
          >
            <div className="h-14 w-full bg-neutral-100 border-b justify-between border-neutral-200 rounded-t-3xl flex">
              <div className="pl-4 w-30 flex items-center gap-2">
                <div className=" h-3 w-3 bg-neutral-300 rounded-full"></div>
                <div className=" h-3 w-3 bg-neutral-300 rounded-full"></div>
                <div className=" h-3 w-3 bg-neutral-300 rounded-full"></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-7 w-50 bg-white border border-neutral-300 rounded-md font-light font-mono text-sm text-neutral-500 flex items-center justify-center">
                  shrtn.com/dashboard
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full h-40  flex items-center gap-6 px-8 justify-center">
                <div className="flex-1 h-25 flex flex-col justify-center pl-6 rounded-xl border border-neutral-200">
                  <div className="text-neutral-400 font-light">
                    Total clicks
                  </div>
                  <div className="text-2xl font-semibold">124,892</div>
                </div>
                <div className="flex-1 h-25 flex flex-col justify-center pl-6 rounded-xl border border-neutral-200">
                  <div className="text-neutral-400 font-light">
                    Active Links
                  </div>
                  <div className="text-2xl font-semibold">847</div>
                </div>
                <div className="flex-1 h-25 flex flex-col justify-center pl-6 rounded-xl border border-neutral-200">
                  <div className="text-neutral-400 font-light">
                    Conversion Rate
                  </div>
                  <div className="text-2xl font-semibold">12.3%</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 text-sm ">
                <div className="w-full border text-neutral-500 border-neutral-200 h-13 flex justify-between rounded-lg px-4 items-center">
                  <div className="flex gap-4 font-mono items-center">
                    <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
                    <div>shortli.io/launch</div>
                  </div>
                  <div>24,623 clicks</div>
                </div>
                <div className="w-full text-neutral-400 border border-neutral-100 flex justify-between h-13 rounded-lg px-4 items-center">
                  <div className="flex gap-4 font-mono items-center">
                    <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
                    <div>shortli.io/promo</div>
                  </div>
                  <div>2,633 clicks</div>
                </div>
                <div className="w-full border-x  border-t text-neutral-200 border-x-neutral-50 border-t-neutral-100 flex justify-between h-13 rounded-t-lg px-4 items-center">
                  <div className="flex gap-4 font-mono items-center">
                    <div className="h-2 w-2 rounded-full bg-neutral-100"></div>
                    <div>shortli.io/demo</div>
                  </div>
                  <div>12,847 clicks</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="w-full flex flex-col items-center pt-24 h-100">
          <div className="text-4xl font-bold">Create Your Short Link</div>
          <div className="text-neutral-500 text-lg mt-5">
            Paste your long URL and get a short link instantly
          </div>
          <div id="start" className="flex gap-5 mt-10">
            <input
              placeholder="https://example.com/very/long/url"
              className="w-125 h-12 focus:ring-2 ring-neutral-400 rounded-xl focus:border-0 border border-neutral-300 pl-4 placeholder:text-neutral-400 focus:outline-none"
            />
            <div className="h-12 flex items-center justify-center text-white bg-black px-5 rounded-xl">
              Shorten
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
