<template>
  <VueSidebarMenuAkahon :menuItems="menu"
  menuTitle=""
  :isSearch="false"
  profileRole=""
  :profileName="nomeUsuario"
  menuIcon=""
  profileImg=""
  @button-exit-clicked="logout"
  />
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon"
  export default {
    components: {
      VueSidebarMenuAkahon
    },
    mounted(){
      this.initialize()
    },
    methods: {
    initialize(){
      this.$http({url: 'http://apiconversaomoeda.local:81/api/usuario/initialize',  method: 'GET'})
        .then((response) => {
          console.log(response);
          if(response.status == 200)
          {
              this.nomeUsuario = response.data.nome;
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false;
        })
    },
    logout(){
      this.$http({url: 'http://apiconversaomoeda.local:81/api/logout',  method: 'POST'})
        .then((response) => {
          if(response.status == 200)
          {
              localStorage.removeItem('token');
              window.location.href = "http://localhost:8080"
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
    }),
  }
</script>