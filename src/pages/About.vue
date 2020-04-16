<template>
  <el-card class="box-card">
    <p>
      Hello there. This is a quiz app where you can test your English skills. As
      for the data, it is retrieved from
      <i>English Exposed Common Mistakes Made by Chinese Speakers</i> and
      <i>Longman Dictionary of Common Errors</i>.
    </p>
    <p>It has the following features:</p>
    <ul>
      <li>10 pairs a time to test your English.</li>
      <li>References to every pair.</li>
      <li>Progress Bar for the desktop.</li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.box-card {
    text-align: initial;
    width: 40rem;
    margin: auto;
    line-height: 1.5;
}
</style>