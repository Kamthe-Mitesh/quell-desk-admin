import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/custom/ShaderBackground";

export default function NotFound() {
  return (
    <div className="w-full bg-(--color-primary) min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <HeroBackground />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-md bg-(--color-secondary) text-white text-sm font-medium">
              Page Not Found
            </div>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-[10rem] md:text-[16rem] lg:text-[22rem] leading-none tracking-tighter text-center font-semibold text-white">
              404
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/70 max-w-2xl text-center">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              size="lg"
              className="gap-4 bg-(--color-accent) text-(--color-primary) hover:bg-(--color-accent)/90 font-semibold"
              asChild
            >
              <Link href={ROUTES.DASHBOARD}>
                Go to Home <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
