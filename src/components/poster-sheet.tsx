import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Brain,
  Clock,
  CreditCard,
  FileCheck,
  Focus,
  Gamepad2,
  Gift,
  Heart,
  Image as ImageIcon,
  Link2,
  Lock,
  MapPin,
  MessageCircle,
  Mic,
  Moon,
  PersonStanding,
  Phone,
  Shield,
  Smartphone,
  Star,
  Users,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconKey, Poster, ThemeId } from "@/data/posters";

const ICONS: Record<IconKey, LucideIcon> = {
  moon: Moon,
  brain: Brain,
  walk: PersonStanding,
  users: Users,
  bell: Bell,
  meal: UtensilsCrossed,
  focus: Focus,
  star: Star,
  chat: MessageCircle,
  file: FileCheck,
  phone: Phone,
  shield: Shield,
  mic: Mic,
  card: CreditCard,
  gift: Gift,
  game: Gamepad2,
  book: BookOpen,
  wallet: Wallet,
  heart: Heart,
  clock: Clock,
  lock: Lock,
  image: ImageIcon,
  link: Link2,
  alert: AlertTriangle,
  pin: MapPin,
  device: Smartphone,
};

const ACCENT: Record<ThemeId, string> = {
  addiction: "teal",
  safety: "coral",
  games: "amber",
};

const SHEET_WIDTH = 560;

function Glyph({ name, className }: { name: IconKey; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2.15} aria-hidden="true" />;
}

export function PosterFrame({ poster }: { poster: Poster }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(920);

  useEffect(() => {
    const outer = outerRef.current;
    const sheet = sheetRef.current;
    if (!outer || !sheet) return;

    const measure = () => {
      const avail = outer.clientWidth;
      setScale(Math.min(1, avail / SHEET_WIDTH));
      setHeight(sheet.offsetHeight);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(sheet);
    return () => ro.disconnect();
  }, [poster.id]);

  return (
    <div className="stage" ref={outerRef}>
      <div
        className="stage-fit"
        style={{ width: SHEET_WIDTH * scale, height: height * scale }}
      >
        <article
          ref={sheetRef}
          className="sheet sheet-scale"
          dir="rtl"
          data-accent={ACCENT[poster.theme]}
          style={{ width: SHEET_WIDTH, transform: `scale(${scale})` }}
          aria-label={`ملصق ${poster.id}: ${poster.title}`}
        >
          <span className="wedge" aria-hidden="true" />
          <div className="sheet-inner">
            <div className="sheet-top">
              <span className="badge">وعي رقمي {poster.id}</span>
              <span className="campaign-label">حملة توعية</span>
            </div>

            <h2 className="poster-title">{poster.title}</h2>
            <div className="accent-rule" />
            <p className="poster-sub">{poster.subtitle}</p>

            <div className="hero">
              <figure className="portrait">
                <img src={poster.image} alt={poster.imageAlt} />
              </figure>
              <section className="scene-card" dir="rtl">
                <div className="scene-head">الموقف المهم</div>
                <div className="scene-body">
                  <span className="scene-icon">
                    <Glyph name={poster.sceneIcon} className="scene-glyph" />
                  </span>
                  <p>{poster.scene}</p>
                </div>
                <div className="actions">
                  {poster.actions.map((label, i) => (
                    <span
                      className="act"
                      data-tone={i === 1 ? "alt" : "accent"}
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="tips">
              {poster.tips.map((tip) => (
                <section className="tip" key={tip.title}>
                  <div className="tip-top">
                    <h3>{tip.title}</h3>
                    <span className="mini-icon">
                      <Glyph name={tip.icon} className="mini-glyph" />
                    </span>
                  </div>
                  <div className="tip-rule" />
                  <p>{tip.body}</p>
                </section>
              ))}
            </div>

            <footer className="foot">
              <span className="foot-badge">
                <Shield className="foot-glyph" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <p>{poster.footer}</p>
              <span className="foot-tab" aria-hidden="true" />
            </footer>
            <div className="sheet-end" />
          </div>
        </article>
      </div>
    </div>
  );
}
