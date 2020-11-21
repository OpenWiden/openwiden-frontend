# Files Structure

* plugins/
  * axios.ts - base axios configuration
  * api.ts - Provides all methods for handling data to nuxt context. So you are able to use provided methods in the code of your component with calling `this.$app` object with necessary method

* src/
  * components
  * global - global `css` files
  * lib - contains helper functions
  * interfaces - contains data types and interfaces with their resolvers (if data needs to be resolved)
  * server - server code

* store/
  * actionTypes, mutationTypes - list of all actions/mutations
