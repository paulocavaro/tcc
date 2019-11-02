<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
        sub="Tcc em desenvolvimento" />
        <div class="stats">
            <Stat title="Modulos" :value="stat.modulos"
                icon="fa fa-tablet" color="#6c757d"/>
            <Stat title="Remedios" :value="stat.remedios"
                icon="fa fa-medkit" color="#3282cd"/> 
            <Stat title="Recorrencias" :value="stat.recorrencias"
                icon="fa fa-clock-o" color="#343a40"/>  
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { mapState } from 'vuex'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function () {
        return {
            stat: {}
        }
    },
    computed: mapState(['user']),
    methods: {
        getStats(){
            axios.get(`${baseApiUrl}/stats/${this.user.id}`).then(res => {
                const modulosLength = res.data.modulos.length
                const remediosLength = res.data.remedios.length
                const recorrenciasLength = res.data.recorrencias.length
                this.stat = { 
                    modulos: modulosLength,
                    remedios: remediosLength,
                    recorrencias: recorrenciasLength
                    }
            })
        }
    },
    mounted() {
        this.getStats()
    },
}
</script>

<style>
    .stats {
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap; 
    }
</style>
