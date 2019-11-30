<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="currentUser.id"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="currentUser.nome" required
                            placeholder="Informe o Nome do Usuario"/>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="currentUser.email" required
                            placeholder="Informe o Email do Usuario"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-show="mode==='save'" >
                <b-col md="6" sm="12">
                    <b-form-group label="Senha" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="currentUser.senha" required
                            placeholder="Informe o Senha do Usuario"/>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmacao de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="currentUser.confirmSenha" required
                            placeholder="Confirme a Senha do Usuario"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode=== ''"
                    @click="mode = 'save'">Editar</b-button>
            <b-button variant="primary" v-if="mode=== 'save'"
                    @click="save">Salvar</b-button>
            <b-button class="ml-2" v-if="mode=== 'save'" @click="reset">Cancelar</b-button>
        </b-form>
    </div>
</template>

<script>

import { baseApiUrl, showError } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "UserAdmin",
    data: function() {
        return {
            mode: '',
            currentUser : {}
        }
    },
    computed: mapState(['user']),
    methods: {
        leadUser(){
            const url = `${baseApiUrl}/users`
            const id = this.user.id
            axios.get(`${url}/${id}`).then(res => {
                this.currentUser = res.data
            })
        },
        reset() {
            this.mode = ''
            this.leadUser()
        },
        save() {
           // const id = this.modulo.id ? `/${this.modulo.id}` : ''
            axios['put'](`${baseApiUrl}/users/${this.user.id}`, this.currentUser)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.reset()
                }).catch(showError)
        }
    },
    mounted() {
        this.leadUser()
    },
}
</script>

<style>

</style>
