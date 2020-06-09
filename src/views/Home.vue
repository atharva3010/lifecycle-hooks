<template>
  <div class="home">
    <TextDisplay :msg="msg" />
    <!-- <keep-alive>
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
    </keep-alive> -->
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
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    TextDisplay
  },
  data() {
    return {
      msg: 'Lifecycle Hooks in Vue!',
      timer: null
    };
  },

  beforeCreate() {
    console.log('BEFORE CREATE: state is', this.$data);
  },

  created() {
    console.log('CREATED: state is', this.$data, 'DOM is', this.$el);

    // console.time();

    // this.fetchTodos();

    // this.$once('hook:mounted', () => {
    //   console.log('MOUNTED: DOM is', this.$el);
    // });

    // this.timer = setInterval(() => {
    //   console.log('TIMER');
    // }, 300);
  },

  beforeMount() {
    console.log('BEFORE MOUNT: DOM is', this.$el);
  },

  mounted() {
    console.log('MOUNTED: DOM is', this.$el);

    // console.timeEnd();

    // this.$nextTick(function() {
    //   console.log('All child components have been mounted.');
    //   // throw new Error('error in mounted hook');
    // });
  },

  beforeUpdate() {
    console.log('BEFORE UPDATE');
  },

  updated() {
    console.log('UPDATED');
  },

  beforeDestroy() {
    console.log('BEFORE DESTROY');

    // clearInterval(this.timer);

    // this.todos = [];
    // console.log('BEFORE DESTROY:', this.todos);
  },

  destroyed() {
    console.log('DESTROYED');
  },

  errorCaptured(err, component, details) {
    console.log('ERROR CAPTURED:', err, component, details);
    return false;
  },

  methods: {
    ...mapActions('todo', ['fetchTodos']),
    ...mapMutations('todo', ['SET_TODOS']),

    throwErr(errMsg) {
      throw new Error(errMsg);
      // This error will not be handled via the errorCaptured hook.
    },
    childHookLogs(msg, errMsg) {
      console.log(msg);
      if (errMsg) this.throwErr(errMsg);
    }
  },

  computed: {
    ...mapGetters('todo', ['get_todos']),
    todos: {
      get() {
        return this.get_todos;
      },
      set(value) {
        this.SET_TODOS(value);
      }
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
