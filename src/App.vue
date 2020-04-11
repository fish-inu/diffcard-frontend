<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <el-row id="statistics" v-if="!isMobile">
      <el-badge :value="rightCount" type="success">
        <progress-bar :status="true" :percentage="(rightCount / 10) * 100" />
      </el-badge>
      <el-badge :value="wrongCount" type="danger">
        <progress-bar :status="false" :percentage="(wrongCount / 10) * 100" />
      </el-badge>
    </el-row>
    <div v-if="hasItems">
      <div
        class="quiz"
        :style="
          isMobile
            ? {
                display: 'flex',
                'align-items': 'center',
                'flex-direction': columnDirection
              }
            : {
                display: 'flex',
                'justify-content': 'center',
                'flex-direction': rowDirection
              }
        "
      >
        <el-col
          :span="isMobile ? 20 : 10"
          :style="
            isMobile ? { 'margin-top': '2rem' } : { 'margin-left': '2rem' }
          "
        >
          <transition name="el-zoom-in-top">
            <Sent
              :answer="true"
              @answered="handleAnswered"
              :isAnswered="isAnswered"
              ref="sentence_1"
              :key="picked"
              :showIcon="!isMobile"
            >
              {{ picked.right }}
            </Sent>
          </transition></el-col
        >
        <el-col
          :span="isMobile ? 20 : 10"
          :style="
            isMobile ? { 'margin-top': '2rem' } : { 'margin-left': '2rem' }
          "
        >
          <transition name="el-zoom-in-top">
            <Sent
              :answer="false"
              @answered="handleAnswered"
              :isAnswered="isAnswered"
              ref="sentence_2"
              :key="picked"
              :showIcon="!isMobile"
            >
              {{ picked.wrong }}
            </Sent></transition
          >
        </el-col>
      </div>
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
      <p>10 道题中，{{ rightCount }} 道正确，{{ wrongCount }} 道错误。</p>
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
      isMobile: null,
      isAnswered: false,
      list: [],
      rowDirection: "",
      columnDirection: "",
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
        if (window.innerWidth >= 768) {
          this.isMobile = false;
          this.rowDirection = Math.floor(Math.random() * 2)
            ? "row"
            : "row-reverse";
        } else {
          this.isMobile = true;
          this.columnDirection = Math.floor(Math.random() * 2)
            ? "column"
            : "column-reverse";
        }
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
        this.isAnswered = false;
        if (!this.isMobile) {
          this.rowDirection = Math.floor(Math.random() * 2)
            ? "row"
            : "row-reverse";
        } else {
          this.columnDirection = Math.floor(Math.random() * 2)
            ? "column"
            : "column-reverse";
        }
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

.quiz {
  margin-top: 2rem;
}

#next {
  margin-top: 2rem;
}
</style>
