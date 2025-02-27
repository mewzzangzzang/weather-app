import { defineStore } from "pinia";
import  axios  from "axios";
import { ref, computed } from "vue";
import  dayjs  from "dayjs";

const axiosIstance = axios.create({
    baseURL:'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    params: {
        lang:'ko',
        key:'******',
        unitGroup:'metric',
    },
});


export const useWeatherStore = defineStore('weather', () => {
    //초기 검색 지역
    const address = ref('seoul');
    //현재 날씨 정보 데이터
    const currentConditions = ref(null);
    const days = ref(null);
    const searchData = ref([]); //검색 날씨 데이터

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
            alert(e.response?.data ? e.response?.data : e.message);
        }        
    };

    // 미래 날짜의 날씨 예보 데이터 계산 (요일)
    const forecast = computed(()=> {
        return days.value?.filter((v) => v.datetime > dayjs().format('YYYY-MM-DD'));
    });

    //city 부분으로 날씨 검색
    const getSearchWeatherInfo = async (city) => {
        try {
            const res = await axiosIstance.get('/' + city)
            // 응답 데이터 객체로 필요한 데이터 가공
            const printData = {
                address: res.data.address,
                feelslikemax: res.data.days[0].feelslikemax,
                feelslikemin: res.data.days[0].feelslikemin,
                icon: res.data.currentConditions.icon,
                temp: res.data.currentConditions.temp,
            };
            if (
                searchData.value.findIndex((v) => v.address === res.data.address) === -1
            ) {
                searchData.value.push(printData);
            } else {
                alert('이미 조회한 지역입니다.');
            }
        } catch (e) {
            alert(e.response?.data ? e.response?.data : e.message);
        }
    };
    return { currentConditions, hours, forecast, searchData, getCurrentWeatherInfo, getSearchWeatherInfo };

});