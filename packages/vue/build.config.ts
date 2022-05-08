import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: ["./index"],
  dependencies: [
    'vue-router',
    "vuex"
  ],
})