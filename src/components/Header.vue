<template>
  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    active-text-color="#67C23A"
  >
    <el-menu-item index="1" @click="$router.push('/')">
      Home
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push('/about')"
      >About</el-menu-item
    >
  </el-menu>
</template>

<script>
export default {
  name: "Header",
};
</script>
