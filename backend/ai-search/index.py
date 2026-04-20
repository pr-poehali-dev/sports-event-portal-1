import json
import os
import urllib.request

CATALOG = {
    "events": [
        {"id": 1, "title": "Первенство города по лёгкой атлетике", "sport": "Лёгкая атлетика", "date": "15 мая 2026", "place": "Стадион Динамо", "level": "Городской", "age": "14–17 лет", "badge": "Скоро"},
        {"id": 2, "title": "Открытый турнир по плаванию «Волна»", "sport": "Плавание", "date": "22 мая 2026", "place": "Бассейн Олимпийский", "level": "Региональный", "age": "10–14 лет", "badge": "Регистрация"},
        {"id": 3, "title": "Чемпионат по борьбе самбо", "sport": "Самбо", "date": "1 июня 2026", "place": "СК Спартак", "level": "Областной", "age": "18+ лет", "badge": "Регистрация"},
        {"id": 4, "title": "Кубок по художественной гимнастике", "sport": "Гимнастика", "date": "8 июня 2026", "place": "Дворец спорта", "level": "Городской", "age": "8–12 лет", "badge": "Скоро"},
        {"id": 5, "title": "Соревнования по тяжёлой атлетике", "sport": "Тяжёлая атлетика", "date": "14 июня 2026", "place": "СК Олимп", "level": "Региональный", "age": "18+ лет", "badge": "Открыт"},
        {"id": 6, "title": "Детский забег «Бегущий город»", "sport": "Лёгкая атлетика", "date": "20 июня 2026", "place": "Городской парк", "level": "Городской", "age": "6–12 лет", "badge": "Открыт"},
    ],
    "sections": [
        {"id": 1, "sport": "Лёгкая атлетика", "trainer": "Иванов А.В.", "schedule": "Пн, Ср, Пт · 17:00", "age": "10–18 лет", "level": "Начинающие / Продвинутые", "slots": 8},
        {"id": 2, "sport": "Плавание", "trainer": "Петрова М.С.", "schedule": "Вт, Чт, Сб · 9:00", "age": "6–16 лет", "level": "Все уровни", "slots": 5},
        {"id": 3, "sport": "Самбо", "trainer": "Соколов Д.П.", "schedule": "Пн, Ср, Пт · 18:30", "age": "12–25 лет", "level": "Начинающие", "slots": 12},
        {"id": 4, "sport": "Художественная гимнастика", "trainer": "Козлова Е.Н.", "schedule": "Вт, Чт · 16:00", "age": "5–14 лет", "level": "Начинающие", "slots": 3},
        {"id": 5, "sport": "Тяжёлая атлетика", "trainer": "Морозов К.А.", "schedule": "Пн–Пт · 10:00", "age": "16+ лет", "level": "Продвинутые", "slots": 7},
        {"id": 6, "sport": "Баскетбол", "trainer": "Лебедев С.В.", "schedule": "Вт, Пт · 19:00", "age": "12–20 лет", "level": "Все уровни", "slots": 15},
    ],
    "trainers": [
        {"id": 1, "name": "Алексей Иванов", "sport": "Лёгкая атлетика", "rank": "Мастер спорта России", "exp": "14 лет", "pupils": 47, "wins": 23},
        {"id": 2, "name": "Мария Петрова", "sport": "Плавание", "rank": "КМС", "exp": "9 лет", "pupils": 32, "wins": 11},
        {"id": 3, "name": "Дмитрий Соколов", "sport": "Самбо", "rank": "Заслуженный тренер", "exp": "21 год", "pupils": 68, "wins": 41},
        {"id": 4, "name": "Екатерина Козлова", "sport": "Гимнастика", "rank": "Мастер спорта", "exp": "12 лет", "pupils": 28, "wins": 16},
    ]
}

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def handler(event: dict, context) -> dict:
    """ИИ-поиск по каталогу платформы СДВ — события, секции, тренеры."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    query = body.get("query", "").strip()

    if not query:
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Пустой запрос"})}

    system_prompt = """Ты — умный помощник спортивной платформы СДВ. 
Пользователь вводит поисковый запрос на естественном языке (например: «секция для ребёнка 10 лет», «соревнования по плаванию», «тренер по самбо»).
Тебе нужно найти подходящие записи из каталога и вернуть JSON-ответ строго в формате:
{
  "answer": "краткий дружелюбный ответ (1-2 предложения)",
  "events": [список id событий из каталога, которые подходят],
  "sections": [список id секций из каталога, которые подходят],
  "trainers": [список id тренеров из каталога, которые подходят]
}
Включай только реально подходящие id. Если ничего не подходит — возвращай пустые массивы.
Отвечай только JSON, без markdown-обёртки."""

    user_prompt = f"Запрос: {query}\n\nКаталог:\n{json.dumps(CATALOG, ensure_ascii=False)}"

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 500
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"
        }
    )

    with urllib.request.urlopen(req, timeout=15) as resp:
        result = json.loads(resp.read())

    content = result["choices"][0]["message"]["content"]
    parsed = json.loads(content)

    events = [e for e in CATALOG["events"] if e["id"] in parsed.get("events", [])]
    sections = [s for s in CATALOG["sections"] if s["id"] in parsed.get("sections", [])]
    trainers = [t for t in CATALOG["trainers"] if t["id"] in parsed.get("trainers", [])]

    return {
        "statusCode": 200,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps({
            "answer": parsed.get("answer", ""),
            "events": events,
            "sections": sections,
            "trainers": trainers,
        }, ensure_ascii=False)
    }
