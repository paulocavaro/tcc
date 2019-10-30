<template>
    <div class="remedios-admin">
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
                    <b-form-group label="Password:" label-for="user-password">
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
        </b-form>
        <b-button variant="primary" v-if="mode=== ''"
                @click="mode = 'save'">Editar</b-button>
        <b-button variant="primary" v-if="mode=== 'save'"
                @click="save">Salvar</b-button>
        <b-button class="ml-2" v-if="mode=== 'save'" @click="reset">Cancelar</b-button>
    </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "RemediosAdmin"
}
</script>

<style>

</style>
