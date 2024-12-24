from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from .models import *
from django.contrib import messages
from foodzone.form import CustomUserForm
from django.contrib.auth import authenticate,login,logout
import json
# Create your views here.
def home(request):
    products=Products.objects.filter(trending=1)
    return render(request,'index.html',{"products":products})
def menu(request):
    category=Category.objects.filter(status=0)
    return render(request,'menu.html',{"category":category})
def menu_view(request,name):
    if(Category.objects.filter(name=name,status=0)):
        products=Products.objects.filter(category__name=name)
        return render(request,'products.html',{"products":products,"category_name":name})
    else:
        messages.warning(request,'No Such Category Found')
        return redirect('menu')
    
def products_details(request,cname,pname):
    if(Category.objects.filter(name=cname,status=0)):
        if(Products.objects.filter(name=pname,status=0)):
            products=Products.objects.filter(name=pname,status=0).first()
            return render(request,'products_details.html',{"products":products})
        else:
            messages.error(request,'No Such Product Found')
            return redirect('menu')
    else:
        messages.error(request,'No Such Category Found')
        return redirect('menu')

def register(request):
    form=CustomUserForm
    if request.method=='POST':
        form=CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Registration Success You Can Login Now...!")
            return redirect('login_page')
    return render(request,'register.html',{"form":form})
        
def login_page(request):
    if request.user.is_authenticated:
        return redirect('/')
    else:
    
        if request.method=='POST':
            name=request.POST.get('username')
            pwd=request.POST.get('password')
            user=authenticate(request,username=name,password=pwd)
            if user is not None:
                login(request,user)
                messages.success(request,"Logged in Successfully...")
                return redirect("/")
            else:
                messages.error(request,"Invalid Username or Password")
                return redirect('/login')
        return render(request,'login.html')


def logout_page(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request,"Logged Out Successfully")
    return redirect('/')


def cart_page(request):
    if request.user.is_authenticated:
        cart=Cart.objects.filter(user=request.user)
        return render(request,'cart.html',{'cart':cart})
    else:
        return redirect("/")
    

def add_to_cart(request):
    if request.headers.get('x-requested-with')=='XMLHttpRequest':
        if request.user.is_authenticated:
            data=json.load(request)
            products_qty=data['products_qty']
            products_id=data['pid']
            products_status=Products.objects.get(id=products_id)
            if products_status:
                if Cart.objects.filter(user=request.user.id,products_id=products_id):
                     return JsonResponse({'status':'Product Already in Cart'},status=200)
                else:
                    if products_status.quantity>=products_qty:
                        Cart.objects.create(user=request.user,products_id=products_id,products_qty=products_qty)
                        return JsonResponse({'status':'Product Added To Cart'},status=200)
                    else:
                        return JsonResponse({'status':'Product Stock Not Available'},status=200)
                        
            return JsonResponse({'status':'Product Add To Cart Success'},status=200)
        else:
            return JsonResponse({'status':'Login To Add Cart'},status=200)
    else:
         return JsonResponse({'status':'Invalid Access'},status=200)


def remove_cart(request,cid):
    cartitem=Cart.objects.get(id=cid)
    cartitem.delete()
    return redirect("/cart_page")

def details(request):
    return render(request,'details.html')

def order(request):
    return render(request,'order.html')
        
            
            