import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const AI_SEARCH_URL = "https://functions.poehali.dev/eff3cff9-2897-4b41-b095-1e3f66a4225b";
const APPLY_URL = "https://functions.poehali.dev/6988e85c-9e01-4049-930b-9ebcf6554322";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/fd2b00d0-b53b-4b0a-9771-f09c64c288ae/files/1b9c42c1-8fb7-4e11-928b-692de0886e8b.jpg";

const NAV_ITEMS = ["События", "Секции", "Тренеры", "Нормативы", "Карта"];

const VENUES = [
  {
    id: 1,
    name: "Стадион «Звезда»",
    type: "Стадион",
    address: "ул. Попова, 8, Пермь",
    sports: ["Лёгкая атлетика", "Футбол"],
    capacity: 17000,
    phone: "+7 (342) 212-30-10",
    hours: "Пн–Вс · 8:00–22:00",
    lat: 58.0105,
    lon: 56.2502,
    events: 5,
  },
  {
    id: 2,
    name: "Дворец водного спорта",
    type: "Бассейн",
    address: "ул. Советская, 71, Пермь",
    sports: ["Плавание", "Водное поло", "Синхронное плавание"],
    capacity: 1200,
    phone: "+7 (342) 236-40-50",
    hours: "Пн–Вс · 7:00–22:00",
    lat: 58.0092,
    lon: 56.2344,
    events: 3,
  },
  {
    id: 3,
    name: "СК «Олимпия»",
    type: "Спорткомплекс",
    address: "ул. Революции, 18, Пермь",
    sports: ["Самбо", "Дзюдо", "Борьба", "Бокс"],
    capacity: 800,
    phone: "+7 (342) 218-55-20",
    hours: "Пн–Сб · 9:00–21:00",
    lat: 58.0145,
    lon: 56.2610,
    events: 4,
  },
  {
    id: 4,
    name: "Дворец спорта «Молот»",
    type: "Дворец спорта",
    address: "ул. Куйбышева, 11, Пермь",
    sports: ["Хоккей", "Фигурное катание", "Гимнастика"],
    capacity: 5500,
    phone: "+7 (342) 212-80-47",
    hours: "Пн–Вс · 9:00–22:00",
    lat: 58.0063,
    lon: 56.2288,
    events: 6,
  },
  {
    id: 5,
    name: "СК «Прикамье»",
    type: "Спорткомплекс",
    address: "ул. Уральская, 113, Пермь",
    sports: ["Тяжёлая атлетика", "Пауэрлифтинг", "Армрестлинг"],
    capacity: 500,
    phone: "+7 (342) 225-17-33",
    hours: "Пн–Пт · 8:00–21:00",
    lat: 58.0198,
    lon: 56.2455,
    events: 2,
  },
  {
    id: 6,
    name: "Парк «Балатово»",
    type: "Открытая площадка",
    address: "мкр. Балатово, Пермь",
    sports: ["Лёгкая атлетика", "Велоспорт", "Скандинавская ходьба"],
    capacity: 15000,
    phone: "+7 (342) 244-60-00",
    hours: "Круглосуточно",
    lat: 58.0355,
    lon: 56.2180,
    events: 3,
  },
  {
    id: 7,
    name: "Лыжная база «Динамо»",
    type: "Открытая площадка",
    address: "ул. Стахановская, 53, Пермь",
    sports: ["Лыжные гонки", "Биатлон", "Лёгкая атлетика"],
    capacity: 3000,
    phone: "+7 (342) 263-45-12",
    hours: "Пн–Вс · 9:00–20:00",
    lat: 57.9980,
    lon: 56.1920,
    events: 2,
  },
  {
    id: 8,
    name: "СШОР по боксу",
    type: "Спорткомплекс",
    address: "ул. Героев Хасана, 44, Пермь",
    sports: ["Бокс", "Кикбоксинг", "Тайский бокс"],
    capacity: 350,
    phone: "+7 (342) 256-78-90",
    hours: "Пн–Сб · 10:00–21:00",
    lat: 57.9890,
    lon: 56.2700,
    events: 3,
  },
];

const EVENTS = [
  { id: 1, title: "Первенство Перми по лёгкой атлетике", sport: "Лёгкая атлетика", date: "15 мая 2026", place: "Стадион «Звезда»", level: "Городской", age: "14–17 лет", badge: "Скоро" },
  { id: 2, title: "Открытый турнир по плаванию «Кама»", sport: "Плавание", date: "22 мая 2026", place: "Дворец водного спорта", level: "Региональный", age: "10–14 лет", badge: "Регистрация" },
  { id: 3, title: "Чемпионат Пермского края по самбо", sport: "Самбо", date: "1 июня 2026", place: "СК «Олимпия»", level: "Областной", age: "18+ лет", badge: "Регистрация" },
  { id: 4, title: "Кубок Перми по художественной гимнастике", sport: "Гимнастика", date: "8 июня 2026", place: "Дворец спорта «Молот»", level: "Городской", age: "8–12 лет", badge: "Скоро" },
  { id: 5, title: "Первенство края по тяжёлой атлетике", sport: "Тяжёлая атлетика", date: "14 июня 2026", place: "СК «Прикамье»", level: "Региональный", age: "18+ лет", badge: "Открыт" },
  { id: 6, title: "Забег «Пермский марафон»", sport: "Лёгкая атлетика", date: "20 июня 2026", place: "Парк «Балатово»", level: "Городской", age: "6–12 лет", badge: "Открыт" },
  { id: 7, title: "Турнир по боксу памяти Туманова", sport: "Бокс", date: "28 июня 2026", place: "СШОР по боксу", level: "Областной", age: "14–18 лет", badge: "Регистрация" },
  { id: 8, title: "Лыжная гонка «Прикамская лыжня»", sport: "Лыжные гонки", date: "5 июля 2026", place: "Лыжная база «Динамо»", level: "Региональный", age: "12–20 лет", badge: "Скоро" },
];

const SECTIONS = [
  { id: 1, sport: "Лёгкая атлетика", icon: "Zap", trainer: "Иванов А.В.", schedule: "Пн, Ср, Пт · 17:00", age: "10–18 лет", level: "Начинающие / Продвинутые", slots: 8 },
  { id: 2, sport: "Плавание", icon: "Waves", trainer: "Петрова М.С.", schedule: "Вт, Чт, Сб · 9:00", age: "6–16 лет", level: "Все уровни", slots: 5 },
  { id: 3, sport: "Самбо", icon: "Shield", trainer: "Соколов Д.П.", schedule: "Пн, Ср, Пт · 18:30", age: "12–25 лет", level: "Начинающие", slots: 12 },
  { id: 4, sport: "Художественная гимнастика", icon: "Sparkles", trainer: "Козлова Е.Н.", schedule: "Вт, Чт · 16:00", age: "5–14 лет", level: "Начинающие", slots: 3 },
  { id: 5, sport: "Тяжёлая атлетика", icon: "Dumbbell", trainer: "Морозов К.А.", schedule: "Пн–Пт · 10:00", age: "16+ лет", level: "Продвинутые", slots: 7 },
  { id: 6, sport: "Баскетбол", icon: "Circle", trainer: "Лебедев С.В.", schedule: "Вт, Пт · 19:00", age: "12–20 лет", level: "Все уровни", slots: 15 },
];

const TRAINERS = [
  { id: 1, name: "Алексей Иванов", sport: "Лёгкая атлетика", rank: "Мастер спорта России", exp: "14 лет", pupils: 47, wins: 23 },
  { id: 2, name: "Мария Петрова", sport: "Плавание", rank: "КМС", exp: "9 лет", pupils: 32, wins: 11 },
  { id: 3, name: "Дмитрий Соколов", sport: "Самбо", rank: "Заслуженный тренер", exp: "21 год", pupils: 68, wins: 41 },
  { id: 4, name: "Екатерина Козлова", sport: "Гимнастика", rank: "Мастер спорта", exp: "12 лет", pupils: 28, wins: 16 },
  { id: 5, name: "Сергей Морозов", sport: "Тяжёлая атлетика", rank: "Мастер спорта России", exp: "17 лет", pupils: 38, wins: 29 },
  { id: 6, name: "Виктор Лебедев", sport: "Баскетбол", rank: "КМС", exp: "8 лет", pupils: 54, wins: 14 },
  { id: 7, name: "Андрей Черников", sport: "Бокс", rank: "Заслуженный тренер России", exp: "25 лет", pupils: 91, wins: 62 },
  { id: 8, name: "Наталья Зайцева", sport: "Лыжные гонки", rank: "Мастер спорта", exp: "11 лет", pupils: 29, wins: 18 },
  { id: 9, name: "Павел Громов", sport: "Дзюдо", rank: "Мастер спорта России", exp: "16 лет", pupils: 43, wins: 35 },
  { id: 10, name: "Ольга Сидорова", sport: "Синхронное плавание", rank: "КМС", exp: "7 лет", pupils: 22, wins: 9 },
  { id: 11, name: "Константин Рябов", sport: "Пауэрлифтинг", rank: "Мастер спорта", exp: "13 лет", pupils: 31, wins: 22 },
  { id: 12, name: "Ирина Белова", sport: "Художественная гимнастика", rank: "Заслуженный тренер", exp: "19 лет", pupils: 55, wins: 44 },
];

const STANDARDS = [
  { sport: "Лёгкая атлетика", norm: "Бег 100м (муж)", unit: "сек", kms: "11.4", ms: "10.6", zmr: "10.2" },
  { sport: "Лёгкая атлетика", norm: "Бег 100м (жен)", unit: "сек", kms: "13.2", ms: "12.0", zmr: "11.5" },
  { sport: "Лёгкая атлетика", norm: "Бег 1500м (муж)", unit: "мин", kms: "4:10", ms: "3:48", zmr: "3:35" },
  { sport: "Лёгкая атлетика", norm: "Прыжок в длину (муж)", unit: "м", kms: "6.50", ms: "7.30", zmr: "7.90" },
  { sport: "Плавание", norm: "100м вольный (муж)", unit: "сек", kms: "58.0", ms: "52.5", zmr: "49.0" },
  { sport: "Плавание", norm: "100м вольный (жен)", unit: "сек", kms: "65.0", ms: "59.0", zmr: "55.5" },
  { sport: "Плавание", norm: "200м брасс (муж)", unit: "сек", kms: "148.0", ms: "132.0", zmr: "124.0" },
  { sport: "Тяжёлая атлетика", norm: "Рывок до 89 кг", unit: "кг", kms: "100", ms: "125", zmr: "148" },
  { sport: "Тяжёлая атлетика", norm: "Толчок до 89 кг", unit: "кг", kms: "125", ms: "155", zmr: "182" },
  { sport: "Самбо", norm: "ОФП (комплекс)", unit: "очки", kms: "70", ms: "85", zmr: "95" },
  { sport: "Бокс", norm: "Нормативы ОФП", unit: "очки", kms: "65", ms: "80", zmr: "92" },
  { sport: "Дзюдо", norm: "Нормативы ОФП", unit: "очки", kms: "68", ms: "82", zmr: "94" },
  { sport: "Лыжные гонки", norm: "10 км (муж, своб.)", unit: "мин", kms: "30:00", ms: "26:30", zmr: "24:00" },
  { sport: "Лыжные гонки", norm: "5 км (жен, своб.)", unit: "мин", kms: "18:00", ms: "16:00", zmr: "14:30" },
  { sport: "Пауэрлифтинг", norm: "Троеборье до 93 кг", unit: "кг", kms: "450", ms: "560", zmr: "640" },
];

const SPORTS = ["Все виды", "Лёгкая атлетика", "Плавание", "Самбо", "Гимнастика", "Тяжёлая атлетика", "Баскетбол"];
const AGES = ["Любой возраст", "6–12 лет", "10–14 лет", "10–18 лет", "12–20 лет", "12–25 лет", "14–17 лет", "16+ лет", "18+ лет"];
const LEVELS = ["Любой уровень", "Начинающие", "Продвинутые", "Все уровни", "Региональный", "Городской", "Областной"];

const STATS = [
  { value: "1 240", label: "Спортсменов" },
  { value: "48", label: "Секций" },
  { value: "32", label: "Тренеров" },
  { value: "186", label: "Наград в сезоне" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("События");
  const [filterSport, setFilterSport] = useState("Все виды");
  const [filterAge, setFilterAge] = useState("Любой возраст");
  const [filterLevel, setFilterLevel] = useState("Любой уровень");

  const [applyTarget, setApplyTarget] = useState<{ type: "event" | "section"; id: number; name: string } | null>(null);
  const [applyForm, setApplyForm] = useState({ full_name: "", phone: "", email: "", birthdate: "", comment: "" });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const openApply = (type: "event" | "section", id: number, name: string) => {
    setApplyTarget({ type, id, name });
    setApplyForm({ full_name: "", phone: "", email: "", birthdate: "", comment: "" });
    setApplySuccess(false);
  };

  const closeApply = () => { setApplyTarget(null); setApplySuccess(false); };

  const submitApply = async () => {
    if (!applyTarget || !applyForm.full_name.trim() || !applyForm.phone.trim()) return;
    setApplyLoading(true);
    try {
      const res = await fetch(APPLY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: applyTarget.type,
          target_name: applyTarget.name,
          full_name: applyForm.full_name,
          phone: applyForm.phone,
          email: applyForm.email,
          birthdate: applyForm.birthdate,
          comment: applyForm.comment,
        }),
      });
      const data = await res.json();
      if (data.success) setApplySuccess(true);
    } finally {
      setApplyLoading(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<null | {
    answer: string;
    events: typeof EVENTS;
    sections: typeof SECTIONS;
    trainers: typeof TRAINERS;
  }>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchResult(null);
    try {
      const res = await fetch(AI_SEARCH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setSearchResult({
        answer: data.answer || "Результаты поиска",
        events: Array.isArray(data.events) ? data.events : [],
        sections: Array.isArray(data.sections) ? data.sections : [],
        trainers: Array.isArray(data.trainers) ? data.trainers : [],
      });
    } catch {
      setSearchResult({ answer: "Не удалось выполнить поиск. Попробуйте позже.", events: [], sections: [], trainers: [] });
    } finally {
      setSearchLoading(false);
    }
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResult(null);
  };

  const filteredEvents = EVENTS.filter(e => {
    if (filterSport !== "Все виды" && e.sport !== filterSport) return false;
    if (filterAge !== "Любой возраст" && e.age !== filterAge) return false;
    return true;
  });

  const filteredSections = SECTIONS.filter(s => {
    if (filterSport !== "Все виды" && s.sport !== filterSport) return false;
    if (filterAge !== "Любой возраст" && s.age !== filterAge) return false;
    if (filterLevel !== "Любой уровень" && s.level !== filterLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-sdv-darker text-sdv-light overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sdv-darker/90 backdrop-blur-md border-b border-sdv-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sdv-red rounded-sm flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">СДВ</span>
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-wide hidden sm:block">СПОРТ ДВИЖЕНИЕ ВПЕРЁД</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-4 py-2 font-display text-sm font-medium tracking-wider uppercase transition-all duration-200 rounded-sm ${
                  activeSection === item
                    ? "text-sdv-red bg-sdv-red/10"
                    : "text-sdv-muted hover:text-sdv-light"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={openSearch}
            className="flex items-center gap-2 border border-sdv-border hover:border-sdv-red/50 bg-sdv-surface px-3 py-2 rounded-sm transition-all group mr-2"
          >
            <Icon name="Sparkles" size={14} className="text-sdv-red" />
            <span className="font-body text-sdv-muted group-hover:text-sdv-light text-sm hidden sm:block">Поиск с ИИ</span>
          </button>
          <button className="bg-sdv-red hover:bg-sdv-orange transition-colors px-4 py-2 font-display text-sm font-medium text-white rounded-sm tracking-wider uppercase">
            Записаться
          </button>
        </div>

        <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`px-3 py-1.5 font-display text-xs font-medium tracking-wider uppercase whitespace-nowrap rounded-sm transition-all ${
                activeSection === item ? "text-sdv-red bg-sdv-red/10" : "text-sdv-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[90vh] min-h-[560px] flex items-end overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}>
        <img src={HERO_IMAGE} alt="СДВ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sdv-darker via-sdv-darker/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-sdv-darker/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-sdv-red" />
              <span className="font-body text-sdv-orange text-sm font-medium tracking-widest uppercase">Официальная платформа</span>
            </div>
            <h1 className="font-display text-6xl sm:text-8xl font-bold text-white leading-none tracking-tight mb-4">
              СПОРТ<br />
              <span className="text-sdv-red">ДВИЖЕНИЕ</span><br />
              ВПЕРЁД
            </h1>
            <p className="font-body text-sdv-muted text-lg leading-relaxed mb-8">
              Все события, секции и тренеры вашего города — в одном месте.
              Записывайтесь, участвуйте, побеждайте.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveSection("События")}
                className="bg-sdv-red hover:bg-sdv-orange transition-colors px-6 py-3 font-display font-medium text-white text-sm tracking-wider uppercase rounded-sm flex items-center gap-2"
                style={{ boxShadow: "0 0 30px rgba(232,49,26,0.3)" }}
              >
                <Icon name="Calendar" size={16} />
                Ближайшие события
              </button>
              <button
                onClick={() => setActiveSection("Секции")}
                className="border border-sdv-border hover:border-sdv-red/50 bg-sdv-surface/50 backdrop-blur transition-all px-6 py-3 font-display font-medium text-sdv-light text-sm tracking-wider uppercase rounded-sm flex items-center gap-2"
              >
                <Icon name="Users" size={16} />
                Секции
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-4 gap-px bg-sdv-border overflow-hidden rounded-t-sm">
              {STATS.map((s, i) => (
                <div key={i} className="bg-sdv-surface/95 backdrop-blur px-4 py-4 text-center">
                  <div className="font-display text-2xl font-bold text-sdv-red">{s.value}</div>
                  <div className="font-body text-xs text-sdv-muted mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-sdv-surface border-b border-sdv-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2 items-center">
          <Icon name="SlidersHorizontal" size={16} className="text-sdv-muted mr-1" />
          {[
            { options: SPORTS, value: filterSport, setter: setFilterSport },
            { options: AGES, value: filterAge, setter: setFilterAge },
            { options: LEVELS, value: filterLevel, setter: setFilterLevel },
          ].map((f, i) => (
            <select
              key={i}
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              className="bg-sdv-card border border-sdv-border text-sdv-light font-body text-sm px-3 py-1.5 rounded-sm focus:outline-none focus:border-sdv-red/50 cursor-pointer"
            >
              {f.options.map(opt => (
                <option key={opt} value={opt} className="bg-sdv-card">{opt}</option>
              ))}
            </select>
          ))}
          {(filterSport !== "Все виды" || filterAge !== "Любой возраст" || filterLevel !== "Любой уровень") && (
            <button
              onClick={() => { setFilterSport("Все виды"); setFilterAge("Любой возраст"); setFilterLevel("Любой уровень"); }}
              className="text-sdv-muted hover:text-sdv-red text-xs font-body flex items-center gap-1 transition-colors ml-1"
            >
              <Icon name="X" size={12} />
              Сбросить
            </button>
          )}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">

        {activeSection === "События" && (
          <div>
            <SectionHeader title="СОБЫТИЯ" subtitle="Предстоящие соревнования и турниры" count={filteredEvents.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} delay={i * 0.05} onApply={() => openApply("event", event.id, event.title)} />
              ))}
              {filteredEvents.length === 0 && <EmptyState />}
            </div>
          </div>
        )}

        {activeSection === "Секции" && (
          <div>
            <SectionHeader title="СЕКЦИИ" subtitle="Запишитесь в спортивную секцию" count={filteredSections.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {filteredSections.map((section, i) => (
                <SectionCard key={section.id} section={section} delay={i * 0.05} onApply={() => openApply("section", section.id, section.sport)} />
              ))}
              {filteredSections.length === 0 && <EmptyState />}
            </div>
          </div>
        )}

        {activeSection === "Тренеры" && (
          <div>
            <SectionHeader title="ТРЕНЕРЫ" subtitle="Профессиональный тренерский состав" count={TRAINERS.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {TRAINERS.map((trainer, i) => (
                <TrainerCard key={trainer.id} trainer={trainer} delay={i * 0.07} />
              ))}
            </div>
          </div>
        )}

        {activeSection === "Карта" && (
          <MapSection />
        )}

        {activeSection === "Нормативы" && (
          <div>
            <SectionHeader title="НОРМАТИВЫ" subtitle="Требования для присвоения спортивных разрядов" />
            <div className="mt-8 overflow-x-auto rounded-sm border border-sdv-border">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-sdv-surface">
                    <th className="text-left px-5 py-3 font-display text-xs uppercase tracking-wider text-sdv-muted border-b border-sdv-border">Вид спорта</th>
                    <th className="text-left px-5 py-3 font-display text-xs uppercase tracking-wider text-sdv-muted border-b border-sdv-border">Норматив</th>
                    <th className="text-center px-5 py-3 font-display text-xs uppercase tracking-wider text-sdv-muted border-b border-sdv-border">КМС</th>
                    <th className="text-center px-5 py-3 font-display text-xs uppercase tracking-wider text-sdv-orange border-b border-sdv-border">МС</th>
                    <th className="text-center px-5 py-3 font-display text-xs uppercase tracking-wider text-sdv-red border-b border-sdv-border">ЗМС</th>
                  </tr>
                </thead>
                <tbody>
                  {STANDARDS.map((s, i) => (
                    <tr key={i} className="border-b border-sdv-border/50 hover:bg-sdv-surface/50 transition-colors">
                      <td className="px-5 py-4 font-body font-medium text-sdv-light text-sm">{s.sport}</td>
                      <td className="px-5 py-4 font-body text-sdv-muted text-sm">{s.norm}</td>
                      <td className="px-5 py-4 text-center font-display font-semibold text-sdv-light text-sm">{s.kms} <span className="text-sdv-muted font-body font-normal text-xs">{s.unit}</span></td>
                      <td className="px-5 py-4 text-center font-display font-semibold text-sdv-orange text-sm">{s.ms} <span className="text-sdv-muted font-body font-normal text-xs">{s.unit}</span></td>
                      <td className="px-5 py-4 text-center font-display font-semibold text-sdv-red text-sm">{s.zmr} <span className="text-sdv-muted font-body font-normal text-xs">{s.unit}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-5 bg-sdv-surface border border-sdv-border rounded-sm flex items-start gap-3">
              <Icon name="Info" size={18} className="text-sdv-orange mt-0.5 shrink-0" />
              <p className="font-body text-sdv-muted text-sm leading-relaxed">
                Нормативы указаны для основной возрастной группы. Для уточнения разрядных требований по конкретному возрасту и весовой категории обратитесь к тренеру.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sdv-border bg-sdv-surface mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-sdv-red rounded-sm flex items-center justify-center">
              <span className="font-display font-bold text-white text-[10px]">СДВ</span>
            </div>
            <span className="font-body text-sdv-muted text-sm">© 2026 Спорт Движение Вперёд. Все права защищены.</span>
          </div>
          <div className="flex gap-6">
            {["О платформе", "Контакты", "Документы"].map(link => (
              <button key={link} className="font-body text-sdv-muted hover:text-sdv-light text-sm transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* AI SEARCH OVERLAY */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-sdv-darker/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={e => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div className="w-full max-w-2xl bg-sdv-card border border-sdv-border rounded-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-sdv-border">
              <Icon name="Sparkles" size={18} className="text-sdv-red shrink-0" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Например: секция для ребёнка 8 лет, соревнования по плаванию…"
                className="flex-1 bg-transparent font-body text-sdv-light placeholder:text-sdv-muted text-base focus:outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={searchLoading || !searchQuery.trim()}
                className="bg-sdv-red hover:bg-sdv-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-4 py-1.5 font-display text-xs font-medium text-white uppercase tracking-wider rounded-sm shrink-0"
              >
                {searchLoading ? "Ищу…" : "Найти"}
              </button>
              <button onClick={closeSearch} className="text-sdv-muted hover:text-sdv-light transition-colors ml-1">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Loading */}
            {searchLoading && (
              <div className="px-5 py-8 text-center">
                <div className="inline-flex items-center gap-3 text-sdv-muted font-body text-sm">
                  <div className="w-4 h-4 border-2 border-sdv-red border-t-transparent rounded-full animate-spin" />
                  ИИ анализирует каталог…
                </div>
              </div>
            )}

            {/* Results */}
            {searchResult && !searchLoading && (
              <div className="max-h-[60vh] overflow-y-auto">
                {/* Answer */}
                <div className="px-5 py-4 bg-sdv-red/5 border-b border-sdv-border flex items-start gap-3">
                  <Icon name="Sparkles" size={15} className="text-sdv-red mt-0.5 shrink-0" />
                  <p className="font-body text-sdv-light text-sm leading-relaxed">{searchResult.answer}</p>
                </div>

                {/* Events */}
                {searchResult.events.length > 0 && (
                  <div className="px-5 py-4 border-b border-sdv-border">
                    <p className="font-display text-xs uppercase tracking-wider text-sdv-muted mb-3">События</p>
                    <div className="space-y-2">
                      {searchResult.events.map(e => (
                        <div key={e.id} className="flex items-center justify-between bg-sdv-surface rounded-sm px-4 py-3">
                          <div>
                            <p className="font-body font-medium text-sdv-light text-sm">{e.title}</p>
                            <p className="font-body text-sdv-muted text-xs mt-0.5">{e.date} · {e.place}</p>
                          </div>
                          <span className="font-body text-xs text-sdv-orange ml-4 shrink-0">{e.sport}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sections */}
                {searchResult.sections.length > 0 && (
                  <div className="px-5 py-4 border-b border-sdv-border">
                    <p className="font-display text-xs uppercase tracking-wider text-sdv-muted mb-3">Секции</p>
                    <div className="space-y-2">
                      {searchResult.sections.map(s => (
                        <div key={s.id} className="flex items-center justify-between bg-sdv-surface rounded-sm px-4 py-3">
                          <div>
                            <p className="font-body font-medium text-sdv-light text-sm">{s.sport}</p>
                            <p className="font-body text-sdv-muted text-xs mt-0.5">{s.schedule} · {s.age}</p>
                          </div>
                          <div className="flex items-center gap-1.5 ml-4 shrink-0">
                            <div className={`w-1.5 h-1.5 rounded-full ${s.slots <= 5 ? "bg-sdv-orange" : "bg-green-400"}`} />
                            <span className="font-body text-xs text-sdv-muted">{s.slots} мест</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trainers */}
                {searchResult.trainers.length > 0 && (
                  <div className="px-5 py-4">
                    <p className="font-display text-xs uppercase tracking-wider text-sdv-muted mb-3">Тренеры</p>
                    <div className="space-y-2">
                      {searchResult.trainers.map(t => (
                        <div key={t.id} className="flex items-center gap-3 bg-sdv-surface rounded-sm px-4 py-3">
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 text-white font-display font-bold text-sm" style={{ background: "linear-gradient(135deg, #E8311A, #FF6B2C)" }}>
                            {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-body font-medium text-sdv-light text-sm">{t.name}</p>
                            <p className="font-body text-sdv-muted text-xs">{t.sport} · {t.rank}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResult.events.length === 0 && searchResult.sections.length === 0 && searchResult.trainers.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <Icon name="SearchX" size={32} className="text-sdv-border mx-auto mb-3" />
                    <p className="font-body text-sdv-muted text-sm">Попробуйте другой запрос</p>
                  </div>
                )}
              </div>
            )}

            {/* Hint */}
            {!searchResult && !searchLoading && (
              <div className="px-5 py-5 flex flex-wrap gap-2">
                {["Секция для ребёнка 10 лет", "Соревнования по плаванию", "Тренер по самбо", "Нормативы МС"].map(hint => (
                  <button
                    key={hint}
                    onClick={async () => {
                      setSearchQuery(hint);
                      setSearchLoading(true);
                      setSearchResult(null);
                      try {
                        const res = await fetch(AI_SEARCH_URL, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ query: hint }),
                        });
                        const data = await res.json();
                        setSearchResult({
                          answer: data.answer || "Результаты поиска",
                          events: Array.isArray(data.events) ? data.events : [],
                          sections: Array.isArray(data.sections) ? data.sections : [],
                          trainers: Array.isArray(data.trainers) ? data.trainers : [],
                        });
                      } catch {
                        setSearchResult({ answer: "Не удалось выполнить поиск. Попробуйте позже.", events: [], sections: [], trainers: [] });
                      } finally {
                        setSearchLoading(false);
                      }
                    }}
                    className="font-body text-xs text-sdv-muted border border-sdv-border hover:border-sdv-red/40 hover:text-sdv-light px-3 py-1.5 rounded-sm transition-all"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* APPLY MODAL */}
      {applyTarget && (
        <div
          className="fixed inset-0 z-[70] bg-sdv-darker/85 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={e => { if (e.target === e.currentTarget) closeApply(); }}
        >
          <div className="w-full max-w-md bg-sdv-card border border-sdv-border rounded-sm shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-sdv-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sdv-red" />
                  <span className="font-body text-sdv-orange text-xs uppercase tracking-wide">
                    {applyTarget.type === "event" ? "Событие" : "Секция"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-xl leading-tight">{applyTarget.name}</h3>
              </div>
              <button onClick={closeApply} className="text-sdv-muted hover:text-sdv-light transition-colors mt-1">
                <Icon name="X" size={18} />
              </button>
            </div>

            {applySuccess ? (
              <div className="px-6 py-10 text-center">
                <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-green-400" />
                </div>
                <h4 className="font-display font-bold text-white text-xl mb-2">Заявка принята!</h4>
                <p className="font-body text-sdv-muted text-sm">Мы свяжемся с вами по указанному номеру телефона.</p>
                <button
                  onClick={closeApply}
                  className="mt-6 bg-sdv-red hover:bg-sdv-orange transition-colors px-6 py-2.5 font-display text-sm font-medium text-white uppercase tracking-wider rounded-sm"
                >
                  Отлично
                </button>
              </div>
            ) : (
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="font-body text-sdv-muted text-xs uppercase tracking-wide block mb-1.5">Имя и фамилия *</label>
                  <input
                    value={applyForm.full_name}
                    onChange={e => setApplyForm(f => ({ ...f, full_name: e.target.value }))}
                    placeholder="Иванов Иван Иванович"
                    className="w-full bg-sdv-surface border border-sdv-border focus:border-sdv-red/50 text-sdv-light font-body text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors placeholder:text-sdv-muted/50"
                  />
                </div>
                <div>
                  <label className="font-body text-sdv-muted text-xs uppercase tracking-wide block mb-1.5">Телефон *</label>
                  <input
                    value={applyForm.phone}
                    onChange={e => setApplyForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+7 (342) ___-__-__"
                    className="w-full bg-sdv-surface border border-sdv-border focus:border-sdv-red/50 text-sdv-light font-body text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors placeholder:text-sdv-muted/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-body text-sdv-muted text-xs uppercase tracking-wide block mb-1.5">Email</label>
                    <input
                      value={applyForm.email}
                      onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="mail@example.com"
                      className="w-full bg-sdv-surface border border-sdv-border focus:border-sdv-red/50 text-sdv-light font-body text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors placeholder:text-sdv-muted/50"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sdv-muted text-xs uppercase tracking-wide block mb-1.5">Дата рождения</label>
                    <input
                      type="date"
                      value={applyForm.birthdate}
                      onChange={e => setApplyForm(f => ({ ...f, birthdate: e.target.value }))}
                      className="w-full bg-sdv-surface border border-sdv-border focus:border-sdv-red/50 text-sdv-light font-body text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sdv-muted text-xs uppercase tracking-wide block mb-1.5">Комментарий</label>
                  <textarea
                    value={applyForm.comment}
                    onChange={e => setApplyForm(f => ({ ...f, comment: e.target.value }))}
                    placeholder="Дополнительная информация..."
                    rows={2}
                    className="w-full bg-sdv-surface border border-sdv-border focus:border-sdv-red/50 text-sdv-light font-body text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors resize-none placeholder:text-sdv-muted/50"
                  />
                </div>
                <div className="flex gap-3 pt-1 pb-1">
                  <button
                    onClick={closeApply}
                    className="flex-1 border border-sdv-border hover:border-sdv-red/30 text-sdv-muted hover:text-sdv-light transition-all py-2.5 font-display text-xs font-medium uppercase tracking-wider rounded-sm"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={submitApply}
                    disabled={applyLoading || !applyForm.full_name.trim() || !applyForm.phone.trim()}
                    className="flex-1 bg-sdv-red hover:bg-sdv-orange disabled:opacity-40 disabled:cursor-not-allowed transition-colors py-2.5 font-display text-xs font-medium text-white uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
                  >
                    {applyLoading ? (
                      <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Отправка…</>
                    ) : (
                      <><Icon name="Send" size={13} /> Подать заявку</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, subtitle, count }: { title: string; subtitle: string; count?: number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-4xl font-bold text-white tracking-tight">{title}</h2>
        <p className="font-body text-sdv-muted text-base mt-1">{subtitle}</p>
      </div>
      {count !== undefined && (
        <div className="text-right">
          <span className="font-display text-3xl font-bold text-sdv-red">{count}</span>
          <span className="font-body text-sdv-muted text-sm ml-2">найдено</span>
        </div>
      )}
    </div>
  );
}

function EventCard({ event, delay, onApply }: { event: typeof EVENTS[0]; delay: number; onApply: () => void }) {
  const badgeColors: Record<string, string> = {
    "Скоро": "text-sdv-orange border-sdv-orange/30 bg-sdv-orange/10",
    "Регистрация": "text-green-400 border-green-400/30 bg-green-400/10",
    "Открыт": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  };

  return (
    <div
      className="bg-sdv-card border border-sdv-border rounded-sm p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-sdv-red/30"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-body text-sdv-orange text-xs font-medium uppercase tracking-wide">{event.sport}</span>
        <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-sm border ${badgeColors[event.badge] || "text-sdv-muted border-sdv-border"}`}>
          {event.badge}
        </span>
      </div>
      <h3 className="font-display font-semibold text-white text-lg leading-tight mb-4 group-hover:text-sdv-red transition-colors">
        {event.title}
      </h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sdv-muted text-sm font-body">
          <Icon name="Calendar" size={13} className="text-sdv-border shrink-0" />
          {event.date}
        </div>
        <div className="flex items-center gap-2 text-sdv-muted text-sm font-body">
          <Icon name="MapPin" size={13} className="text-sdv-border shrink-0" />
          {event.place}
        </div>
        <div className="flex items-center gap-2 text-sdv-muted text-sm font-body">
          <Icon name="Users" size={13} className="text-sdv-border shrink-0" />
          {event.age} · {event.level}
        </div>
      </div>
      <button
        onClick={onApply}
        className="w-full bg-sdv-surface border border-sdv-border hover:border-sdv-red hover:bg-sdv-red/5 transition-all py-2 font-display text-xs font-medium text-sdv-light uppercase tracking-wider rounded-sm"
      >
        Подать заявку
      </button>
    </div>
  );
}

function SectionCard({ section, delay, onApply }: { section: typeof SECTIONS[0]; delay: number; onApply: () => void }) {
  return (
    <div
      className="bg-sdv-card border border-sdv-border rounded-sm p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-sdv-red/30"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-sdv-red/10 border border-sdv-red/20 rounded-sm flex items-center justify-center shrink-0">
          <Icon name={section.icon as "Zap"} size={22} className="text-sdv-red" fallback="Activity" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-white text-lg leading-tight group-hover:text-sdv-red transition-colors">
            {section.sport}
          </h3>
          <p className="font-body text-sdv-muted text-sm mt-0.5">{section.trainer}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sdv-muted text-sm font-body">
          <Icon name="Clock" size={13} className="text-sdv-border shrink-0" />
          {section.schedule}
        </div>
        <div className="flex items-center gap-2 text-sdv-muted text-sm font-body">
          <Icon name="Users" size={13} className="text-sdv-border shrink-0" />
          {section.age} · {section.level}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${section.slots <= 5 ? "bg-sdv-orange" : "bg-green-400"}`} />
          <span className="font-body text-xs text-sdv-muted">{section.slots} мест свободно</span>
        </div>
        <button
          onClick={onApply}
          className="bg-sdv-red hover:bg-sdv-orange transition-colors px-4 py-1.5 font-display text-xs font-medium text-white uppercase tracking-wider rounded-sm"
        >
          Записаться
        </button>
      </div>
    </div>
  );
}

function TrainerCard({ trainer, delay }: { trainer: typeof TRAINERS[0]; delay: number }) {
  const initials = trainer.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div
      className="bg-sdv-card border border-sdv-border rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sdv-red/30 flex gap-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-16 h-16 rounded-sm flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #E8311A, #FF6B2C)" }}>
        <span className="font-display font-bold text-white text-xl">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-white text-xl">{trainer.name}</h3>
        <p className="font-body text-sdv-orange text-sm mt-0.5">{trainer.sport}</p>
        <p className="font-body text-sdv-muted text-sm mt-1">{trainer.rank}</p>
        <div className="flex gap-6 mt-4">
          <div>
            <div className="font-display font-bold text-white text-2xl">{trainer.exp}</div>
            <div className="font-body text-sdv-muted text-xs uppercase tracking-wide">Стаж</div>
          </div>
          <div>
            <div className="font-display font-bold text-white text-2xl">{trainer.pupils}</div>
            <div className="font-body text-sdv-muted text-xs uppercase tracking-wide">Воспитанников</div>
          </div>
          <div>
            <div className="font-display font-bold text-sdv-red text-2xl">{trainer.wins}</div>
            <div className="font-body text-sdv-muted text-xs uppercase tracking-wide">Побед</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-3 py-20 text-center">
      <Icon name="SearchX" size={40} className="text-sdv-border mx-auto mb-4" />
      <p className="font-display text-sdv-muted text-lg">Ничего не найдено</p>
      <p className="font-body text-sdv-muted/60 text-sm mt-1">Попробуйте изменить фильтры</p>
    </div>
  );
}

const VENUE_TYPE_ICONS: Record<string, string> = {
  "Стадион": "Trophy",
  "Бассейн": "Waves",
  "Спорткомплекс": "Building2",
  "Дворец спорта": "Star",
  "Открытая площадка": "Trees",
};

function MapSection() {
  const [selected, setSelected] = useState<typeof VENUES[0] | null>(null);
  const [filter, setFilter] = useState("Все");
  const types = ["Все", ...Array.from(new Set(VENUES.map(v => v.type)))];
  const filtered = filter === "Все" ? VENUES : VENUES.filter(v => v.type === filter);

  // Центр карты — Пермь
  const centerLat = 58.0105;
  const centerLon = 56.2502;

  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${centerLon}%2C${centerLat}&z=12&l=map&${
    VENUES.map(v => `pt=${v.lon}%2C${v.lat}%2Cpm2rdm`).join("~")
  }`;

  return (
    <div>
      <SectionHeader title="КАРТА" subtitle="Спорткомплексы и площадки проведения мероприятий" count={filtered.length} />

      {/* Type filter */}
      <div className="flex flex-wrap gap-2 mt-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-all ${
              filter === t
                ? "border-sdv-red bg-sdv-red/10 text-sdv-red"
                : "border-sdv-border text-sdv-muted hover:border-sdv-red/40 hover:text-sdv-light"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Venue list */}
        <div className="lg:col-span-1 space-y-3 max-h-[560px] overflow-y-auto pr-1">
          {filtered.map(venue => (
            <button
              key={venue.id}
              onClick={() => setSelected(selected?.id === venue.id ? null : venue)}
              className={`w-full text-left bg-sdv-card border rounded-sm p-4 transition-all duration-200 ${
                selected?.id === venue.id
                  ? "border-sdv-red sdv-glow"
                  : "border-sdv-border hover:border-sdv-red/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 ${
                  selected?.id === venue.id ? "bg-sdv-red" : "bg-sdv-red/10"
                }`}>
                  <Icon
                    name={VENUE_TYPE_ICONS[venue.type] as "Trophy"}
                    size={16}
                    className={selected?.id === venue.id ? "text-white" : "text-sdv-red"}
                    fallback="MapPin"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sdv-light text-sm">{venue.name}</p>
                  <p className="font-body text-sdv-muted text-xs mt-0.5">{venue.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-body text-xs text-sdv-orange">{venue.type}</span>
                    <span className="font-body text-xs text-sdv-muted">{venue.events} событий</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Map + detail */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Yandex map embed */}
          <div className="relative rounded-sm overflow-hidden border border-sdv-border" style={{ height: selected ? "320px" : "460px" }}>
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              title="Карта спортивных объектов"
            />
            <div className="absolute top-3 left-3 bg-sdv-darker/80 backdrop-blur border border-sdv-border rounded-sm px-3 py-1.5 flex items-center gap-2">
              <Icon name="MapPin" size={12} className="text-sdv-red" />
              <span className="font-body text-sdv-light text-xs">{VENUES.length} объектов</span>
            </div>
          </div>

          {/* Selected venue detail */}
          {selected && (
            <div className="bg-sdv-card border border-sdv-red/30 rounded-sm p-5 animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body text-xs text-sdv-orange uppercase tracking-wide">{selected.type}</span>
                    <span className="w-1 h-1 rounded-full bg-sdv-border" />
                    <span className="font-body text-xs text-sdv-muted">{selected.events} событий</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl">{selected.name}</h3>
                  <p className="font-body text-sdv-muted text-sm mt-1">{selected.address}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-sdv-muted hover:text-sdv-light transition-colors shrink-0">
                  <Icon name="X" size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
                <div className="flex items-start gap-2">
                  <Icon name="Clock" size={14} className="text-sdv-red mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sdv-muted text-xs uppercase tracking-wide">Режим работы</p>
                    <p className="font-body text-sdv-light text-sm mt-0.5">{selected.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Phone" size={14} className="text-sdv-red mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sdv-muted text-xs uppercase tracking-wide">Телефон</p>
                    <p className="font-body text-sdv-light text-sm mt-0.5">{selected.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Users" size={14} className="text-sdv-red mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sdv-muted text-xs uppercase tracking-wide">Вместимость</p>
                    <p className="font-body text-sdv-light text-sm mt-0.5">{selected.capacity.toLocaleString()} чел.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-body text-sdv-muted text-xs uppercase tracking-wide mb-2">Виды спорта</p>
                <div className="flex flex-wrap gap-2">
                  {selected.sports.map(s => (
                    <span key={s} className="font-body text-xs text-sdv-light bg-sdv-surface border border-sdv-border px-2.5 py-1 rounded-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(selected.name + " " + selected.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-sdv-red hover:bg-sdv-orange transition-colors px-4 py-2 font-display text-xs font-medium text-white uppercase tracking-wider rounded-sm"
                >
                  <Icon name="Navigation" size={13} />
                  Маршрут
                </a>
                <button className="flex items-center gap-2 border border-sdv-border hover:border-sdv-red/50 px-4 py-2 font-display text-xs font-medium text-sdv-light uppercase tracking-wider rounded-sm transition-all">
                  <Icon name="Calendar" size={13} />
                  События здесь
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}