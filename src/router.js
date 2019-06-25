import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Members from './views/Members.vue'
import Login from './views/Login.vue'
import Store from  './store'
import Auth0callback from './views/Auth0callback.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth0callback',
      name: 'auth0callback',
      component: Auth0callback
    },
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
  //Allow finishing call back url for logging in
  if (to.matched.some(record=>record.path == "/auth0callback")){
    console.log("router.beforeEach found /auth0callback url");
    Store.dispatch('auth0HandleAuthentication');
    next(false);
  }

  // check if user id logged in  (start assuming the user is not logged in = false)
  let routerAuthCheck = false;
  // verify all the proper access variables are present for proper authorization
  if (localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at')){
    console.log('found local storage');
    //check wether the current time is past the access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    //set localAuthTokenCheck true if unexpired / false if expired
    routerAuthCheck = new Date().getTime() < expiresAt;
  }

  //set global ui understanding of authentication
  Store.commit('setUserIsAuthenticated', routerAuthCheck);

  
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

