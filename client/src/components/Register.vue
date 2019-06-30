<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register form</v-toolbar-title>
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
                <v-text-field v-model="userObj.firstName" prepend-icon="assignment" name="firstName" label="First Name"
                  type="text"></v-text-field>
                <v-text-field v-model="userObj.lastName" prepend-icon="assignment" name="lastName" label="Last Name"
                  type="text"></v-text-field>
                <v-text-field v-model="userObj.email" prepend-icon="person" name="email" label="Email" type="text">
                </v-text-field>
                <v-text-field v-model="userObj.password" prepend-icon="lock" name="password" label="Password"
                  id="password" type="password">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Swal from 'sweetalert2';
  import axios from 'axios';
  export default {
    data() {
      return {
        userObj: {
          firstName: '',
          lastName: '',
          role: 'Buyer',
          email: '',
          password: '',
        }
      }
    },
    methods: {
      register() {
        axios({
            method: 'POST',
            url: this.$store.state.baseUrl + '/users/register',
            data: this.userObj
          })
          .then((response) => {
            Swal.fire(
              'Succesful!',
              'User registered succesfully!',
              'success'
            )
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>

<style>

</style>
