import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Play, RotateCcw, Upload } from "lucide-react";

const STORAGE_KEY = "graduation:musicEnabled";

/**
 * Background music with autoplay attempt.
 * Note: Most browsers require a user gesture before playing audio.
 * We still attempt autoplay on mount and gracefully fall back.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [enabled, setEnabled] = useState<boolean>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === "true";
  });

  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [needsGesture, setNeedsGesture] = useState(false);

  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const [customLabel, setCustomLabel] = useState<string | null>(null);
  const [customType, setCustomType] = useState<string | undefined>(undefined);

  const sources = useMemo(
    () => [
      ...(customSrc
        ? [
            {
              src: customSrc,
              type: customType,
            },
          ]
        : []),

      // Default: your MP3 in `public/nhac.mp3` (served by Vite).
      { src: "/nhac.mp3", type: "audio/mpeg" },

      // Fallback (online). If the network blocks this, the site still works.
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Satie_-_Gymnopedie_No._1.ogg",
        type: "audio/ogg",
      },
    ],
    [customSrc, customType],
  );

  const play = async () => {
    const el = audioRef.current;
    if (!el) return;

    try {
      await el.play();
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  };

  const pause = () => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    setStatus("paused");
  };

  const chooseLocalFile = () => {
    fileInputRef.current?.click();
  };

  const resetToDefault = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setCustomSrc(null);
    setCustomLabel(null);
    setCustomType(undefined);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));

    const el = audioRef.current;
    if (!el) return;

    if (!enabled) {
      el.pause();
      return;
    }

    // Reasonable default volume (avoid being too loud).
    el.volume = 0.55;

    // Attempt autoplay when enabled.
    void el.play().catch(() => {
      // Autoplay may be blocked until user gesture.
      // We avoid state updates here to comply with react-hooks/set-state-in-effect;
      // UI will still work when the user presses the play button.
    });
  }, [enabled]);

  useEffect(() => {
    // When user selects a local file, we must reload the <audio> element.
    const el = audioRef.current;
    if (!el) return;

    el.load();
    if (!enabled) return;

    void el.play().catch(() => {
      // Same as above: do not set state inside effects.
    });
  }, [customSrc, enabled]);

  useEffect(() => {
    // Cleanup object URL on unmount.
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Most browsers block autoplay until the first user gesture.
    // This listener tries to start audio on the first interaction.
    if (!enabled) return;
    if (!needsGesture) return;

    const unlock = () => {
      void play();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [enabled, needsGesture]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus("paused");

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="auto" loop playsInline>
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </audio>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="audio/*,.mp3,.wav,.ogg,.m4a"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
          }

          const url = URL.createObjectURL(file);
          objectUrlRef.current = url;
          setCustomSrc(url);
          setCustomLabel(file.name);
          setCustomType(file.type || undefined);
          setEnabled(true);

          // Allow selecting the same file again.
          e.currentTarget.value = "";
        }}
      />

      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col items-end gap-2">
          {needsGesture && enabled ? (
            <div className="max-w-[260px] rounded-xl border border-navy-900/10 bg-white/80 p-3 text-xs text-navy-900/70 shadow-soft backdrop-blur">
              Trình duyệt cần thao tác để bật nhạc. Hãy bấm nút nhạc một lần.
            </div>
          ) : null}

          {customLabel ? (
            <div className="max-w-[260px] rounded-xl border border-navy-900/10 bg-white/80 p-3 text-xs text-navy-900/70 shadow-soft backdrop-blur">
              Đang dùng file:{" "}
              <span className="font-semibold text-navy-900">{customLabel}</span>
            </div>
          ) : null}

          <button
            className="group flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-navy-900 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => {
              if (!enabled) {
                setEnabled(true);
                return;
              }

              if (status === "playing") {
                pause();
                return;
              }

              void play();
            }}
            aria-label="Bật/tắt nhạc nền"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-50 text-navy-900 transition group-hover:bg-gold-100">
              <Music2 className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Nhạc nền</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/10 bg-white">
              {enabled && status === "playing" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </span>
          </button>

          <button
            className="btn-ghost"
            onClick={chooseLocalFile}
            aria-label="Chọn nhạc từ máy"
          >
            <Upload className="h-4 w-4" />
            Chọn nhạc từ máy
          </button>

          {customSrc ? (
            <button
              className="btn-ghost"
              onClick={resetToDefault}
              aria-label="Dùng nhạc mặc định"
            >
              <RotateCcw className="h-4 w-4" />
              Dùng nhạc mặc định
            </button>
          ) : null}
        </div>
      </motion.div>
    </>
  );
}
