import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { doors, posters, type ThemeId } from "@/data/posters";
import { PosterFrame } from "@/components/poster-sheet";

const ACCENT: Record<ThemeId, string> = {
  addiction: "teal",
  safety: "coral",
  games: "amber",
};

export function Campaign() {
  const [cursor, setCursor] = useState(0);
  const poster = posters[cursor];
  const door = doors.find((item) => item.id === poster.theme) ?? doors[0];
  const inDoor = posters.filter((item) => item.theme === poster.theme);
  const placeInDoor = inDoor.findIndex((item) => item.id === poster.id) + 1;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCursor((value) => (value + 1) % posters.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCursor((value) => (value - 1 + posters.length) % posters.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function jumpTheme(theme: ThemeId) {
    const index = posters.findIndex((item) => item.theme === theme);
    if (index >= 0) setCursor(index);
  }

  function jumpId(id: string) {
    const index = posters.findIndex((item) => item.id === id);
    if (index >= 0) setCursor(index);
  }

  return (
    <main className="app">
      <header className="topbar no-print">
        <div>
          <p className="brand-kicker">حملة توعية</p>
          <h1 className="brand-title">وعي رقمي</h1>
        </div>
        <p className="brand-note">
          {door.label}
          <span> · {placeInDoor} من {inDoor.length}</span>
        </p>
      </header>

      <nav className="doors no-print" aria-label="أدوار الحملة">
        {doors.map((item) => (
          <button
            key={item.id}
            type="button"
            className="door"
            data-accent={ACCENT[item.id]}
            data-active={item.id === poster.theme ? "true" : "false"}
            onClick={() => jumpTheme(item.id)}
          >
            <small>{item.label}</small>
            <strong>{item.name}</strong>
            <span>{item.line}</span>
          </button>
        ))}
      </nav>

      <div className="viewer">
        <div className="stage-col">
          <PosterFrame poster={poster} />
          <div className="controls no-print">
            <button
              type="button"
              className="nav-btn"
              onClick={() => setCursor((value) => (value - 1 + posters.length) % posters.length)}
            >
              <ChevronRight aria-hidden="true" />
              السابق
            </button>
            <p className="counter">
              {poster.id}
              <span> / 15</span>
            </p>
            <button
              type="button"
              className="nav-btn"
              onClick={() => setCursor((value) => (value + 1) % posters.length)}
            >
              التالي
              <ChevronLeft aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="print-btn no-print" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            طباعة الملصق أو حفظه PDF
          </button>
          <p className="hint no-print">الأسهم بتقلب الملصقات الخمسة عشر بالترتيب، ودورًا بعد دور.</p>
        </div>

        <aside className="rail no-print" aria-label={`ملصقات ${door.name}`}>
          <p className="rail-label">{door.name}</p>
          {inDoor.map((item) => (
            <button
              key={item.id}
              type="button"
              data-accent={ACCENT[item.theme]}
              data-active={item.id === poster.id ? "true" : "false"}
              onClick={() => jumpId(item.id)}
            >
              <span className="num">{item.id}</span>
              <span className="rail-title">{item.title}</span>
            </button>
          ))}
        </aside>
      </div>
    </main>
  );
}
