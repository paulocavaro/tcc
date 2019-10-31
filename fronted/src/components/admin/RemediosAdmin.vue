<template>
    <div class="remedios-admin">
        <b-form>
            <input id="remedio-id" type="hidden" v-model="remedio.id"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="remedio-name">
                        <b-form-input id="remedio-name" type="text"
                            v-model="remedio.nome" required
                            placeholder="Informe o Nome do Remedio"/>
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Estoque:" label-for="remedio-estoque">
                        <b-form-input id="remedio-estoque" type="number"
                            v-model="remedio.estoque" required
                            placeholder="Estoque"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="6">
                    <b-form-group label="Posicao:" label-for="remedio-posicao">
                        <b-form-input id="remedio-posicao" type="number"
                            v-model="remedio.posicao" required
                            placeholder="Posicionamento na caixa"/>
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Modulo ID:" label-for="remedio-modulo">
                        <b-form-input id="remedio-modulo" type="number"
                            v-model="remedio.idModulo" required
                            placeholder="ID do modulo"/>
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
        <b-table hover striped :items="remedios" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadRemedio(data.item)" 
                     class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadRemedio(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "RemediosAdmin",
    data: function(){
        return {
            mode: 'save',
            remedio: {},
            remedios: [],
            fields: [
                {key: 'id', label: 'Remedio (ID)', sortable: true},
                {key: 'idModulo', label: 'Modulo (ID)', sortable: true},
                {key: 'nome', label: 'Nome', sortable: true},
                {key: 'estoque', label: 'Estoque', sortable: true},
                {key: 'posicao', label: 'Posicao', sortable: true},
                {key: 'actions', label: 'Acoes'}
            ]
        }
    },
    computed: mapState(['user']),
    methods: {
        loadRemedios() {
            const url = `${baseApiUrl}/users/${this.user.id}/remedios`
            axios.get(url).then(res => {
                this.remedios = res.data
            })
        },
        reset(){
            this.mode = 'save'
            this.remedio = {}
            this.loadRemedios()
        },
        save(){
            const method = this.remedio.id ? 'put' : 'post'
            const id = this.remedio.id ? `/${this.remedio.id}` : ''
            axios[method](`${baseApiUrl}/users/${this.user.id}/remedios${id}`,this.remedio)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        remove() {
            const id = this.remedio.id
            axios.delete(`${baseApiUrl}/users/${this.user.id}/remedios/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        loadRemedio(remedio, mode = 'save'){
            this.mode = mode
            this.remedio = {... remedio}
        }
    },
    mounted() {
        this.loadRemedios()
    },
}
</script>

<style>

</style>
