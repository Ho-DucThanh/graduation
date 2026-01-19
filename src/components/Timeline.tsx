import { Camera, PartyPopper } from "lucide-react";
import { Reveal } from "./Reveal";
import { timelineItems } from "../lib/details";

export function Timeline() {
  return (
    <section id="timeline" className="relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-navy-900/60">
                  CHƯƠNG TRÌNH
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                  Timeline / Event Details
                </h3>
              </div>
              <div className="hidden text-xs text-navy-900/50 sm:block">
                Nhớ đến đúng giờ nhen
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {timelineItems.map((item, idx) => {
                const Icon =
                  idx === 0 ? PartyPopper : idx === 1 ? Camera : PartyPopper;

                return (
                  <Reveal
                    key={item.title}
                    delay={idx * 0.06}
                    variant={idx % 2 === 0 ? "slideLeft" : "slideRight"}
                  >
                    <div className="card card-hover p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-navy-900 shadow-soft">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-navy-900">
                              {item.title}
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-navy-900/70">
                              {item.description}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-full border border-navy-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-navy-900/80">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
