<template>
  <div>
     <!--  <form action="/api/api/v1/login" method="post">
      电话号码: <input type="text" name='mobile' v-model="mobile" /> 
      密码: <input type="password" name='password' v-model="password" />
      <button @click="handle">点我发送</button>
      <div>{{ getData.userId }}</div>
      </form> -->
      电话号码: <input type="text" name='mobile' v-model="mobile" /> 
      密码: <input type="password" name='password' v-model="password" />
      <button @click="handle">点我发送</button>
      <div>{{ getData.userId }}</div>
  
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      mobile: "",
      password: "",
      getData: '',
    };
  },
  methods: {
    handle: function () {
       axios .post("/api/api/v1/login", {
          mobile: this.mobile,
          password: this.password,
        })
        .then((ret) => {console.log(ret)}); 
    },
     
  },
};
</script>