<template>
  <v-app
    dark
    id="inspire"
  >
    <router-view class="view"/>
  </v-app>
</template>

<script>
export default {
  methods: {
  },
    data: () => ({
    }),
    props: {
      source: String
    },
  }
</script>

<style scoped>

  .view {
    position: absolute;
    top: 64px;
    left: 67px;
    right: 0;
    bottom: 0;
    background: white;
  }

  .sidebar {
    position: fixed;
  }

  img {
    width: 100%;
  }

  .title{
    font-size: 1em;
  }

  .v-navigation-drawer {
    width: 165px !important;
  }

  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  .v-list-item {
    justify-content: center;
  }

  .v-list-item:hover {
    color:#1976d2 !important;
  }

  .v-list-item__title {
    text-align: center;
    color: white;
    font-size: 0.7em;
    margin-top: 0.3em;
    white-space: nowrap;
    overflow: hidden;
    white-space: initial;
  }

  .v-navigation-drawer {
    background: #1976d2 none repeat scroll 0 0 !important;  
  }

  .v-navigation-drawer__content {
    overflow: hidden !important; 
  }

  .v-toolbar {
    background-color: #1976d2 !important;
    background: transparent;
    position: fixed;
    left: 165px;
    right: 0;
    z-index: 10;
  }

  a {
    text-decoration: none;
    width: 100%;
  }

  .v-icon {
    color: white !important;
  }

  .v-btn {
    width: auto !important;
    color: white !important;
    font-weight: normal;
    font-size: 0.7em !important;
    text-transform: capitalize;
  }

  .v-btn .v-icon {
    font-size: 1.5em;
  }

  .v-menu__content {
    background: #1976d2 !important;
  }

  .v-list {
    background: #1976d2 !important;
  }
  
  .v-input {
    flex: none;
    padding-top: 1.9em !important;
  }

  .v-input__slot {
    height: 1em !important;
  }

  .v-overlay {
    left: 165px !important;
    z-index: 15 !important;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 4em;
  }

  .v-overlay__content {
    position: absolute !important;
    top: 4em !important;
    left: 4em !important;
  }

  .closeIcon {
    font-size: 2em !important;
  }

  .selected {
    background-color: rgb(33, 33, 33);
  }

  .cols-container {
    padding-right: 2em !important;
  }

  .links-title {
    margin-top: 3em;
    font-size: 0.9em;
  }

  .links {
    font-size: 0.9em;
    color: grey;
  }

  .links:hover {
    color: #1976d2;
  }

</style>
