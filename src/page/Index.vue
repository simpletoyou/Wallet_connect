<template>
  <div class="index-container">
    <!-- 头部 -->
    <div style="height: 3rem;">
      <top></top>
    </div>

  </div>
</template>

<script>
  import Top from "./com/Top";

  import Web3 from "web3";

  export default {
    name: "Index",
    components: {
      Top,
    },
    data() {
      return {}

    },
    
    

    methods: {
      loadData() {
        console.log('this is load data')
      }
    },

  };
</script>
<style lang="less" scoped>
</style>
