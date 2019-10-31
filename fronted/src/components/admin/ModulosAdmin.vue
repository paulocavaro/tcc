<template>
    <div class="modulos-admin">
        <b-form>
            <input id="modulo-id" type="hidden" v-model="modulo.id"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="model-name">
                        <b-form-input id="model-name" type="text"
                            v-model="modulo.nome" required
                            placeholder="Informe o Nome do Modulo"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode=== 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode=== 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <br>
        <b-table hover striped :items="modulos" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadModulo(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadModulo(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global"
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "ModulosAdmin",
    data: function(){
        return {
            mode: 'save',
            modulo: {},
            modulos: [],
            fields: [
                {key: 'id', label: 'Codigo (ID)', sortable: true},
                {key: 'nome', label: 'Nome', sortable: true},
                {key: 'actions', label: 'Acoes'}
            ]
        }
    },
    computed: mapState(['user']),
    methods: {
        loadModulos() {
            const url = `${baseApiUrl}/users/${this.user.id}/modulos`
            axios.get(url).then(res => {
                this.modulos = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.modulo = {}
            this.loadModulos()
        },
        save() {
            const method = this.modulo.id ? 'put' : 'post'
            const id = this.modulo.id ? `/${this.modulo.id}` : ''
            axios[method](`${baseApiUrl}/users/${this.user.id}/modulos${id}`, this.modulo)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        remove(){
            const id = this.modulo.id 
            axios.delete(`${baseApiUrl}/users/${this.user.id}/modulos/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        loadModulo(modulo, mode = 'save'){
            this.mode = mode
            this.modulo = {...modulo}
        }
    },
    mounted() {
        this.loadModulos()
    }
}
</script>

<style>

</style>
