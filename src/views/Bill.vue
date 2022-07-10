<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div v-if="bill">
    <h1>Identificador de la boleta: {{ bill.id}}</h1>
    <p>La Mesa {{bill.table}} fue atendida por {{bill.waiter}} y el encargado de la caja al momento de cierre fue {{bill.cashier}}.</p>
    <p>la mesa se abrio el {{bill.date_opened}} y cerro el {{bill.date_closed}}, se consumieron los siguientes productos:</p>
    <li v-for="consumo in bill.products" :key="consumo.name"> {{consumo.quantity}} unidades de {{consumo.name}} a {{consumo.price}} pesos</li>
    <p>Se deberian generar {{count}} pesos y se generaron {{bill.total}}.</p>
    <p>¿Boleta conflictiva?</p>
    <p>{{count != bill.total}}</p>
</div>
</template>

<script>
//import GeneralValues from '../components/GeneralValues.vue'
import axios from 'axios'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Bill',
    components: {},
    data() {
        return {
            bill: null,
            id: this.$route.params.id,
            count: 0
        }
    },
    mounted() {
        axios
        //.get("https://toteat-back.herokuapp.com/")
        .get("http://127.0.0.1:8000/get/specific/bill/information/id/" + this.id)
        .then(res => {
            this.bill = res.data.transaction
            this.bill.products.forEach(element => {
                this.count = this.count + (element.quantity*element.price)
                })
            })
    }
}
</script>

<style>
</style>