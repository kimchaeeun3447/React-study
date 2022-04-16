import axios from 'axios';

const client = axios.create(); // axios 인스턴스 만들기 - 나중에 api 클라이언트에 공통적인 설정을 쉽게 넣을 수 있음

export default client;