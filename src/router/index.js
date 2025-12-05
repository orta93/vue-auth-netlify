import Vue from 'vue';
import VueRouter from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue'; 
import { auth } from '@/firebase/init';

import HomeView from '@/views/HomeView.vue';
import Registro from '../views/Registro.vue';
import Login from '../views/Login.vue';
import Perfil from '@/views/Perfil.vue';
import Birthday from '@/views/Birthday.vue';
import Book from '@/views/Book.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '', 
        name: 'Home',
        component: HomeView
      },
      {
        path: '/registro', 
        name: 'Registro',
        component: Registro
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/perfil',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        component: Perfil
      },
      {
        path: '/birthday',
        name: 'Birthday',
        meta: { requiresAuth: true },
        component: Birthday
      },
      {
        path: '/book',
        name: 'Book',
        meta: { requiresAuth: true },
        component: Book,
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

let authInitialized = false;
auth.onAuthStateChanged(() => {
    if (!authInitialized) {
        authInitialized = true;
        // 🚨 CAMBIO CLAVE: Asegúrate de que el router solo empuje si es necesario,
        // pero que no bloquee la carga inicial de la página raíz.
        if (router.currentRoute.fullPath !== '/') {
           router.push(router.currentRoute.fullPath);
        }
    }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser; 

  if (!authInitialized) {
    if (!to.matched.some(record => record.meta.requiresAuth)) {
      return next(); 
    }
      
    return next(false);
  }

  if (requiresAuth && !user) {
    // No logeado y ruta protegida
    next('/login');
  } else if (!requiresAuth && user && (to.path === '/login' || to.path === '/registro')) {
    // Logeado y trata de ir a login/registro
    next('/perfil');
  } else {
    next();
  }
});

export default router;