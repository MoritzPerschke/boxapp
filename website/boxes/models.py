from django.db import models

class Box(models.Model):
    name = models.CharField(max_length = 200)
    description = models.CharField(max_length = 1000)
    weight = models.IntegerField()
    print_time = models.IntegerField()
    image = models.ImageField(upload_to='boxes')

    def __str__(self):
        return self.name

class Filament(models.Model):
    name = models.CharField(max_length = 200)
    color = models.CharField(max_length = 200)
    price_per_kg = models.FloatField()
    image = models.ImageField(upload_to='filaments')

    def __str__(self):
        return self.name
