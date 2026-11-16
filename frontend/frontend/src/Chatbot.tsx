import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { universities } from "./data";
import type { University, Degree } from "./data";
import "./Chatbot.css";

type Msg = { from: "bot" | "user"; text: string; chips?: string[] };
type Props = { currentUni?: University | null };
type Intent = "documents" | "process" | "fees" | "dates" | "link" | null;

const DISCLAIMER = "\n\n(Details change every year. Please confirm with UGC and the university.)";

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

//  keyword detection 
const detectIntent = (q: string): Intent => {
  if (has(q, ["document", "pathra", "patra", "lekhana", "certificate", "bring", "what to take", "ona deval"])) return "documents";
  if (has(q, ["fee", "fees", "gaana", "gana", "gasthu", "salli", "payment", "pay ", "cost", "how much"])) return "fees";
  if (has(q, ["date", "dawas", "dinaya", "dina", "kawadada", "kawada", "when", "deadline", "last day"])) return "dates";
  if (has(q, ["website", "link", "official", "site eka", "url"])) return "link";
  if (has(q, ["process", "step", "how to", "kohomada", "procedure", "register", "registration", "liyapadinchi", "liyapadinchiya"])) return "process";
  return null;
};

const findUni = (q: string): University | undefined => {
  const tokens = q.split(/[^a-z0-9]+/);
  return universities.find(
    (u) =>
      (u.id && tokens.includes(u.id.toLowerCase())) ||
      (u.shortName && tokens.includes(u.shortName.toLowerCase())) ||
      (u.name && q.includes(u.name.toLowerCase())) ||
      (u.name && q.includes(u.name.toLowerCase().replace("university of ", ""))) ||
      (u.location && q.includes(u.location.toLowerCase()))
  );
};

const STOP = new Set(["bsc", "hons", "science", "the", "and", "for", "bachelor", "laws"]);

const findDegree = (q: string, uni?: University): { uni: University; degree: Degree } | undefined => {
  const pool = uni ? [uni] : universities;
  let best: { uni: University; degree: Degree; score: number } | undefined;
  for (const u of pool) {
    if (!u.degrees) continue;
    for (const d of u.degrees) {
      const words = (d.name || "")
        .toLowerCase()
        .replace(/[^a-z ]/g, " ")
        .split(" ")
        .filter((w) => w.length > 2 && !STOP.has(w));
      const score = words.filter((w) => q.includes(w)).length;
      if (score > 0 && (!best || score > best.score)) best = { uni: u, degree: d, score };
    }
  }
  return best;
};

// answers 
type Reply = { text: string; chips?: string[] };

const uniChips = () => universities.map((u) => u.name);

const answerRegistration = (intent: Exclude<Intent, null>, uni: University): Reply => {
  const r = uni.registration;
  if (!r) {
    return { text: `Registration details for ${uni.name} are not available right now.` };
  }
  switch (intent) {
    case "documents":
      return {
        text: `📄 Documents needed for ${uni.name}:\n` + (r.documents || []).map((d) => "• " + d).join("\n") + DISCLAIMER,
        chips: ["Registration steps", "Registration fees", "Registration dates"],
      };
    case "process":
      return {
        text: `📝 How to register at ${uni.name}:\n` + (r.process || []).map((s, i) => `${i + 1}. ${s}`).join("\n") + DISCLAIMER,
        chips: ["What documents do I need?", "Registration fees", "Registration dates"],
      };
    case "fees":
      return { text: `💰 Fees at ${uni.name}:\n${r.fees || "Check university notice"}` + DISCLAIMER, chips: ["What documents do I need?", "Registration dates"] };
    case "dates":
      return { text: `📅 Dates at ${uni.name}:\n${r.dates || "Check university notice"}` + DISCLAIMER, chips: ["What documents do I need?", "Registration steps"] };
    case "link":
      return { text: `🔗 Official registration info:\n${r.officialLink || uni.website}\nUniversity website: ${uni.website}` };
  }
};

const answerDegree = (uni: University, d: Degree): Reply => ({
  text:
    `${d.icon || "📚"} ${d.name} — ${uni.name}\n` +
    `${d.faculty} • ${d.duration} • ${d.medium}\n\n${d.description}\n\n` +
    `Job demand: ${d.jobMarket?.demand || "N/A"}. ${d.jobMarket?.notes || ""}\n` +
    `Careers: ${(d.careers || []).slice(0, 4).join(", ")}.\n\n` +
    `Open the university page → Degree Programs for full course content.`,
  chips: ["What documents do I need?", "Registration steps"],
});

export default function Chatbot({ currentUni }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! 👋 I'm the UniPath helper. Ask me about registration documents, steps, fees, dates or degrees.\n(English / Singlish both OK)",
      chips: ["What documents do I need?", "How to register?", "Registration dates"],
    },
  ]);
  const lastUni = useRef<University | undefined>(undefined);
  const lastIntent = useRef<Intent>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const reply = (raw: string): Reply => {
    try {
      const q = raw.toLowerCase().trim();

      if (/^(hi|hello|hey|ayubowan|hari|hii|helo)\b/.test(q) && q.length < 20) {
        return { text: "Hello! 😊 What would you like to know about registration?", chips: ["What documents do I need?", "How to register?"] };
      }
      if (has(q, ["thank", "thanks", "sthuti", "stuti"])) {
        return { text: "You're welcome! Good luck with your university life 🎓" };
      }

      const mentionedUni = findUni(q);
      const uni = mentionedUni ?? currentUni ?? lastUni.current;
      const intent = detectIntent(q);

      if (intent) {
        lastIntent.current = intent;
        if (!uni) return { text: "Which university are you asking about?", chips: uniChips() };
        lastUni.current = uni;
        return answerRegistration(intent, uni);
      }

      const dg = findDegree(q, mentionedUni ?? currentUni ?? undefined) ?? findDegree(q);
      if (dg) {
        lastUni.current = dg.uni;
        return answerDegree(dg.uni, dg.degree);
      }

      if (mentionedUni) {
        lastUni.current = mentionedUni;
        if (lastIntent.current) return answerRegistration(lastIntent.current, mentionedUni);
        return {
          text: `${mentionedUni.name} (${mentionedUni.location})\n${mentionedUni.about}\n\nDegrees: ${(mentionedUni.degrees || []).map((d) => d.name).join(", ")}`,
          chips: ["What documents do I need?", "How to register?", "Registration dates"],
        };
      }

      if (has(q, ["degree", "course", "program", "subject", "mokakda hadanne"])) {
        return { text: "Which university's degrees do you want to see?", chips: uniChips() };
      }
      if (has(q, ["z-score", "zscore", "z score", "cut-off", "cutoff", "cut off", "select wenawada", "chance"])) {
        return { text: "Use the 🎯 \"Find my degree\" page at the top. Enter your Z-score, district and stream, and it shows which degrees you can get and the campus demand." };
      }
      if (has(q, ["hostel", "accommodation", "boarding", "annex", "nevasikagara", "nivasa"])) {
        return {
          text: "Open the 🏠 \"Hostels\" page at the top. It shows how to apply for the university hostel (official links per university), a sheet to prepare your application details, and a map of boarding places near your campus." + DISCLAIMER,
        };
      }
      if (has(q, ["mahapola", "bursary", "scholarship"])) {
        return {
          text: "Mahapola and bursary details depend on the university and on your family income. Please check the university's registration notice and its Student Welfare office." + DISCLAIMER,
        };
      }
      if (has(q, ["help", "what can you", "mokada karanna puluwan"])) {
        return {
          text: "I can help with:\n• Documents to bring\n• Registration steps\n• Fees and dates\n• Degree information\n• University websites",
          chips: ["What documents do I need?", "How to register?", "Registration fees"],
        };
      }

      return {
        text: "Sorry, I didn't understand that 😅 Try asking about documents, registration steps, fees, dates or a degree name (e.g. \"documents for UoM\").",
        chips: ["What documents do I need?", "How to register?", "Registration dates"],
      };
    } catch (err) {
      console.error("Chatbot error:", err);
      return {
        text: "Oops! Something went wrong while processing that. Please try asking in a different way.",
        chips: ["What documents do I need?", "How to register?"],
      };
    }
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      const r = reply(t);
      setMsgs((m) => [...m, { from: "bot", text: r.text, chips: r.chips }]);
    }, 300);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    send(input);
  };

  return (
    <>
      {!open && (
        <button type="button" className="chat-fab" onClick={() => setOpen(true)} aria-label="Open help chat">
          💬 Ask UniPath
        </button>
      )}

      {open && (
        <div className="chat-box" role="dialog" aria-label="UniPath helper">
          <div className="chat-head">
            <strong>🤖 UniPath Helper</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={"chat-msg " + m.from}>
                <div className="chat-bubble">{m.text}</div>
                {m.from === "bot" && m.chips && i === msgs.length - 1 && (
                  <div className="chat-chips">
                    {m.chips.map((c) => (
                      <button type="button" key={c} onClick={() => send(c)}>{c}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottom} />
          </div>

          <form className="chat-input" onSubmit={submit}>
            <input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}