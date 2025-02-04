import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

const axiosIstance = axios.create({
    baseURL:'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    params: {
        lang:'ko',
        key:'-------',
        unitGroup:'metric',
    },
});

export const useWeatherStore = defineStore('weather', () => {
    //초기 검색 지역
    const address = ref('seoul');
    //현재 날씨 정보 데이터
    const currentConditions = ref(null);
    //현재 날씨 API 불러오기
    const getCurrentWeatherInfo = async () => {
        try {
            const res = await axiosIstance.get('/' + address.value);
            currentConditions.value = res.data.currentConditions;
        } catch (e) {
            alert(e.resonse?.data ? e.resonse?.data : e.message);
        }
    };
    return { currentConditions, getCurrentWeatherInfo, };
})