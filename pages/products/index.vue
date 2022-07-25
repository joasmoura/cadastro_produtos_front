<template>
  <v-card>
    <v-card-title>
      Produtos
      <v-spacer/>
      <v-btn icon to="/products/form"><v-icon>mdi-plus</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!loading.products">
            <tr v-for="(item, i) in products" :key="i">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <v-btn icon color="primary" small :to="`/products/${item.id}`">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" small @click="remove(item.id)" :loading="item.id === loading.delete">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>

            <tr v-if="products.length === 0">
              <td colspan="3">Nenhum produto encontrado</td>
            </tr>
          </template>

          <tr v-else>
            <td colspan="3"><Loading/></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-pagination
        v-if="pagination.total > 1"
        v-model="pagination.current"
        :length="pagination.total"
        total-visible="10"
        circle
        @input="onPageChange"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data: () => ({
    products: [],
    loading: {
      products: false,
      delete: null
    },
    pagination: {
      current: 1,
      total: 0
    }
  }),
  mounted () {
    this.get()
  },
  methods: {
    async get () {
      this.loading.products = true
      await this.$axios.get('/products', {
        params: {
          page: this.pagination.current
        }
      }).then((res) => {
        const products = res.data
        if (products) {
            this.products = products.data
            this.pagination.total = products.last_page
        }
      }).catch((error) => {
      }).finally(() => {
        this.loading.products = false
      })
    },
    remove (id) {
      swal.fire({
         title: 'Remover Produto?',
         text: 'Esta ação não pode ser desfeita!',
         icon: 'question',
         showCancelButton: true
      }).then((e) => {
         if (e.isConfirmed) {
            this.loading.delete = id
            this.$axios.delete(`/products/${id}`).then((res) => {
              swal.fire({
                title: 'Sucesso!',
                text: 'Produto removido com sucesso!',
                icon: 'success'
              })
              this.products = this.products.filter(item => item.id !== id)
            }).catch((error) => {
              swal.fire({
                title: 'Erro!',
                text: 'Não foi possível remover o produto!',
                icon: 'error'
              })
            }).finally(() => {
              this.loading.delete = null
            })
         }
      })
    },
    onPageChange (page) {
      this.get()
    }
  }
}
</script>

<style>

</style>