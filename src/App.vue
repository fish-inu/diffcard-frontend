<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <el-row id="statistics">
      <el-badge :value="rightCount" type="success">
        <progress-bar :status="true" :percentage="(rightCount / 10) * 100" />
      </el-badge>
      <el-badge :value="wrongCount" type="danger">
        <progress-bar :status="false" :percentage="(wrongCount / 10) * 100" />
      </el-badge>
    </el-row>
    <div v-if="hasItems" class="_container">
      <el-row
        type="flex"
        justify="center"
        :gutter="50"
        class="quiz"
        :style="{
          'flex-direction': rowDirection
        }"
      >
        <el-col :span="10">
          <transition name="el-zoom-in-top">
            <Sent
              :answer="true"
              @answered="handleAnswered"
              :isAnswered="isAnswered"
              ref="sentence_1"
              :key="picked"
            >
              {{ picked.right }}
            </Sent>
          </transition></el-col
        >
        <el-col :span="10">
          <transition name="el-zoom-in-top">
            <Sent
              :answer="false"
              @answered="handleAnswered"
              :isAnswered="isAnswered"
              ref="sentence_2"
              :key="picked"
            >
              {{ picked.wrong }}
            </Sent></transition
          >
        </el-col>
      </el-row>
      <el-button
        v-show="isAnswered"
        @click="handleClick"
        size="medium"
        icon="el-icon-arrow-right"
        circle
        id="next"
      ></el-button>
    </div>
    <h1 v-else>
      已答完
      <p>
        10 道题中, {{rightCount}} 道正确, {{wrongCount}} 道错误。
      </p>
    </h1>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Sent from "./components/Sent.vue";
import ProgressBar from "./components/ProgressBar.vue";
export default {
  name: "App",
  data() {
    return {
      picked: {},
      isStarted: false,
      isAnswered: false,
      list: [],
      rowDirection: "",
      hasItems: true,
      rightCount: 0,
      wrongCount: 0
    };
  },
  created: function() {},
  mounted: function() {
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => {
        this.list = data;
      })
      .then(() => {
        this.picked = this.list.pop();
        this.rowDirection = Math.floor(Math.random() * 2)
          ? "row"
          : "row-reverse";
      });
  },
  updated: function() {},
  methods: {
    handleAnswered: function(ob) {
      this.isAnswered = true;
      if (ob.isRight) {
        this.rightCount++;
      } else {
        this.wrongCount++;
      }
    },
    handleClick: function() {
      if (this.list.length == 0) {
        this.hasItems = false;
      } else {
        this.picked = this.list.pop();
        this.rowDirection = Math.floor(Math.random() * 2)
          ? "row"
          : "row-reverse";
        this.isAnswered = false;
        this.$refs.sentence_1.result = null;
        this.$refs.sentence_1.classOb = {
          "box-card-unanswered": true,
          "box-card-right": false,
          "box-card-wrong": false
        };
        this.$refs.sentence_2.result = null;
        this.$refs.sentence_2.classOb = {
          "box-card-unanswered": true,
          "box-card-right": false,
          "box-card-wrong": false
        };
      }
    }
  },
  components: {
    Sent,
    ProgressBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#statistics {
  position: fixed;
  bottom: 1rem;
  right: 6rem;
}

.el-badge {
  display: block !important;
}

._container {
  margin: auto;
  width: fit-content;
}

.quiz {
  margin-top: 2rem;
}

#next {
  display: block;
  margin: auto;
}
</style>
