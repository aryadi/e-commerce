<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Details
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Product Details
        </v-card-title>

        <v-card-text>
          <div>
        <h3 class="headline mb-0 mb-2">{{product.name}}</h3>
        <div style="text-align: left">Price: {{product.price}}</div>
        <div style="text-align: left">Stock: {{product.stock}}</div>
        <div style="text-align: left">Description: {{product.description}}</div>
      </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:['product'],
  data () {
      return {
        dialog: false
      }
    }
}
</script>

<style>

</style>
