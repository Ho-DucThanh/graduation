import { Award, CalendarDays, Clock, MapPin, Quote, Star } from "lucide-react";
import { invitationDetails } from "../lib/details";
import { Reveal } from "./Reveal";

/**
 * Formal invitation content.
 * Icons are intentionally minimal to keep the aesthetic clean.
 */
export function Invitation() {
  return (
    <section id="invitation" className="relative py-16 sm:py-20">
      <div className="container-page">
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl">
            <div className="card card-hover p-6 sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:max-w-xl">
                  <p className="text-xs font-semibold tracking-[0.18em] text-navy-900/60">
                    THƯ MỜI TRÂN TRỌNG
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                    Lễ Tốt Nghiệp
                  </h2>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-navy-900/80">
                      <Award className="h-4 w-4 text-navy-900/70" />
                      Khoảnh khắc vinh danh
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-navy-900/80">
                      <Star className="h-4 w-4 text-gold-300" />
                      Lưu giữ kỷ niệm
                    </div>
                  </div>

                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-navy-900/75 sm:text-base">
                    <p>
                      Thân mời{" "}
                      <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1 font-semibold text-navy-900 ring-1 ring-gold-100">
                        {invitationDetails.khachmoi}
                      </span>{" "}
                      đến tham dự buổi lễ tốt nghiệp.
                    </p>

                    <p>
                      Sự hiện diện của bạn là niềm vinh dự và là lời chúc mừng ý
                      nghĩa nhất cho buổi lễ!
                    </p>

                    <div className="rounded-2xl border border-navy-900/10 bg-ivory-50/70 p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 ring-1 ring-navy-900/10">
                          <Quote className="h-4 w-4 text-navy-900/70" />
                        </span>
                        <div>
                          <div className="text-xs font-semibold tracking-[0.16em] text-navy-900/55">
                            LỜI NHẮN
                          </div>
                          <div className="mt-1 text-sm text-navy-900/75">
                            “Không đến thì nghỉ chơi nha con lợn.”
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-navy-900/70">Trân trọng kính mời.</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-xl border border-navy-900/10 bg-ivory-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-5 w-5 text-navy-900/70" />
                      <div>
                        <div className="text-xs font-semibold text-navy-900/60">
                          NGÀY
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-navy-900">
                          {invitationDetails.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-navy-900/10 bg-ivory-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-navy-900/70" />
                      <div>
                        <div className="text-xs font-semibold text-navy-900/60">
                          GIỜ
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-navy-900">
                          {invitationDetails.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-navy-900/10 bg-ivory-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-navy-900/70" />
                      <div>
                        <div className="text-xs font-semibold text-navy-900/60">
                          ĐỊA ĐIỂM
                        </div>
                        <div className="mt-0.5 text-sm font-semibold text-navy-900">
                          {invitationDetails.location}
                        </div>
                        <div className="mt-1 text-xs text-navy-900/60">
                          {invitationDetails.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
