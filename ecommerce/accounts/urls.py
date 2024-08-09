from django.urls import path
from .views import UserCreateView, login_view, AdminCreateView, admin_login_view, admin_user_list_view

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('admin/register/', AdminCreateView.as_view(), name='admin-register'),
    path('admin/login/', admin_login_view, name='admin-login'),
    path('admin/users/', admin_user_list_view, name='admin-user-list'),
]
