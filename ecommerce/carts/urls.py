# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, RemoveFromCartView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'carts', CartViewSet, basename='carts')

urlpatterns = [
    path('', include(router.urls)),
    path('add_to_cart/', CartViewSet.as_view({'post': 'add_to_cart'}), name='add_to_cart'),
    path('my_cart/', CartViewSet.as_view({'get': 'my_cart'}), name='my_cart'),
    path('remove_from_cart/<int:product_id>/', RemoveFromCartView.as_view(), name='remove_from_cart'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
