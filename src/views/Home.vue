<template>
    <h1 id="title">Informacion General del Restaurant</h1>
    <div v-if="general_i">
        <p>La siguiente informacion es respecto al periodo entre {{ general_i.first_open.split("T")[0] }} y {{ general_i.last_open.split("T")[0] }}</p>
        <p>Se procesaron un total de {{ general_i.total_bills }} boletas</p>
        <GeneralValues :general_i="general_i"></GeneralValues>
    </div>
    <div v-else>
        <p>Cargando los recursos.....</p>
    </div>
</template>

<script>
import GeneralValues from '../components/GeneralValues.vue'
import axios from 'axios'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    components: {GeneralValues},
    data() {
        return{
            general_i: null,
        }
    },
    mounted() {
        axios
        .get("https://toteat-back.herokuapp.com/")
        //.get("http://127.0.0.1:8000/")
        .then(res => {
            this.general_i = res.data.data
    })
    }
}
</script>

<style>
</style>