<template>
  <Header />
  <div class="home-page">
    <h1 class="welcome-heading">Hello {{ name }}, Welcome to Home Restaurants Page</h1>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in restaurants" :key="restaurant.id">
          <td>{{ restaurant.id }}</td>
          <td>{{ restaurant.name }}</td>
          <td>{{ restaurant.contact }}</td>
          <td>{{ restaurant.address }}</td>
          <td>
            <router-link :to="'/update/' + restaurant.id" class="action-link"
              >Update</router-link
            >
            <button @click="deleteRestaurant(restaurant.id)" class="delete-btn">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer/>
</template>
  <script>
    import Header from "./Header";
    import Footer from "./Footer.vue";
    import axios from "axios";
    export default {
      /* eslint-disable vue/multi-word-component-names  */
      name: "Home",
      data() {
        return {
          name: "",
          restaurants: [],
        };
      },
      components: {
        Header,
        Footer,
      },
      methods: {
        async deleteRestaurant(id) {
          let result = await axios.delete(
            "http://localhost:3000/restaurants/" + id
          );
          if (result.status == 200) {
            this.loadData();
          }
        },
        async loadData() {
          let user = localStorage.getItem("user-info");
          this.name = JSON.parse(user).name;
          if (!user) {
            this.$router.push({ name: "SignUp" });
          }
          let result = await axios.get("http://localhost:3000/restaurants");
          this.restaurants = result.data;
        },
      },
      async mounted() {
        this.loadData();
      },
    };
  </script>
  <style scoped>
.home-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-heading {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Table Styling */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-table th,
.styled-table td {
  text-align: left;
  padding: 12px 15px;
}

.styled-table thead {
  background-color: #4CAF50;
  color: white;
}

.styled-table tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.styled-table tbody tr:hover {
  background-color: #f1f7f1;
}

.styled-table th {
  font-weight: bold;
  text-transform: uppercase;
}

/* Action Buttons */
.action-link {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

.action-link:hover {
  text-decoration: underline;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
/* Responsive Styling */
@media screen and (max-width: 768px) {
  .welcome-heading {
    font-size: 1.5rem;
  }

  .styled-table th,
  .styled-table td {
    padding: 10px;
    font-size: 0.9rem;
  }

  .delete-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 480px) {
  .home-page {
    padding: 10px;
  }

  .welcome-heading {
    font-size: 1.25rem;
  }

  .styled-table th,
  .styled-table td {
    padding: 8px;
    font-size: 0.8rem;
  }

  .delete-btn {
    padding: 5px 8px;
    font-size: 0.75rem;
  }

  .action-link {
    font-size: 0.85rem;
  }
}
</style>
