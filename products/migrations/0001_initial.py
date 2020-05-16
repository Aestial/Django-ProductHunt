# Generated by Django 3.0.5 on 2020-05-16 17:42

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Product Title', max_length=255)),
                ('url', models.TextField()),
                ('body', models.TextField()),
                ('votes_total', models.IntegerField(default=1)),
                ('pub_date', models.DateField(default=datetime.datetime.now)),
                ('image', models.ImageField(default='/default/img.png', upload_to='images/products/')),
                ('icon', models.ImageField(default='/default/img.png', upload_to='images/products/icons')),
                ('hunter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
