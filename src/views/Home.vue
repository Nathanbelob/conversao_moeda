<template>
<div>
  <VueSidebarMenuAkahon :menuItems="menu"
  menuTitle=""
  :isSearch="false"
  profileRole=""
  :profileName="nomeUsuario"
  menuIcon=""
  profileImg=""
  @button-exit-clicked="logout"
  />
  <form>
    <v-select
      v-model="moedaOrigemDefault"
      :items="moedaOrigem"
      label="Moeda Origem"
      item-text="name"
      item-value="name"
      disabled
      required
    ></v-select>
    <v-select
      v-model="destino"
      :items="moedaDestino"
      label="Moeda Destino"
      required
    ></v-select>
    <v-select
      v-model="pagamento"
      :items="formaPagamento"
      item-text="name"
      item-value="value"
      label="Forma de Pagamento"
      required
    ></v-select>
    <vuetify-money
      v-model="valor"
      label="Valor para conversão"
      placeholder="placeholder"
      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
      v-bind:options="options"
    />
    <v-btn
      class="mr-4"
      @click="submit"
      :loading="loading"
    >
      Converter
    </v-btn>
    <v-tooltip
          v-model="showA"
          top
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
            <v-icon
            >info
            </v-icon>
            </v-btn>
          </template>
          <span>Ao clicar em converter as cotações são exibidas na tela e enviadas para o email cadastrado.</span>
        </v-tooltip>
  <ModalResultado 
   :show="ModalResultado.show"
   :data="data"
   @callback="fechaModal"/>
  </form>
  </div>
</template>
<script>
import axios from 'axios';
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

export default {
  url: process.env.VUE_APP_BASE_URI_API_CONVERSAO_MOEDA,
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    ModalResultado: () => import('../components/ModalResultado.vue'),
    VueSidebarMenuAkahon
  },
  mounted() {
    this.initialize();
  },
  methods: {
      logout(){
      localStorage.removeItem('token');
      window.location.href = "http://localhost:8080"
    },
      fechaModal(request)
      {
        this.ModalResultado.show = request;
      },
      initialize()
      {
        this.$http({url: 'http://apiconversaomoeda.local:81/api/initialize',  method: 'GET'})
        .then((response) => {
          this.data = response.data;
          if(response.status == 200)
          {
            this.moedaDestino = response.data.moedas;
            this.nomeUsuario = response.data.usuario.nome;
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false;
        })
      },
      submit()
      {
        const data = {
          moeda_origem: this.moedaOrigemDefault.name,
          moeda_destino: this.destino,
          forma_pagamento: this.pagamento,
          valor: this.valor
        }
        this.ModalResultado.show = false;
        this.loading = true;
        axios({url: 'http://apiconversaomoeda.local:81/api/conversao',  data: data,  method: 'POST'})
        .then((response) => {
          this.data = response.data;
          if(response.status == 200)
          {
            this.ModalResultado.show = true;
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false;
        })
      }
    },
   data: () => ({
     ModalResultado: {
        show: false
      },
     nomeUsuario: '',
     menu: [
       {link: "/home",name: "Home", tooltip: "Home", icon: "bx-grid-alt" },
       {link: "/historico",name: "Histórico", tooltip: "Histórico", icon: "bx-grid-alt" },
       ],  
    data: {},
    showA: false,
    valor: "0.0",
    loading: false,
    pagamento: '',
    destino: '',
    readonly: false,
    disabled: false,
    outlined: true,
    clearable: true,
    valueWhenIsEmpty: "",
    options: {
      locale: "pt-BR",
      prefix: "R$",
      suffix: "",
      length: 11,
      precision: 2
    },
      name: '',
      email: '',
      select: null,
      moedaOrigem: [
        'BRL',
      ],
      moedaDestino: [],
      moedaOrigemDefault: {
        name: "BRL"
      },
       formaPagamento: [
        {
          name: 'Boleto',
          value: 'BLT'
        },
        {
          name: 'Cartão de Crédito',
          value: 'CRT'
        }
      ],
      checkbox: false,
    }),
    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
    padding: 5px;
    margin: 0;
}
</style>