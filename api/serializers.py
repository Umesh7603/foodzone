from rest_framework import serializers
from .models import CustomUser, FoodItem, Order, Reservation,Category

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "mobile", "address", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["email"],  # Set email as username
            email=validated_data["email"],
            mobile=validated_data["mobile"],
            address=validated_data.get("address", ""),
            password=validated_data["password"]
        )
        return user

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Order
        fields = "__all__"

class ReservationSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Reservation
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

