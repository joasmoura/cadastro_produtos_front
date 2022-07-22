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
    <v-btn type="submit" color="primary">Cadastrar</v-btn>
    <v-spacer/>
    <v-btn to="/login" text color="primary">Tenho cadastro</v-btn>
  </template>
</Auth>
</v-form>
</template>

<script>
import validations from '@/mixins/validations'
export default {
  layout: 'Auth',
  mixins: [validations],
  data: () => ({
    form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
  }),
  methods: {
    register () {
      if (this.$refs.form.validate()) {
        alert('registrar')
      }
    }
  }
}
</script>

<style>

</style>