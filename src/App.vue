<template>
  <div
    id="app"
    v-loading="isLoading"
    element-loading-background="rgba(255,255,255,1)"
  >
    <el-row type="flex" justify="center">
      <img alt="Vue logo" src="./assets/logo.png" />
      <div id="statistics" v-if="!isMobile">
        <el-badge :value="rightCount" type="success">
          <progress-bar :status="true" :percentage="(rightCount / 10) * 100" />
        </el-badge>
        <el-badge :value="wrongCount" type="danger">
          <progress-bar :status="false" :percentage="(wrongCount / 10) * 100" />
        </el-badge>
      </div>
    </el-row>
    <div v-if="hasItems">
      <div
        class="quiz"
        :style="
          isMobile
            ? {
                display: 'flex',
                'align-items': 'center',
                'flex-direction': columnDirection,
              }
            : {
                display: 'flex',
                'justify-content': 'center',
                'flex-direction': rowDirection,
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
      <Info v-if="isAnswered">
        See
        <b
          ><i>{{ picked.section }}</i></b
        >
        for this pair.
      </Info>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="!hasItems">
        已答完
        <p>10 道题中，{{ rightCount }} 道正确，{{ wrongCount }} 道错误。</p>
        <el-link @click="fetchOneMoreTime()">More Quizzes</el-link>
      </div>
    </transition>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Sent from "./components/Sent.vue";
import ProgressBar from "./components/ProgressBar.vue";
import Info from "./components/Info.vue";
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
      wrongCount: 0,
      isLoading: null,
    };
  },
  created: function() {
    this.isLoading = true;
    if (window.innerWidth >= 768) {
      this.isMobile = false;
      this.rowDirection = Math.floor(Math.random() * 2) ? "row" : "row-reverse";
    } else {
      this.isMobile = true;
      this.columnDirection = Math.floor(Math.random() * 2)
        ? "column"
        : "column-reverse";
    }
  },
  mounted: function() {
    this.fetchSents();
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
          "box-card-wrong": false,
        };
        this.$refs.sentence_2.result = null;
        this.$refs.sentence_2.classOb = {
          "box-card-unanswered": true,
          "box-card-right": false,
          "box-card-wrong": false,
        };
      }
    },
    fetchSents: function() {
      fetch("http://localhost:5000/sents")
        .then((res) => res.json())
        .then((data) => {
          this.list = data;
          this.isLoading = false;
        })
        .then(() => {
          this.picked = this.list.pop();
        });
    },
    fetchOneMoreTime: function() {
      this.isAnswered = false;
      this.isLoading = true;
      this.rightCount = 0;
      this.wrongCount = 0;
      this.fetchSents();
      this.hasItems = true;
    },
  },
  components: {
    Sent,
    ProgressBar,
    Info,
  },
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
  margin-left: 2rem;
}
.el-badge {
  display: block !important;
}

.is-fixed {
  transform: translateX(20px) !important;
}

.quiz {
  margin-top: 2rem;
}

#next {
  margin-top: 2rem;
}
</style>
