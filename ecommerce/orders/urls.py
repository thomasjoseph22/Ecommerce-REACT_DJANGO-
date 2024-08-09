# urls.py
from django.urls import path
from .views import PurchaseView, OrderDetailView,AdminOrderListView

urlpatterns = [
    path('purchase/', PurchaseView.as_view(), name='purchase'),
    path('<int:order_id>/', OrderDetailView.as_view(), name='order_detail'),
        path('admin/orders/', AdminOrderListView.as_view(), name='admin_orders'),

]
