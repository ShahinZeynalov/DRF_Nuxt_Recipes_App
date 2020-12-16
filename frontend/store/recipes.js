import RecipeService from '~/services/RecipeService.js'

export const state = () => ({
  recipes: [],
  recipe: []
})

export const mutations = {
  SET_RECIPES (state, recipes) {
    state.recipes = recipes
  },
  SET_RECIPE (state, recipe) {
    state.recipe = recipe
  }
}

export const actions = {
  async fetchRecipes (context) {
    const response = await RecipeService.getRecipes()
    context.commit('SET_RECIPES', response.data)
  },
  async getRecipe (context, { id }) {
      const response = await RecipeService.getRecipe(id)
      context.commit('SET_RECIPE', response.data)
  },
  async deleteRecipe (context, id) {
    const response = await RecipeService.deleteRecipe(id)
    context.dispatch('fetchRecipes');
},
  async addRecipe (context, {formData, config}) {
    const response = await RecipeService.addRecipe(formData, config)
    context.dispatch('fetchRecipes');
  },
  async updateRecipe (context, {formData, config}) {
    const response = await RecipeService.updateRecipe(formData, config)
    context.dispatch('fetchRecipes');
  },
}

export const getters = {
//   getCityOptions: (state) => {
//     const options = []
//     for (const city of state.cities) {
//       const theaters = []

//       for (const theater of city.theaters) {
//         theaters.push({
//           value: theater.name,
//           label: theater.name
//         })
//       }
//       options.push({
//         value: city.name,
//         label: city.name,
//         children: theaters
//       })
//     }
//     return options
//   }
}