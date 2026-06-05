from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import generics, permissions, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.users.serializers import (
    AdminUserSerializer,
    CustomTokenObtainPairSerializer,
    ProfileSerializer,
    RegisterSerializer,
    UserSerializer,
)
from utils.constants import ROLE_STUDENT
from utils.permissions import IsAdmin, IsTeacherOrAdmin

User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class StudentDirectoryAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsTeacherOrAdmin]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["username", "email", "full_name"]
    ordering_fields = ["full_name", "date_joined", "username"]

    def get_queryset(self):
        queryset = User.objects.filter(role=ROLE_STUDENT).order_by("-date_joined", "full_name")
        search = self.request.query_params.get("q")
        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(username__icontains=search)
                | Q(email__icontains=search)
            )
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("username")
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["username", "email", "full_name", "role"]
    ordering_fields = ["username", "email", "date_joined"]

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get("role")
        if role:
            queryset = queryset.filter(role=role)
        return queryset
