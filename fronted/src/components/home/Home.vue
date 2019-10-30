<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
        sub="Tcc em desenvolvimento" />
        <div class="stats">
            <Stat title="Modulos" :value="stat.modulos"
                icon="fa fa-tablet" color="#6c757d"/>
            <Stat title="Remedios" :value="stat.remedios"
                icon="fa fa-medkit" color="#3282cd"/>    
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function () {
        return {
            stat: {}
        }
    },
    methods: {
        getStats(){
            axios.get(`${baseApiUrl}/stats/1`).then(res => {
                //console.log(res)
                const modulosLength = res.data.modulos.length
                const remediosLength = res.data.remedios.length
                this.stat = { 
                    modulos: modulosLength,
                    remedios: remediosLength
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
