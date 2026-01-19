import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Reveal } from "./Reveal";

type GuestInputProps = {
  onGuestNameChange?: (name: string) => void;
};

export function GuestInput({ onGuestNameChange }: GuestInputProps) {
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null);

  const WISH_EMAIL: string = (
    import.meta.env.VITE_WISH_EMAIL || "thanhbr06@gmail.com"
  ).trim();

  const EMAILJS_SERVICE_ID: string | undefined = (
    import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  )
    ?.trim()
    ?.toString();
  const EMAILJS_TEMPLATE_ID: string | undefined = (
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  )
    ?.trim()
    ?.toString();
  const EMAILJS_PUBLIC_KEY: string | undefined = (
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
  )
    ?.trim()
    ?.toString();

  const sendWish = async () => {
    const message = name.trim();
    if (!message) return;
    if (isSending) return;

    setIsSending(true);
    setSendStatus("idle");
    setSendErrorMessage(null);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setIsSending(false);
      setSendStatus("error");
      window.alert(
        "Chưa cấu hình EmailJS. Hãy thêm VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY vào .env để gửi trực tiếp qua email.",
      );
      return;
    }

    try {
      const createdAt = new Date().toISOString();
      const pageUrl = window.location.href;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: WISH_EMAIL,
          subject: "Lời chúc lễ tốt nghiệp 🎓",
          message,
          createdAt,
          pageUrl,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setSendStatus("success");
      setName("");
    } catch (err: unknown) {
      // EmailJS throws an EmailJSResponseStatus (has `status` and `text`).
      const maybe = err as { status?: number; text?: string };
      const rawDetails =
        typeof maybe?.text === "string" && maybe.text.trim().length > 0
          ? maybe.text.trim()
          : "Không xác định (EmailJS trả về lỗi)";

      const details =
        /template id not found/i.test(rawDetails) && EMAILJS_TEMPLATE_ID
          ? `${rawDetails} (đang dùng: ${EMAILJS_TEMPLATE_ID})`
          : rawDetails;

      console.error("EmailJS send failed", {
        status: maybe?.status,
        text: maybe?.text,
        err,
      });

      setSendErrorMessage(
        maybe?.status ? `Lỗi ${maybe.status}: ${details}` : details,
      );
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="card card-hover p-6 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold tracking-[0.18em] text-navy-900/60">
                    DÀNH CHO BẠN
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
                    CHÚC MỪNG ĐI
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/70 sm:text-base">
                    Gửi mình lời chúc nha...
                  </p>
                </div>

                <div className="w-full sm:max-w-sm">
                  <label
                    className="text-xs font-semibold text-navy-900/60"
                    htmlFor="guestName"
                  >
                    LỜI CHÚC CỦA BẠN
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-navy-900/15 bg-white/80 px-3 py-2 shadow-soft backdrop-blur">
                    <Sparkles className="h-4 w-4 text-gold-300" />
                    <input
                      id="guestName"
                      className="w-full bg-transparent py-1 text-sm text-navy-900 placeholder:text-navy-900/35 focus:outline-none"
                      placeholder="Ví dụ: Chúc bạn hạnh phúc và thành công!"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        onGuestNameChange?.(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    className="btn-primary mt-3 w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                    onClick={sendWish}
                    disabled={isSending || name.trim().length === 0}
                    aria-label="Gửi lời chúc"
                  >
                    <Send className="h-4 w-4" />
                    {isSending ? "Đang gửi..." : "Gửi"}
                  </button>

                  {sendStatus !== "idle" && (
                    <div
                      className={
                        "mt-2 text-sm " +
                        (sendStatus === "success"
                          ? "text-emerald-700"
                          : "text-red-700")
                      }
                      role="status"
                      aria-live="polite"
                    >
                      {sendStatus === "success"
                        ? "Gửi lời chúc thành công!"
                        : sendErrorMessage
                          ? `Gửi thất bại: ${sendErrorMessage}`
                          : "Gửi thất bại, vui lòng thử lại."}
                    </div>
                  )}

                  <motion.div
                    className="mt-4 rounded-xl bg-ivory-100/70 p-4 text-sm text-navy-900/80"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="mt-1">
                      Rất mong bạn dành thời gian đến tham dự và lưu lại khoảnh
                      khắc đáng nhớ.
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
