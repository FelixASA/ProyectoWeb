<template>
      <v-navigation-drawer
        expand-on-hover
        rail
        permanent
      >
        <v-list>
          <v-list-item
            prepend-avatar=""
            title="Felix"
            subtitle="ejemplo@ejemplo.com"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Propietarios" value="myfiles" @click="propietarios"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Propiedades" value="shared" @click="propiedades"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Arrendatarios" value="starred" @click="arrendatarios"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Propietario-Propiedad" value="starred" @click="relaciones"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const propietarios = () => {
  router.push({
    name: "Propietarios",
  });
};


const propiedades = () => {
  router.push({
    name: "Propiedades",
  });
};

const arrendatarios = () => {
  router.push({
    name: "Arrendatarios",
  });
};

const relaciones = () => {
  router.push({
    name: "Relaciones",
  });
};
</script>