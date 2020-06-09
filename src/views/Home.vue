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
    <button @click="throwErr('error from button!')">
      Click to throw error!
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import TextDisplay from '@/components/TextDisplay.vue';

export default {
  name: 'Home',
  components: {
    TextDisplay
  },
  data() {
    return {
      msg: 'Lifecycle Hooks in Vue!'
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
</style>
