<template>
  <v-form lazy-validation ref="form" @submit.prevent="save" :disabled="loading.get">
    <v-card :loading="loading.get">
        <v-card-title v-html="form.id ? 'Atualizar produto' : 'Cadastrar produto'" :rules="[required]"></v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols md="6">
                    <v-text-field v-model="form.name" label="Nome" dense outlined :rules="[required]"></v-text-field>
                </v-col>

                <v-col cols md="6">
                    <vuetify-money
                      v-model="form.price"
                      :label="'Valor'"
                      :outlined="true"
                      :valueWhenIsEmpty="''"
                      :options="money"
                      dense
                      :rules="[required]"
                    />
                </v-col>

                <v-col cols>
                    <v-textarea v-model="form.description" label="Descrição" outlined rows="10" :rules="[required]"></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-btn text to="/products">Produtos</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" :loading="loading.save">Salvar</v-btn>
        </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import swal from 'sweetalert2'
import validations from '~/mixins/validations'
import error from '~/mixins/error'
export default {
  mixins: [validations, error],
  data: () => ({
    form: {
      id: null,
      name: null,
      description: null,
      price: ''
    },
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '',
      precision: 2,
      masked: true
    },
    loading: {
      save: false,
      get: false
    }
  }),
  mounted () {
    if (this.$route.params.form !== 'form') {
      this.form.id = this.$route.params.form
      this.get()
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.loading.save = true
        if (this.form.id) {
          this.update()
        } else {
          this.create()
        }
      }
    },
    async create () {
      this.$axios.post('/products', this.form).then((res) => {
        swal.fire({
          title: 'Sucesso!',
          text: 'Produto cadastrado com sucesso!',
          icon: 'success'
        }).then((e) => {
          this.$router.push('/products/' + res.data.id)
        })
      }).catch(error => {
        swal.fire({
          title: 'Erro',
          text: this.verifyError(error),
          icon: 'error'
        })
      }).finally(() => {
        this.loading.save = false
      })
    },
    update () {
      this.$axios.put(`/products/${this.form.id}`, this.form).then((res) => {
        swal.fire({
          title: 'Sucesso!',
          text: 'Produto atualizado com sucesso!',
          icon: 'success'
        })
      }).catch(error => {
        swal.fire({
          title: 'Erro',
          text: this.verifyError(error),
          icon: 'error'
        })
      }).finally(() => {
        this.loading.save = false
      })
    },
    async get () {
      this.loading.get = true
      await this.$axios.get(`/products/${this.form.id}`).then((res) => {
        const product = res.data
        if (product) {
          this.form.name = product.name
          this.form.description = product.description
          this.form.price = product.price
        }
      }).catch(() => {
        this.$router.push('/products')
      }).finally(() => {
        this.loading.get = false
      })
    }
  }
}
</script>

<style>

</style>