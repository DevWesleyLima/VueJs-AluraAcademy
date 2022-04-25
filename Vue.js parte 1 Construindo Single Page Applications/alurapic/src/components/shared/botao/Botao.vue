<template>
    <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
    //props: ['tipo', 'rotulo', 'confirmacao', 'estilo'],
    props: {
        tipo: {
            required: true,
            type: String
        },

        rotulo: {
            required: true,
            type: String
        },

        confirmacao: {
            type: Boolean
        },

        estilo: {
            type: String
        },

    },

    methods: {
        disparaAcao()
        {
            if(this.confirmacao)
            {
                if(confirm(`Deseja realmente deletar a foto selecionada?`))
                {
                    this.$emit(`botaoAtivado`);
                } 
                return;
            }          
            this.$emit('botaoAtivado');  
        }
    },

    computed: {
        estiloDoBotao() {
            if(this.estilo == 'padrao' || !this.estilo) return 'botao-padrao';
            if(this.estilo == 'perigo') return 'botao-perigo';
        }
    }    
}
</script>

<style scoped>
    .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .botao-perigo {
        background: #D2042D;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }
</style>