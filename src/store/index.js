import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    userLoggedIn: false,
    userName: '',
  },
  mutations: {
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    setUserName: (state, userName) => {
      state.userName = userName;
    },
    clearUserName: (state) => {
      state.userName = '';
    },
  },
  actions: {
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      const user = auth.currentUser;
      const userName = user.displayName;
      commit('setUserName', userName);
      commit('toggleAuth');
    },
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email, payload.password,
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
      });
      await userCred.user.updateProfile({
        displayName: payload.name,
      });
      commit('toggleAuth');
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
      commit('clearUserName');
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
        const userName = user.displayName;
        commit('setUserName', userName);
      }
    },
  },
});
