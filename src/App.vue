<template>
  <div id="app">
    <h1>{{ titulo }}</h1>
    <ul>
      <li v-for="foto of fotos">
        
        <div class="painel">
          <h2 class="painel-titulo">{{ foto.titulo }}</h2>
          <div class="painel-conteudo">
            <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      titulo: 'Alurapic',
      fotos : []
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

/* estilo do painel */ 

   .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }
</style>
