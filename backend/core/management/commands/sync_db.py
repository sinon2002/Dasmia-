import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Synchronize data between SQLite and PostgreSQL databases'

    def add_arguments(self, parser):
        parser.add_argument(
            '--direction',
            choices=['sqlite-to-postgres', 'postgres-to-sqlite'],
            default='sqlite-to-postgres',
            help='Direction of data synchronization (default: sqlite-to-postgres)'
        )

    def handle(self, *args, **options):
        direction = options['direction']
        base_dir = Path(settings.BASE_DIR)
        dump_file = base_dir / 'db_sync_temp.json'

        if direction == 'sqlite-to-postgres':
            self.stdout.write(self.style.NOTICE('➡️  Exporting data from SQLite...'))
            cmd_dump = f'USE_POSTGRES=False python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 2 > "{dump_file}"'
            res = os.system(cmd_dump)
            if res != 0 or not dump_file.exists() or dump_file.stat().st_size == 0:
                self.stderr.write(self.style.ERROR('❌ Failed to export data from SQLite.'))
                return

            self.stdout.write(self.style.NOTICE('➡️  Applying migrations to PostgreSQL...'))
            cmd_migrate = 'USE_POSTGRES=True python manage.py migrate'
            res_mig = os.system(cmd_migrate)
            if res_mig != 0:
                self.stderr.write(self.style.ERROR('❌ Failed to apply migrations on PostgreSQL. Make sure PostgreSQL is running.'))
                if dump_file.exists():
                    dump_file.unlink()
                return

            self.stdout.write(self.style.NOTICE('➡️  Loading data into PostgreSQL...'))
            cmd_load = f'USE_POSTGRES=True python manage.py loaddata "{dump_file}"'
            res_load = os.system(cmd_load)

            if dump_file.exists():
                dump_file.unlink()

            if res_load == 0:
                self.stdout.write(self.style.SUCCESS('✅ Successfully synced SQLite data to PostgreSQL!'))
            else:
                self.stderr.write(self.style.ERROR('❌ Failed to load data into PostgreSQL.'))

        elif direction == 'postgres-to-sqlite':
            self.stdout.write(self.style.NOTICE('➡️  Exporting data from PostgreSQL...'))
            cmd_dump = f'USE_POSTGRES=True python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 2 > "{dump_file}"'
            res = os.system(cmd_dump)
            if res != 0 or not dump_file.exists() or dump_file.stat().st_size == 0:
                self.stderr.write(self.style.ERROR('❌ Failed to export data from PostgreSQL.'))
                return

            self.stdout.write(self.style.NOTICE('➡️  Applying migrations to SQLite...'))
            cmd_migrate = 'USE_POSTGRES=False python manage.py migrate'
            os.system(cmd_migrate)

            self.stdout.write(self.style.NOTICE('➡️  Loading data into SQLite...'))
            cmd_load = f'USE_POSTGRES=False python manage.py loaddata "{dump_file}"'
            res_load = os.system(cmd_load)

            if dump_file.exists():
                dump_file.unlink()

            if res_load == 0:
                self.stdout.write(self.style.SUCCESS('✅ Successfully synced PostgreSQL data to SQLite!'))
            else:
                self.stderr.write(self.style.ERROR('❌ Failed to load data into SQLite.'))
