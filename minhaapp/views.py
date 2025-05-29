from django.http import HttpResponse

def home(request):
    return HttpResponse("Olá, mundo! Esta é minha primeira view.")