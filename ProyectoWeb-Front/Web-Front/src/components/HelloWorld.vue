<template>
  <v-container class="fill-height">
    <v-row justify="space-around">
      <v-btn @click="ir">Ir</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const ir = () => {
  router.push({
    name: "Propietarios",
  });
};
</script>
