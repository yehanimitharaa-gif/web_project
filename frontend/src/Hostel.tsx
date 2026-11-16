import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { universities } from "./data";
import "./Hostel.css";

type Props = { initialUniId?: string };

// campus locations 
const campusLoc: Record<string, { lat: number; lng: number }> = {
  uoc: { lat: 6.9022, lng: 79.8612 },
  uom: { lat: 6.7951, lng: 79.9008 },
  sjp: { lat: 6.8528, lng: 79.9035 },
  pdn: { lat: 7.2543, lng: 80.5962 },
};

//hostel info 

type HostelInfo = {
  summary: string;
  apply: string[];
  documents: string[];
  links: { label: string; url: string }[];
};

const hostelInfo: Record<string, HostelInfo> = {
  uoc: {
    summary: "University of Colombo is not a fully residential university. Hostel places are very limited.",
    apply: [
      "Get the hostel application form (Sinhala / English) from the official hostels page.",
      "Fill EVERY box. Write \"Not applicable\" where something does not apply, because incomplete forms are rejected.",
      "Hand in the filled form on your registration day.",
      "Watch the faculty / Student & Staff Welfare notices for the selected list.",
    ],
    documents: [
      "Parents' / guardian's annual income certificate",
      "Certificate of the number of family members",
      "Medical certificates (only if applying on a sickness basis)",
      "Proof if a family member is a student at another university",
    ],
    links: [
      { label: "UoC hostels page (application form)", url: "https://cmb.ac.lk/hostels" },
      { label: "Freshers hostel application (PDF, English)", url: "https://cmb.ac.lk/wp-content/uploads/application_hostel_freshers_only_english.pdf" },
    ],
  },
  uom: {
    summary: "Hostels are run by the university. Only first-year and final-year students are eligible.",
    apply: [
      "Open the official student accommodation page.",
      "Ask the Warden or SAR / Student Welfare about your eligibility and the current application notice.",
      "Submit the application the way the notice says, before the deadline.",
    ],
    documents: ["Check the current notice. The list of required documents is announced by the university."],
    links: [{ label: "UoM student accommodation", url: "https://uom.lk/student-accommodation" }],
  },
  sjp: {
    summary: "Hostel forms are normally handed in on your registration date to the Student Welfare Branch.",
    apply: [
      "Download the latest first-year hostel application from the university website (Student Welfare / Notices).",
      "Fill it fully. Past forms say appeals are not accepted, so include all supporting information the first time.",
      "Hand it in on your registration date at the Student Welfare Branch, Gangodawila, Nugegoda.",
    ],
    documents: [
      "Parents' income certificate certified by an authorised officer",
      "Grama Niladhari certificate confirming your residence",
      "Samurdhi beneficiary proof (if applicable)",
    ],
    links: [{ label: "USJ website (search \"hostel\")", url: "https://www.sjp.ac.lk" }],
  },
  pdn: {
    summary: "Peradeniya has 23 halls. Hostels are given mainly based on the distance from your home.",
    apply: [
      "Open the Student Accommodation Division website.",
      "Use its Residential Form, Distance Calculator and Hostel List pages.",
      "Hall fees, fines and damages are paid online (ipgss.pdn.ac.lk).",
    ],
    documents: ["Check the Residential Form. Low income (e.g. Samurdhi) and medical conditions are also considered."],
    links: [
      { label: "UoP Student Accommodation portal", url: "https://studaccommodation.pdn.ac.lk/student.php" },
      { label: "UoP accommodation policy", url: "https://www.pdn.ac.lk/student-accommodation/" },
    ],
  },
};


type Place = { id: string; name: string; kind: string; lat: number; lng: number; km: number };

const km = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const overpassQuery = (lat: number, lng: number, r: number) =>
  `[out:json][timeout:25];(` +
  `node(around:${r},${lat},${lng})[tourism~"hostel|guest_house|apartment"];` +
  `way(around:${r},${lat},${lng})[tourism~"hostel|guest_house|apartment"];` +
  `node(around:${r},${lat},${lng})[building=dormitory];` +
  `way(around:${r},${lat},${lng})[building=dormitory];` +
  `);out center 60;`;

const mapsSearch = (q: string) => "https://www.google.com/maps/search/" + encodeURIComponent(q);

const FORM_KEY = "unipath_hostel_form";

type Form = { name: string; district: string; distance: string; income: string; family: string; sibling: boolean; medical: boolean };
const emptyForm: Form = { name: "", district: "", distance: "", income: "", family: "", sibling: false, medical: false };

const loadForm = (): Form => {
  try {
    return { ...emptyForm, ...JSON.parse(localStorage.getItem(FORM_KEY) || "{}") };
  } catch {
    return emptyForm;
  }
};

export default function Hostel({ initialUniId }: Props) {
  const withInfo = universities.filter((u) => hostelInfo[u.id] && campusLoc[u.id]);
  const [uniId, setUniId] = useState(initialUniId && hostelInfo[initialUniId] ? initialUniId : withInfo[0].id);
  const [radius, setRadius] = useState(2000);
  const [places, setPlaces] = useState<Place[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState<Form>(loadForm);
  const [copied, setCopied] = useState(false);

  const uni = universities.find((u) => u.id === uniId)!;
  const info = hostelInfo[uniId];
  const loc = campusLoc[uniId];

  const mapDiv = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);

  // create the map once
  useEffect(() => {
    if (!mapDiv.current || map.current) return;
    map.current = L.map(mapDiv.current).setView([loc.lat, loc.lng], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => {
      map.current?.remove();
      map.current = null;
    };
    
  }, []);

  // load boarding places 
  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    setPlaces([]);
    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: "data=" + encodeURIComponent(overpassQuery(loc.lat, loc.lng, radius)),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: ctrl.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      })
      .then((data) => {
        const list: Place[] = (data.elements || [])
          .map((el: any) => {
            const lat = el.lat ?? el.center?.lat;
            const lng = el.lon ?? el.center?.lon;
            if (lat == null || lng == null) return null;
            const t = el.tags || {};
            const kind = t.tourism || (t.building === "dormitory" ? "dormitory" : "accommodation");
            return { id: el.type + el.id, name: t.name || `Unnamed ${kind}`, kind, lat, lng, km: km(loc, { lat, lng }) };
          })
          .filter(Boolean)
          .sort((a: Place, b: Place) => a.km - b.km);
        setPlaces(list);
        setStatus("done");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => ctrl.abort();
  }, [loc.lat, loc.lng, radius]);

  // draw markers
  useEffect(() => {
    if (!map.current || !layer.current) return;
    layer.current.clearLayers();
    map.current.setView([loc.lat, loc.lng], radius > 3000 ? 13 : 14);

    L.circleMarker([loc.lat, loc.lng], { radius: 11, color: "#1e3a8a", fillColor: "#2563eb", fillOpacity: 0.9 })
      .bindPopup(`<strong>${uni.name}</strong><br/>Campus (approximate)`)
      .addTo(layer.current);
    L.circle([loc.lat, loc.lng], { radius, color: "#93c5fd", weight: 1, fillOpacity: 0.05 }).addTo(layer.current);

    places.forEach((p) => {
      L.circleMarker([p.lat, p.lng], { radius: 7, color: "#166534", fillColor: "#22c55e", fillOpacity: 0.9 })
        .bindPopup(
          `<strong>${p.name}</strong><br/>${p.kind} · ${p.km.toFixed(1)} km from campus<br/>` +
            `<a href="${mapsSearch(p.lat + "," + p.lng)}" target="_blank" rel="noreferrer">Open in Google Maps</a>`
        )
        .addTo(layer.current!);
    });
  }, [places, loc.lat, loc.lng, radius, uni.name]);

  const setF = <K extends keyof Form>(k: K, v: Form[K]) => {
    const next = { ...form, [k]: v };
    setForm(next);
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const summary = useMemo(
    () =>
      [
        `Hostel application details - ${uni.name}`,
        `Name: ${form.name || "-"}`,
        `District: ${form.district || "-"}`,
        `Distance from home to university: ${form.distance ? form.distance + " km" : "-"}`,
        `Parents'/guardian's annual income: ${form.income ? "Rs. " + form.income : "-"}`,
        `Number of family members: ${form.family || "-"}`,
        `Family member in another university: ${form.sibling ? "Yes (certificate needed)" : "No"}`,
        `Medical condition: ${form.medical ? "Yes (medical certificate needed)" : "No"}`,
      ].join("\n"),
    [form, uni.name]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy these details:", summary);
    }
  };

  return (
    <section>
      <div className="hero">
        <h2>🏠 Hostels & boarding places</h2>
        <p>How to apply for the university hostel, and where to find boarding places near your campus.</p>
      </div>

      <div className="tabs">
        {withInfo.map((u) => (
          <button key={u.id} className={u.id === uniId ? "tab active" : "tab"} onClick={() => setUniId(u.id)}>
            {u.shortName}
          </button>
        ))}
      </div>

      {/* 1. official hostel info */}
      <div className="panel">
        <h3>1. University hostel — {uni.name}</h3>
        <p>{info.summary}</p>
        <h4>How to apply</h4>
        <ol>{info.apply.map((s) => <li key={s}>{s}</li>)}</ol>
        <h4>Documents usually needed</h4>
        <ul>{info.documents.map((d) => <li key={d}>{d}</li>)}</ul>
        <div className="form-actions">
          {info.links.map((l) => (
            <a key={l.url} className="ghost link-btn" href={l.url} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
        <p className="muted small-note">
          Most universities take the hostel application on paper (often on registration day). This page cannot submit it for you. Always
          use the university's official notice, because rules and dates change every year.
        </p>
      </div>

      {/* 2. application prep sheet */}
      <div className="panel hostel-block">
        <h3>2. Prepare your hostel application details</h3>
        <p className="muted">
          Fill this once, then copy the details onto the official form. Saved only in your own browser (not sent anywhere).
        </p>
        <div className="form-row">
          <label>Full name<input value={form.name} onChange={(e) => setF("name", e.target.value)} /></label>
          <label>District<input value={form.district} onChange={(e) => setF("district", e.target.value)} /></label>
          <label>Distance home → university (km)
            <input type="number" min="0" value={form.distance} onChange={(e) => setF("distance", e.target.value)} />
          </label>
          <label>Parents' annual income (Rs.)
            <input type="number" min="0" value={form.income} onChange={(e) => setF("income", e.target.value)} />
          </label>
          <label>Family members
            <input type="number" min="1" value={form.family} onChange={(e) => setF("family", e.target.value)} />
          </label>
          <label className="check">
            <input type="checkbox" checked={form.sibling} onChange={(e) => setF("sibling", e.target.checked)} />
            Family member at another university
          </label>
          <label className="check">
            <input type="checkbox" checked={form.medical} onChange={(e) => setF("medical", e.target.checked)} />
            Medical condition
          </label>
        </div>
        <pre className="hostel-summary">{summary}</pre>
        <div className="form-actions">
          <button className="primary small" onClick={copy}>{copied ? "Copied ✓" : "📋 Copy details"}</button>
        </div>
      </div>

      {/* 3. boarding map */}
      <div className="panel hostel-block">
        <h3>3. Boarding places near {uni.shortName}</h3>
        <div className="form-row">
          <label>
            Search radius
            <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
              {[1000, 2000, 3000, 5000].map((r) => <option key={r} value={r}>{r / 1000} km</option>)}
            </select>
          </label>
        </div>

        <div ref={mapDiv} className="hostel-map" />
        <p className="muted small-note">🔵 campus (approximate) · 🟢 places found on OpenStreetMap</p>

        {status === "loading" && <p className="muted">Searching nearby places…</p>}
        {status === "error" && <p className="error">Could not load nearby places right now. Use the Google Maps links below.</p>}
        {status === "done" && places.length === 0 && (
          <p className="muted">No mapped hostels / guest houses in this radius. Try a bigger radius or the Google Maps links below.</p>
        )}

        {places.length > 0 && (
          <ul className="place-list">
            {places.slice(0, 15).map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.name}</strong>
                  <span className="muted"> · {p.kind} · {p.km.toFixed(1)} km</span>
                </div>
                <a href={mapsSearch(p.lat + "," + p.lng)} target="_blank" rel="noreferrer">Map ↗</a>
              </li>
            ))}
          </ul>
        )}

        <h4>Search more on Google Maps</h4>
        <div className="form-actions">
          <a className="ghost link-btn" target="_blank" rel="noreferrer" href={mapsSearch(`boarding houses near ${uni.name}`)}>🏠 Boarding houses</a>
          <a className="ghost link-btn" target="_blank" rel="noreferrer" href={mapsSearch(`girls hostel near ${uni.name}`)}>👩 Girls' hostels</a>
          <a className="ghost link-btn" target="_blank" rel="noreferrer" href={mapsSearch(`boys hostel near ${uni.name}`)}>👨 Boys' hostels</a>
          <a className="ghost link-btn" target="_blank" rel="noreferrer" href={mapsSearch(`annex for rent near ${uni.name}`)}>🔑 Annexes</a>
        </div>

        <p className="muted small-note">
          OpenStreetMap does not list every boarding house, so many places will be missing. Before paying any deposit: visit in
          person, check the room and safety, and get the rent and rules in writing.
        </p>
      </div>
    </section>
  );
}