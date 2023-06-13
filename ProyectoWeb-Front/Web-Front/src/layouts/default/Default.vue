<template>
  <v-app>
    <default-bar/>
    <side-bar/>

    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import SideBar from './SideBar.vue'
</script>
