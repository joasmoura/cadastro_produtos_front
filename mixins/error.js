export default {
    methods: {
        verifyError(e) {
          const erros = e.response.data
          let msg = ''
          if (erros && erros.errors) {
              for (const erro in erros.errors) {
              msg = erros.errors[erro][0]
              }
          } else {
              msg = 'Houve um erro ao processar os dados, se persistir, entre em contato com o suporte!'
          }
          return msg
        }
    }
}