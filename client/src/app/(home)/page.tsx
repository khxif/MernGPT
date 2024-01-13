import RevealAnimation from "@/motion/RevealAnimation";
import { ArrowRight, SunIcon } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div
      className="h-full flex flex-col space-y-6 py-6 px-4 md:px-0 overflow-y-scroll
     max-w-6xl mx-auto scrollbar-hide"
    >
      <h1 className="text-3xl text-center font-bold py-4">MernGPT</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <SunIcon className="w-6 h-6" />
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <SunIcon className="w-6 h-6" />
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <SunIcon className="w-6 h-6" />
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
          <span className="p-4 rounded-md bg-slate-400/40 hover:opacity-80 w-full">
            <RevealAnimation>
              &quot;Explain Something to me&quot;
            </RevealAnimation>
          </span>
        </div>
      </section>

      <RevealAnimation>
        <div className="w-full max-w-6xl md:mx-auto px-4 md:px-0 md:mt-10">
          <Link href="/chat">
            <span
              className="bg-slate-400/40 rounded-lg hover:opacity-80 p-4 flex items-center 
            justify-between w-full"
            >
              Get started with GPT
              <ArrowRight className="w-6 h-6" />
            </span>
          </Link>
        </div>
      </RevealAnimation>
    </div>
  );
}
