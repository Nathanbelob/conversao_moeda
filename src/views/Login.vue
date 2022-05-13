<template>
    <div class="login">
        <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4>
                <v-card>
                    <v-card-text class="pt-4">
                        <v-form ref="form">
                            <v-text-field
                            label="Email"
                            v-model="email"
                            required
                            ></v-text-field>
                            <v-text-field
                            label="Password"
                            type="password"
                            v-model="password"
                            required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="submit" class="green white--text">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
          </v-layout>
       </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'Login',
   email: '',
   password: '',
   props: {
      source: String,
   },
   methods: {
       submit()
       {
        axios({url: 'http://apiconversaomoeda.local:81/api/login',  data: {email: this.email, password: this.password},  method: 'POST'})
        .then((response) => {
          localStorage.token = response.data.access_token;
          this.$router.push({ name: 'home'});
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loadingControl.dataTable = false;
        })
       }
   }
};
</script>

<style scoped>
.login {
    height: 100vh;
}
h4 {
    font-size: 1em !important;
    padding: 1em;
    color: black;
}
.v-card {
    text-align: center;
    margin: 1em;
}
.v-card__title {
    justify-content: center;
}
.v-btn {
    width: 100%;
}
.link-color {
    color: #d38841;
    text-decoration: none;
}
.v-card {
    padding: 1em;
}
.v-card__actions {
    display: block;
}
.green {
    margin-bottom: 1em;
}
.create {
    text-transform: capitalize;
    margin-bottom: 1em;
}
.row {
    font-size: 0.7em;
    justify-content: center;
}
.row-item {
    padding: 0 0.7em;
}
.border {
    border-right: 1px solid black;
}
</style>
