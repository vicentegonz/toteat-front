<template>
    <h1 id="title">Productos del Restaurant</h1>
    <div v-if="general_i">
        <p>En esta seccion se puede acceder al consumo de productos por categoria desde el inicio hasta alguna fecha elegida</p>
        <select @change="handleChange()" name="categorias disponibles" v-model="selection">
            <option v-for="k in Object.keys(general_i.products_quantity)" :key="k">{{k}}</option>
        </select>
        <select @change="handleChange2()" name="categorias disponibles" v-model="selection2">
            <option v-for="k in Object.keys(sells).sort()" :key="k">{{k}}</option>
        </select>
        <button @click="handleSerch()">Click to serch</button>
    </div>
    <div v-else>
        <p>Cargando los recursos.....</p>
    </div>

    <div v-if="serch || history">
        <h2>Eston son los productos consumidos hasta {{serch2}} de {{serch}} </h2>
        <li v-for="k in Object.keys(general_i.products_quantity[serch])" :key="k">
            Se consumieron {{cantidades[k][1]}} unidades de {{k}} a $ {{cantidades[k][0]}} pesos
        </li> <br>
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
            sells: null,
            sector: null,
            sector2: null,
            serch: null,
            serch2: null,
            message: null,
            history: null,
            cantidades: null,
            sells2: null,
            res_data2: null
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
        handleChange2() {
            this.sector2 = this.selection2
        },
        handleSerch(){
            if (this.sector != null){
                this.serch = this.sector
                this.serch2 = this.sector2
                this.history = true
                this.message = null
                axios
                    //.get("https://toteat-back.herokuapp.com/")
                    .get("http://127.0.0.1:8000/products/from/"+ this.sector + "/until/" + this.sector2)
                    .then(res => {
                        console.log(res)
                        this.res_data2 = res.data.data
                        this.sells2 = res.data.info
                        this.cantidades = res.data.cantidades})
            }
            this.message = "debes elegir algo del selector"
        }

    },
    mounted() {
        axios
        //.get("https://toteat-back.herokuapp.com/")
        .get("http://127.0.0.1:8000/")
        .then(res => {
            this.general_i = res.data.data
            this.sells = res.data.sells
    })
    }
}
</script>

<style>
</style>