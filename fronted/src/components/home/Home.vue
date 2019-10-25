<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
        sub="Tcc em desenvolvimento" />
        <div class="stat">
            <Stat title="Modulos" :value="stat.modulos"
                icon="fa fa-folder" color="#d54d50"/>
            <Stat title="Remedios" :value="stat.remedios"
                icon="fa fa-user" color="#3282cd"/>    
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
                console.log(res)
                const modulosLength = res.modulos.length
                const remediosLength = res.remedios.length
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

</style>
