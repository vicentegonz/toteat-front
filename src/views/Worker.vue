<template>
    <h1 id="title">Trabajadores del Restaurant</h1>
    <div v-if="general_i">
        <p>En esta seccion se puede acceder a los detalles de un Trabajador </p>
        <select @change="handleChange()" name="Trabajadores disponibles" v-model="selection">
            <option v-for="k in Object.keys(general_i.waiters_tables)" :key="k">{{k}}</option>
            <option v-for="k in Object.keys(general_i.cashiers_tables)" :key="k">{{k}}</option>
        </select>
        <button @click="handleSerch()">Click to serch</button>
    </div>
    <div v-else>
        <p>Cargando los recursos.....</p>
    </div>


    <div v-if="serch || history">
        <h2>Se busco la informacion de {{serch}}</h2>
        <h3 v-if="res_data">Resumen General</h3>
        <GeneralValues v-if="res_data" :general_i="res_data"></GeneralValues>
        <select v-if="sells" @change="handleChange2()" name="Fechas disponibles" v-model="selection2">
            <option v-for="k in Object.keys(sells).sort()" :key="k">{{k}}</option>
        </select>
        <button @click="handleSerch2()">Click to serch</button>
        <div v-if="serch2 || history2">
            <h2>Boletas de {{serch}} el dia {{serch2}}</h2>
            <GeneralValues v-if="sells2" :general_i="sells2"></GeneralValues>
            <table v-if="res_data2 && sells2">
                <div v-if="sells2">
                    <tr>
                        <th>Id de transaccion</th>
                        <th>Comensales</th>
                        <th>Apertura de mesa</th>
                        <th>Cierre de mesa</th>
                        <th>Sector</th>
                        <th>Moso</th>
                        <th>Cajero</th>
                        <th>Cargo</th>
                        <th>Conflicto</th>
                    </tr>
                    <tr v-for="data in Object.keys(res_data2)" :key="data">
                        <td><a v-bind:href="'Transactions/'+ data"> >{{data}}</a></td>
                        <td>{{res_data2[data].diners}}</td>
                        <td>{{res_data2[data].date_opened}}</td>
                        <td>{{res_data2[data].date_closed}}</td>
                        <td>{{res_data2[data].zone}}</td>
                        <td>{{res_data2[data].waiter}}</td>
                        <td>{{res_data2[data].cashier}}</td>
                        <td>$ {{res_data2[data].total}}</td>
                        <td> {{ check(data) }} </td>
                    </tr>
                </div>
            </table>
        </div>
        <div v-else>
            <div v-if="message2">
                <p>{{message2}}</p>
                <p>No se a buscado nada</p>
        </div>
        </div>
    </div>
    <div v-else>
        <div v-if="message">
            <p>{{message}}</p>
            <p>No se a buscado nada</p>
        </div>
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
            sector: null,
            serch: null,
            message: null,
            history: null,
            res_data:  null,
            sells: null,
            sector2: null,
            res_data2: null,
            history2: null,
            sells2: null,
            serch2: null,
            message2: null
        }
    },
    methods: {
        check(data){
            if (this.sells2.conflicts.includes(data)){
                return "Boleta Conflictiva"
            } else {
                return "Sin Error"
            }
        },
        handleChange() {
            this.sector = this.selection
        },
        handleSerch(){
            if (this.sector != null){
                this.serch = this.sector
                this.history = true
                this.message = null
                axios
                    .get("https://toteat-back.herokuapp.com/worker/" + this.sector)
                    //.get("http://127.0.0.1:8000/worker/" + this.sector)
                    .then(res => {
                        this.res_data = res.data.data
                        this.sells = res.data.sells})
            }
            this.message = "debes elegir algo del selector"
        },
        handleChange2() {
            this.sector2 = this.selection2
        },
        handleSerch2(){
            if (this.sector2 != null){
                this.serch2 = this.sector2
                this.history2 = true
                this.message2 = null
                axios
                    .get("https://toteat-back.herokuapp.com/" + this.sector2 + "/" + this.sector)
                    //.get("http://127.0.0.1:8000/" + this.sector2 + "/" + this.sector)
                    .then(res => {
                        this.res_data2 = res.data.data
                        this.sells2 = res.data.info})
            }
            this.message2 = "debes elegir algo del selector de fecha"
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