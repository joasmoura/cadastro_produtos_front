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
import validations from '@/mixins/validations'
export default {
  layout: 'Auth',
  mixins: [validations],
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        alert('login')
      }
    }
  }
}
</script>

<style>

</style>