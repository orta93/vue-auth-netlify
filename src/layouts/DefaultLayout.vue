<template>
  <div class="default-layout">
    
    <header class="topbar">
      <nav>
        <router-link to="/">Inicio</router-link> 
        
        <span v-if="!currentUser">
          <router-link to="/login">Iniciar Sesión</router-link>
          <router-link to="/registro">Registrarse</router-link>
        </span>
        
        <span v-else>
          <router-link to="/perfil">Perfil</router-link>
          <router-link to="/birthday">Birthday</router-link>
          <router-link to="/book">Libro</router-link>
          <button @click="handleLogout" class="logout-btn">Salir</button>
        </span>
      </nav>
    </header>

    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import { auth } from '@/firebase/init';
import { signOut } from 'firebase/auth'; 

export default {
  name: 'DefaultLayout',
  data() {
    return {
      currentUser: null,
      authListener: null
    };
  },
  created() {
    // Escucha el estado de autenticación para actualizar la interfaz
    this.authListener = auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  beforeDestroy() {
    if (this.authListener) {
      this.authListener();
    }
  },
  methods: {
    async handleLogout() {
      try {
        await signOut(auth);
        // Redirigir al login después de cerrar sesión
        this.$router.push('/login'); 
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    }
  }
}
</script>

<style scoped>
.topbar {
  background-color: #333;
  color: white;
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 100; /* Para asegurar que esté encima de otros elementos */
}
.topbar nav {
  display: flex;
  gap: 20px;
  justify-content: flex-start; /* Links a la izquierda */
}
.topbar a, .logout-btn {
  color: white;
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.topbar a:hover, .logout-btn:hover {
  color: #42b983;
}
.content {
  /* padding: 20px;*/
}
</style>