// 引入封装头信息和请求域名的axios对象
import http from './http'
// 引入请求的url地址
import {
  // 正在热映列表请求uri地址
  nowPlayingListUri,
  comingSoonListUri,
  detailUri,
  cinemaListUrl,
  cityListUrl,
  loginUrl,
  centerUrl,
} from '@/config/url'


export const nowPlayingListData = (page) => {
  http.defaults.headers.info='';
  http.defaults.headers.authorization = "";
  return http.get(nowPlayingListUri + page)
}
export const comingSoonListData = (page) => {
  http.defaults.headers.info='';
  http.defaults.headers.authorization = "";
    return http.get(comingSoonListUri+ page)
}
export const detailData = (filmId) => {
  http.defaults.headers.info='info';
  http.defaults.headers.authorization = "";
  return http.get(detailUri+ filmId)
}
export const cinemaListData = () => {
  http.defaults.headers.info = "cinema";
  http.defaults.headers.authorization = "";
  return http.get(cinemaListUrl);
};
export const cityListData = async () => {
  http.defaults.headers.info = "city";
  http.defaults.headers.authorization = "";
  let ret = await http.get(cityListUrl);
  let cities = ret.data.data.cities;
  let cityIndex = [];
  let dataList = [];
  let indexList = [];

  for (let i = 65; i <= 90; i++) {
      cityIndex.push(String.fromCharCode(i));
  }
  cityIndex.forEach((index) => {
      let tmpArr = cities.filter(
          (item) => index.toLowerCase() == item.pinyin.substr(0, 1)
      );
      if (tmpArr.length > 0) {
          indexList.push(index);
          dataList.push({
              index,
              data: tmpArr,
          });
      }
  });
  return Promise.resolve([dataList, indexList]);
};

export const userLogin = (data) => {
  return http.post(loginUrl,data)
};
export const userInfo = (_token) => {
  http.defaults.headers.authorization = _token;
  return http.get(centerUrl);
};
/* export const userInfo = (_token) => {
  http.defaults.headers.authorization = _token;
  http.interceptors.response.use(function(response){
      response.data.userinfo.gender = response.data.userinfo.gender
          ? "女"
          : "男";
      return response
  },function(error){
      // 错误的处理
  });
  return http.get(centerUrl);
}; */