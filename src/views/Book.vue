<template>
  <div>
    <iframe
      class="book-reader"
      src="/97-134.pdf"
      width="100%"
      height="100%"
      style="border:none"
      title="Vidas Paralelas"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'BookView',
  methods: {
  }
};
</script>

<style scoped>
.book-reader {
  width: 100%;
  min-height: calc(100vh - 51px);
  border: none;
}

.birthday-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: radial-gradient(circle, #2a0a38 0%, #0d0116 100%);
  color: white;
  overflow: hidden; /* Para que los fuegos artificiales no generen scroll */
  position: relative;
  text-align: center;
}

/* Estilos de la tarjeta de mensaje */
.message-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 10;
  max-width: 600px;
  animation: fadeIn 2s ease-out;
}

.main-title {
  font-size: 3em;
  color: #ffcc00; /* Dorado/Amarillo */
  text-shadow: 0 0 10px rgba(255, 204, 0, 0.8);
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.lovely-message {
  font-style: italic;
  font-size: 1.1em;
  margin-bottom: 30px;
}

.signer {
  margin-top: 20px;
  font-size: 0.9em;
  opacity: 0.7;
}

/* Animación general */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- SIMULACIÓN DE FUEGOS ARTIFICIALES CON CSS --- */

.firework {
  position: absolute;
  left: var(--left, 50vw); /* Usa variables CSS para posición */
  top: var(--top, 50vh);
  transform: scale(var(--scale, 1));
  z-index: 5;
  animation: launch 6s ease-out infinite; /* Simula un lanzamiento y explosión repetitiva */
}

/* Crea las partículas de la explosión con ::before y ::after */
.explosion {
  width: 5px;
  height: 5px;
  opacity: 0;
  border-radius: 50%;
  animation: explode 1s steps(60) infinite alternate;
}

/* Define el patrón de color para la explosión */
.firework:nth-child(1) .explosion { background-color: #ff4500; animation-delay: 0s; } /* Rojo-Naranja */
.firework:nth-child(2) .explosion { background-color: #3cb371; animation-delay: 2s; } /* Verde-Medio */
.firework:nth-child(3) .explosion { background-color: #1e90ff; animation-delay: 4s; } /* Azul Brillante */


@keyframes launch {
  0% { opacity: 0; transform: scale(var(--scale, 1)) translateY(100vh); }
  5% { opacity: 0.8; transform: scale(var(--scale, 1)) translateY(0); }
  10% { opacity: 1; transform: scale(var(--scale, 1)) translateY(0); }
  15% { opacity: 0; transform: scale(var(--scale, 1)) translateY(0); }
  100% { opacity: 0; }
}

/* Esta animación es más compleja y simula la expansión de las partículas */
@keyframes explode {
  0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 #fff; }
  100% { transform: scale(10); opacity: 0; box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0); }
}

.spotify {
    max-width: 90vw;
    margin: 20px auto;
}
</style>