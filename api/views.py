from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import FoodItem

from .models import Category, FoodItem, Order, Reservation
from .serializers import (
    CategorySerializer,
    CustomUserSerializer,
    FoodItemSerializer,
    OrderSerializer,
    ReservationSerializer,
)

# Get the custom user model
User = get_user_model()

# -------------------- Category ViewSet --------------------
class CategoryViewSet(viewsets.ModelViewSet):
    """
    API View to manage food categories (like Biryani, Pizza, etc.).
    Categories include name and image.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# -------------------- Custom User ViewSet --------------------
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


# -------------------- Food Item ViewSet --------------------
class FoodItemViewSet(viewsets.ModelViewSet):
    """
    API View to manage food items.
    """
    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all()

    def get_queryset(self):
        queryset = FoodItem.objects.all()
        category_id = self.request.query_params.get("category")
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset



# -------------------- Order ViewSet --------------------
class OrderViewSet(viewsets.ModelViewSet):
    """
    API View to manage food orders.
    """
    queryset = Order.objects.select_related("user").all()  # Removed "food_item"
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


# -------------------- Reservation ViewSet --------------------
class ReservationViewSet(viewsets.ModelViewSet):
    """
    API View to manage table reservations.
    """
    queryset = Reservation.objects.select_related("customer").all()  # Changed from "user" to "customer"
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]


# -------------------- User Signup API --------------------
class UserSignupView(APIView):
    permission_classes = [AllowAny]  # Allow public access

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(commit=False)  # Prevent immediate saving
            user.set_password(request.data["password"])  # Hash password
            user.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------- User Login API --------------------
class UserLoginView(APIView):
    permission_classes = [AllowAny]  # Allow public access

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Login successful!",
            },
            status=status.HTTP_200_OK,
        )

class TrendingFoodListView(APIView):
    def get(self, request):
        trending_foods = FoodItem.objects.filter(trending_offer=True)  # Corrected field name
        serializer = FoodItemSerializer(trending_foods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)