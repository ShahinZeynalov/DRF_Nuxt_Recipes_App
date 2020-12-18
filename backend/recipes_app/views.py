from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecipeSerializer
from .models import Recipe
from rest_framework.generics import (
    ListAPIView, CreateAPIView, RetrieveUpdateAPIView, get_object_or_404,
    RetrieveUpdateDestroyAPIView, GenericAPIView, RetrieveDestroyAPIView,
    RetrieveAPIView
)

from rest_framework import permissions, filters, status
from rest_framework.mixins import (
    UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
)

class RecipeViewset(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

class RecipeRetrieveAPIView(RetrieveAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.AllowAny,)

class RecipeRetriveListAPIView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (permissions.AllowAny,)

# class RecipeCreateAPIView(CreateAPIView):
#     serializer_class = RecipeSerializer
#     permission_classes = (permissions.IsAuthenticated, )

# class RecipeD