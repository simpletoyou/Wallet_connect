<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
   
    methods: {
    },
    watch: {
      $route(to, from) {
        paths = to.path;
      }
    }
  }
</script>
