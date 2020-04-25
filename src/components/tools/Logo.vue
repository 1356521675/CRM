<template>
  <div class="logo">
    <!-- <router-link :to="{name:'market'}">
      <img :src="logo.src" v-if="!myclass">
      <img class="small-logo" :src="logo.smsrc" v-else>
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>-->
    <!-- <img :src="logo.src" v-if="!myclass"> -->
    线索池测试服
    <!-- <div style="font-size:30px;color:red">★客户管理★</div> -->
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    title: {
      type: String,
      default: "",
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    myclass: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      logo: {
        src: require("@assets/images/logo21.png"),
        smsrc: require("@assets/images/logo.png")
      }
    };
  },
  mounted() {
    //
  }
};
</script>
<style lang="less" scoped>
.logo {
  float: left;
  text-align: center;
  font-size:28px;
  color: red;
}
.logo h1 {
  display: inline-block;
  font-size: 12px;
}
.logo img {
  width: 160px;
}
.logo img.small-logo {
  width: 50px;
}
</style>