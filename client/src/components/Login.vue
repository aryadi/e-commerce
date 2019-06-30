<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn icon large target="_blank" slot="activator">
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="text">
                </v-text-field>
                <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password"
                  type="password">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login" @keyup.enter="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        axios({
            method: 'POST',
            url: this.$store.state.baseUrl + '/users/login',
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then((response) => {
            
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('_id', response.data.user._id);
            localStorage.setItem('firstName', response.data.user.firstName);
            localStorage.setItem('lastName', response.data.user.lastName);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('email', response.data.user.email);

            this.$store.commit('SETISLOGIN', true);
            if (localStorage.getItem('role') == 'Admin') {
              this.$store.commit('SETISADMIN', true)
            }
            Swal.fire(
              'Succesful!',
              'User logged in!',
              'success'
            )
            this.$router.push('/');
          })
          .catch((err) => {
            Swal.fire(
              'Ooops!',
              'Invalid username/password',
              'error'
            )
            console.log(err);
          });
      }
    }
  }
</script>

<style>

</style>
