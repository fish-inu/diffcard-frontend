<template>
  <div>
    <p>A quiz app developed in <code>Vue.js</code></p>
    <el-link
      icon="el-icon-collection"
      :underline="false"
      @click="$router.push('/content/chinese-speaker')"
      >Exposed Common Mistakes Made by Chinese Speakers</el-link
    >
    /
    <el-link
      icon="el-icon-collection"
      :underline="false"
      @click="$router.push('/content/longman')"
      >Longman Dictionary of Common Errors</el-link
    >
  </div>
</template>

<script>
export default {
  name: "Greeting",
};
</script>
