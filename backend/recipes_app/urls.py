from django.urls import  path,include

from rest_framework.routers import  DefaultRouter
from .views import (
    RecipeViewset, RecipeRetriveListAPIView
)



router = DefaultRouter()
router.register(r'recipes',RecipeViewset)


urlpatterns=[
# path('',include(router.urls))
path('recipes/', RecipeRetriveListAPIView.as_view(), name='recipe')
]