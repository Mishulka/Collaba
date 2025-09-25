from django.http import HttpResponse


def index2(request):
    return HttpResponse("Hello, world. You're at the polls index.")