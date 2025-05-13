import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def create_user_and_db():
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")

    superuser = os.getenv("PG_SUPERUSER", "postgres")
    superpass = os.getenv("PG_SUPERPASS", "")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")

    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user=superuser,
            password=superpass,
            host=host,
            port=port
        )
        conn.autocommit = True
        cur = conn.cursor()

        cur.execute("SELECT 1 FROM pg_roles WHERE rolname = %s", (db_user,))
        if not cur.fetchone():
            cur.execute(f"CREATE ROLE {db_user} LOGIN PASSWORD %s", (db_password,))
            print(f"✅ Пользователь '{db_user}' создан.")
        else:
            print(f"ℹ️ Пользователь '{db_user}' уже существует.")

        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        if not cur.fetchone():
            cur.execute(f"CREATE DATABASE {db_name} OWNER {db_user}")
            print(f"✅ База данных '{db_name}' создана.")
        else:
            print(f"ℹ️ База данных '{db_name}' уже существует.")

        cur.execute(f"GRANT ALL PRIVILEGES ON DATABASE {db_name} TO {db_user}")
        print(f"✅ Права на базу '{db_name}' выданы пользователю '{db_user}'.")

        cur.close()
        conn.close()

    except Exception as e:
        print("❌ Ошибка при создании пользователя или базы:", e)
