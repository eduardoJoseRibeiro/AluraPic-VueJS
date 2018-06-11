<template>
    <button @click="disparaAcao()" class="botao" :class="tipoEstilo" :type="tipo">
        {{ rotulo }}
    </button>    
</template>
<script>
[
        'tipo', 'rotulo', 'confirmacao', 'estilo'
    ]
export default {
    
    props : {

        tipo : {

            required : true,
            type : String
        },

        rotulo : {

            required: true,
            type : String
        },
        
        confirmacao : Boolean,
        estilo : String  
    },

    methods : {

        disparaAcao(){
            if(this.confirmacao){
                if( confirm( "Deseja excluir o item? " ) ){

                    this.$emit('botaoAtivado');
                }
                return;
            }

            this.$emit('botaoAtivado');
            
        }
    },
    computed : {

        tipoEstilo(){

            if( this.estilo == 'padrao' || !this.estilo) return "botao-padrao";
            if( this.estilo == 'perigo') return "botao-perigo"; 
        }
    }
}
</script>
<style>
    .botao{

        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2rem;
    }
    .botao-perigo{

        background: firebrick;
        color: white;
    }

    .botao-padrao{
        
        background: darkcyan;
        color: white;
    }
</style>
