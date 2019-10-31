import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome', //usar os icones do fontawesome
    duration: 3000 //3 segundos
})

Vue.toasted.register(
    'defaultSucess',
    payload => !payload.msg ? 'Operacao realizada com sucesso!' : payload.msg, //callback que retorna alguma msg de sucesso, caso n ele imprime essa personalizada
    {type: 'sucess', icon: 'check'} //tipo e icone pra usar na msg
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ops... Erro inesperado' : payload.msg, //callback que retorna alguma msg de erro, caso n ele imprime essa personalizada
    {type: 'error', icon: 'times'} //tipo e icone pra usar na msg
)