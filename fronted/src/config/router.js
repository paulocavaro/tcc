import Vue from 'vue' //Importa o vue e o vue router para sempre utilizados
import VueRouter from 'vue-router'

import Home from '@/components/home/Home' //importa o que queremos mostrar nos caminhos, no caso as paginas
import AdminPages from '@/components/admin/AdminPages'
import Recorrencias from '@/components/itens/Recorrencias'
import Remedios from '@/components/itens/Remedios'
import Modulos from '@/components/itens/Modulos'

Vue.use(VueRouter) //usa o VueRouter no Vue

const routes = [ //cria um array de objetos dizendo o nome, o path (caminho) e o component para aquele path
    {
        name: 'home',
        path: '/',
        component: Home
    },

    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    },

    {
        name: 'adminPages',
        path: '/modulos',
        component: Modulos
    },

    {
        name: 'adminPages',
        path: '/remedios',
        component: Remedios
    },

    {
        name: 'adminPages',
        path: '/recorrencias',
        component: Recorrencias
    }
]

export default new VueRouter ({ // por fim, exporta um objeto como parametro da funcao construtora do vuerouter, com os atributos mode, que escolhemos
    mode: 'history',      // o modo history, ai ele so ira mostrar o path, deixando a url mais limpa, e o objeto routes, que contem os dados juntamente com as rotas               
    routes
})