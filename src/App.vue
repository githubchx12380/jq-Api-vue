<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import home from './views/Home'

export default {
  name: 'app',
  components: {
    home
  }
}
</script>

<style>

</style>
