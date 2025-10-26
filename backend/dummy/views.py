import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

BASE_URL = "https://dummyjson.com"

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def proxy(request, path):
    method = request.method
    url = f"{BASE_URL}/{path}"
    
    data = request.data if method in ['POST', 'PUT'] else None

    headers = {}
    if 'Authorization' in request.headers:
        headers['Authorization'] = request.headers['Authorization']
    headers['Content-Type'] = 'application/json'

    try:
        res = requests.request(
            method,
            url,
            params=request.GET,
            json=data,
            headers=headers,
        )

        return Response(res.json(), status=res.status_code)

    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
