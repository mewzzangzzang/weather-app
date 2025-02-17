<script setup>
import { useWeatherStore } from '@/stores/weather.js';
import { onBeforeMount } from 'vue';
import { getImage } from '@/composables/helper.js';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

const weatherStore = useWeatherStore();
const { hours } = storeToRefs(weatherStore);

onBeforeMount(() => {
  weatherStore.getCurrentWeatherInfo();
});
</script>
<template>
    <article class="forecast">
      <!-- 시간별 예보 -->
      <section class="forecast__today">
        <strong class="forecast__title">시간별</strong>
        <ul class="week__list">
          <!-- 시간별 예보 상세 아이템 -->
          <li v-for="hour in hours" :key="hour.datetime" class="week__list__item">
            <span>{{ dayjs(`2025-02-18 ${hour.datetime}`).format('H') }} 시</span>
            <img :src="getImage(hour.icon)" :alt="`${hour.datetime} ${hour.temp}°`" class="week_icons" />
            <span>{{ hour.temp }}</span>
          </li>
        </ul>
      </section>
      <!-- 중기 예보 -->
      <section class="forecast__week">
        <strong class="forecast__title">중기예보</strong>
        <ul class="forecast__weekList">
          <!-- 중기 예보 상세 아이템 -->
          <li class="forecast__weekListItem">
            <div class="forecast__itemLeft">
              <strong class="forecast__day">월요일</strong>
              <span class="forecast__date">2024.07.01</span>
            </div>
            <div class="forecast__itemMiddle">
              <strong class="forecast__tmp">32°</strong>
            </div>
            <div class="forecast__itemRight">
              <img src="@/assets/images/icons/hail.png" alt="" class="forecast__weekListImg"/>
            </div>
          </li>
        </ul>
      </section>
    </article>
</template>