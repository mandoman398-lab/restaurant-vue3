<template>
  <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/add">Add restaurant</router-link>
    <a @click="logout" href="#">Log out</a>
  </div>
</template>

<script>
export default {
  /* eslint-disable vue/multi-word-component-names  */
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style>
.nav {
  background-color: #333;
  overflow: hidden;
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
}
@media(max-width:600px) {
  .nav {
    width:100%;
  }
}
.nav a {
  color: #f2f2f2;
  padding: 14px 20px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
  font-weight: bold;
  margin: 10px;
}
.nav a:hover {
  background: #ddd;
  color: #333;
  border-radius: 5px;
}
</style>
