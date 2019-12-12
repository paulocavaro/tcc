<template>
    <div class="auth-content">
        <div class="auth-modal">
            <div class="auth-title"> {{showSignup ? 'Cadastro' : 'Login'}} </div>

            <input v-if="showSignup" v-model="user.nome" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="Email">
            <input v-model="user.senha" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmSenha" type="password" placeholder="Confirme a senha">

            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Faça o Login</span>
                <span v-else>Não tem cadastro? Faça aqui</span>
            </a>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },

        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }

        
    }
}
</script>

<style>

    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 300px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0,0,0,0,15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

</style>
