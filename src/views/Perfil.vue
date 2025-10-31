<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>
    <div v-if="cargandoDatos" class="loading-state">Cargando tus datos...</div>
    
    <div v-else-if="userData">
      <!-- <p><strong>Correo:</strong> {{ userData.email }}</p> -->
      
      <button @click="handleLogout" class="logout-button">
        Cerrar Sesión
      </button>
    </div>
    
    <div v-else class="error-state">
      <p>Error: No se pudieron cargar los datos de perfil. ¿Guardaste tu registro de prueba antes de este cambio? (Si no, regístrate de nuevo)</p>
    </div>
  </div>
</template>

<script>
// 1. Importa funciones de Auth (para cerrar sesión)
import { signOut } from 'firebase/auth'; 
// 2. Importa funciones de Firestore (para leer datos)
import { doc, getDoc } from "firebase/firestore"; 

import { auth, db } from '@/firebase/init'; // Servicios de Firebase inicializados

export default {
  name: 'Perfil',
  data() {
    return {
      userData: null,
      cargandoDatos: true
    }
  },
  mounted() {
    const user = auth.currentUser;
    if (user) {
      // this.checkBirthdayRedirect();
      this.fetchUserData(user.uid, user.email);
    } 
  },
  methods: {
    // 🔑 FUNCIÓN CORREGIDA: Lectura de datos con Firestore V9
    async fetchUserData(uid, email) {
      this.cargandoDatos = true;
      try {
        // Define la referencia al documento: doc(base_de_datos, nombre_coleccion, id_documento)
        const userRef = doc(db, "users", uid);

        // Obtener el documento con getDoc()
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          // Si el documento existe, usamos docSnap.data()
          this.userData = { ...docSnap.data(), email: email };
        } else {
          // Si el documento no existe (ej: el usuario se registró antes de guardar el nombre)
          this.userData = { nombre: 'Perfil incompleto', email: email };
        }
      } catch (error) {
        console.error("Error al obtener datos de usuario:", error);
        this.userData = null;
      } finally {
        this.cargandoDatos = false;
      }
    },
    
    // Función para cerrar sesión (Auth V9)
    async handleLogout() {
      try {
        await signOut(auth); // Cierra sesión
        this.$router.push('/login'); // Redirige al login
      } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
      }
    }
  }
}
</script>