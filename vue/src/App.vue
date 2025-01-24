<script setup>
import { RouterView } from 'vue-router';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import Baselayout from './layouts/DefaultLayout.vue';

// css height 100vh적용시 웹 브라우저 상관없이 항상 일정한 100vh 값
const init = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };
      onBeforeMount(() => {
        init();
        window.addEventListener("resize", init);
      });
      onBeforeUnmount(()=> {
        window.removeEventListener("resize", init);
      })
</script>
<template>
  <Baselayout>   
  <RouterView />
  </Baselayout>
</template>
