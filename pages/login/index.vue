<template>
<v-form lazy-validation ref="form" @submit.prevent="login">
<Auth title="Acessar painel">
  <template slot="content">
    <v-text-field v-model="form.email" outlined dense label="E-mail" type="email" autofocus :rules="[required]"></v-text-field>
    <v-text-field v-model="form.password" outlined dense label="Senha" type="password" :rules="[required]"></v-text-field>
  </template>

  <template slot="actions">
    <v-btn type="submit" color="primary" class="w-50">Entrar</v-btn>
    <v-spacer/>
    <v-btn to="/register" text color="primary">Novo</v-btn>
  </template>
</Auth>
</v-form>
</template>

<script>
import swal from 'sweetalert2'
import validations from '@/mixins/validations'
import error from '~/mixins/error'
export default {
  layout: 'Auth',
  mixins: [validations, error],
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login () {
      if (this.$refs.form.validate()) {
        await this.$auth.loginWith('local', {
          data: this.form
        }).then((res) => {
          if (res.data) {
            this.$router.push('/products')
          }
        }).catch((e) => {
          swal.fire({
            title: 'Erro',
            text: this.verifyError(e),
            icon: 'error'
          })
        })
      }
    }
  }
}
</script>

<style>

</style>