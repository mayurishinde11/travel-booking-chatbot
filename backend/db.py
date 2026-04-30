import sqlite3

def get_db():
    conn = sqlite3.connect("travel.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()

    # Users table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password BLOB
    )
    """)

    # Bookings table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        destination TEXT,
        type TEXT,
        budget INTEGER,
        status TEXT,
        payment_status TEXT
    )
    """)

    conn.commit()
    conn.close()