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
                            placeholder="Frequencia da dose"/>
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="12">
                    <b-form-group label="Remedio ID:" label-for="recorrencia-idRemedio">
                        <b-form-input id="recorrencia-idRemedio" type="number"
                            v-model="recorrencia.idRemedio" required
                            placeholder="ID do Remedio"/>
                    </b-form-group>
                </b-col>
            </b-row>
                <span class="dia-name">Dias:</span>
                <div class="button-dias">
                    <b-button v-for="(dia,i) of ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']"
                    :key="i" @click="toggle(i)"
                    :variant="dias[i] ? 'primary' : 'outline-primary'">{{dia}}</b-button>
                </div>
                <br>
            <b-button variant="primary" v-if="mode=== 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode=== 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <br>
        <b-table hover striped :items="recorrencias" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadRecorrencia(data.item)" 
                     class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadRecorrencia(data.item, 'remove')">
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
    name: "RecorrenciasAdmin",
    data: function(){
        return {
            mode: 'save',
            recorrencia: {},
            recorrencias: [],
            dias:[false,false,false,false,false,false,false],
                fields: [
                {key: 'id', label: 'Recorrencia (ID)', sortable: true},    
                {key: 'idRemedio', label: 'Remedio (ID)', sortable: true},
                {key: 'horaInicio', label: 'Horario de Inicio', sortable: true},
                {key: 'frequencia', label: 'Frequencia (Horas)', sortable: true},
                {key: 'actions', label: 'Acoes'}
            ]
        }
    },
    computed: mapState(['user']),
    methods: {
        toggle(i) {
             this.$set(this.dias, i, !this.dias[i]) // this.dias[i] = !this.dias[i]
            //  console.log(this.dias)
        },
        loadRecorrencias(){
            const url = `${baseApiUrl}/users/${this.user.id}/recorrencias`
            axios.get(url).then(res => {
                this.recorrencias = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.recorrencia = {}
            this.dias = [false,false,false,false,false,false,false]
            this.recorrencia.dia = ''
            this.loadRecorrencias()
        },
        save(){
            const method = this.recorrencia.id ? 'put' : 'post'
            const id = this.recorrencia.id ? `/${this.recorrencia.id}` : ''
            this.converteDiasNumero()
            console.log(this.recorrencia)
            axios[method](`${baseApiUrl}/users/${this.user.id}/recorrencias${id}`,this.recorrencia)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        remove() {
            const id = this.recorrencia.id
            axios.delete(`${baseApiUrl}/users/${this.user.id}/recorrencias/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        },
        loadRecorrencia(recorrencia, mode = 'save'){
            this.mode = mode
            this.recorrencia = {... recorrencia}
            console.log(this.recorrencia)
            this.converteNumeroDias()
            // console.log(this.recorrencia.dias)
        },
        converteDiasNumero() {
            const str = this.dias.reduce((arr, escolhido, index) => (escolhido && arr.push(index), arr), [])
            this.recorrencia.dia = ''+str.join('')
        },
        converteNumeroDias() {
            this.recorrencia.dia = '' + this.recorrencia.dia
            for(let i=0;i<=6;i++){
                if(this.recorrencia.dia.includes(i)){
                    this.dias[i] = true;
                }
            }
        }
    },
    mounted() {
        this.loadRecorrencias()
    },
}
</script>

<style>
    .button-dias{
        margin-top: 8px;
    }
</style>
