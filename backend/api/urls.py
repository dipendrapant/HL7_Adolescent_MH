from django.urls import path

from .views import assessment_view

urlpatterns = [
    path('assessment/', assessment_view, name='assessment'),
]
