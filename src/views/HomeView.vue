<template>
  <div class="home-container">
    <h2>Hola</h2>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 40px auto;
}

h2 {
  color: #35986e;
  font-size: 3em;
  margin-bottom: 15px;
}

p {
  color: #555;
  font-size: 1.2em;
  line-height: 1.6;
}

/* Si quieres agregar una imagen o icono */
.icon {
  font-size: 4em;
  color: #42b983;
  margin-bottom: 20px;
}
</style>