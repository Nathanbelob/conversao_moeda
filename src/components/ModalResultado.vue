<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="490"
      :stateless="true"
    >
      <v-card>
        <v-card-title class="text-h5">
          Resultados Conversão
        </v-card-title>
        <v-card-text>
          <v-list>Moeda Origem: {{data.moeda_origem}}</v-list>
          <v-list>Moeda Destino: {{data.moeda_destino}}</v-list>
          <v-list>Forma Pagamento: {{data.forma_pagamento}}</v-list>
          <v-list>Valor para conversão: R${{data.valor_para_conversao}}</v-list>
          <v-list>Valor da "Moeda de destino" usado para conversão: ${{data.valor_moeda_conversao}}</v-list>
          <v-list>Valor comprado em "Moeda de destino": ${{data.valor_comprado_moeda_destino}}</v-list>
          <v-list>Taxa de pagamento: R${{data.taxa_pagamento}}</v-list>
          <v-list>Taxa de conversão: R${{data.taxa_conversao}}</v-list>
          <v-list>Valor utilizado para conversão descontando as taxas: R${{data.valor_usado_conversao}}</v-list>
          <v-alert>Obs: Os valores foram enviados para o seu email.</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="fechaModal"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
      props: [
        'show',
        'data'
      ]
        ,
    data () {
      return {
      }
    },
    methods: {
      fechaModal()
      {
        this.show = false;
        this.$emit('callback', this.show)
      }
    }
  }
</script>