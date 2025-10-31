<template>
  <div class="form-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Correo electrónico" required>
      <input type="password" v-model="password" placeholder="Contraseña" required>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
    <router-link to="/registro">¿No tienes cuenta? Regístrate aquí.</router-link>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '@/firebase/init';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.isLoading = true;
      try {
        // 🔑 USANDO SINTAXIS MODULAR V9:
        // Llama a la función e.j. signInWithEmailAndPassword(servicio, correo, contraseña)
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, this.email, this.password);
        
        // Redirige
        this.$router.push('/perfil'); 

      } catch (err) {
        // Manejo de errores de Firebase (ej: correo/contraseña inválidos)
        this.error = 'Error al iniciar sesión: ' + err.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 80vh;
}

h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 2em;
}

form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Limita el ancho del formulario */
  text-align: left;
}

/* Estilo para el enlace "¿No tienes cuenta?" */
.form-container > a { 
  margin-top: 20px;
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.form-container > a:hover {
  text-decoration: underline;
}
</style>