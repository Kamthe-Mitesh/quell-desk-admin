import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/custom/ShaderBackground";

export default function Hero() {
  return (
    <div className="w-full bg-(--color-primary) min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <HeroBackground />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-md bg-(--color-secondary) text-white text-sm font-medium">
              Streamlined Complaint Management
            </div>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-white">
              Welcome to{" "}
              <span className="text-[var(--color-accent) font-bold">
                Quell Desk
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/70 max-w-2xl text-center">
              A centralized platform to track, manage, and resolve complaints
              with complete transparency.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              size="lg"
              className="gap-4 bg-(--color-accent) text-(--color-primary) hover:bg-(--color-accent)/90 font-semibold"
              asChild
            >
              <Link href={ROUTES.DASHBOARD}>
                Go to Dashboard <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
