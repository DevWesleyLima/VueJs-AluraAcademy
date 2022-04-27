<template>
  <div>
  <h1 class="centralizado label-title">{{ titulo }}</h1>
  <!-- Modelo alternativo utilizando a tag v-text
    *  <h1 v-text="titulo"></h1>
  -->
  <p v-show="mensagem" class="centralizado label-alert">{{ mensagem }}</p>
    
  <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre por parte do título">
  
  <ul class="lista-fotos">
    <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
      <meu-painel :titulo="foto.titulo">
        <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>       
        <router-link :to="{ name: 'editarCadastro', params: { id: foto._id} }">
          <meu-botao tipo="button" rotulo="Editar">
        </meu-botao></router-link>    
        <meu-botao tipo="button" rotulo="Deletar" @botaoAtivado="remove(foto)" :confirmacao="true" estilo="perigo"></meu-botao>
      </meu-painel> 
    </li>
  </ul>
  <h1 class="centralizado label-title">***Imagens Staticas***</h1>
  <img class="lista-foto" src="/static/static-vader.png" style="width: 10%; height: 10%"> 
  <img class="lista-foto" src="/static/static-star-wars.gif" style="width: 20%; height: 20%"> 
  
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {
  components:{
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao 
  },

  data ()
  {
    return{    
      titulo: 'Alura Pictures!',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {
    fotosComFiltro()
    {
      if(this.filtro)
      {
        let exp = new RegExp(this.filtro.trim(), 'i')
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }
      else
      {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {

      this.service
        .apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = `Foto ${foto.titulo} removida com sucesso!!!`;
          },        
          err => {
          console.log(err);
          this.mensagem = err.message + `${foto.titulo}.`;
          }
        );
    }
  },

  created()
  {
    this.service = new FotoService(this.$resource);
   
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => 
      {
        this.mensagem = err.message;
      });
  }

}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    display: inline-block;
  }

  .lista-fotos-item {
    display: inline-block;
  }  
  
  .filtro {
    display: block;
    width: 100%;
  }

  .label-title {
    color: darkcyan;    
    font-family: Helvetica, sans-serif;
    font-weight: bold;
   }

  .label-alert
  {
    color: red;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
  }

  .static-img {
    text-align: center;
  }
</style>