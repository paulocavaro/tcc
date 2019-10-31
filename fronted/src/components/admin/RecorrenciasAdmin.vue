<template>
    <div class="recorrencias-admin">
        <b-form>
            <input id="recorrencia-id" type="hidden" v-model="recorrencia.id"/>
            <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Inicio:" label-for="recorrencia-horaInicio">
                        <b-form-input id="recorrencia-horaInicio" type="text"
                            v-model="recorrencia.horaInicio" required
                            placeholder="Hora de inicio (hora inteira)"/>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Frequencia:" label-for="recorrencia-frequencia">
                        <b-form-input id="recorrencia-frequencia" type="number"
                            v-model="recorrencia.frequencia" required
                            placeholder="Frequencia dos remedios"/>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <br>
        <b-table hover striped :items="recorrencias" :fields="fields">
            <template slot="actions" slot-scope="data">
                <!-- <b-button variant="warning" @click="loadRecorrencias(data.item)" 
                     class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadRecorrencias(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button> -->
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "RecorrenciasAdmin",
    data: function(){
        return {
            mode: 'save',
            recorrencia: {},
            recorrencias: [],
                fields: [
                {key: 'idRemedio', label: 'Remedio (ID)', sortable: true},
                {key: 'horaInicio', label: 'Horario de Inicio', sortable: true},
                {key: 'frequencia', label: 'Frequencia (Horas)', sortable: true},
                {key: 'actions', label: 'Acoes'}
            ]
        }
    },
    computed: mapState(['user']),
    methods: {
        loadRecorrencias(){
            const url = `${baseApiUrl}/users/${this.user.id}/recorrencias`
            axios.get(url).then(res => {
                this.recorrencias = res.data
            })
        },
    },
    mounted() {
        this.loadRecorrencias()
    },
}
</script>

<style>

</style>
