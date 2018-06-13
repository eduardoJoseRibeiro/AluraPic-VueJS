<template>
  <div>
    <h1>{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado"> {{ mensagem }} </p>
    <input class="filtro" type="search" @input="filtro = $event.target.value" placeholder="Busque pelo título">
    {{ filtro }}
    <ul>
      <li v-for="foto in fotosComFiltro">
        <painel :titulo="foto.titulo">
          <imagem-responsiva v-transform="360" :titulo="foto.titulo" :url="foto.url"></imagem-responsiva>
          <router-link :to="{ name : 'altera', params : { id : foto._id }}">
            <botao rotulo="Alterar" tipo="submit"/>            
          </router-link>
          <botao 
              tipo="submit" 
              rotulo="Excluir" 
              @botaoAtivado="excluir( foto )"
              estilo="perigo"
              :confirmacao="true"></botao>
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue"
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue"
import Botao from "../shared/botao/Botao.vue";
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {
    painel : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    botao : Botao
  },
  name: 'app',
  data () {
    return {
      titulo: 'Alurapic',
      fotos : [],
      filtro : '',
      mensagem : ''
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

  methods : {
      
      excluir( foto ){

          this.resource.apaga(foto._id) 
            .then( 
              () => { 
                let indice = this.fotos.indexOf( foto );
                this.fotos.splice( indice, 1 );
                this.mensagem = `Foto ${ foto.titulo } excluída com sucesso!`
              }, err => { 
                console.log( err );
                this.mensagem = `Não foi possível remover a foto ${ foto.titulo }`;
              });
      }
  },
  created(){
    this.resource = new FotoService(this.$resource);

    this.resource
      .lista()
      .then( fotos => this.fotos = fotos , err => { 
        console.log(err);
        this.mensagem = err.message;
      });
  }
}
</script>

<style lang="scss" scoped>
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

.centralizado {
  text-align: center;
}
</style>
