import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Worker from '../views/Worker.vue'
import Zones from '../views/Zones.vue'
import Transactions from '../views/Transactions.vue'
import Products from '../views/Products.vue'
import Bill from '../views/Bill.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Workers',
        name: 'Workers',
        component: Worker
    },
    {
        path: '/Zones',
        name: 'Zones',
        component: Zones
    },
    {
        path: '/Transactions',
        name: 'Transactions',
        component: Transactions
    },
    {
        path: '/Transactions/:id',
        name: 'OneTransactions',
        component: Bill
    },
    {
        path: '/Products',
        name: 'Products',
        component: Products
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router