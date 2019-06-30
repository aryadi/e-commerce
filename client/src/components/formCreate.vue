<template>
  <v-container class="my-5">

    <h3 class="display-2">Add Product</h3>

    <form enctype="multipart/form-data">
      <v-text-field v-model="productObj.name" label="Name"></v-text-field>
      <v-text-field v-model="productObj.price" label="Price" type='number'></v-text-field>
      <v-text-field v-model="productObj.stock" label="Stock" type='number'></v-text-field>
      <wysiwyg v-model="productObj.description"></wysiwyg>
      <input type="file" name="image" accept="image/png, image/jpeg" @change="parseImage($event)">
      <v-btn @click="addProduct" color="info">Submit</v-btn>
    </form>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        productObj: {
          name: '',
          price: 1,
          stock: 1,
          description: '',
          image: '',
          parsedImage: '',
        }
      }
    },
    methods: {
      addProduct() {
        if (this.productObj.name.length == 0) {
          Swal.fire({
            title: 'Oops',
            text: 'Title cannot be empty',
            type: 'error',
            confirmButtonText: 'Cool'
          })
          return '';
        }
        let formData = new FormData();
        formData.append('name', this.productObj.name);
        formData.append('image', this.productObj.parsedImage);
        formData.append('price', this.productObj.price);
        formData.append('stock', this.productObj.stock);
        formData.append('description', this.productObj.description);

        axios({
            method: 'POST',
            url: this.$store.state.baseUrl + '/products',
            data: formData,
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            config: {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          })
          .then((response) => {
            console.log(response);
            Swal.fire(
              'Succesful!',
              'Product added succesfully!',
              'success'
            )
            this.$store.dispatch('getProducts');
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      },
      parseImage(event) {
        var file = event.target.files[0];

        if (event.target.files[0]) {
          this.productObj.parsedImage = file;
        } else {
          this.productObj.parsedImage =
            "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
        }

        var reader = new FileReader();

        reader.onloadend = () => {
          this.productObj.image = reader.result;
        }

        if (file) {
          this.productObj.image = reader.readAsDataURL(file);
        } else {
          this.productObj.image =
            "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
        }
      },
    },
  }
</script>

<style scoped>
  @import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';

  .form-button {
    background-color: blue;
  }
</style>
