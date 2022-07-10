<template>
  <div id="page">
    <div id="nav" class="sticky">
      <router-link :to="{ name: 'Home'}"> Home </router-link> |
      <router-link :to="{ name: 'Transactions'}"> Boletas </router-link> |
      <router-link :to="{ name: 'Products'}"> Productos </router-link> |
      <router-link :to="{ name: 'Zones'}"> Sectores </router-link> |
      <router-link :to="{ name: 'Workers'}"> Trabajadores </router-link>
    </div>
    <div id="page_div">
      <router-view/>
    </div>
  </div>
</template>

<script>
</script>

<style>
body{
  background-color: whitesmoke;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page_div {
  margin-top: 50px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

#nav{
  margin-bottom: 10px;
  background-color: rgb(54, 54, 54);
  font-size:x-large;
  color: black;
  text-decoration: none;
}

table {
  margin: auto;
  margin-bottom: 50px;
}
table {
  color: #333;
  background: white;
  border: 1px solid grey;
  font-size: 12pt;
  border-collapse: collapse;
}
table thead th,
table tfoot th {
  color: #777;
  background: rgba(0,0,0,.1);
}
table caption {
  padding:.5em;
}
table th,
table td {
  padding: .5em;
  border: 1px solid lightgrey;
}
</style>
