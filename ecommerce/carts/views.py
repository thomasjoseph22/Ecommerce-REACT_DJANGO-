# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem, Product
from .serializers import CartSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='add_to_cart')
    def add_to_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        user = request.user

        if not user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=401)

        try:
            cart, created = Cart.objects.get_or_create(user=user)
            product = Product.objects.get(id=product_id)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_item.quantity += int(quantity)
            else:
                cart_item.quantity = int(quantity)
            cart_item.save()

            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=['get'], url_path='my_cart')
    def my_cart(self, request):
        user = request.user

        if not user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=401)

        try:
            cart = Cart.objects.get(user=user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart does not exist'}, status=404)


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            cart_item = get_object_or_404(CartItem, product_id=product_id, cart__user=request.user)
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
            return Response(status=204)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
