from django.http import JsonResponse
from django.db import connection

def healthz(request):
    """Liveness probe"""
    return JsonResponse({'status': 'ok'})

def readyz(request):
    """Readiness probe (checks db connection)"""
    try:
        connection.ensure_connection()
        return JsonResponse({'status': 'ok'})
    except Exception:
        return JsonResponse({'status': 'error', 'reason': 'database_unavailable'}, status=503)
