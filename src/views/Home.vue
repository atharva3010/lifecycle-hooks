<template>
  <div class="home">
    <keep-alive>
      <TextDisplay
        :msg="msg"
        @hook:beforeCreate="childHookLogs('CHILD: BEFORE CREATE')"
        @hook:created="childHookLogs('CHILD: CREATED')"
        @hook:beforeMount="childHookLogs('CHILD: BEFORE MOUNT')"
        @hook:mounted="childHookLogs('CHILD: MOUNTED')"
        @hook:beforeDestroy="childHookLogs('CHILD: BEFORE DESTROY')"
        @hook:destroyed="childHookLogs('CHILD: DESTROYED')"
        @hook:activated="childHookLogs('CHILD: ACTIVATED')"
        @hook:deactivated="childHookLogs('CHILD: DEACTIVATED')"
      />
    </keep-alive>
    <input type="text" v-model="msg" />
    <button @click="msg = ''">Reset</button>
    <br />
    <button @click="throwErr('error from button!')">
      Click to throw error!
    </button>
    <button @click="fetchTodos">Fetch todos</button>
    <div class="todo" v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </div>
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
    console.log('BEFORE CREATE: state is', this.$data);
  },

  created() {
    console.log('CREATED: state is', this.$data, 'DOM is', this.$el);
  },

  beforeMount() {
    console.log('BEFORE MOUNT: DOM is', this.$el);
  },

  mounted() {
    console.log('MOUNTED: DOM is', this.$el);
    this.$nextTick(function() {
      console.log('All child components have been mounted.');
      // throw new Error('error in mounted hook');
    });
  },

  beforeUpdate() {
    console.log('BEFORE UPDATE:', this.msg);
  },

  updated() {
    console.log('UPDATED:', this.msg);
  },

  beforeDestroy() {
    this.msg = '';
    this.todos = [];
    console.log('BEFORE DESTROY:', this.msg, this.todos);
  },

  destroyed() {
    console.log('DESTROYED');
  },

  errorCaptured(err, component, details) {
    console.log('ERROR CAPTURED:', err, component, details);
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
