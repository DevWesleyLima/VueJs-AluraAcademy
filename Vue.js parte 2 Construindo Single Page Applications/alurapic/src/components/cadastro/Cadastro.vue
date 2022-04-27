<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>

  <div>
    
    <h1 v-if="foto._id" class="centralizado label-alert">Editar Imagem</h1>
    <h1 v-else class="centralizado label-not-alert">Cadastrar Imagem</h1>
    

    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">Título</label>
        <input name="titulo" data-vv-as="título" v-model="foto.titulo" id="titulo" autocomplete="off" v-validate data-vv-rules="required|min:3|max:30">
        <span class="red-alert" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">Endereço URL</label>
        <input name="url" v-model="foto.url" id="url" autocomplete="off" v-validate data-vv-rules="required|url">
        <span class="red-alert" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">Descrição</label>
        <textarea name="descricao" data-vv-as="descrição" v-model="foto.descricao" id="descricao" autocomplete="off" v-validate data-vv-rules="min:3|max:280"/>
        <span class="red-alert" v-show="errors.has('descricao')">{{ errors.first('descricao') }}</span>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{ name:'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    }
  },

  methods: {
    grava() {     
      this.$validator
        .validateAll()
        .then(sucess => {
          if(sucess)
          {
            this.service
              .cadastra(this.foto)      
              .then(() => {
                if(this.id)
                {
                  this.$router.push({ name: 'home' });
                }
                else 
                {
                  this.foto = new Foto(), err => console.log(err)
                }
              })
          }
        });
    }

  },

  created() {
    this.service = new FotoService(this.$resource);
    
    if(this.id)
    {
      this.service
        .busca(this.id)
        .then(foto => this.foto = foto)
    }
  }
}
</script>

<style>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .label-alert {
    color: red;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
  }

  .red-alert {
    color: red;
  }

  .label-not-alert {
    color: darkcyan;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
  }
</style>