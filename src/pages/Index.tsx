import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TOBACCOS = [
  {
    id: 1,
    name: "Al Fakher Двойное яблоко",
    brand: "Al Fakher",
    flavor: "Яблоко + анис",
    strength: 2,
    tags: ["фруктовый", "классика"],
    description: "Икона кальянного мира. Сочное зелёное яблоко с нотками аниса — идеал для новичков и ценителей классики.",
    color: "#c8a96a",
  },
  {
    id: 2,
    name: "Darkside Core Kalee",
    brand: "Darkside",
    flavor: "Крыжовник + смородина",
    strength: 3,
    tags: ["ягодный", "кислинка"],
    description: "Терпкий крыжовник с кислой смородиной. Живой, дерзкий вкус с долгим послевкусием.",
    color: "#7b4f8c",
  },
  {
    id: 3,
    name: "Adalya Love 66",
    brand: "Adalya",
    flavor: "Клубника + персик + мята",
    strength: 2,
    tags: ["фруктовый", "освежающий"],
    description: "Нежная клубника с сочным персиком и холодком мяты. Лёгкий, летний, безупречный.",
    color: "#d4607a",
  },
  {
    id: 4,
    name: "Burn Ice Mango",
    brand: "Burn",
    flavor: "Манго + лёд",
    strength: 2,
    tags: ["фруктовый", "ледяной"],
    description: "Тропический манго с ледяным выдохом. Яркий, сочный, освежающий до последней затяжки.",
    color: "#e0961e",
  },
  {
    id: 5,
    name: "Tangiers Noir Cane Mint",
    brand: "Tangiers",
    flavor: "Тростниковая мята",
    strength: 5,
    tags: ["мята", "крепкий"],
    description: "Легендарная мята Tangiers. Интенсивный холод, мощный дым. Только для опытных.",
    color: "#4a9e7a",
  },
  {
    id: 6,
    name: "Social Smoke Citrus Mint",
    brand: "Social Smoke",
    flavor: "Цитрус + мята",
    strength: 3,
    tags: ["цитрус", "свежий"],
    description: "Звонкий цитрус с прохладной мятой. Бодрит, освежает, идеален для дневного сеанса.",
    color: "#d4a82a",
  },
  {
    id: 7,
    name: "Fumari Ambrosia",
    brand: "Fumari",
    flavor: "Ананас + кокос",
    strength: 2,
    tags: ["тропический", "сладкий"],
    description: "Тропический коктейль из ананаса и кокоса. Густой сладкий дым с экзотическим послевкусием.",
    color: "#b8c840",
  },
  {
    id: 8,
    name: "Darkside RARE G13",
    brand: "Darkside",
    flavor: "Виноград + мята",
    strength: 4,
    tags: ["виноград", "крепкий"],
    description: "Насыщенный виноград с мятным акцентом. Плотный дым, глубокий вкус — для ценителей.",
    color: "#6a3d9a",
  },
  {
    id: 9,
    name: "Starbuzz Blue Mist",
    brand: "Starbuzz",
    flavor: "Черника + мята + ваниль",
    strength: 1,
    tags: ["ягодный", "лёгкий"],
    description: "Воздушная черника с ванильным облаком и мятным дуновением. Деликатный и изысканный.",
    color: "#5b8cd4",
  },
  {
    id: 10,
    name: "Хулиган Bahama Mama",
    brand: "Хулиган",
    flavor: "Ананас + апельсин + кокос",
    strength: 2,
    tags: ["тропический", "коктейль"],
    description: "Тропический коктейль прямо в чашке. Яркий, карнавальный вкус с экзотическим шлейфом.",
    color: "#e87840",
  },
  {
    id: 11,
    name: "Nakhla Zaghloul",
    brand: "Nakhla",
    flavor: "Чёрный табак",
    strength: 5,
    tags: ["классика", "крепкий"],
    description: "Египетский чёрный табак без ароматизаторов. Чистый, резкий, аутентичный. Для настоящих.",
    color: "#5a3a20",
  },
  {
    id: 12,
    name: "Must Have Tobacco",
    brand: "Must Have",
    flavor: "Вишня + ваниль",
    strength: 3,
    tags: ["ягодный", "сладкий"],
    description: "Спелая вишня в обертке из ванильного крема. Насыщенный и запоминающийся вкус.",
    color: "#c04060",
  },
];

const MIXES = [
  {
    id: 1,
    name: "Северное Сияние",
    tobaccos: [1, 5, 9],
    description: "Двойное яблоко встречает ледяную мяту Tangiers и черничный туман. Прохладный, свежий, гипнотизирующий микс.",
    ratio: "50 / 30 / 20",
    mood: "Вечер у камина",
    difficulty: "Средний",
  },
  {
    id: 2,
    name: "Тропический Закат",
    tobaccos: [4, 7, 10],
    description: "Манго + ананас + апельсин = идеальный тропический коктейль. Сладкий, фруктовый, летний.",
    ratio: "40 / 35 / 25",
    mood: "Отдых в жару",
    difficulty: "Лёгкий",
  },
  {
    id: 3,
    name: "Тёмная Ягода",
    tobaccos: [2, 8, 12],
    description: "Крыжовник, виноград и вишня. Глубокий, терпкий, ягодный микс с характером.",
    ratio: "35 / 35 / 30",
    mood: "Ночные посиделки",
    difficulty: "Сложный",
  },
  {
    id: 4,
    name: "Цитрусовый Рассвет",
    tobaccos: [3, 6, 4],
    description: "Персик и клубника с цитрусовым всплеском и лёгким холодком манго. Бодрый и яркий.",
    ratio: "40 / 35 / 25",
    mood: "Утренний сеанс",
    difficulty: "Лёгкий",
  },
  {
    id: 5,
    name: "Восточная Классика",
    tobaccos: [1, 11, 5],
    description: "Двойное яблоко с египетским чёрным табаком и мятой. Традиционный восточный микс для опытных.",
    ratio: "50 / 30 / 20",
    mood: "Медитация",
    difficulty: "Сложный",
  },
];

const ARTICLES = [
  {
    id: 1,
    title: "Как правильно забить чашу",
    excerpt: "Плотность набивки, тип чаши, распределение табака — разбираем каждый нюанс для идеального сеанса.",
    readTime: "5 мин",
    tag: "Гайд",
  },
  {
    id: 2,
    title: "Крепость табака: что это значит",
    excerpt: "От 1 до 5 — как понимать шкалу крепости, как она ощущается в процессе и как подобрать под себя.",
    readTime: "4 мин",
    tag: "Обучение",
  },
  {
    id: 3,
    title: "Топ-5 ошибок при составлении микса",
    excerpt: "Слишком много крепкого, несовместимые вкусы, неправильные пропорции — как их избежать.",
    readTime: "6 мин",
    tag: "Советы",
  },
  {
    id: 4,
    title: "Уход за кальяном: полный гайд",
    excerpt: "Как чистить шахту, колбу и чашу. Как часто, чем и зачем — всё о правильном уходе.",
    readTime: "7 мин",
    tag: "Гайд",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StrengthBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-4 h-1.5 rounded-sm transition-all"
          style={{
            background: i <= value
              ? "linear-gradient(90deg, #c8922a, #e05a1e)"
              : "rgba(200,146,42,0.18)",
          }}
        />
      ))}
      <span
        className="font-mono-lab text-xs ml-1.5"
        style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}
      >
        {value}/5
      </span>
    </div>
  );
}

function TobaccoCard({
  tobacco,
  selectable,
  selected,
  onToggle,
}: {
  tobacco: typeof TOBACCOS[0];
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={`card-loft rounded p-5 relative overflow-hidden ${selectable ? "cursor-pointer" : ""} ${selected ? "mix-selected" : ""}`}
      onClick={selectable ? onToggle : undefined}
    >
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-20"
        style={{ background: tobacco.color }}
      />
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="section-title mb-1">{tobacco.brand}</p>
          <h3 className="font-oswald text-base font-medium leading-tight" style={{ color: "#f5e8d5", fontFamily: "Oswald, sans-serif" }}>
            {tobacco.name}
          </h3>
        </div>
        {selectable && (
          <div
            className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 ml-2 transition-all"
            style={{
              borderColor: selected ? "var(--loft-gold)" : "rgba(200,146,42,0.3)",
              background: selected ? "var(--loft-gold)" : "transparent",
            }}
          >
            {selected && <Icon name="Check" size={11} style={{ color: "#120e0b" }} />}
          </div>
        )}
      </div>

      <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
        {tobacco.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {tobacco.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-sm"
            style={{
              background: "rgba(200,146,42,0.1)",
              color: "var(--loft-gold)",
              border: "1px solid rgba(200,146,42,0.2)",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "0.65rem",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <StrengthBar value={tobacco.strength} />
    </div>
  );
}

function MixCard({ mix }: { mix: typeof MIXES[0] }) {
  const tobaccos = mix.tobaccos.map((id) => TOBACCOS.find((t) => t.id === id)!);

  return (
    <div className="card-loft rounded p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(ellipse at top right, ${tobaccos[0]?.color}, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="section-title mb-1">Готовый рецепт</p>
            <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.25rem", color: "#f5e8d5", letterSpacing: "0.03em" }}>
              {mix.name}
            </h3>
          </div>
          <span
            className="text-xs px-2 py-1 rounded-sm flex-shrink-0"
            style={{
              background: "rgba(200,146,42,0.1)",
              color: "var(--loft-gold)",
              border: "1px solid rgba(200,146,42,0.2)",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "0.65rem",
            }}
          >
            {mix.difficulty}
          </span>
        </div>

        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
          {mix.description}
        </p>

        <div className="space-y-2 mb-4">
          {tobaccos.map((t, i) => (
            <div key={t.id} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
              <span className="text-xs" style={{ color: "#f5ddb5", fontFamily: "Oswald, sans-serif", letterSpacing: "0.04em" }}>{t.name}</span>
              <div className="flex-1 h-px" style={{ background: "rgba(200,146,42,0.1)" }} />
              <span className="text-xs" style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}>
                {mix.ratio.split(" / ")[i]}%
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(200,146,42,0.1)" }}>
          <Icon name="Flame" size={13} style={{ color: "var(--loft-ember)" }} />
          <span className="text-xs" style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}>
            {mix.mood}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function NavBar({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const links = [
    { id: "home", label: "Главная" },
    { id: "tobaccos", label: "Табаки" },
    { id: "mixes", label: "Рецепты" },
    { id: "builder", label: "Конструктор" },
    { id: "articles", label: "Гайды" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(18,14,11,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(200,146,42,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNav("home")}>
          <span style={{ color: "var(--loft-gold)", fontSize: "1.1rem" }}>◈</span>
          <span style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.2em", color: "#f5e8d5", fontSize: "1rem", fontWeight: 500 }}>
            SMOKE LAB
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              className="nav-link transition-colors"
              style={{ color: active === l.id ? "var(--loft-gold)" : undefined }}
              onClick={() => onNav(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <Icon name="Menu" size={20} style={{ color: "var(--loft-smoke)" }} />
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--loft-dark)" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/27ccfa36-74b0-49d1-b2a8-ac4ae6d60937/files/d23a0acc-8bf5-4325-864a-1cb996b1f0a5.jpg)`,
          opacity: 0.2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(18,14,11,0.88) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #120e0b, transparent)" }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full animate-smoke"
        style={{
          background: "radial-gradient(ellipse, rgba(200,146,42,0.07) 0%, transparent 70%)",
          top: "5%", left: "0%",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full animate-smoke delay-500"
        style={{
          background: "radial-gradient(ellipse, rgba(224,90,30,0.05) 0%, transparent 70%)",
          bottom: "15%", right: "5%",
        }}
      />

      <div className="relative text-center px-6 max-w-4xl mx-auto">
        <p className="section-title mb-6 animate-fade-up">— Искусство кальянного микса —</p>

        <h1
          className="animate-fade-up delay-100 mb-4"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            lineHeight: 0.92,
            letterSpacing: "0.06em",
            color: "#f5e8d5",
          }}
        >
          SMOKE
          <br />
          <span style={{ color: "var(--loft-gold)" }}>LAB</span>
        </h1>

        <div className="gold-line w-24 mx-auto mb-8 animate-fade-up delay-200" />

        <p
          className="text-xl italic mb-12 animate-fade-up delay-300"
          style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}
        >
          Подбирайте табак, создавайте миксы, открывайте новые сочетания
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
          <button
            className="btn-gold px-8 py-3 text-sm font-semibold rounded tracking-widest"
            onClick={() => onNav("mixes")}
          >
            ГОТОВЫЕ РЕЦЕПТЫ
          </button>
          <button
            className="btn-outline-gold px-8 py-3 text-sm font-semibold rounded tracking-widest"
            onClick={() => onNav("builder")}
          >
            СОЗДАТЬ МИКС
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xs mx-auto animate-fade-up delay-500">
          {[
            { n: "12", label: "Табаков" },
            { n: "5", label: "Рецептов" },
            { n: "∞", label: "Сочетаний" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: "2rem", color: "var(--loft-gold)", fontWeight: 300 }}>
                {s.n}
              </div>
              <div className="section-title mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOBACCOS ─────────────────────────────────────────────────────────────────

function TobaccosSection() {
  const [filter, setFilter] = useState("все");
  const [search, setSearch] = useState("");
  const tags = ["все", "фруктовый", "ягодный", "мята", "крепкий", "лёгкий", "классика", "тропический"];

  const q = search.toLowerCase().trim();
  const filtered = TOBACCOS.filter((t) => {
    const matchesTag = filter === "все" || t.tags.includes(filter);
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.brand.toLowerCase().includes(q) ||
      t.flavor.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  return (
    <section id="tobaccos" className="py-24 px-6 loft-texture">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="section-title mb-3">— Коллекция —</p>
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 300, letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "2.5rem" }} className="mb-6">
            КАТАЛОГ ТАБАКОВ
          </h2>
          <div className="gold-line w-16 mb-8" />

          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Icon name="Search" size={15} style={{ color: "var(--loft-smoke)" }} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по табакам, брендам, вкусам..."
              style={{
                width: "100%",
                paddingLeft: "2.75rem",
                paddingRight: "2.5rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                borderRadius: "2px",
                background: "rgba(26,20,16,0.9)",
                border: `1px solid ${search ? "rgba(200,146,42,0.5)" : "rgba(200,146,42,0.2)"}`,
                color: "#f5e8d5",
                outline: "none",
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1rem",
                boxShadow: search ? "0 0 16px rgba(200,146,42,0.08)" : "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            {search && (
              <button
                className="absolute inset-y-0 right-4 flex items-center"
                onClick={() => setSearch("")}
              >
                <Icon name="X" size={14} style={{ color: "var(--loft-smoke)" }} />
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="text-xs px-3 py-1.5 rounded-sm transition-all"
                style={{
                  background: filter === t ? "var(--loft-gold)" : "transparent",
                  color: filter === t ? "#120e0b" : "var(--loft-smoke)",
                  border: `1px solid ${filter === t ? "var(--loft-gold)" : "rgba(200,146,42,0.25)"}`,
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {(search || filter !== "все") && (
          <div className="mb-5 flex items-center gap-2">
            <span style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem" }}>
              найдено: {filtered.length}
            </span>
            {search && (
              <>
                <span style={{ color: "rgba(200,146,42,0.3)" }}>·</span>
                <span style={{ color: "var(--loft-gold)", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem" }}>
                  «{search}»
                </span>
              </>
            )}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tobacco) => (
              <TobaccoCard key={tobacco.id} tobacco={tobacco} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4 opacity-20">◈</div>
            <p style={{ fontFamily: "Oswald, sans-serif", color: "#f5e8d5", letterSpacing: "0.1em", fontSize: "1.1rem" }}>
              НИЧЕГО НЕ НАЙДЕНО
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
              Попробуйте другой запрос или сбросьте фильтры
            </p>
            <button
              className="mt-6 btn-outline-gold px-6 py-2 text-xs rounded tracking-widest"
              onClick={() => { setSearch(""); setFilter("все"); }}
            >
              СБРОСИТЬ
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── MIXES ────────────────────────────────────────────────────────────────────

function MixesSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section id="mixes" className="py-24 px-6" style={{ background: "rgba(14,10,8,0.95)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="section-title mb-3">— Рецептура —</p>
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 300, letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "2.5rem" }} className="mb-3">
            ГОТОВЫЕ МИКСЫ
          </h2>
          <div className="gold-line w-16 mb-6" />
          <p className="text-lg italic" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
            Проверенные сочетания от мастеров — берите и наслаждайтесь
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MIXES.map((mix) => (
            <MixCard key={mix.id} mix={mix} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className="btn-outline-gold px-8 py-3 text-sm font-semibold rounded tracking-widest"
            onClick={() => onNav("builder")}
          >
            СОЗДАТЬ СВОЙ МИКС →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── BUILDER ─────────────────────────────────────────────────────────────────

function BuilderSection() {
  const [selected, setSelected] = useState<number[]>([]);
  const [savedMix, setSavedMix] = useState<boolean>(false);
  const [mixName, setMixName] = useState("");

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
    setSavedMix(false);
  };

  const saveMix = () => {
    if (selected.length >= 2) setSavedMix(true);
  };

  const clearAll = () => {
    setSelected([]);
    setSavedMix(false);
    setMixName("");
  };

  const selectedTobaccos = selected.map((id) => TOBACCOS.find((t) => t.id === id)!);
  const avgStrength = selected.length
    ? Math.round((selectedTobaccos.reduce((s, t) => s + t.strength, 0) / selected.length) * 10) / 10
    : 0;

  return (
    <section id="builder" className="py-24 px-6 loft-texture">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="section-title mb-3">— Твой рецепт —</p>
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 300, letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "2.5rem" }} className="mb-3">
            КОНСТРУКТОР МИКСА
          </h2>
          <div className="gold-line w-16 mb-6" />
          <p className="text-lg italic" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
            Выберите от 2 до 4 табаков, чтобы составить свой уникальный микс
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOBACCOS.map((tobacco) => (
                <TobaccoCard
                  key={tobacco.id}
                  tobacco={tobacco}
                  selectable
                  selected={selected.includes(tobacco.id)}
                  onToggle={() => toggle(tobacco.id)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded p-6"
              style={{
                background: "linear-gradient(135deg, #1a1410 0%, #1e1712 100%)",
                border: "1px solid rgba(200,146,42,0.2)",
              }}
            >
              <h3 style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.12em", color: "#f5e8d5", fontSize: "1.1rem" }} className="mb-5">
                МОЙ МИКС
              </h3>

              {selected.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="text-4xl mb-3 opacity-30">◈</div>
                  <p className="text-xs" style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}>
                    Нажмите на табак<br />для добавления
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {selectedTobaccos.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3 rounded"
                      style={{ background: "rgba(200,146,42,0.06)", border: "1px solid rgba(200,146,42,0.15)" }}
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: t.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate" style={{ color: "#f5ddb5", fontFamily: "Oswald, sans-serif", letterSpacing: "0.04em" }}>{t.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[1, 2, 3, 4, 5].map((d) => (
                            <div key={d} className="w-2 h-0.5 rounded" style={{ background: d <= t.strength ? "var(--loft-gold)" : "rgba(200,146,42,0.2)" }} />
                          ))}
                        </div>
                      </div>
                      <button onClick={() => toggle(t.id)}>
                        <Icon name="X" size={13} style={{ color: "var(--loft-smoke)" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selected.length > 0 && (
                <>
                  <div
                    className="rounded p-3 mb-5"
                    style={{ background: "rgba(18,14,11,0.8)", border: "1px solid rgba(200,146,42,0.1)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="section-title">Состав</span>
                      <span className="text-xs" style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}>
                        {selected.length}/4 табака
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="section-title">Ср. крепость</span>
                      <StrengthBar value={Math.round(avgStrength)} />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Название микса..."
                    value={mixName}
                    onChange={(e) => setMixName(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded text-sm"
                    style={{
                      background: "rgba(18,14,11,0.8)",
                      border: "1px solid rgba(200,146,42,0.2)",
                      color: "#f5e8d5",
                      outline: "none",
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  />

                  <button
                    className="btn-gold w-full py-3 text-xs font-bold rounded tracking-widest mb-2"
                    onClick={saveMix}
                    disabled={selected.length < 2}
                  >
                    СОХРАНИТЬ МИКС
                  </button>
                  <button
                    className="btn-outline-gold w-full py-2.5 text-xs rounded tracking-widest"
                    onClick={clearAll}
                  >
                    ОЧИСТИТЬ
                  </button>
                </>
              )}

              {savedMix && (
                <div
                  className="mt-4 p-3 rounded"
                  style={{ background: "rgba(200,146,42,0.1)", border: "1px solid rgba(200,146,42,0.3)" }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={14} style={{ color: "var(--loft-gold)" }} />
                    <span className="text-xs" style={{ color: "var(--loft-gold)", fontFamily: "IBM Plex Mono, monospace" }}>
                      Микс "{mixName || "Без названия"}" сохранён!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

function ArticlesSection() {
  return (
    <section id="articles" className="py-24 px-6" style={{ background: "rgba(14,10,8,0.95)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="section-title mb-3">— Знания —</p>
          <h2 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 300, letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "2.5rem" }} className="mb-3">
            СТАТЬИ И ГАЙДЫ
          </h2>
          <div className="gold-line w-16" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
            <div key={a.id} className="card-loft rounded p-6 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs px-2 py-0.5 rounded-sm"
                  style={{
                    background: "rgba(200,146,42,0.1)",
                    color: "var(--loft-gold)",
                    border: "1px solid rgba(200,146,42,0.2)",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "0.65rem",
                  }}
                >
                  {a.tag}
                </span>
                <span className="text-xs" style={{ color: "var(--loft-smoke)", fontFamily: "IBM Plex Mono, monospace" }}>
                  {a.readTime}
                </span>
              </div>

              <h3
                className="text-xl font-medium mb-3 group-hover:text-amber-300 transition-colors"
                style={{ fontFamily: "Oswald, sans-serif", color: "#f5e8d5", letterSpacing: "0.03em" }}
              >
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
                {a.excerpt}
              </p>

              <div className="mt-5 flex items-center gap-2" style={{ color: "var(--loft-gold)" }}>
                <span className="text-xs tracking-widest" style={{ fontFamily: "IBM Plex Mono, monospace" }}>ЧИТАТЬ</span>
                <Icon name="ArrowRight" size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACTS ─────────────────────────────────────────────────────────────────

function ContactsSection() {
  return (
    <section id="contacts" className="py-24 px-6 loft-texture">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-title mb-3">— Связь —</p>
        <h2 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 300, letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "2.5rem" }} className="mb-3">
          КОНТАКТЫ
        </h2>
        <div className="gold-line w-16 mx-auto mb-8" />

        <p className="text-xl italic mb-12" style={{ color: "var(--loft-smoke)", fontFamily: "Cormorant Garamond, serif" }}>
          Есть вопросы о миксах, советы или предложения? Пишите — ответим.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: "MessageCircle", label: "Telegram", value: "@smokelab" },
            { icon: "Instagram", label: "Instagram", value: "@smoke.lab" },
            { icon: "Mail", label: "Email", value: "hello@smokelab.ru" },
          ].map((c) => (
            <div key={c.label} className="card-loft rounded p-6 cursor-pointer">
              <Icon name={c.icon} size={22} className="mx-auto mb-3" style={{ color: "var(--loft-gold)", display: "block", margin: "0 auto 12px" }} />
              <p className="section-title text-center mb-1">{c.label}</p>
              <p className="text-xs text-center" style={{ color: "#f5ddb5", fontFamily: "IBM Plex Mono, monospace" }}>{c.value}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded p-8 text-left"
          style={{
            background: "linear-gradient(135deg, #1a1410 0%, #1e1712 100%)",
            border: "1px solid rgba(200,146,42,0.2)",
          }}
        >
          <h3 style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em", color: "#f5e8d5", fontSize: "1.25rem" }} className="mb-5 text-center">
            ОСТАВЬТЕ СООБЩЕНИЕ
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded text-sm"
              style={{
                background: "rgba(18,14,11,0.8)",
                border: "1px solid rgba(200,146,42,0.2)",
                color: "#f5e8d5",
                outline: "none",
                fontFamily: "Cormorant Garamond, serif",
              }}
            />
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full px-4 py-3 rounded text-sm resize-none"
              style={{
                background: "rgba(18,14,11,0.8)",
                border: "1px solid rgba(200,146,42,0.2)",
                color: "#f5e8d5",
                outline: "none",
                fontFamily: "Cormorant Garamond, serif",
              }}
            />
            <button className="btn-gold w-full py-3 text-sm font-bold rounded tracking-widest">
              ОТПРАВИТЬ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (s: string) => void }) {
  const navMap: Record<string, string> = {
    home: "главная", tobaccos: "табаки", mixes: "рецепты", builder: "конструктор", articles: "гайды",
  };
  return (
    <footer
      className="py-10 px-6"
      style={{
        background: "var(--loft-dark)",
        borderTop: "1px solid rgba(200,146,42,0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--loft-gold)" }}>◈</span>
          <span style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.2em", color: "#f5e8d5", fontSize: "0.85rem" }}>SMOKE LAB</span>
        </div>

        <div className="flex gap-6">
          {Object.entries(navMap).map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => onNav(id)}>
              {label}
            </button>
          ))}
        </div>

        <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "rgba(181,169,154,0.35)" }}>
          © 2024 SMOKE LAB
        </p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  const navigate = (section: string) => {
    setActiveSection(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--loft-dark)" }}>
      <NavBar active={activeSection} onNav={navigate} />
      <HeroSection onNav={navigate} />
      <TobaccosSection />
      <MixesSection onNav={navigate} />
      <BuilderSection />
      <ArticlesSection />
      <ContactsSection />
      <Footer onNav={navigate} />
    </div>
  );
}