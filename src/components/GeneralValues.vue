<template>
<div v-if=general_i>
    <li>Ingreso esperado: $ {{ general_i.expected_payments }} </li>
    <li>Ingreso recibido: $ {{ general_i.total_payments }} </li>
    <li>Ingreso promedio esperado por boleta: $ {{ general_i.avrg_spend_expected }} </li>
    <li>Ingreso promedio recibido por boleta: $ {{ general_i.avrg_spend_recived }} </li>
    <li>Boletas totales: {{ general_i.total_bills }}</li>
    <li>Boletas con conflictos: {{ general_i.conflicts.length }}</li>
    <li>% de conflictos: {{ (general_i.conflicts.length/general_i.total_bills)*100 }}%</li>
    <p>Se perdieron $ {{general_i.total_loss}} pesos lo que es equivalente a $ {{general_i.avrg_loss}} pesos por boleta</p>
</div>
<div v-else>
    <p>Cargando los recursos.....</p>
</div>
</template>

<script>
export default {
    props: ['general_i'],
}
</script>