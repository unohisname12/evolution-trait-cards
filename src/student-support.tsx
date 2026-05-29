/* eslint-disable react-refresh/only-export-components -- leaf support module; hooks + constants + components colocated on purpose */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  Medal,
  Settings2,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

/* ----------------------------------------------------------------------------
 * Student support layer: optional, toggleable scaffolds for struggling
 * students (IEP/504, dyslexia, ADHD, autism, executive function). No AI — the
 * read-aloud uses the browser Web Speech API; everything else is static
 * content or derived from the catalog so it works offline and never invents
 * facts or writes answers for the student.
 * ------------------------------------------------------------------------- */

export type SupportSettings = {
  simpleMode: boolean;
  focusMode: boolean;
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  textScale: number; // 1 = default
};

const DEFAULT_SETTINGS: SupportSettings = {
  simpleMode: false,
  focusMode: false,
  dyslexiaFont: false,
  reduceMotion: false,
  textScale: 1,
};

const STORAGE_KEY = "trait-deck-support";

export function useSupportSettings() {
  const [settings, setSettings] = useState<SupportSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = useCallback(
    <K extends keyof SupportSettings>(key: K, value: SupportSettings[K]) =>
      setSettings((current) => ({ ...current, [key]: value })),
    [],
  );

  const rootClass = [
    settings.simpleMode ? "simple-mode" : "",
    settings.focusMode ? "focus-mode" : "",
    settings.dyslexiaFont ? "dyslexia" : "",
    settings.reduceMotion ? "reduce-motion" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const rootStyle = { "--text-scale": settings.textScale } as React.CSSProperties;

  return { settings, update, rootClass, rootStyle };
}

/* --------------------------------- Speech -------------------------------- */

const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!speechSupported || !text.trim()) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.92;
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      utterRef.current = utter;
      setSpeaking(true);
      window.speechSynthesis.speak(utter);
    },
    [],
  );

  useEffect(() => () => stop(), [stop]);

  return { speak, stop, speaking, supported: speechSupported };
}

/* ----------------------------- Sentence starters ------------------------- */

export const SENTENCE_STARTERS: Record<"claim" | "evidence" | "reasoning", string[]> = {
  claim: ["I believe ", "My claim is that ", "I think these animals "],
  evidence: ["One piece of evidence is ", "According to my research, ", "The fossils and body parts show "],
  reasoning: [
    "This evidence supports my claim because ",
    "The trait helps the organism by ",
    "This shows a common ancestor because ",
  ],
};

export function SentenceStarters({
  kind,
  onInsert,
}: {
  kind: keyof typeof SENTENCE_STARTERS;
  onInsert: (text: string) => void;
}) {
  return (
    <div className="starters" role="group" aria-label="Sentence starters">
      <span className="starters-label">Sentence starters:</span>
      {SENTENCE_STARTERS[kind].map((starter) => (
        <button key={starter} type="button" className="starter-chip" onClick={() => onInsert(starter)}>
          {starter.trim()}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Accessibility bar ------------------------ */

export function AccessibilityBar({
  settings,
  update,
}: {
  settings: SupportSettings;
  update: <K extends keyof SupportSettings>(key: K, value: SupportSettings[K]) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="a11y-wrap">
      <button type="button" className="a11y-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Settings2 size={18} /> Reading &amp; focus
      </button>
      {open ? (
        <div className="a11y-panel" role="group" aria-label="Reading and focus settings">
          <Toggle label="Simple Mode" hint="One step at a time, less clutter" value={settings.simpleMode} onChange={(v) => update("simpleMode", v)} />
          <Toggle label="Focus Mode" hint="Dim everything but the current part" value={settings.focusMode} onChange={(v) => update("focusMode", v)} />
          <Toggle label="Dyslexia-friendly font" hint="Wider spacing, clearer letters" value={settings.dyslexiaFont} onChange={(v) => update("dyslexiaFont", v)} />
          <Toggle label="Reduce motion" hint="Turn off animations" value={settings.reduceMotion} onChange={(v) => update("reduceMotion", v)} />
          <div className="a11y-size">
            <span>Text size</span>
            <div className="size-buttons">
              <button type="button" onClick={() => update("textScale", Math.max(0.9, +(settings.textScale - 0.1).toFixed(2)))}>A-</button>
              <button type="button" onClick={() => update("textScale", 1)}>Reset</button>
              <button type="button" onClick={() => update("textScale", Math.min(1.6, +(settings.textScale + 0.1).toFixed(2)))}>A+</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={value ? "support-toggle on" : "support-toggle"}>
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
      <span className="support-toggle-text">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
    </label>
  );
}

/* ------------------------------- Need Help ------------------------------- */

type HelpContext = {
  animalName: string;
  sharedTrait: string;
  adaptation: string;
};

const HELP_STEPS = [
  "Pick an animal from the list on the left.",
  "Write where it lives (Environment).",
  "Write a trait it shares with a relative (Shared trait).",
  "Write a trait that helps it survive (Adaptation).",
  "Write your Claim: what you are trying to prove.",
  "Write your Evidence: a fact, fossil, or body part you found.",
  "Write your Reasoning: explain how the evidence proves your claim.",
  "Save your card for the print sheet.",
];

const CER_REMINDER =
  "CER means Claim, Evidence, Reasoning. Claim: what you think is true. Evidence: a fact or observation that proves it. Reasoning: your explanation of how the evidence supports the claim.";

export function NeedHelp({ context, speak, stop, speaking, supported }: {
  context: HelpContext;
  speak: (text: string) => void;
  stop: () => void;
  speaking: boolean;
  supported: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  const explainSimpler = `A trait is a body part or behavior. ${context.animalName} has the shared trait: ${context.sharedTrait || "(write what is similar to a relative)"}. Its adaptation is: ${context.adaptation || "(write what helps it survive)"}. Shared traits come from a common ancestor. Adaptations help it live where it lives.`;

  const giveExample = `Example: A human hand and a chimpanzee hand both have five fingers and similar bones (shared trait, from a common ancestor). Humans walk upright; chimpanzees climb and have longer arms (different adaptations).`;

  const topics: { key: string; label: string; text: string }[] = [
    { key: "aloud", label: "Read Instructions Aloud", text: HELP_STEPS.join(". ") },
    { key: "simpler", label: "Explain This Simpler", text: explainSimpler },
    { key: "example", label: "Give Me an Example", text: giveExample },
    { key: "starters", label: "Show Sentence Starters", text: "Look under each writing box for blue Sentence starter buttons. Click one and it drops the words into your answer so you only finish the sentence." },
    { key: "steps", label: "Break This Into Steps", text: HELP_STEPS.map((s, i) => `${i + 1}. ${s}`).join("\n") },
    { key: "cer", label: "Remind Me What CER Means", text: CER_REMINDER },
  ];

  const active = topics.find((t) => t.key === topic);

  return (
    <div className="needhelp-wrap">
      <button type="button" className="needhelp-button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <HelpCircle size={18} /> Need Help?
      </button>
      {open ? (
        <div className="needhelp-panel" role="dialog" aria-label="Student support center">
          <div className="needhelp-head">
            <strong>How can I help?</strong>
            <button type="button" className="needhelp-close" onClick={() => { stop(); setOpen(false); }}>Close</button>
          </div>
          <div className="needhelp-actions">
            {topics.map((t) => (
              <button
                key={t.key}
                type="button"
                className={topic === t.key ? "needhelp-action active" : "needhelp-action"}
                onClick={() => {
                  setTopic(t.key);
                  if (t.key === "aloud") speak(t.text);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          {active ? (
            <div className="needhelp-content">
              <p style={{ whiteSpace: "pre-line" }}>{active.text}</p>
              {supported ? (
                <button type="button" className="needhelp-aloud" onClick={() => (speaking ? stop() : speak(active.text))}>
                  {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />} {speaking ? "Stop" : "Read aloud"}
                </button>
              ) : null}
            </div>
          ) : (
            <p className="needhelp-hint">Pick a button. You can stay right here in your activity.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------- Progress + badges --------------------------- */

export type ProgressInput = {
  environment: string;
  sharedTrait: string;
  adaptation: string;
  claim: string;
  evidence: string;
  reasoning: string;
  connectionNote: string;
};

const STEP_DEFS: { key: keyof ProgressInput; label: string }[] = [
  { key: "environment", label: "Environment" },
  { key: "sharedTrait", label: "Shared trait" },
  { key: "adaptation", label: "Adaptation" },
  { key: "claim", label: "Claim" },
  { key: "evidence", label: "Evidence" },
  { key: "reasoning", label: "Reasoning" },
];

export function computeProgress(input: ProgressInput) {
  const done = STEP_DEFS.filter((step) => input[step.key].trim().length > 0);
  const nextStep = STEP_DEFS.find((step) => !input[step.key].trim());
  const percent = Math.round((done.length / STEP_DEFS.length) * 100);
  const badges = [
    { key: "detective", label: "Trait Detective", earned: Boolean(input.environment.trim() && input.sharedTrait.trim()) },
    { key: "explorer", label: "Evolution Explorer", earned: Boolean(input.connectionNote.trim()) },
    { key: "master", label: "CER Master", earned: Boolean(input.claim.trim() && input.evidence.trim() && input.reasoning.trim()) },
  ];
  return { done: done.length, total: STEP_DEFS.length, percent, nextStep, badges };
}

export function ProgressPanel({ input, savedCount, onCertificate }: { input: ProgressInput; savedCount: number; onCertificate?: () => void }) {
  const { percent, nextStep, badges, total, done } = computeProgress(input);
  const allDone = percent === 100;

  return (
    <section className={allDone ? "progress-panel complete" : "progress-panel"} aria-label="Your progress">
      <div className="progress-head">
        <span className="eyebrow">your progress</span>
        <strong>{done}/{total} parts done</strong>
      </div>
      <div className="progress-meter" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <button
        type="button"
        className="whatnext"
        onClick={() => {
          const el = document.querySelector<HTMLElement>(`[data-step="${nextStep?.key ?? ""}"]`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          el?.querySelector<HTMLElement>("textarea, input")?.focus();
        }}
      >
        <ListChecks size={16} /> {allDone ? "All done — nice work!" : `What do I do next? → ${nextStep?.label}`}
      </button>
      {allDone ? (
        <p className="celebrate"><Sparkles size={16} /> CER complete! Save your card and print your certificate.</p>
      ) : null}
      {allDone && onCertificate ? (
        <button type="button" className="cert-button" onClick={onCertificate}>
          <Award size={16} /> Get my certificate
        </button>
      ) : null}
      <BadgeShelf badges={badges} streak={savedCount} />
    </section>
  );
}

function BadgeShelf({ badges, streak }: { badges: { key: string; label: string; earned: boolean }[]; streak: number }) {
  return (
    <div className="badge-shelf">
      {badges.map((badge) => (
        <span key={badge.key} className={badge.earned ? "badge-pill earned" : "badge-pill"}>
          {badge.earned ? <CheckCircle2 size={14} /> : <Medal size={14} />} {badge.label}
        </span>
      ))}
      <span className="badge-pill streak"><Award size={14} /> Cards saved: {streak}</span>
    </div>
  );
}
