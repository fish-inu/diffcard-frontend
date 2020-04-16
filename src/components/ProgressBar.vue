<template>
  <el-progress
    :percentage="percentage"
    :color="status ? '#67C23A' : '#F56C6C'"
    :show-text="false"
  ></el-progress>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["status", "percentage"],
};
</script>

<style scoped></style>
