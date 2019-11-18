<template>
    <aside class="menu" v-show="isMenuVisible">

        <router-link to="/modulos">
                <div class="teste">modulos</div> 
        </router-link>
        <router-link to="/remedios">
                <div class="color">remedios</div> 
        </router-link>
        <router-link to="/recorrencias">
                <div class="color">recorrencias</div> 
        </router-link>
    </aside>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: "Menu",
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        /* justify-content: center; */
    }

    .teste {
        color: white;
        text-decoration: none
    }

    .teste:first-child{
        margin-top: 50px;
    }

    .menu a:hover{
        text-decoration: none;
    }

    .color{
        color: aliceblue;
        text-decoration: none;
    }
</style>