<script setup>
import { useWeatherStore } from '@/stores/weather.js';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import { getImage } from "@/composables/helper.js";

// 함수 호출해서 인스턴스 생성, 생성된 스토어 인스턴스 사용시 state, getter, action 접근가능
const weatherStore = useWeatherStore();
// 스토어에 정의된 state, getter는 일반적인 방법으로 비구조화 할당시 반응형이 깨짐, 반응형 유지하면서 비구조화 할당을 하려면 storeToRefs()사용해야함
const { currentConditions, address } = storeToRefs(weatherStore);

onBeforeMount(async() => {
  await weatherStore.getCityName();
  await weatherStore.getCurrentWeatherInfo();

});
</script>
<template>
  <header v-if="currentConditions" class="header">
      <!-- 지역 -->
      <h1 class="header__title">
        <span class="material-symbols-outlined"> location_on </span>{{ address}}
      </h1>
      <!-- <h2 class="header__date">{{ hourToMinutes }}</h2> -->
      <h2 class="header__date">{{ dayjs().format('HH:mm') }}</h2>
    </header>
    <!-- 현재 날씨 -->
    <main v-if="currentConditions" class="main">
      <article class="weather">
        <section class="weather__info">
          <img 
          :src="getImage(currentConditions.icon)" 
          :alt="`${currentConditions.datetime} ${currentConditions.temp}°`" 
          class="weather__img"/>
          <h3 class="weather_temp">{{ currentConditions.temp }} ° </h3>
          <p class="weather_summary">{{ currentConditions.conditions }}</p>
          <ul class="weather__moreList">
            <li class="weather__moreListItem">
              <p class="weather__subtitle">습도</p>
              <p class="weather__desc">{{ currentConditions.humidity}}%</p>
            </li>
            <li class="weather__moreListItem">
              <p class="weather__subtitle">{{ currentConditions.windspeed }}</p>
              <p class="weather__desc">4.12/ms</p>
            </li>
            <li class="weather__moreListItem">
              <p class="weather__subtitle">체감</p>
              <p class="weather__desc">{{  currentConditions.feelslike }}</p>
            </li>
          </ul>
        </section>
      </article>
    </main>
</template>