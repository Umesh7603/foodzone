from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Customize CustomUser Admin Display
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "username", "mobile", "is_staff", "is_active")
    search_fields = ("email", "mobile", "username")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("username", "email", "password", "mobile", "address")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2", "mobile", "address", "is_staff", "is_active")}
        ),
    )
    

    


# Register Models in Django Admin
admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(FoodItem)
admin.site.register(Order)
admin.site.register(Reservation)
