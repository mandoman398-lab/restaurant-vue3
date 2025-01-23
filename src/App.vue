<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  padding:0;
  margin:0;
  background-color: #f9f9f9;
}
.logo {
  width: 200px;
  padding-top: 10px;
}
.register input, 
.login input,
.add input{
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin: 15px auto;
  border: 1px solid skyblue;
}
.register button,
.login button,
.add button{
  width: 320px;
  height: 40px;
  background: rgb(92, 195, 236);
  color: #fff;
  cursor: pointer;
  border: 1px solid skyblue;
}
.welcome-heading {
  font-size: 2.5rem;
  color: #4CAF50;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
  text-transform: capitalize;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #4CAF50, #0075ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
