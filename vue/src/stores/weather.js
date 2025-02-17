import { defineStore } from "pinia";
import  axios  from "axios";
import { ref, computed } from "vue";
import  dayjs  from "dayjs";

const axiosIstance = axios.create({
    baseURL:'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    params: {
        lang:'ko',
        key:'****',
        unitGroup:'metric',
    },
});


export const useWeatherStore = defineStore('weather', () => {
    //초기 검색 지역
    const address = ref('seoul');
    //현재 날씨 정보 데이터
    const currentConditions = ref(null);
    const days = ref(null);

    //오늘 시간대 데이터 필터링
    const hours = computed(() => {
        return days.value
        ?.find((v) => v.datetime === dayjs().format('YYYY-MM-DD'))
        ?.hours.filter((v) => v.datetime > dayjs().format('HH:mm:ss'));
    });

    //현재 날씨 API 불러오기
    const getCurrentWeatherInfo = async () => {
        try {
            const res = await axiosIstance.get('/' + address.value);
            currentConditions.value = res.data.currentConditions;
            days.value = res.data.days;//응답 객체에서 days 속성만 days 반응형 변수 할당
            console.log(days.value);
        } catch (e) {
            alert(e.resonse?.data ? e.resonse?.data : e.message);
        }
    };
    return { currentConditions,hours, getCurrentWeatherInfo, };
})