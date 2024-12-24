from django.urls import path
from foodzone import views

urlpatterns=[
    path('',views.home,name='home'),
    path('menu',views.menu,name='menu'),
    path('menu/<str:name>',views.menu_view,name='menu'),
    path('menu/<str:cname>/<str:pname>',views.products_details,name='products_details'),
    path('register',views.register,name='register'),
    path('login',views.login_page,name='login_page'),
    path('logout_page',views.logout_page,name='logout_page'),
    path('cart_page',views.cart_page,name='cart_page'),
    path('addtocart',views.add_to_cart,name='addtocart'),
    path('remove_cart/<str:cid>',views.remove_cart,name='remove_cart'),
    path('details',views.details,name='details'),
    path('order',views.order,name='order'),
]