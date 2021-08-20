import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    userLoggedIn: false,
    notification: null,
    userName: '',
    id: 1,
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
    AddNotification: (state, notification) => {
      // eslint-disable-next-line no-plusplus
      state.notification = notification;
      // const notificationid = state.id++;
      // state.notifications.push({
      //   ...notification,
      //   id: notificationid,
      // });
    },
    RemoveNotification: (state) => {
      state.notification = null;
      // state.notifications = state.notifications.filter(
      //   (notification) => notification.id !== notificationToRemove.id,
      // );
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
      const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password);

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
    AddNotification({ commit }, notification) {
      commit('AddNotification', notification);
    },
    RemoveNotification({ commit }) {
      commit('RemoveNotification');
    },
  },
});
