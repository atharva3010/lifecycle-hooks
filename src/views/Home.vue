<template>
  <div class="home">
    <keep-alive>
      <TextDisplay
        :msg="msg"
        @hook:created="childHookLogs('Child is created')"
        @hook:activated="childHookLogs('Child is activated')"
        @hook:deactivated="childHookLogs('Child is deactivated')"
      />
    </keep-alive>
    <input type="text" v-model="msg" />
    <button @click="resetMsg">Reset</button>
    <br />
    <button @click="throwErr('error from button!')">
      Click to throw error!
    </button>
    <!-- <button @click="fetchTodos">Fetch todos</button>
    <div class="todo" v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </div> -->
  </div>
</template>

<script>
import TextDisplay from '@/components/TextDisplay.vue';
import { httpClient } from '@/services/httpClient.js';

export default {
  name: 'Home',
  components: {
    TextDisplay
  },
  data() {
    return {
      msg: 'Lifecycle Hooks in Vue!',
      todos: []
    };
  },

  beforeCreate() {
    console.log('I am yet to be created, state is', this.msg);
  },

  created() {
    console.log('I am created, state is now', this.$data, 'DOM is', this.$el);
  },

  beforeMount() {
    console.log('I am yet to be mounted, DOM is', this.$el);
  },

  mounted() {
    console.log('I am mounted, DOM is', this.$el);
    this.$nextTick(function() {
      console.log('All child components have been mounted.');
      // throw new Error('I was born to error on mounted');
    });
  },

  beforeUpdate() {
    console.log('I am yet to be updated');
  },

  updated() {
    console.log('I have updated myself!');
  },

  beforeDestroy() {
    console.log('I am yet to be destroyed.');
    this.resetMsg();
  },

  destroyed() {
    console.log('Its over! RIP');
  },

  errorCaptured(err, component, details) {
    console.error('From errorCaptured:', err, component, details);
    return false;
  },

  methods: {
    fetchTodos() {
      return new Promise((resolve, reject) => {
        httpClient.get(`todos`).then(
          response => {
            this.todos = response.data;
            this.loading = false;
            resolve(response.data);
          },
          error => {
            this.loading = false;
            reject(error);
          }
        );
      });
    },
    throwErr(errMsg) {
      throw new Error(errMsg);
      // This error will not be handled via the errorCaptured hook.
    },
    childHookLogs(msg, errMsg) {
      console.log(msg);
      if (errMsg) this.throwErr(errMsg);
    },
    resetMsg() {
      this.msg = '';
    }
  }
};
</script>

<style scoped>
button {
  margin: 8px;
}
.todo {
  height: 30px;
  border: 1px gray solid;
  margin: 8px;
}
</style>
