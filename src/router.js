import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Members from './views/Members.vue'
import Login from './views/Login.vue'
import Store from  './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/members',
      name: 'members',
      component: Members,
      meta: {requiresAuth:true}   
    }
  ]
});
router.beforeEach( (to,from,next)=>{
  let routerAuthCheck = false; //TODO: add actual check

  if (routerAuthCheck) {
    Store.commit('setUserIsAuthenticated', true);

  }
  if (to.matched.some(record => record.meta.requiresAuth)){
    //check if user is Authenticated
    if(routerAuthCheck){
      //user is authenticated
      //TODO: commit to store that the user is authenticated
      next();
    }
    else{
      //user is not authenticated
      router.push('/login');
    }
  }
  //allow
  else{
    next();
  }
} );

export default router;

