<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<script>
// No necesita lógica de Auth ni de navegación aquí.
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  background-color: #f4f7f6; /* Fondo claro */
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

/* --- Estilos de Formularios y Botones Comunes --- */
input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px;
  margin: 8px 0 15px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box; /* Crucial para padding no afecte el ancho total */
  font-size: 16px;
}

button[type="submit"],
.logout-button,
.submit-btn {
  background-color: #42b983; /* Verde principal de Vue */
  color: white;
  padding: 14px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover:not(:disabled),
.submit-btn:hover:not(:disabled) {
  background-color: #35986e;
}

button:disabled {
  background-color: #aeb5b3;
  cursor: not-allowed;
}

.error-message {
  color: #d9534f; /* Rojo para errores */
  padding: 10px;
  border: 1px solid #d9534f;
  background-color: #f9eaea;
  border-radius: 5px;
  margin-top: 15px;
  font-size: 0.9em;
}
</style>