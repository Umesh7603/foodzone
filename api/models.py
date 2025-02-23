from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with all permissions."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):    
    email = models.EmailField(unique=True, max_length=100)
    name = models.CharField(max_length=100)  # Removed `unique=True`
    mobile_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()

    objects = CustomUserManager()  # Assign custom manager

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mobile_number']  # Now, it will ask for name and mobile when creating a superuser

    def __str__(self):
        return self.email  # Use email as the primary identifier



class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price=models.IntegerField(null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='food_images/')
    description = models.TextField(blank=True, null=True) 
    trending_offer = models.BooleanField(default=False)  # New Field
    
    def __str__(self):
        return self.name

    
class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    items = models.JSONField()  # List of ordered items
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    status = models.CharField(default='Pending', max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Reservation(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    guests = models.PositiveIntegerField()

    def __str__(self):
        return f"Reservation for {self.customer.name} on {self.date}"

