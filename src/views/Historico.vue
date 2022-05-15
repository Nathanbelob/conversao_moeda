<template>
<div>
  <MenuLateral/>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="historico"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:item.valor_para_conversao="{ item }">
      <span>R${{item.valor_para_conversao}}</span>
    </template>
    <template v-slot:item.valor_moeda_conversao="{ item }">
      <span>${{item.valor_moeda_conversao}}</span>
    </template>
    <template v-slot:item.valor_comprado_moeda_destino="{ item }">
      <span>${{item.valor_comprado_moeda_destino}}</span>
    </template>
    <template v-slot:item.taxa_pagamento="{ item }">
      <span>R${{item.taxa_pagamento}}</span>
    </template>
    <template v-slot:item.taxa_conversao="{ item }">
      <span>R${{item.taxa_conversao}}</span>
    </template>
    <template v-slot:item.valor_usado_conversao="{ item }">
      <span>R${{item.valor_usado_conversao}}</span>
    </template>
    </v-data-table>
  </div>
</template>
<script>

export default {
  url: process.env.VUE_APP_BASE_URI_API_CONVERSAO_MOEDA,
  name: 'Historico',
  props: {
    msg: String
  },
  components: {
    MenuLateral: () => import('../components/MenuLateral.vue')
  },
  mounted() {
    this.initialize();
  },
  methods: {
      initialize()
      {
        this.$http({url: this.url+'/historico/initialize',  method: 'GET'})
        .then((response) => {
          if(response.status == 200)
          {
            this.historico = response.data;
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false;
        })
      },
    },
   data: () => ({
      url: process.env.VUE_APP_API_URL,
      headers: [
          {text: 'Moeda Origem', align: 'start', sortable: false, value: 'moeda_origem'},
          {text: 'Moeda Destino:', align: 'start', sortable: false, value: 'moeda_destino'},
          {text: 'Forma Pagamento', align: 'start', sortable: false, value: 'forma_pagamento'},
          {text: 'Valor para conversão', align: 'start', sortable: false, value: 'valor_para_conversao'},
          {text: 'Valor da "Moeda de destino" usado para conversão', align: 'start', sortable: false, value: 'valor_moeda_conversao'},
          {text: 'Valor comprado em "Moeda de destino"', align: 'start', sortable: false, value: 'valor_comprado_moeda_destino'},
          {text: 'Taxa de pagamento', align: 'start', sortable: false, value: 'taxa_pagamento'},
          {text: 'Taxa de conversão', align: 'start', sortable: false, value: 'taxa_conversao'},
          {text: 'Valor utilizado para conversão descontando as taxas:', align: 'start', sortable: false, value: 'valor_usado_conversao'},
          {text: 'Data', align: 'start', sortable: false, value: 'created_at', width: "15%"}
        ],
        historico: [],
        loading: true
    }),
    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-data-table-item th {
  white-space: nowrap;
}
</style>