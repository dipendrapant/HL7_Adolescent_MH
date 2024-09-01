from django.http import JsonResponse


def welcome(request):
    return JsonResponse({"message": "Welcome to the Django API!"})
