<template>
<div>
<MenuLateral/>
  <v-form ref="form"
  lazy-validation>
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
      :rules="[v => !!v || 'Selecione uma moeda de destino']"
      required
    ></v-select>
    <v-select
      v-model="pagamento"
      :items="formaPagamento"
      item-text="name"
      item-value="value"
      :rules="[v => !!v || 'Selecione uma forma de pagamento']"
      label="Forma de Pagamento"
      required
    ></v-select>
    <vuetify-money
      v-model="valor"
      v-bind:label="label"
      v-bind:placeholder="placeholder"
      v-bind:rules="rules"
      v-bind:readonly="readonly"
      v-bind:disabled="disabled"
      v-bind:outlined="outlined"
      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
      v-bind:options="options"
      v-bind:properties="properties"
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
  </v-form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    ModalResultado: () => import('../components/ModalResultado.vue'),
    MenuLateral: () => import('../components/MenuLateral.vue'),
  },
  mounted() {
    this.initialize();
  },
  methods: {
      fechaModal(request)
      {
        this.ModalResultado.show = request;
      },
      initialize()
      {
        this.$http({url: this.url+'/conversao/initialize',  method: 'GET'})
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
        if(this.$refs.form.validate()){
          const data = {
            moeda_origem: this.moedaOrigemDefault.name,
            moeda_destino: this.destino,
            forma_pagamento: this.pagamento,
            valor: parseFloat(this.valor)
          }
          this.ModalResultado.show = false;
          this.loading = true;
          this.$http({url: this.url+'/conversao',  data: data,  method: 'POST'})
          .then((response) => {
            this.data = response.data.data;
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
      }
    },
   data: () => ({
    url: process.env.VUE_APP_API_URL,
    valor: "0",
    label: "Valor para conversão",
    placeholder: " ",
    rules: [v  => {
      v = v.replace('.', '').replace(",",".");
      if (!isNaN(parseFloat(v)) && v >= 1000 && v <= 100000) return true;
      return 'O valor para conversão deve ser entre R$1.000 e R$100.000';
    }],
    readonly: false,
    disabled: false,
    outlined: false,
    valueWhenIsEmpty: "",
    options: {
      locale: "pt-BR",
      prefix: "R$",
      suffix: "",
      length: 11,
      precision: 2,
    },
    properties: {
      hint: "O valor para conversão deve ser entre R$1.000 e R$100.000",
    },
     ModalResultado: {
        show: false
      },
    data: {},
    showA: false,
    loading: false,
    pagamento: '',
    destino: '',
    currency: "R$",
    initialBalance: null,
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
</style>