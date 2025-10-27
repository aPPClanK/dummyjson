import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

BASE_URL = "https://dummyjson.com"

ALLOWED_PATHS = {
    "auth/login",
    "auth/refresh",
    "user/me",
    "posts",
    "products",
    "todos",
    "users",
}


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def proxy(request, path):
    clean_path = path.split("?")[0]
        
    if not any(clean_path.startswith(allowed) for allowed in ALLOWED_PATHS):
        return JsonResponse(
            {"error": f"Proxy access to '{path}' is not allowed."},
            status=403
        )

    url = f"{BASE_URL}/{path}"

    data = request.data if request.method in ['POST', 'PUT'] else None

    headers = {
        "Content-Type": "application/json"
    }
    if "Authorization" in request.headers:
        headers["Authorization"] = request.headers["Authorization"]

    try:
        res = requests.request(
            method=request.method,
            url=url,
            params=request.GET,
            json=data,
            headers=headers,
        )

        return Response(res.json(), status=res.status_code)

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
