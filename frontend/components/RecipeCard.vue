<template>
  <div class="card recipe-card">
    <img :src="recipe.picture" class="card-img-top" >
    <div class="card-body">
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text">
        <strong>Ingredients:</strong> {{ recipe.ingredients }}
      </p>
      <div class="action-buttons">
        <nuxt-link :to="`/recipes/${recipe.id}/`" class="btn btn-sm btn-success"> View </nuxt-link>
        <nuxt-link :to="`/recipes/${recipe.id}/edit/`" class="btn btn-sm btn-primary"> Edit </nuxt-link>
        <button @click="deleteRecipeMethod(recipe.id)"  class="btn btn-sm btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    props: ["recipe"],
    methods: {
    ...mapActions({
      deleteRecipe: 'recipes/deleteRecipe',
      fetchRecipes: 'recipes/fetchRecipes',
    }),
    deleteRecipeMethod(id) {
      this.deleteRecipe(id)
    }
    }
};
</script>
<style>
.recipe-card {
    box-shadow: 0 1rem 1.5rem rgba(0,0,0,.6);
}

.card-img-top{
  max-height:200px;
  min-height:200px;

}
</style>
