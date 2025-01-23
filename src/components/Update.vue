<template>
  <Header />
  <h1 class="welcome-heading">Update Restaurant Page</h1>
  <form class="add">
    <input
      type="text"
      name="name"
      placeholder="Enter new Name"
      v-model="restaurant.name"
    />
    <input
      type="text"
      name="address"
      placeholder="Enter new address"
      v-model="restaurant.address"
    />
    <input
      type="text"
      name="contact"
      placeholder="Enter new contact"
      v-model="restaurant.contact"
    />
    <button type="button" @click="UpdateRestaurant">Update Restaurant</button>
  </form>
  <div class="footer">
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer.vue";
import axios from "axios";
export default {
  /* eslint-disable vue/multi-word-component-names  */
  name: "Update",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name:'',
      restaurant: {
        name: "",
        address: "",
        contact: "",
      },
    };
  },
  methods: {
    async UpdateRestaurant() {
      const result = await axios.put(
        "http://localhost:3000/restaurants/" + this.$route.params.id,
        {
          name: this.restaurant.name,
          contact: this.restaurant.contact,
          address: this.restaurant.address,
        }
      );
      if (result.status == 200) {
        this.$router.push({ name: "Home" });
      }
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    const result = await axios.get(
      "http://localhost:3000/restaurants/" + this.$route.params.id
    );
    console.warn(result);
    this.restaurant = result.data;
  },
};
</script>
<style scoped>
.footer {
  position: fixed;
}
</style>
