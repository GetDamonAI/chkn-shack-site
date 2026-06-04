"use client";

import React, { useState, useMemo, useRef } from "react";

/**
 * CHKN SHACK — PARTY BUILDER
 * Visual modal wizard that recommends an order from the V2 menu based on
 * event, headcount, spice tolerance, dip attitude, and veg count.
 *
 * Ordering routes through Uber Eats / DoorDash, so the output gives a
 * copyable order list + buttons that open your store on each platform.
 *
 * 👉 Reuse your existing store URLs from src/components/home/hero-order-actions.tsx
 */
// Ordering routes through the Uber Eats / DoorDash web stores.
// No store URLs yet → leave ORDERING_LIVE = false to ship now with no dead links.
// When the UE/DD web store integrations go in: paste the URLs below (or import them
// from your ordering.ts webUrls) and flip ORDERING_LIVE to true. The buttons light up.
const ORDERING_LIVE = false;
const UBER_EATS_URL = ""; // <-- CHKN Shack Uber Eats web store URL
const DOORDASH_URL = ""; // <-- CHKN Shack DoorDash web store URL

/* ---------- TYPES ---------- */
type EventKey = "catering" | "ufc" | "gameday" | "birthday" | "casual";
type DipKey = "purist" | "dipper" | "drown";

interface OrderItem {
  qty: number;
  name: string;
  detail?: string;
  price: number;
  kind: "wings" | "dips" | "sides" | "veg";
}
interface Order {
  items: OrderItem[];
  wingFlavors: string[];
  subtotal: number;
  perPerson: number;
  hasCrate: boolean;
  hasCombo: boolean;
}
interface BuildArgs {
  event: EventKey;
  people: number;
  spice: number;
  dipStyle: DipKey;
  veg: number;
}

/* ---------- MENU DATA (V2) ---------- */
const CRATES: { pc: number; price: number }[] = [
  { pc: 200, price: 245 },
  { pc: 100, price: 135 },
  { pc: 50, price: 75 },
];

const EVENTS: Record<EventKey, { label: string; blurb: string; per: number }> = {
  catering: { label: "Business Catering", blurb: "Feed the team, look like a hero", per: 6.5 },
  ufc: { label: "Fight Night", blurb: "Made for the main event", per: 7 },
  gameday: { label: "Big Game", blurb: "The big spread", per: 7 },
  birthday: { label: "Birthday Bash", blurb: "Celebration mode", per: 6 },
  casual: { label: "Casual Hang", blurb: "Low-key, high-flavor", per: 5 },
};

const SPICE: { label: string; short: string; pick: string }[] = [
  { label: "I cry at black pepper", short: "Mild only", pick: "all flavor, zero burn" },
  { label: "Keep it friendly", short: "Light heat", pick: "a gentle warm-up, nothing scary" },
  { label: "Bring some heat", short: "Medium", pick: "the crowd-pleaser sweet spot" },
  { label: "I like to suffer a little", short: "Hot", pick: "Jakarta Heat is calling" },
  { label: "I want to see God", short: "Maximum", pick: "Chilean Chilli, no mercy" },
];

const DIP_STYLES: Record<DipKey, { label: string; note: string }> = {
  purist: { label: "Dips? I'm a purist.", note: "A few, for the principle of it" },
  dipper: { label: "A dip for every wing", note: "The correct answer" },
  drown: { label: "Drown. It. All.", note: "Bottles. We're getting bottles." },
};

/* ---------- RECOMMENDATION ENGINE ---------- */
function buildOrder({ event, people, spice, dipStyle, veg }: BuildArgs): Order {
  const per = EVENTS[event].per;
  const targetWings = Math.max(10, Math.round((people * per) / 5) * 5);
  const items: OrderItem[] = [];

  // ----- WINGS -----
  const wingFlavors = pickFlavors(spice, people);
  if (people <= 2) {
    items.push({ qty: 1, name: "Solo Combo", detail: "10pc + fries + drink", price: 22, kind: "wings" });
    if (people === 2)
      items.push({ qty: 1, name: "Anchor Combo ★", detail: "20pc + loaded fries + 3 dips + drink", price: 36, kind: "wings" });
  } else if (people <= 5) {
    const anchors = Math.max(1, Math.round(targetWings / 20));
    items.push({ qty: anchors, name: "Anchor Combo ★", detail: "20pc + loaded fries + 3 dips + drink", price: 36, kind: "wings" });
  } else {
    let remaining = targetWings;
    for (const c of CRATES) {
      while (remaining >= c.pc * 0.8) {
        items.push({ qty: 1, name: `${c.pc}pc CHKN Crate`, detail: "wings + fries + dips, group format", price: c.price, kind: "wings" });
        remaining -= c.pc;
      }
    }
    if (remaining > 12) items.push({ qty: 1, name: "20pc Wings", detail: "top-up", price: 28, kind: "wings" });
    else if (remaining > 0) items.push({ qty: 1, name: "10pc Wings", detail: "top-up", price: 16, kind: "wings" });
  }

  const hasCrate = items.some((i) => i.name.includes("Crate"));
  const hasCombo = items.some((i) => i.name.includes("Combo"));

  // ----- DIPS -----
  let dipSets = 0;
  let bottles = 0;
  if (dipStyle === "purist") dipSets = Math.ceil(people / 6);
  if (dipStyle === "dipper") dipSets = Math.ceil(people / 3);
  if (dipStyle === "drown") {
    bottles = Math.max(1, Math.ceil(people / 6));
    dipSets = Math.ceil(people / 5);
  }
  const dipPicks = pickDips(spice);
  if (bottles > 0) items.push({ qty: bottles, name: "16oz Dip Bottle", detail: dipPicks.slice(0, 2).join(" / "), price: 9, kind: "dips" });
  if (dipSets > 0) items.push({ qty: dipSets, name: "Dip — 3 for $4", detail: dipPicks.join(" · "), price: 4, kind: "dips" });

  // ----- FRIES / SIDES -----
  if (!hasCrate || people > 8) items.push({ qty: 1, name: "Hot Honey Fries ★", detail: "the move", price: 8, kind: "sides" });
  if (people >= 8) items.push({ qty: 1, name: "Mac & Cheese Tray", detail: "feeds 6–8", price: 32, kind: "sides" });

  // ----- VEGETARIAN -----
  if (veg > 0) {
    const cauli = Math.max(1, Math.ceil(veg / 3));
    items.push({ qty: cauli, name: "Cauli Bites (veg)", detail: `for your ${veg} plant-based guest${veg > 1 ? "s" : ""}`, price: 8, kind: "veg" });
    items.push({ qty: 1, name: "Yam Fries", detail: "veg-friendly side", price: 7, kind: "veg" });
  }

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  return { items, wingFlavors, subtotal, perPerson: subtotal / people, hasCrate, hasCombo };
}

function pickFlavors(spice: number, people: number): string[] {
  const ladders: string[][] = [
    ["Honey Garlic", "Salt & Pepper", "Buffalo", "Lemon Pepper", "Maple Bacon", "Korean Sticky Sesame"],
    ["Buffalo", "Honey Garlic", "Lemon Pepper", "Honey Hot", "Korean Sticky Sesame", "Louisiana Sweet"],
    ["Buffalo", "Honey Hot", "Honey Garlic", "Lemon Pepper", "Texas Dry Rub", "Louisiana Sweet"],
    ["Honey Hot", "Jakarta Heat", "Buffalo", "Chilean Chilli", "Honey Stinger", "Texas Dry Rub"],
    ["Jakarta Heat", "Chilean Chilli", "Honey Stinger", "Honey Hot", "Buffalo", "Texas Dry Rub"],
  ];
  const n = Math.min(6, Math.max(2, Math.round(people / 4) + 1));
  return ladders[spice].slice(0, n);
}
function pickDips(spice: number): string[] {
  const base = ["House Ranch", "Hot Honey ★"];
  const extra = spice >= 3 ? ["Blue Cheese", "Garlic Aioli"] : ["Honey Mustard", "Chipotle Mayo"];
  return [...base, ...extra];
}

/* ---------- SMALL UI PIECES ---------- */
function Flame({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" className={on ? "flame on" : "flame"}>
      <path d="M12 2c1 4-2 5-2 8a4 4 0 0 0 8 0c0-1-.3-2-1-3 2 1 3 3.5 3 6a6 6 0 0 1-12 0c0-4 3-6 4-11z" />
    </svg>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function PartyBuilder({
  showHero = true,
  triggerLabel = "PLAN MY PARTY →",
  triggerClassName = "",
}: { showHero?: boolean; triggerLabel?: string; triggerClassName?: string } = {}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [event, setEvent] = useState<EventKey | null>(null);
  const [people, setPeople] = useState(8);
  const [spice, setSpice] = useState(2);
  const [dipStyle, setDipStyle] = useState<DipKey | null>(null);
  const [veg, setVeg] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLTextAreaElement>(null);
  const advTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance for tap-to-choose steps. The guarded timer means rapid taps
  // (e.g. ramping the spice meter up) keep resetting it, so it only moves on
  // after the last tap.
  const choose = (apply: () => void, target: number, delay = 220) => {
    apply();
    if (advTimer.current) clearTimeout(advTimer.current);
    advTimer.current = setTimeout(() => setStep(target), delay);
  };

  const order: Order | null = useMemo(
    () => (event && dipStyle ? buildOrder({ event, people, spice, dipStyle, veg }) : null),
    [event, people, spice, dipStyle, veg]
  );

  const reset = () => {
    if (advTimer.current) clearTimeout(advTimer.current);
    setStep(0);
    setEvent(null);
    setDipStyle(null);
    setVeg(0);
    setPeople(8);
    setSpice(2);
    setCopied(false);
  };

  const orderText = useMemo(() => {
    if (!order || !event) return "";
    const lines = [`CHKN SHACK — ${EVENTS[event].label} (${people} people)`, ""];
    order.items.forEach((i) => lines.push(`${i.qty}× ${i.name}${i.detail ? `  — ${i.detail}` : ""}`));
    lines.push("", `Flavors: ${order.wingFlavors.join(", ")}`);
    lines.push(`~$${order.subtotal} total  ·  ~$${order.perPerson.toFixed(0)}/person`, "", "Order on Uber Eats or DoorDash 🍗");
    return lines.join("\n");
  }, [order, event, people]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
    } catch {
      if (copyRef.current) {
        copyRef.current.select();
        document.execCommand("copy");
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const steps = ["What's the occasion?", "How many mouths?", "How much heat?", "Dip philosophy?", "Any plant people?"];

  return (
    <div className="pb-root">
      <style>{css}</style>

      {/* hero / entry point — use showHero=false on the homepage to get just the trigger button */}
      {showHero ? (
        <div className="pb-stage">
          <div className="pb-stage-tag">CHKN SHACK</div>
          <h1 className="pb-stage-h">DON&apos;T WING IT</h1>
          <p className="pb-stage-sub">Feeding a crowd? Fight night, catering, the big game — tell us the vibe and we&apos;ll build the order.</p>
          <button className="pb-cta" onClick={() => { reset(); setOpen(true); }}>PLAN MY PARTY →</button>
        </div>
      ) : (
        <button className={triggerClassName || "pb-cta"} onClick={() => { reset(); setOpen(true); }}>{triggerLabel}</button>
      )}

      {open && (
        <div className="pb-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="pb-modal" role="dialog" aria-modal="true">
            <div className="pb-head">
              <div className="pb-brand"><span className="pb-dot" />DON&apos;T WING IT</div>
              <button className="pb-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>

            {step < 5 && (
              <div className="pb-progress">
                {steps.map((_, i) => <span key={i} className={`pb-pip ${i <= step ? "fill" : ""}`} />)}
              </div>
            )}

            <div className="pb-body" key={step}>
              {step === 0 && (
                <>
                  <h2 className="pb-q">{steps[0]}</h2>
                  <div className="pb-grid">
                    {(Object.entries(EVENTS) as [EventKey, { label: string; blurb: string; per: number }][]).map(([k, v]) => (
                      <button key={k} className={`pb-card ${event === k ? "sel" : ""}`} onClick={() => choose(() => setEvent(k), 1)}>
                        <span className="pb-card-t">{v.label}</span>
                        <span className="pb-card-b">{v.blurb}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="pb-q">{steps[1]}</h2>
                  <div className="pb-count">
                    <button className="pb-step-btn" onClick={() => setPeople((p) => Math.max(1, p - 1))}>–</button>
                    <div className="pb-count-num">{people}<span>{people === 1 ? "person" : "people"}</span></div>
                    <button className="pb-step-btn" onClick={() => setPeople((p) => Math.min(80, p + 1))}>+</button>
                  </div>
                  <input className="pb-slider" type="range" min={1} max={80} value={people} onChange={(e) => setPeople(+e.target.value)} />
                  <div className="pb-hint">{people >= 40 ? "Now we're talking. That's crate territory." : people >= 12 ? "Solid crowd — crates incoming." : people <= 3 ? "Intimate. Combo energy." : "Good-sized hang."}</div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="pb-q">{steps[2]}</h2>
                  <div className="pb-flames">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <button key={i} className="pb-flame-btn" onClick={() => setSpice(i)} aria-label={SPICE[i].short}>
                        <Flame on={i <= spice} />
                      </button>
                    ))}
                  </div>
                  <div className="pb-spice-label">{SPICE[spice].label}</div>
                  <div className="pb-hint">{SPICE[spice].short} · {SPICE[spice].pick}</div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="pb-q">{steps[3]}</h2>
                  <div className="pb-list">
                    {(Object.entries(DIP_STYLES) as [DipKey, { label: string; note: string }][]).map(([k, v]) => (
                      <button key={k} className={`pb-row ${dipStyle === k ? "sel" : ""}`} onClick={() => choose(() => setDipStyle(k), 4)}>
                        <span className="pb-row-t">{v.label}</span>
                        <span className="pb-row-b">{v.note}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="pb-q">{steps[4]}</h2>
                  <p className="pb-hint" style={{ marginTop: -4 }}>How many in the crew don&apos;t do meat? We&apos;ll sort them out.</p>
                  <div className="pb-count">
                    <button className="pb-step-btn" onClick={() => setVeg((v) => Math.max(0, v - 1))}>–</button>
                    <div className="pb-count-num">{veg}<span>veg</span></div>
                    <button className="pb-step-btn" onClick={() => setVeg((v) => Math.min(people, v + 1))}>+</button>
                  </div>
                  <div className="pb-hint">{veg === 0 ? "All carnivores. Understood." : "Cauli Bites + veg sides incoming."}</div>
                </>
              )}

              {step === 5 && order && event && (
                <div className="pb-result">
                  <div className="pb-result-flames">{Array.from({ length: spice + 1 }).map((_, i) => <Flame key={i} on />)}</div>
                  <h2 className="pb-result-h">YOUR {EVENTS[event].label.toUpperCase()} SPREAD</h2>
                  <div className="pb-result-sub">{people} people · ~${order.subtotal} · ~${order.perPerson.toFixed(0)}/person</div>

                  <div className="pb-order">
                    {order.items.map((i, idx) => (
                      <div className="pb-oi" key={idx}>
                        <span className="pb-oi-q">{i.qty}×</span>
                        <span className="pb-oi-main"><b>{i.name}</b>{i.detail && <em>{i.detail}</em>}</span>
                        <span className="pb-oi-p">${i.qty * i.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pb-flavors">
                    <span className="pb-flavors-lab">FLAVORS</span>
                    {order.wingFlavors.map((f) => <span className="pb-chip" key={f}>{f}</span>)}
                  </div>

                  <div className="pb-note">Crates &amp; combos already include fries + dips. Final pricing shows at checkout.</div>

                  <button className="pb-copy primary" onClick={copy}>{copied ? "✓ Copied — now paste it on Uber Eats or DoorDash" : "Copy my order list"}</button>

                  {ORDERING_LIVE && UBER_EATS_URL && DOORDASH_URL ? (
                    <div className="pb-order-actions">
                      <a className="pb-order-btn ue" href={UBER_EATS_URL} target="_blank" rel="noreferrer">Order on Uber Eats</a>
                      <a className="pb-order-btn dd" href={DOORDASH_URL} target="_blank" rel="noreferrer">Order on DoorDash</a>
                    </div>
                  ) : (
                    <div className="pb-platforms">Order it on <span>Uber Eats</span> or <span>DoorDash</span></div>
                  )}
                  <textarea ref={copyRef} className="pb-hidden-ta" value={orderText} readOnly />
                </div>
              )}
            </div>

            <div className="pb-foot">
              <div className="pb-foot-l">
                {step === 0 && <span className="pb-foot-hint">Tap to choose</span>}
                {step > 0 && <button className="pb-back" onClick={() => setStep((s) => s - 1)}>← Back</button>}
              </div>
              <div className="pb-foot-r">
                {(step === 1 || step === 2 || step === 4) && (
                  <button className="pb-next" onClick={() => setStep((s) => s + 1)}>
                    {step === 4 ? "Build my order 🍗" : "Next →"}
                  </button>
                )}
                {step === 5 && <button className="pb-startover" onClick={reset}>↻ Start over</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&display=swap');
.pb-root{--bg:#0b0b0c;--panel:#161513;--panel2:#1f1d1a;--cream:#f4ecd6;--red:#e0342a;--orange:#ef7d2d;--gold:#f5c33b;--muted:#8f897d;--line:rgba(244,236,214,.12);
  font-family:'Archivo','Trebuchet MS','Avenir Next','Segoe UI',sans-serif;color:var(--cream);position:relative;}
.pb-root *{box-sizing:border-box;}
.pb-stage{background:radial-gradient(120% 120% at 70% -10%,#211c16 0%,var(--bg) 55%);border:1px solid var(--line);border-radius:18px;padding:54px 40px;text-align:center;overflow:hidden;}
.pb-stage-tag{font-size:12px;letter-spacing:.28em;color:var(--orange);font-weight:700;margin-bottom:14px;}
.pb-stage-h{font-family:'Anton';font-size:clamp(38px,7vw,72px);line-height:.92;margin:0 0 12px;letter-spacing:.01em;}
.pb-stage-sub{color:var(--muted);max-width:440px;margin:0 auto 26px;font-size:15px;line-height:1.5;}
.pb-cta{font-family:'Anton';letter-spacing:.04em;font-size:18px;color:#1a0f08;background:linear-gradient(180deg,var(--gold),var(--orange));border:none;padding:16px 30px;border-radius:12px;cursor:pointer;box-shadow:0 10px 30px rgba(239,125,45,.35);transition:transform .15s;}
.pb-cta:hover{transform:translateY(-2px) scale(1.02);}
.pb-overlay{position:fixed;inset:0;background:rgba(5,5,6,.78);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:18px;z-index:9999;animation:fade .25s ease;}
.pb-modal{width:100%;max-width:480px;max-height:92vh;overflow:auto;background:linear-gradient(180deg,var(--panel),#100f0d);border:1px solid var(--line);border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:pop .3s cubic-bezier(.2,.9,.3,1.2);}
.pb-modal::-webkit-scrollbar{width:8px;}.pb-modal::-webkit-scrollbar-thumb{background:#2a2824;border-radius:8px;}
.pb-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px 8px;}
.pb-brand{font-family:'Anton';letter-spacing:.06em;font-size:18px;display:flex;align-items:center;gap:9px;}
.pb-dot{width:10px;height:10px;border-radius:50%;background:var(--red);box-shadow:0 0 12px var(--red);}
.pb-x{background:none;border:none;color:var(--muted);font-size:26px;line-height:1;cursor:pointer;padding:0 4px;}
.pb-x:hover{color:var(--cream);}
.pb-progress{display:flex;gap:6px;padding:6px 22px 0;}
.pb-pip{height:4px;flex:1;border-radius:3px;background:#2a2824;transition:background .3s;}
.pb-pip.fill{background:linear-gradient(90deg,var(--orange),var(--gold));}
.pb-body{padding:22px;animation:slide .3s ease;}
.pb-q{font-family:'Anton';font-size:26px;line-height:1.05;margin:6px 0 18px;}
.pb-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.pb-card{text-align:left;background:var(--panel2);border:1.5px solid var(--line);border-radius:13px;padding:14px;cursor:pointer;transition:.18s;display:flex;flex-direction:column;gap:4px;}
.pb-card:hover{border-color:var(--orange);transform:translateY(-2px);}
.pb-card.sel{border-color:var(--gold);background:#241f17;box-shadow:0 0 0 1px var(--gold);}
.pb-card-t{font-weight:700;font-size:15px;}
.pb-card-b{font-size:12px;color:var(--muted);line-height:1.3;}
.pb-count{display:flex;align-items:center;justify-content:center;gap:22px;margin:10px 0 18px;}
.pb-step-btn{width:54px;height:54px;border-radius:50%;border:1.5px solid var(--line);background:var(--panel2);color:var(--cream);font-size:28px;cursor:pointer;transition:.15s;}
.pb-step-btn:hover{border-color:var(--orange);color:var(--orange);}
.pb-count-num{font-family:'Anton';font-size:56px;line-height:.9;text-align:center;min-width:110px;}
.pb-count-num span{display:block;font-family:'Archivo';font-size:13px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;margin-top:4px;}
.pb-slider{width:100%;accent-color:var(--orange);height:4px;}
.pb-hint{text-align:center;color:var(--muted);font-size:13px;margin-top:14px;min-height:18px;}
.pb-flames{display:flex;justify-content:center;gap:6px;margin:8px 0 14px;}
.pb-flame-btn{background:none;border:none;cursor:pointer;padding:6px;transition:transform .15s;}
.pb-flame-btn:hover{transform:scale(1.25);}
.flame{fill:#332f29;transition:.2s;}
.flame.on{fill:var(--orange);filter:drop-shadow(0 0 6px rgba(239,125,45,.7));}
.pb-spice-label{font-family:'Anton';text-align:center;font-size:22px;color:var(--gold);}
.pb-list{display:flex;flex-direction:column;gap:10px;}
.pb-row{text-align:left;background:var(--panel2);border:1.5px solid var(--line);border-radius:13px;padding:15px 16px;cursor:pointer;transition:.18s;}
.pb-row:hover{border-color:var(--orange);}
.pb-row.sel{border-color:var(--gold);background:#241f17;box-shadow:0 0 0 1px var(--gold);}
.pb-row-t{display:block;font-weight:700;font-size:16px;}
.pb-row-b{display:block;font-size:12px;color:var(--muted);margin-top:3px;}
.pb-result{animation:fade .35s ease;}
.pb-result-flames{display:flex;justify-content:center;gap:2px;margin-bottom:6px;}
.pb-result-h{font-family:'Anton';font-size:25px;line-height:1.02;text-align:center;margin:2px 0 4px;}
.pb-result-sub{text-align:center;color:var(--gold);font-weight:600;font-size:14px;margin-bottom:16px;}
.pb-order{background:var(--bg);border:1px solid var(--line);border-radius:13px;overflow:hidden;}
.pb-oi{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--line);}
.pb-oi:last-child{border-bottom:none;}
.pb-oi-q{font-family:'Anton';color:var(--orange);font-size:17px;min-width:30px;}
.pb-oi-main{flex:1;display:flex;flex-direction:column;}
.pb-oi-main b{font-size:14px;font-weight:700;}
.pb-oi-main em{font-style:normal;font-size:11.5px;color:var(--muted);margin-top:2px;}
.pb-oi-p{font-weight:700;color:var(--cream);font-size:14px;}
.pb-flavors{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:15px 0 4px;}
.pb-flavors-lab{font-size:11px;letter-spacing:.18em;color:var(--muted);margin-right:4px;}
.pb-chip{background:#241f17;border:1px solid rgba(245,195,59,.3);color:var(--gold);font-size:12px;font-weight:600;padding:5px 10px;border-radius:20px;}
.pb-note{font-size:11.5px;color:var(--muted);line-height:1.45;margin:12px 0 16px;text-align:center;}
.pb-order-actions{display:flex;gap:10px;margin-bottom:10px;}
.pb-order-btn{flex:1;text-align:center;text-decoration:none;font-weight:700;font-size:14px;padding:14px;border-radius:11px;transition:.15s;}
.pb-order-btn.ue{background:#06c167;color:#04130b;}
.pb-order-btn.dd{background:#ff3008;color:#fff;}
.pb-order-btn:hover{transform:translateY(-2px);filter:brightness(1.05);}
.pb-copy{width:100%;background:none;border:1.5px dashed var(--line);color:var(--cream);padding:13px;border-radius:11px;cursor:pointer;font-size:13.5px;font-weight:600;transition:.15s;}
.pb-copy:hover{border-color:var(--gold);color:var(--gold);}
.pb-copy.primary{background:linear-gradient(180deg,var(--gold),var(--orange));border:1.5px solid transparent;color:#1a0f08;font-weight:700;margin-bottom:10px;}
.pb-copy.primary:hover{transform:translateY(-2px);color:#1a0f08;border-color:transparent;}
.pb-platforms{text-align:center;color:var(--muted);font-size:13px;}
.pb-platforms span{color:var(--cream);font-weight:700;}
.pb-hidden-ta{position:absolute;left:-9999px;opacity:0;}
.pb-foot{display:flex;align-items:center;justify-content:space-between;padding:8px 22px 22px;}
.pb-foot-l,.pb-foot-r{display:flex;align-items:center;gap:10px;}
.pb-foot-hint{color:var(--muted);font-size:13px;font-style:italic;}
.pb-back{background:var(--panel2);border:1.5px solid var(--line);color:var(--cream);font-size:14px;font-weight:700;padding:11px 22px;border-radius:11px;cursor:pointer;transition:.15s;}
.pb-back:hover{border-color:var(--gold);color:var(--gold);transform:translateX(-3px);}
.pb-startover{background:none;border:none;color:var(--muted);font-size:13px;font-weight:600;cursor:pointer;}
.pb-startover:hover{color:var(--cream);}
.pb-next{font-family:'Anton';letter-spacing:.03em;font-size:16px;color:#1a0f08;background:linear-gradient(180deg,var(--gold),var(--orange));border:none;padding:13px 24px;border-radius:11px;cursor:pointer;transition:.15s;}
.pb-next:hover:not(:disabled){transform:translateY(-2px);}
.pb-next:disabled{opacity:.4;cursor:not-allowed;}
.pb-next.ghost{background:none;border:1.5px solid var(--line);color:var(--cream);}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pop{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:none}}
@keyframes slide{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}
@media(max-width:520px){.pb-grid{grid-template-columns:1fr;}}
`;
