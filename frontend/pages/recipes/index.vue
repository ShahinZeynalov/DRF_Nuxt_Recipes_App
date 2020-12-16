<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>La Recipes</h3>
          <nuxt-link to="/recipes/add" class="btn btn-info">Add Recipe</nuxt-link>
        </div>
      </div>
        <template v-for="recipe in recipes.results">
          <div :key="recipe.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <recipe-card :recipe="recipe"></recipe-card>
          </div>
        </template>
    </div>
  </main>
</template>
<script>
import RecipeCard from "~/components/RecipeCard.vue";
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: "Recipes list"
    };
  },
  components: {
    RecipeCard
  },
  // async asyncData({ $axios, params }) {
  //   try {
  //     let recipes = await $axios.$get(`/recipes/`);
  //     let r = await this.$store.
  //     console.log('-------------', recipes)
  //     // this.recipes = { recipes };
  //     return { recipes };
  //   } catch (e) {
  //     return { recipes: [] };
  //   }
  // },
  async fetch (context) {
    await context.store.dispatch('recipes/fetchRecipes');
  },
  data() {
    return {
      // recipes: []
    };
  },
  methods: {
    // async deleteRecipe(recipe_id) {
    //   try {
    //     await this.$axios.$delete(`/recipes/${recipe_id}/`); // delete recipe
    //     let newRecipes = await this.$axios.$get("/recipes/"); // get new list of recipes
    //     this.recipes = newRecipes; // update list of recipes
    //   } catch (e) {
    //   }
    // },
    ...mapActions({
      deleteRecipe: 'recipes/deleteRecipe',
    }),
    deleteRecipeMethod(id) {
      this.deleteRecipe(id)
      
      
    }
  },
  computed: {
    ...mapState({
      recipes: state => state.recipes.recipes
    })
  }
};
</script>
<style scoped>
</style>
