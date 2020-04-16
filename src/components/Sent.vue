<template>
  <div>
    <div v-on:click="check" class="box-card" :class="classOb">
      <el-card>
        <slot></slot>
      </el-card>
    </div>
    <transition name="el-zoom-in-center">
      <el-button
        v-if="result != null && showIcon"
        size="medium"
        :type="result ? 'success' : 'danger'"
        :icon="result ? 'el-icon-check' : 'el-icon-close'"
        circle
      ></el-button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Sent",
  props: ["answer", "isAnswered", "showIcon"],
  data() {
    return {
      classOb: {
        "box-card-unanswered": true,
        "box-card-right": false,
        "box-card-wrong": false
      },
      result: null,
      answered: false
    };
  },
  methods: {
    check: function() {
      if (this.isAnswered) {
        return;
      }
      let result = this.answer == true;
      this.result = result;
      this.classOb["box-card-right"] = result;
      this.classOb["box-card-wrong"] = !result;
      this.classOb["box-card-unanswered"] = false;
      this.answered = true;
      this.$emit("answered", {
        isRight: result
      }); //inform another <Sent/> user has selected his answer.
    }
  },
  updated: function() {
    if (this.isAnswered) {
      this.result = this.answer == true;
      this.classOb["box-card-right"] = this.answer;
      this.classOb["box-card-wrong"] = !this.answer;
      this.classOb["box-card-unanswered"] = false;
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 1rem;
  font-size: 1.6rem;
}
.box-card {
  transition: all 0.3s;
  cursor: pointer;
  word-wrap: break-word;
  text-align: initial;
}

.box-card:hover {
  transform: scale(1.02) translateY(-5px);
}

.box-card-unanswered {
  border-left: 4px solid #409eff;
}

.box-card-right {
  border-left: 4px solid #42b983;
}

.box-card-wrong {
  border-left: 4px solid #f56c6c;
}
</style>
