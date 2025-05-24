<template>
  <header class="header fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <router-link to="/" class="logo d-flex align-items-center">
        <h1>SkinLab<span>.</span></h1>
      </router-link>
      
      <nav class="navbar">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/testing">Testing</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  z-index: 100;
}

.logo h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.logo h1 span {
  color: #0ea2bd;
}

.navbar ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  margin: 0 15px;
}

.navbar a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.navbar a:hover, .navbar .router-link-active {
  color: #0ea2bd;
}
</style>
