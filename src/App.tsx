import { useCallback, useMemo } from "react";
import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { GuestInput } from "./components/GuestInput";
import { Timeline } from "./components/Timeline";
import { MusicToggle } from "./components/MusicToggle";
import { getGuestNameFromPathname, invitationDetails } from "./lib/details";

function App() {
  const onViewInvitation = useCallback(() => {
    const el = document.getElementById("invitation");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const guestName = useMemo(
    () =>
      getGuestNameFromPathname(
        window.location.pathname,
        import.meta.env.BASE_URL,
      ),
    [],
  );

  return (
    <div className="min-h-dvh">
      <MusicToggle />

      <header className="sticky top-0 z-40 border-b border-navy-900/5 bg-white/70 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <a
            href="#"
            className="font-serif text-sm font-semibold tracking-tight text-navy-900"
          >
            {invitationDetails.studentName}
          </a>

          <nav className="hidden items-center gap-6 text-sm text-navy-900/70 sm:flex">
            <a className="transition hover:text-navy-900" href="#invitation">
              Thư mời
            </a>
            <a className="transition hover:text-navy-900" href="#timeline">
              Timeline
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onViewInvitation={onViewInvitation} />
        <Invitation guestName={guestName} />
        <GuestInput />
        <Timeline />
      </main>

      <footer className="border-t border-navy-900/10 bg-white/60 py-10">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="card card-hover p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="font-serif text-xl font-semibold text-navy-900">
                    Lời cảm ơn
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-900/70">
                    Đến tham dự rồi cảm ơn sau.
                  </p>
                </div>

                <div className="text-sm text-navy-900/70">
                  <div className="text-xs font-semibold tracking-[0.18em] text-navy-900/60">
                    LIÊN HỆ
                  </div>
                  <div className="mt-2 font-semibold text-navy-900">
                    {invitationDetails.contactName}
                  </div>
                  <div className="mt-1">{invitationDetails.contactPhone}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-navy-900/45">
              © {new Date().getFullYear()} Graduation Invitation •
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
