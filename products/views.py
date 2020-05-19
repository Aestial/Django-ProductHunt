from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product, Vote
from django.utils import timezone

# Create your views here.
def home(request):
    products = Product.objects
    return render(request, 'products/home.html', {'products':products})

# @login_required(login_url="/accounts/signup")
@login_required
def create(request):
    if request.method == 'POST':
        if request.POST['title'] and request.POST['body'] and request.POST['url']:
            product = Product()
            product.title = request.POST['title']
            product.body = request.POST['body']
            if request.POST['url'].startswith('http://') or request.POST['url'].startswith('https://'):
                product.url = request.POST['url']
            else:
                product.url = 'http://' + request.POST['url']            
            product.icon = request.FILES['icon']
            product.image = request.FILES['image']
            product.pub_date = timezone.datetime.now()
            product.hunter = request.user
            product.save()
            return redirect('/products/' + str(product.id))
        else:
            return render(request, 'products/create.html', {'error':'All fields are requiered'})
    else:
        return render(request, 'products/create.html')

def detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    user = request.user
    count = Vote.objects.filter(product__id=product.id).count()
    try:
        vote = Vote.objects.filter(hunter__id=user.id).filter(product__id=product.id)
        return render(request, 'products/detail.html', {'product':product, 'count':count, 'vote':vote})
    except Vote.DoesNotExist:
        return render(request, 'products/detail.html', {'product':product, 'count':count})    

@login_required
def upvote(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Product, pk=product_id)
        user = request.user
        try:
            vote = Vote.objects.filter(hunter__id=user.id).get(product__id=product.id)            
        except Vote.DoesNotExist:
            vote = Vote.objects.create(hunter_id=user.id, product_id=product.id)
            vote.save()
        return redirect('/products/' + str(product.id))
        
        
    