<template>
  <div id="app">
    <h1>{{ titulo }}</h1>
    <input class="filtro" type="search" @input="filtro = $event.target.value" placeholder="Busque pelo título">
    {{ filtro }}
    <ul>
      <li v-for="foto of fotosComFiltro">
        <painel :titulo="foto.titulo">
          <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "./components/shared/painel/Painel.vue"

export default {

  components: {
    painel : Painel
  },
  name: 'app',
  data () {
    return {
      titulo: 'Alurapic',
      fotos : [],
      filtro : ''
    }
  },
  computed : {
    fotosComFiltro(){
      if( this.filtro ){
        
        let exp = new RegExp( this.filtro.trim(), 'i' ); 
        
        return this.fotos.filter( 
          foto => exp.test( foto.titulo )
        );
      }else{
        
        return this.fotos;
      }
    }
  },
  created(){
    let promise = this.$http.get('http://localhost:3000/v1/fotos');
    
    promise
      .then( res => res.json() )
      .then( fotos => this.fotos = fotos , err => console.log(err));
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.imagem-responsiva{
  width: 100%;
}

.filtro{

  display: block;
  width: 100%;
  margin: 1rem;
  padding: .4rem;
}
</style>
