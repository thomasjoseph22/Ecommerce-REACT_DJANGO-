# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from carts.models import CartItem
import logging
from rest_framework.permissions import IsAdminUser
from .serializers import OrderSerializer


logger = logging.getLogger(__name__)


class AdminOrderListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        logger.debug("Admin fetched all orders")
        return Response(serializer.data, status=status.HTTP_200_OK)

class PurchaseView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartItem.objects.filter(cart__user=user)

        if not cart_items.exists():
            logger.error("No items in cart for user %s", user)
            return Response({'detail': 'No items in cart'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            total_price = sum(item.quantity * float(item.product.price) for item in cart_items)
            total_price = round(total_price, 2)

            logger.debug("Total price calculated: %s", total_price)

            order = Order.objects.create(user=user, total_price=total_price)

            for item in cart_items:
                OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)

            cart_items.delete()

            return Response({'order_id': order.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.exception("Error processing purchase for user %s", user)
            return Response({'detail': 'An error occurred during purchase'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderDetailView(APIView):
    def get(self, request, order_id):
        logger.debug("Received request for order ID: %s", order_id)
        
        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            logger.error("Order not found for ID: %s and user: %s", order_id, request.user)
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        order_items = OrderItem.objects.filter(order=order).select_related('product')

        order_data = {
            'id': order.id,
            'username': order.user.username,  # Add the username here
            'total_price': order.total_price,
            'created_at': order.created_at,
            'items': [
                {
                    'product': {
                        'id': item.product.id,
                        'name': item.product.name,
                        'price': item.product.price,
                    },
                    'quantity': item.quantity,
                } for item in order_items
            ],
        }

        logger.debug("Order details retrieved: %s", order_data)
        return Response(order_data, status=status.HTTP_200_OK)
