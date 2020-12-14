from rest_framework import serializers
from .models import Recipe
# from django.core.validators import MinValueValidator

class RecipeSerializer(serializers.ModelSerializer):
    prep_time = serializers.IntegerField(min_value=0)
    
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Recipe
        fields = '__all__'