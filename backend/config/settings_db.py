import os
import socket
from pathlib import Path

def ensure_postgres_db(host: str, port: int | str, db_name: str, user: str, password: str, timeout: float = 1.0) -> bool:
    """Check if PostgreSQL is reachable, and automatically create the database if missing."""
    try:
        with socket.create_connection((host, int(port)), timeout=timeout):
            pass
    except (socket.error, socket.timeout, OSError, ValueError):
        return False

    try:
        import psycopg2
        from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

        # Try connecting directly to the target database
        try:
            conn = psycopg2.connect(
                dbname=db_name,
                user=user,
                password=password,
                host=host,
                port=port,
                connect_timeout=int(max(1, timeout))
            )
            conn.close()
            return True
        except psycopg2.OperationalError as e:
            err_msg = str(e)
            if 'does not exist' in err_msg or 'FATAL:  database' in err_msg:
                # Target database does not exist, try creating it via 'postgres' default DB
                try:
                    conn = psycopg2.connect(
                        dbname='postgres',
                        user=user,
                        password=password,
                        host=host,
                        port=port,
                        connect_timeout=int(max(1, timeout))
                    )
                    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
                    cur = conn.cursor()
                    cur.execute(f'CREATE DATABASE "{db_name}";')
                    cur.close()
                    conn.close()
                    print(f"✨ [DB] Automatically created PostgreSQL database '{db_name}'.")
                    return True
                except Exception as create_err:
                    print(f"⚠️  [DB] Could not auto-create database '{db_name}': {create_err}")
                    return False
            else:
                return False
    except Exception:
        return False

# Extract from main settings logic for DATABASES with auto-fallback to SQLite
def get_db_config(base_dir: Path):
    use_postgres = os.environ.get('USE_POSTGRES', 'False').lower() in ('true', '1', 'yes')
    
    if use_postgres:
        host = os.environ.get('POSTGRES_HOST', 'localhost')
        port = os.environ.get('POSTGRES_PORT', '5432')
        db_name = os.environ.get('POSTGRES_DB', 'dasmia')
        user = os.environ.get('POSTGRES_USER', 'postgres')
        password = os.environ.get('POSTGRES_PASSWORD', 'postgres')
        
        if ensure_postgres_db(host, port, db_name, user, password, timeout=1.0):
            return {
                'default': {
                    'ENGINE': 'django.db.backends.postgresql',
                    'NAME': db_name,
                    'USER': user,
                    'PASSWORD': password,
                    'HOST': host,
                    'PORT': port,
                }
            }
        else:
            print(f"[DB] PostgreSQL ({host}:{port}/{db_name}) is unavailable. Falling back to SQLite.")

    # Fallback for dev / when postgres is not reachable
    return {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': base_dir / 'db.sqlite3',
        }
    }


