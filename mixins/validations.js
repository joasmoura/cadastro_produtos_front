export default {
    methods: {
        required (value) {
            return !!value || 'Campo obrigatório'
        }
    }
}