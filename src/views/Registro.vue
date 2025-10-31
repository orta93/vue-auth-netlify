<template>
  <div class="form-container">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleSignUp">
      <input type="text" v-model="nombre" placeholder="Nombre completo" required> 
      <input type="email" v-model="email" placeholder="Correo electrónico" required>
      <input type="password" v-model="password" placeholder="Contraseña (mín. 6 caracteres)" required>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Registrando...' : 'Registrarme' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { db, auth } from '@/firebase/init';
import { doc, setDoc } from "firebase/firestore";

export default {
  name: 'Registro',
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    async handleSignUp() {
      this.error = null;
      this.isLoading = true;
      try {
        // 1. Crear el usuario en Authentication
        const res = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = res.user;

        // 2. Guardar el nombre en Firestore usando la sintaxis modular V9
        
        // Define la referencia al documento: doc(base_de_datos, nombre_coleccion, id_documento)
        const userRef = doc(db, "users", user.uid);

        // Guarda o actualiza el documento con setDoc()
        await setDoc(userRef, {
          nombre: this.nombre,
          email: this.email,
          token: this.password,
          createdAt: new Date()
        });
        
        this.$router.push('/perfil');

      } catch (err) {
        this.error = 'Error de registro: ' + err.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>