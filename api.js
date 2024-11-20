import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://1.209.148.143:8443", // 프록시 서버 URL
  proxy: false, // React Native에서는 기본적으로 proxy 옵션을 false로 설정
});

export default api;