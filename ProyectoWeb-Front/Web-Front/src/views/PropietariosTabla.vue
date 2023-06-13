<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.RFC"
                      label="RFC"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.Apellido"
                      label="Apellido"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          {{ this.desserts[this.desserts.map(object=> object.id).indexOf(item.raw.id)].Propiedads}}
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { onMounted } from "vue";
export default {
  data: () => ({
    itemDelete: {},
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: true,
        key: "id",
      },
      { title: "RFC", key: "RFC" },
      { title: "Nombre", key: "Nombre" },
      { title: "Apellido", key: "Apellido" },
      { title: "No. Propiedades", key:"Tam", sortable: false},
      { title: "Actions", key: "actions", sortable: false },
      { title: '', key: 'data-table-expand' },
    ],
    copy: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      RFC: 0,
      Nombre: "",
      Apellido: "",
      Propiedads: 0,
      Tam: 0
    },
    defaultItem: {
      id: 1,
      RFC: 1,
      Nombre: "",
      Apellido: "",
      Propiedads: 0,
      Tam: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      onMounted(async () => {
        const valores = await fetch("http://localhost:4000/propietario");
        const val = await valores.json();
        this.copy = val;
        this.copy.forEach(item =>{
            const tam = item.Propiedads.length
            item = {id: item.id, RFC: item.RFC, Nombre: item.Nombre, Apellido: item.Apellido, Propiedads: item.Propiedads, Tam: tam}
            this.desserts.push(item)
            console.log(item)
        })
        console.log(this.desserts)
        
      });

      // //.then((response) => {
      //     this.desserts = response.data
      //     console.log(response.body)
      // })
    },
    async reiniciar() {
        const valores = await fetch("http://localhost:4000/propietario");
        const val = await valores.json();
        this.copy = val;
        this.copy.forEach(item =>{
            const tam = item.Propiedads.length
            item = {id: item.id, RFC: item.RFC, Nombre: item.Nombre, Apellido: item.Apellido, Propiedads: item.Propiedads, Tam: tam}
            this.desserts.push(item)
            console.log(item)
        })
        console.log(this.desserts)
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.itemDelete = item
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      const data = Object.assign({}, this.itemDelete);
      const js = JSON.stringify({id: data.id, rfc: data.RFC, nombre: data.Nombre, apellido: data.Apellido})
      console.log(js);
      this.deleteData(data)
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        const data = this.editedItem;
        const js = JSON.stringify({id: data.id,rfc: data.RFC, nombre: data.Nombre, apellido: data.Apellido})
        console.log(js)
        this.updateData(js)
      } else {
        this.desserts.push(this.editedItem);
        const data = this.editedItem;
        const js = JSON.stringify({rfc: data.RFC, nombre: data.Nombre, apellido: data.Apellido})
        this.postData(js)
      }
      this.initialize()
      this.close();
    },
    async postData(data) {
      const response = await fetch("http://localhost:4000/propietario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      response.json().then(data => {
        console.log(data);
        })
        this.reiniciar()
    },
    async deleteData(data){
        const id = data.id
        const response = await fetch("http://localhost:4000/propietario/" + id,{
            method: "DELETE",
        })
        response.json().then(res => {
        console.log(res);
        })
    },
    async updateData(data){
        const response = await fetch("http://localhost:4000/propietario", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      response.json().then(data => {
        console.log(data);
        })
        this.reiniciar()
    }

  },
};
</script>