//----------------封装一些常用时间处理的函数，用来做时间格式转换----------------
import moment from 'moment'
// 短时间
export const shortTime = function (value, formater = "YYYY-MM-DD") {
    return moment(value).format(formater);
  };
  
  // 长时间
  export const time = function (value, formater = "YYYY-MM-DD HH:mm:ss") {
    return moment(value).format(formater);
  };
  
  // 长时间
  export const time1 = function (value, formater = "YYYY/MM/DD HH:mm:ss") {
    return moment(value).format(formater);
  };
  
  export const leaveTime = function (value) {
    return moment(value).format("YYYY-MM-DD HH:mm");
  };
  
  // 短时间
  export const monthTime = function (value) {
    return moment(value).format("YYYY-MM");
  };
  
  // 短时间1
  export const monthTime1 = function (value) {
    return moment(value).format("YYYY/MM");
  };
  
  // 短时间2
  export const monthTime2 = function (value) {
    return moment(value).format("YYYY-MM-DD");
  };
  
  // 每月第一天
  export const monthOne = function (value) {
    return moment(value).format("YYYY-MM-01");
  };
  // 每月第一天精确
  export const monthOnes = function (value) {
    return moment(value).format("YYYY-MM-01 00:00:00");
  };
  // 补全00:00:00
  export const addZero = function (value) {
    return moment(value).format("YYYY-MM-DD 00:00:00");
  };
  // 月数
  export const MonTime = function (value) {
    return moment(value).format("MM");
  };
  // 天数
  export const dayTime = function (value) {
    return moment(value).format("DD");
  };
  // 时分秒
  export const secondsTime = function (value) {
    return moment(value).format("HH:mm:ss");
  };
  
  export const secondShortTime = function (value) {
    return moment(value).format("HH:mm");
  };