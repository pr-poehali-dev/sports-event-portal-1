import json
import os
import psycopg2  # noqa

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def handler(event: dict, context) -> dict:
    """Сохранение заявки на участие в событии или записи в секцию."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")

    required = ["type", "target_name", "full_name", "phone"]
    for field in required:
        if not body.get(field, "").strip():
            return {
                "statusCode": 400,
                "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
                "body": json.dumps({"error": f"Поле '{field}' обязательно"}, ensure_ascii=False)
            }

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        f"""INSERT INTO {schema}.applications
            (type, target_name, full_name, phone, email, birthdate, comment)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id""",
        (
            body["type"],
            body["target_name"],
            body["full_name"],
            body["phone"],
            body.get("email") or None,
            body.get("birthdate") or None,
            body.get("comment") or None,
        )
    )
    app_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps({"success": True, "id": app_id}, ensure_ascii=False)
    }