from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):    
    title = models.CharField(max_length=255, default="Product Title")
    body = models.TextField()
    url = models.TextField()    
    votes_total = models.IntegerField(default=1)
    pub_date = models.DateField(default=datetime.now)    
    image = models.ImageField(upload_to='images/products/', default='/default/img.png')
    icon = models.ImageField(upload_to='images/products/icons', default='/default/img.png')
    hunter = models.ForeignKey(User, on_delete=models.CASCADE)

    def summary(self):
        return self.body[:100]

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def __str__(self):
        return self.title
