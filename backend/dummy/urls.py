from django.urls import path
from .views import proxy

urlpatterns = [
    path("<path:path>", proxy),
]
