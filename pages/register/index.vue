<template>
<v-form lazy-validation ref="form" @submit.prevent="register">
<Auth title="Registro">
  <template slot="content">
    <v-text-field v-model="form.name" outlined dense label="Nome" autofocus :rules="[required]"></v-text-field>
    <v-text-field v-model="form.email" outlined dense label="E-mail" type="email" :rules="[required]"></v-text-field>
    <v-text-field v-model="form.password" outlined dense label="Senha" type="password" :rules="[required]"></v-text-field>
    <v-text-field v-model="form.password_confirmation" outlined dense label="Confirmar senha" type="password" :rules="[required]"></v-text-field>
  </template>

  <template slot="actions">
    <v-btn type="submit" color="primary" :loading="loading.register">Cadastrar</v-btn>
    <v-spacer/>
    <v-btn to="/login" text color="primary">Tenho cadastro</v-btn>
  </template>
</Auth>
</v-form>
</template>

<script>
import swal  from 'sweetalert2'
import validations from '@/mixins/validations'
import error from '~/mixins/error'
export default {
  layout: 'Auth',
  mixins: [validations, error],
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    loading: {
      register: false
    }
  }),
  methods: {
    register () {
      if (this.$refs.form.validate()) {
        this.loading.register = true
        this.$axios.post('/users/store', this.form).then((res) => {
          if (res.data) {
            swal.fire({
              title: 'Sucesso!',
              text: 'Cadastro realizado com sucesso!',
              icon: 'success',
            })
            this.$router.push('/login')
          }
        }).catch((e) => {
          swal.fire({
            title: 'Erro',
            text: this.verifyError(e),
            icon: 'error'
          })
        }).finally(() => {
          this.loading.register = false
        })
      }
    }
  }
}
</script>

<style>

</style>