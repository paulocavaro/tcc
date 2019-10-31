<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administracao Do Sistema"
            sub="Configuracoes do usuario" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                <b-tab title="Usuario">
                    <UserAdmin/>
                </b-tab>         
                <b-tab title="Modulos">
                    <ModulosAdmin/>
                </b-tab>         
                <b-tab title="Remedios">
                    <RemediosAdmin/>
                </b-tab>  
                <b-tab title="Recorrencias">
                    <RecorrenciasAdmin/>
                </b-tab>  
                </b-tabs>        
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ModulosAdmin from './ModulosAdmin'
import RemediosAdmin from './RemediosAdmin'
import RecorrenciasAdmin from './RecorrenciasAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: "AdminPages",
    components: { PageTitle,ModulosAdmin,RemediosAdmin,UserAdmin,RecorrenciasAdmin },
}
</script>

<style>

</style>
