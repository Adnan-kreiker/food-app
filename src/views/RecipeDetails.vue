<template>
  <main>
    <!-- <router-link to="/#recipe"> -->
    <i @click="handleClick" class="fas fa-arrow-left fa-3x"></i>
    <!-- </router-link> -->
    <div class="recipe-details">
      <div class="cover grid-pic ">
        <img v-if="!isLoading" :src="recipe.coverUrl" />
        <Skeletor v-else-if="isLoading" height="450px" />
      </div>
      <div v-if="!isLoading" class="recipe-info gird-details">
        <transition name="slide-fade" mode="out-in">
          <div v-if="!edit">
            <h2 class="recipe-name">{{ recipe.name }}</h2>
            <p v-if="!edit" class="name">by {{ recipe.userName }}</p>
            <p v-if="!edit" class="description">
              <strong> Description: </strong> <br />
              {{ recipe.description }}
            </p>
          </div>
          <div v-else-if="edit">
            <label>Edit the name of your recipe</label>
            <input type="text" v-model="modified_name" />
            <label>Edit the description</label>
            <textarea v-model="modified_description" cols="30" rows="10"></textarea>
          </div>
        </transition>
        <div v-if="ownership" class="btn-section">
          <AppButton
            v-if="ownership & !edit"
            :color="'red'"
            :text="'Delete'"
            @click="handleDelete"
          />
          <AppButton v-if="ownership & !edit" :color="'gray'" :text="'Edit'" @click="edit = true" />
          <AppButton v-if="edit" :color="'red'" :text="'Cancel'" @click="edit = false" />
          <AppButton
            @click.prevent="handleEdit"
            v-if="edit"
            :text="'Submit'"
            :color="'rgb(17, 184, 103)'"
          />
        </div>
      </div>
      <Skeletor v-else-if="isLoading" height="280" />
    </div>
  </main>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import { recipesCollection, auth, storage } from '../includes/firebase';

export default {
  components: {
    AppButton,
  },
  props: ['id'],
  data() {
    return {
      edit: false,
      recipe: {},
      modified_name: '',
      modified_description: '',
      user: '',
      isLoading: true,
    };
  },
  // async beforeRouteEnter(to, from, next) {
  //   const documentRef = await recipesCollection.doc(to.params.id);
  //   next((vm) => {
  //     documentRef.onSnapshot(
  //       (doc) => {
  //         if (doc.data()) {
  //           // eslint-disable-next-line no-param-reassign
  //           vm.recipe = { ...doc.data(), id: doc.id };
  //           // eslint-disable-next-line no-param-reassign
  //           vm.modified_description = doc.data().description;
  //           // eslint-disable-next-line no-param-reassign
  //           vm.modified_name = doc.data().name;
  //         }
  //       },
  //       (err) => {
  //         console.log(err.message);
  //         // eslint-disable-next-line no-param-reassign
  //         vm.recipe = null;
  //       },
  //     );
  //   });
  // },
  created() {
    const documentRef = recipesCollection.doc(this.$route.params.id);
    this.isLoading = true;
    documentRef.onSnapshot(
      (doc) => {
        if (doc.data()) {
          this.recipe = { ...doc.data(), id: doc.id };
          this.modified_description = doc.data().description;
          this.modified_name = doc.data().name;
          this.isLoading = false;
        }
      },
      (err) => {
        console.log(err.message);
        this.recipe = null;
      },
    );
  },
  mounted() {
    this.user = auth.currentUser;
  },
  computed: {
    ownership() {
      return this.recipe && this.user && this.user.uid === this.recipe.userId;
    },
  },
  methods: {
    async handleDelete() {
      const storageRef = storage.ref();
      const recipeRef = storageRef.child(`recipes/${this.user.uid}/${this.recipe.picture_name}`);

      await recipeRef.delete();
      await recipesCollection.doc(this.$route.params.id).delete();
      this.$router.push({ path: '/', hash: '#recipe' });
      const notification = {
        type: 'success',
        text: 'Recipe Deleted !',
      };
      this.$store.dispatch('AddNotification', notification);
    },
    handleEdit() {
      this.edit = false;
      if (!this.modified_name) {
        this.modified_name = this.recipe.name;
      }
      if (!this.modified_description) {
        this.modified_description = this.recipe.description;
      }
      recipesCollection
        .doc(this.$route.params.id)
        .update({
          name: this.modified_name,
          description: this.modified_description,
        })
        .then(() => {
          console.log('Document successfully written!');
          this.modified_name = '';
          this.modified_description = '';
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
    // handleClick() {
    //   this.$nextTick(() => {
    //     this.$router.push({ path: '/', hash: '#recipe' });
    //   });
    // },
    handleClick() {
      this.$router.push({ path: '/', hash: '#recipe' });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: inherit;
  transition-property: all;
  transition-duration: 0.6s;
  transition-timing-function: ease;
}

.recipe-details {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 40% 58%;
  grid-template-areas:
    'pic details'
    'pic details'
    '. btn-section';
  padding: 20px;
  background: white;
  transition: all ease 0.2s;
  // margin-top: 60px;
}
.recipe-name {
  border-bottom: 1px solid rgb(17, 184, 103);
}
.grid-pic {
  grid-area: pic;
}
.grid-details {
  grid-area: 'details';
}
img {
  width: 35vw;
  height: 35vw;
  max-height: 450px;
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.5);
}
img:hover {
  box-shadow: 1px 6px 48px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.3s;
}
.fas {
  color: #374f6b;
}
.recipe-info {
  line-height: 40px;
  padding: 20px;
  border: 1px solid rgb(17, 184, 103);
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
}

i,
h2 {
  display: inline-block;
}

i {
  cursor: pointer;
  margin: 3px;
  padding: 10px;
}
label {
  display: block;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}
input {
  padding: 10px;
  border: 0;
  border: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.45s ease;
// }

// .fade-enter-from,
// .fade-leave-active {
//   opacity: 0;
// }
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
@media (max-width: 815px) {
  .recipe-details {
    grid-template-columns: 1fr;
    grid-template-areas:
      'details'
      'pic'
      'btn-section';
  }
  img {
    width: 80vw;
    height: 80vw;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}
@media (max-width: 430px) {
  button {
    width: 60px;
  }
}
</style>
