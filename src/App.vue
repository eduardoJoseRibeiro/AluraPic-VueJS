<template>
  <div id="app">
    
    <menu-nav :rotas="routes"></menu-nav>

    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Menu from "./components/shared/menu/Menu.vue"
import { routes } from "./routes"

export default {
  components : {
    'menu-nav' : Menu
  }, 
  data(){
    return {
      routes
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, 'Avenir', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 60px;
  width: 96%;
}

  .pagina-enter, .pagina-leave-active{

      opacity: 0;
  }
  .pagina-enter-active, .pagina-leave-active{

      transition: opacity .5s;
  }
</style>
