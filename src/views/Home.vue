<template>
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
  <ModalResultado 
   :show="ModalResultado.show"
   :data="data"
   @callback="fechaModal"/>
  </form>
</template>
<script>
import axios from 'axios';

export default {
  url: process.env.VUE_APP_BASE_URI_API_CONVERSAO_MOEDA,
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    ModalResultado: () => import('../components/ModalResultado.vue')
  },
    methods: {
      fechaModal(request)
      {
        this.ModalResultado.show = request;
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
    data: {},
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
      moedaDestino: [
        'DLR',
        'BTC',
        'EUR'
      ],
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
<style lang="stylus">
</style>