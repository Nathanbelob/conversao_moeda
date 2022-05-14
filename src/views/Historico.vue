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
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </div>
</template>
<script>

import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

export default {
  url: process.env.VUE_APP_BASE_URI_API_CONVERSAO_MOEDA,
  name: 'Historico',
  props: {
    msg: String
  },
  components: {
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
    },
   data: () => ({
     nomeUsuario: '',
     menu: [
       {link: "/home",name: "Home", tooltip: "Home", icon: "bx-grid-alt" },
       {link: "/historico",name: "Histórico", tooltip: "Histórico", icon: "bx-grid-alt" },
       ],  
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
    }),
    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>