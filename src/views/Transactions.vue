<template>
    <h1 id="title">Boletas del Restaurant</h1>
    <div v-if="general_i">
        <p>En esta seccion se puede acceder a las boletas filtradas por dia en el cual fueron realizados los pedidos</p>
        <select @change="handleChange()" name="fechas disponibles" v-model="selection">
            <option v-for="k in Object.keys(general_i).sort()" :key="k">{{k}}</option>
        </select>
        <button @click="handleSerch()">Click to serch</button>
    </div>
    <div v-else>
        <p>Cargando los recursos.....</p>
    </div>

    
    <div v-if="serch || history">
        <h2>Estas son las boletas del dia {{serch}} </h2>
        <GeneralValues v-if="information" :general_i="information"></GeneralValues>
        <table v-if="res_data && information">
            <div v-if="res_data">
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
                <tr v-for="data in general_i[serch]" :key="data">
                    <td><a v-bind:href="'Transactions/'+ data"> >{{data}}</a></td>
                    <td>{{res_data[data].diners}}</td>
                    <td>{{res_data[data].date_opened}}</td>
                    <td>{{res_data[data].date_closed}}</td>
                    <td>{{res_data[data].zone}}</td>
                    <td>{{res_data[data].waiter}}</td>
                    <td>{{res_data[data].cashier}}</td>
                    <td>$ {{res_data[data].total}}</td>
                    <td> {{ check(data) }} </td>
                </tr>
            </div>
        </table>
    </div>
    <div v-else>
        <p v-if="message">{{message}}</p>
        <p>No se a buscado nada</p>
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
            information: null
        }
    },
    methods: {
        check(data){
            if (this.information.conflicts.includes(data)){
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
                    //.get("https://toteat-back.herokuapp.com/")
                    .get("http://127.0.0.1:8000/" + this.sector)
                    .then(res => {
                        this.res_data = res.data.data
                        this.information = res.data.info})
            }
            this.message = "debes elegir algo del selector"
        }

    },
    mounted() {
        axios
        //.get("https://toteat-back.herokuapp.com/")
        .get("http://127.0.0.1:8000/")
        .then(res => {
            this.general_i = res.data.sells
    })
    }
}
</script>

<style>
</style>