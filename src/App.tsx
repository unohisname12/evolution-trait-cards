import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useMutation, useQuery } from "convex/react";
import {
  BookOpen,
  Clock3,
  Download,
  Image,
  Printer,
  Save,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import "./App.css";
import { animals, lineages, type Animal } from "./catalog";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

type WikiImage = {
  key: string;
  url: string;
  source: string;
};

type CardDraft = {
  id: string;
  animalKey: string;
  name: string;
  title: string;
  period: string;
  connectionAnimal: string;
  connectionNote: string;
  environment: string;
  sharedTrait: string;
  adaptation: string;
  claim: string;
  evidence: string;
  reasoning: string;
  imageUrl: string;
  imageSource: string;
  color: string;
};

type StoredCard = CardDraft & {
  _id?: Id<"cards">;
};

const colors = ["#2563eb", "#059669", "#dc2626", "#7c3aed", "#ca8a04", "#0f766e"];
const startingAnimal = animals.find((animal) => animal.key === "human") ?? animals[0];

const makeDraft = (animal: Animal, image?: WikiImage): CardDraft => ({
  id: crypto.randomUUID(),
  animalKey: animal.key,
  name: animal.name,
  title: "My research card",
  period: animal.period,
  connectionAnimal: "",
  connectionNote: "",
  environment: "",
  sharedTrait: "",
  adaptation: "",
  claim: "",
  evidence: "",
  reasoning: "",
  imageUrl: image?.url ?? "",
  imageSource: image?.source ?? `Wikimedia/Wikipedia page: ${animal.wikiTitle}`,
  color: colors[Math.floor(Math.random() * colors.length)],
});

const exampleDraft = (): CardDraft => ({
  id: crypto.randomUUID(),
  animalKey: "human",
  name: "Nikola Jokić",
  title: "Human example",
  period: "Modern",
  connectionAnimal: "Chimpanzee",
  connectionNote:
    "Same: Nikola Jokić is a human, and humans share hands, forward-facing eyes, hair, and similar skeletons with chimpanzees. Different: humans usually walk upright; chimpanzees climb more and have longer arms.",
  environment: "Many environments, including cities, forests, farms, and grasslands",
  sharedTrait: "Humans and chimpanzees are both primates. They have hands, fingers, eyes in front, hair, and similar arm and leg bones.",
  adaptation: "Humans walk upright and use tools, language, and teamwork to survive in many places. Jokić's height is an individual trait, not the species adaptation.",
  claim: "Humans and chimpanzees share traits because they had common ancestors, but they are different because each group changed over time.",
  evidence:
    "A human hand and a chimpanzee hand both have five fingers and similar bones. Humans usually walk on two legs, while chimpanzees often climb and knuckle-walk.",
  reasoning:
    "The similar body parts show a connection from common ancestors. The differences show adaptations for different ways of living.",
  imageUrl: "",
  imageSource: "Wikimedia/Wikipedia page: Nikola Jokić",
  color: "#2563eb",
});

const chimpExampleDraft = (): CardDraft => ({
  id: "chimp-example",
  animalKey: "chimpanzee",
  name: "Chimpanzee",
  title: "Example partner card",
  period: "Modern",
  connectionAnimal: "Nikola Jokić",
  connectionNote:
    "Same: chimpanzees and humans have hands, forward-facing eyes, hair, and similar skeletons. Different: chimpanzees climb more, have longer arms, and often knuckle-walk.",
  environment: "Tropical forests and woodlands",
  sharedTrait: "Chimpanzees and humans are both primates. They have fingers, nails, eyes in front, hair, and similar arm and leg bones.",
  adaptation: "Chimpanzees have long arms, strong hands, and flexible shoulders that help them climb and move through trees.",
  claim: "Chimpanzees and humans share traits because they had common ancestors, but they adapted to different ways of living.",
  evidence:
    "A chimpanzee hand and a human hand both have five fingers and similar bones, but chimpanzees use their arms more for climbing.",
  reasoning:
    "The similar hands and skeletons show a family connection. The different arm shape and movement show adaptations for different environments.",
  imageUrl: "",
  imageSource: "Wikimedia/Wikipedia page: Chimpanzee",
  color: "#059669",
});

const timeline = [
  { label: "All", when: "full timeline", meaning: "show animals from every time period in the app" },
  { label: "Modern", when: "today", meaning: "animals alive now, like whales, bats, dogs, birds, and humans" },
  { label: "Quaternary", when: "2.6 million years ago to now", meaning: "Ice Age animals and modern humans" },
  { label: "Cenozoic", when: "66 million years ago to now", meaning: "mammals and birds became very common" },
  { label: "Cretaceous", when: "145 to 66 million years ago", meaning: "last dinosaurs, early flowering plants, many reptiles" },
  { label: "Jurassic", when: "201 to 145 million years ago", meaning: "big dinosaurs, early birds, ocean reptiles" },
  { label: "Triassic", when: "252 to 201 million years ago", meaning: "first dinosaurs and early mammal relatives" },
  { label: "Permian", when: "299 to 252 million years ago", meaning: "many reptile-like and mammal-like land animals" },
  { label: "Devonian", when: "419 to 359 million years ago", meaning: "fish were common; early animals started moving toward land" },
  { label: "Cambrian", when: "538 to 485 million years ago", meaning: "many early ocean animals with shells, legs, and body parts" },
  { label: "Single-cell life", when: "billions of years ago", meaning: "life began with tiny cells before animals existed" },
];

const timelineOptions = timeline.map((item) => item.label);

function getTimelineInfo(label: string) {
  return timeline.find((item) => item.label === label) ?? timeline[0];
}

function matchesTimeline(animal: Animal, selectedPeriod: string) {
  if (selectedPeriod === "All") return true;
  if (selectedPeriod === "Single-cell life") return animal.period === "Single-cell life";
  if (selectedPeriod === "Modern") return animal.period === "Modern";
  if (selectedPeriod === "Cenozoic") {
    return (
      animal.era.includes("Cenozoic") ||
      ["Paleogene", "Neogene", "Paleogene-Neogene", "Quaternary", "Modern", "Modern extinct"].includes(animal.period)
    );
  }
  return animal.period === selectedPeriod;
}

function useWikiImage(animal: Animal | undefined) {
  const [image, setImage] = useState<WikiImage | undefined>();

  useEffect(() => {
    if (!animal) return;
    const controller = new AbortController();

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animal.wikiTitle)}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((data) => {
        if (!data) return;
        const url = data.thumbnail?.source || data.originalimage?.source || "";
        if (url) {
          setImage({
            key: animal.key,
            url,
            source: data.content_urls?.desktop?.page
              ? `Wikipedia/Wikimedia: ${data.content_urls.desktop.page}`
              : `Wikimedia/Wikipedia page: ${animal.wikiTitle}`,
          });
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.warn("Image lookup failed", error);
      });

    return () => controller.abort();
  }, [animal]);

  return { image: image?.key === animal?.key ? image : undefined };
}

function App() {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("Modern");
  const [lineage, setLineage] = useState("All");
  const [selectedKey, setSelectedKey] = useState(startingAnimal.key);
  const [draft, setDraft] = useState<CardDraft>(() => makeDraft(startingAnimal));
  const [compareKey, setCompareKey] = useState("chimpanzee");
  const [sameTrait, setSameTrait] = useState("");
  const [differentTrait, setDifferentTrait] = useState("");
  const [previewTab, setPreviewTab] = useState<"card" | "example">("card");
  const [localCards, setLocalCards] = useState<StoredCard[]>(() => {
    const saved = localStorage.getItem("trait-deck-cards");
    return saved ? JSON.parse(saved) : [];
  });
  const cardRef = useRef<HTMLElement>(null);
  const convexCards = useQuery(api.cards.list) as StoredCard[] | undefined;
  const saveConvexCard = useMutation(api.cards.save);
  const removeConvexCard = useMutation(api.cards.remove);
  const seedAnimals = useMutation(api.animals.seed);

  const selectedAnimal = animals.find((animal) => animal.key === selectedKey) ?? animals[0];
  const { image } = useWikiImage(selectedAnimal);
  const previewDraft = {
    ...draft,
    imageUrl: draft.imageUrl || image?.url || "",
    imageSource: draft.imageSource || image?.source || `Wikimedia/Wikipedia page: ${selectedAnimal.wikiTitle}`,
  };

  const filteredAnimals = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return animals.filter((animal) => {
      const matchesQuery =
        !needle ||
        [animal.name, animal.period, animal.environment, animal.lineage]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesPeriod = matchesTimeline(animal, period);
      const matchesLineage = lineage === "All" || animal.lineage === lineage;
      return matchesQuery && matchesPeriod && matchesLineage;
    });
  }, [lineage, period, query]);
  const visibleAnimals = [
    ...filteredAnimals.filter((animal) => animal.key === selectedKey),
    ...filteredAnimals.filter((animal) => animal.key !== selectedKey),
  ].slice(0, 12);
  const periodInfo = getTimelineInfo(period);

  useEffect(() => {
    localStorage.setItem("trait-deck-cards", JSON.stringify(localCards));
  }, [localCards]);

  useEffect(() => {
    seedAnimals({ animals }).catch((error) => console.warn("Convex catalog seed failed", error));
  }, [seedAnimals]);

  const savedCards = convexCards ?? localCards;
  const compareAnimal = animals.find((animal) => animal.key === compareKey) ?? animals[0];
  const connectionUnlocked = Boolean(
    draft.environment.trim() && draft.sharedTrait.trim() && draft.adaptation.trim() && draft.evidence.trim(),
  );

  const selectAnimal = (animal: Animal) => {
    setSelectedKey(animal.key);
    setDraft(makeDraft(animal));
    setSameTrait("");
    setDifferentTrait("");
  };

  const loadExample = () => {
    const exampleAnimal = animals.find((animal) => animal.key === "human");
    if (exampleAnimal) setSelectedKey(exampleAnimal.key);
    setDraft(exampleDraft());
    setCompareKey("chimpanzee");
    setSameTrait("hands, forward-facing eyes, hair, and similar arm and leg bones");
    setDifferentTrait("humans usually walk upright; chimpanzees climb more and have longer arms");
  };

  const makeConnection = () => {
    if (!connectionUnlocked || !sameTrait.trim() || !differentTrait.trim()) return;
    setDraft((current) => ({
      ...current,
      connectionAnimal: compareAnimal.name,
      connectionNote: `Same: ${sameTrait.trim()}. Different: ${differentTrait.trim()}. This shows they are connected, but each has traits that fit its way of living.`,
    }));
  };

  const saveCard = async () => {
    setLocalCards((cards) => [previewDraft, ...cards.filter((card) => card.id !== draft.id)]);
    await saveConvexCard(previewDraft).catch((error) => console.warn("Convex save failed", error));
  };

  const removeCard = async (card: StoredCard) => {
    setLocalCards((cards) => cards.filter((item) => item.id !== card.id && item._id !== card._id));
    if (card._id) {
      await removeConvexCard({ cardId: card._id }).catch((error) => console.warn("Convex remove failed", error));
    }
  };

  const downloadCard = async (card: CardDraft, node: HTMLElement | null) => {
    if (!node) return;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#fffdf7",
      filter: (element) => !element.classList?.contains("no-download"),
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${card.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-trait-card.png`;
    link.click();
  };

  const uploadImage = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setDraft((current) => ({
          ...current,
          imageUrl: reader.result as string,
          imageSource: current.imageSource || `Uploaded file: ${file.name}`,
        }));
      }
    });
    reader.readAsDataURL(file);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(savedCards, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "trait-deck-cards.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CER evolution card builder</p>
          <h1>Trait Deck</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" onClick={loadExample}>
            <BookOpen size={18} /> Load example
          </button>
          <button type="button" onClick={saveCard}>
            <Save size={18} /> Save
          </button>
          <button type="button" onClick={() => window.print()}>
            <Printer size={18} /> Print
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="library">
          <TimelineGuide period={period} onPeriodChange={setPeriod} />
          <div className="searchbar">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search animal or group..."
            />
          </div>
          <div className="filters">
            <select value={lineage} onChange={(event) => setLineage(event.target.value)}>
              <option>All</option>
              {lineages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="library-count">
            Showing {visibleAnimals.length} of {filteredAnimals.length} matches
          </div>
          <div className="hint-box">
            <strong>{periodInfo.label}:</strong> {periodInfo.meaning}. Pick an animal for the image and time period,
            then fill the trait answers from research.
          </div>
          {period === "Single-cell life" ? (
            <div className="hint-box quiet">
              This part of the timeline is before animals. These cards are simple life examples, so the student should
              compare cell traits instead of bones or limbs.
            </div>
          ) : null}
          <div className="animal-list">
            {visibleAnimals.map((animal) => (
              <button
                className={animal.key === selectedKey ? "animal-row selected" : "animal-row"}
                key={animal.key}
                type="button"
                onClick={() => selectAnimal(animal)}
              >
                <span>{animal.name}</span>
                <small>{animal.period} · {animal.lineage}</small>
              </button>
            ))}
          </div>
          {filteredAnimals.length > visibleAnimals.length ? (
            <div className="library-count">Search by name or animal group to narrow the list.</div>
          ) : null}
        </aside>

        <section className="builder">
          <div className="editor">
            <div className="editor-head">
              <div>
                <p className="eyebrow">student research workspace</p>
                <h2>{selectedAnimal.name}</h2>
              </div>
              <span className="badge">{selectedAnimal.era}</span>
            </div>
            <div className="word-help">
              <p><strong>Trait:</strong> a body feature or behavior.</p>
              <p><strong>Common ancestor:</strong> an older species two animals came from.</p>
              <p><strong>Adaptation:</strong> a trait that helps an animal survive.</p>
            </div>

            <label>
              Card title
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label>
              Time period
              <input value={draft.period} onChange={(event) => setDraft({ ...draft, period: event.target.value })} />
            </label>
            <label>
              Environment
              <input
                value={draft.environment}
                onChange={(event) => setDraft({ ...draft, environment: event.target.value })}
                placeholder={`Research where ${selectedAnimal.name} lives or lived`}
              />
            </label>
            <label>
              Shared trait from common ancestors
              <textarea
                value={draft.sharedTrait}
                onChange={(event) => setDraft({ ...draft, sharedTrait: event.target.value })}
                placeholder="What body part, bone pattern, DNA trait, or system is similar to a related animal?"
              />
            </label>
            <label>
              Adaptation for its environment
              <textarea
                value={draft.adaptation}
                onChange={(event) => setDraft({ ...draft, adaptation: event.target.value })}
                placeholder="What trait helps it survive where it lives?"
              />
            </label>
            <label>
              Claim
              <textarea
                value={draft.claim}
                onChange={(event) => setDraft({ ...draft, claim: event.target.value })}
                placeholder="What are you trying to prove about shared traits and differences?"
              />
            </label>
            <label>
              Evidence
              <textarea
                value={draft.evidence}
                onChange={(event) => setDraft({ ...draft, evidence: event.target.value })}
                placeholder="What fact, fossil, body structure, or DNA comparison did you find?"
              />
            </label>
            <section className={connectionUnlocked ? "connection-game unlocked" : "connection-game"}>
              <div>
                <p className="eyebrow">connection challenge</p>
                <h3>{connectionUnlocked ? "Unlocked" : "Locked until research is started"}</h3>
              </div>
              <p>
                Fill environment, shared trait, adaptation, and evidence first. Then compare this animal with another
                animal to make your own connection.
              </p>
              <label>
                Compare with
                <select disabled={!connectionUnlocked} value={compareKey} onChange={(event) => setCompareKey(event.target.value)}>
                  {animals.map((animal) => (
                    <option key={animal.key} value={animal.key}>{animal.name}</option>
                  ))}
                </select>
              </label>
              <label>
                What is the same?
                <textarea
                  disabled={!connectionUnlocked}
                  value={sameTrait}
                  onChange={(event) => setSameTrait(event.target.value)}
                  placeholder="Example: both have hands and forward-facing eyes"
                />
              </label>
              <label>
                What is different?
                <textarea
                  disabled={!connectionUnlocked}
                  value={differentTrait}
                  onChange={(event) => setDifferentTrait(event.target.value)}
                  placeholder="Example: one walks upright; one climbs more"
                />
              </label>
              <button
                type="button"
                disabled={!connectionUnlocked || !sameTrait.trim() || !differentTrait.trim()}
                onClick={makeConnection}
              >
                <Sparkles size={18} /> Make connection
              </button>
            </section>
            <label>
              Reasoning
              <textarea
                value={draft.reasoning}
                onChange={(event) => setDraft({ ...draft, reasoning: event.target.value })}
                placeholder="Explain how your evidence supports common ancestors and adaptation."
              />
            </label>
            <label>
              Image URL
              <input
                value={draft.imageUrl}
                onChange={(event) => setDraft({ ...draft, imageUrl: event.target.value })}
                placeholder="Paste an approved image URL or use the Wikimedia lookup"
              />
            </label>
            <label>
              Upload saved image
              <input accept="image/*" type="file" onChange={(event) => uploadImage(event.target.files?.[0])} />
            </label>
            <label>
              Image source
              <input
                value={draft.imageSource}
                onChange={(event) => setDraft({ ...draft, imageSource: event.target.value })}
              />
            </label>
            <div className="swatches" aria-label="Card color">
              {colors.map((color) => (
                <button
                  aria-label={`Use ${color}`}
                  className={draft.color === color ? "swatch active" : "swatch"}
                  key={color}
                  onClick={() => setDraft({ ...draft, color })}
                  style={{ background: color }}
                  type="button"
                />
              ))}
            </div>
          </div>

          <div className="preview-column">
            <div className="tabs" role="tablist" aria-label="Preview tabs">
              <button
                className={previewTab === "card" ? "tab active" : "tab"}
                type="button"
                onClick={() => setPreviewTab("card")}
              >
                My card
              </button>
              <button
                className={previewTab === "example" ? "tab active" : "tab"}
                type="button"
                onClick={() => setPreviewTab("example")}
              >
                Human + chimp example
              </button>
            </div>
            {previewTab === "card" ? (
              <>
                <TraitCard card={previewDraft} ref={cardRef} />
                <div className="actions-row">
                  <button type="button" onClick={saveCard}>
                    <Sparkles size={18} /> Add to print sheet
                  </button>
                  <button type="button" onClick={() => downloadCard(previewDraft, cardRef.current)}>
                    <Download size={18} /> Download card
                  </button>
                  <button type="button" onClick={exportJson} disabled={!savedCards.length}>
                    <Download size={18} /> Export
                  </button>
                </div>
              </>
            ) : (
              <ExamplePair />
            )}
          </div>
        </section>
      </section>

      <section className="print-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">print sheet</p>
            <h2>Saved Cards</h2>
          </div>
          <span>{savedCards.length} cards</span>
        </div>
        {savedCards.length ? (
          <div className="print-grid">
            {savedCards.map((card) => (
              <div className="saved-card" key={card.id}>
                <DownloadableSavedCard card={card} onDownload={downloadCard} />
                <button type="button" onClick={() => removeCard(card)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <BookOpen size={22} />
            Pick an animal, edit the CER details, then save it here for printing.
          </div>
        )}
      </section>
    </main>
  );
}

function ExamplePair() {
  const humanAnimal = animals.find((animal) => animal.key === "human");
  const jokicAnimal = useMemo(
    () =>
      humanAnimal
        ? { ...humanAnimal, key: "jokic_example", name: "Nikola Jokić", wikiTitle: "Nikola Jokić" }
        : undefined,
    [humanAnimal],
  );
  const chimpAnimal = animals.find((animal) => animal.key === "chimpanzee");
  const { image: humanImage } = useWikiImage(jokicAnimal);
  const { image: chimpImage } = useWikiImage(chimpAnimal);
  const humanCard = {
    ...exampleDraft(),
    imageUrl: humanImage?.url ?? "",
    imageSource: humanImage?.source ?? "Wikimedia/Wikipedia page: Nikola Jokić",
  };
  const chimpCard = {
    ...chimpExampleDraft(),
    imageUrl: chimpImage?.url ?? "",
    imageSource: chimpImage?.source ?? "Wikimedia/Wikipedia page: Chimpanzee",
  };

  return (
    <section className="example-pair">
      <div className="example-note">
        These two cards show the same idea from both sides: humans and chimpanzees share traits, but each has different
        adaptations.
      </div>
      <div className="example-grid">
        <TraitCard card={humanCard} />
        <TraitCard card={chimpCard} />
      </div>
    </section>
  );
}

function TimelineGuide({
  period,
  onPeriodChange,
}: {
  period: string;
  onPeriodChange: (period: string) => void;
}) {
  const info = getTimelineInfo(period);
  return (
    <section className="timeline-guide">
      <div className="mini-head">
        <Clock3 size={17} />
        <div>
          <p className="eyebrow">timeline guide</p>
          <h2>Now to early life</h2>
        </div>
      </div>
      <label className="time-picker">
        Choose a time
        <select value={period} onChange={(event) => onPeriodChange(event.target.value)}>
          {timelineOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <div className="timeline-item">
        <strong>{info.label}</strong>
        <span>{info.when}</span>
        <p>{info.meaning}</p>
      </div>
    </section>
  );
}

function DownloadableSavedCard({
  card,
  onDownload,
}: {
  card: StoredCard;
  onDownload: (card: CardDraft, node: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <>
      <TraitCard card={card} ref={ref} />
      <button className="no-download" type="button" onClick={() => onDownload(card, ref.current)}>
        <Download size={16} /> Download PNG
      </button>
    </>
  );
}

const TraitCard = forwardRef<HTMLElement, { card: CardDraft }>(function TraitCard({ card }, ref) {
  return (
    <article ref={ref} className="trait-card" style={{ "--card-color": card.color } as React.CSSProperties}>
      <header>
        <div>
          <p>{card.title}</p>
          <h3>{card.name}</h3>
        </div>
        <span>{card.period}</span>
      </header>
      <div className="image-box">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.name} />
        ) : (
          <div className="image-placeholder">
            <Image size={28} />
            Image area
          </div>
        )}
      </div>
      <dl>
        <div>
          <dt>Connects To</dt>
          <dd>{card.connectionAnimal || "Connection challenge"}</dd>
        </div>
        <div>
          <dt>Connection</dt>
          <dd>{card.connectionNote || "Make this after adding research."}</dd>
        </div>
        <div>
          <dt>Environment</dt>
          <dd>{card.environment || "Student research"}</dd>
        </div>
        <div>
          <dt>Shared Trait</dt>
          <dd>{card.sharedTrait || "Student research"}</dd>
        </div>
        <div>
          <dt>Adaptation</dt>
          <dd>{card.adaptation || "Student research"}</dd>
        </div>
      </dl>
      <section className="cer">
        <p><strong>C:</strong> {card.claim || "Student writes the claim."}</p>
        <p><strong>E:</strong> {card.evidence || "Student adds evidence from research."}</p>
        <p><strong>R:</strong> {card.reasoning || "Student explains how the evidence proves the claim."}</p>
      </section>
      <footer>{card.imageSource}</footer>
    </article>
  );
});

export default App;
