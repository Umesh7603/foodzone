from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FoodItemViewSet, OrderViewSet, CustomUserViewSet, ReservationViewSet,
    UserSignupView, UserLoginView,CategoryViewSet,TrendingFoodListView
)

# Using Django REST Framework's Router for automatic URL handling
router = DefaultRouter()
router.register(r'food', FoodItemViewSet, basename="food")
router.register(r'orders', OrderViewSet)         # API: /api/orders/
router.register(r'customers', CustomUserViewSet)   # API: /api/customers/
router.register(r'reservations', ReservationViewSet)  # API: /api/reservations/
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path("", include(router.urls)),  # Include all registered API routes
    path("signup/", UserSignupView.as_view(), name="user-signup"),  # API: /api/signup/
    path("login/", UserLoginView.as_view(), name="user-login"),  # API: /api/login/
    path('trending/', TrendingFoodListView.as_view(), name='trending-foods'),
    
    
    
]
