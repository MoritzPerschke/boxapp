from django.http import HttpResponse
from django.shortcuts import render

from .models import Box, Filament
# Create your views here.
def index(request):
    boxes = Box.objects.order_by("name")
    filaments = Filament.objects.order_by("color")
    for i in boxes:
        print (i.name)

    context = {
        "boxes" : boxes,
        "filaments" : filaments,
    }

    return render(request, "boxes/index.html", context)
