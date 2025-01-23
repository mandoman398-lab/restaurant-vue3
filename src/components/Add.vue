<template>
  <Header />
  <h1 class="welcome-heading">Add Restaurant Page</h1>
  <form class="add">
    <input
      type="text"
      name="name"
      placeholder="Enter Name"
      v-model="restaurant.name"
    />
    <input
      type="text"
      name="address"
      placeholder="Enter address"
      v-model="restaurant.address"
    />
    <input
      type="text"
      name="contact"
      placeholder="Enter contact"
      v-model="restaurant.contact"
    />
    <button
      type="button"
      @click="AddRestaurant"
      :disabled="!isFormValid"
    >
      Add New Restaurant
    </button>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
  name: "Add",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      restaurant: {
        name: "",
        address: "",
        contact: "",
      },
      successMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.restaurant.name.trim() !== "" &&
        this.restaurant.address.trim() !== "" &&
        this.restaurant.contact.trim() !== ""
      );
    },
  },
  methods: {
    async AddRestaurant() {
      try {
        await axios.post("http://localhost:3000/restaurants", {
          name: this.restaurant.name,
          contact: this.restaurant.contact,
          address: this.restaurant.address,
        });
        this.successMessage = "Restaurant added successfully!";
        this.restaurant.name = "";
        this.restaurant.address = "";
        this.restaurant.contact = "";

        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Error adding restaurant:", error);
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
  },
};
</script>

<style scoped>
.success {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.footer {
  position: fixed;
}
</style>
