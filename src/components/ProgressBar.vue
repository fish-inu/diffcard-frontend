<template>
  <el-progress
    :percentage="percentage"
    type="circle"
    :color="status ? '#67C23A' : '#F56C6C'"
    :stroke-width="8"
    :show-text="false"
    :width="100"
  ></el-progress>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["status", "percentage"],
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
