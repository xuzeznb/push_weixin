var axios = require('axios')

function sendMessage(data) {
  return axios.post(
    'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' +
    data.access_token,
    {
      touser: data.touser,
      template_id: data.template_id,
      data: data.data || {},
    }
  )
}

function GetWeather(params) {
  return axios.get('https://api.map.baidu.com/weather/v1/?district_id=210100&data_type=all&ak=Rq41w6KexurKnY3fyyvLDWVwBvPAc4lT')
}

// 指定时间转换为时间戳
function toTimeStamp(dateString) {
  // dateString例如:'2022-03-05'
  // 例如返回:1646611200000
  return new Date(dateString) - 0
}

function getDistanceDays(date1, date2) {
  // date1例如:'2022-03-05',date2例如:'2022-03-06'
  const date1_timeStamp = toTimeStamp(date1)
  const date2_timeStamp = toTimeStamp(date2)
  let max = '', min = ''
  if (date1_timeStamp > date2_timeStamp) {
    max = date1_timeStamp
    min = date2_timeStamp
  } else {
    max = date2_timeStamp
    min = date1_timeStamp
  }
  // 例如返回:'1'
  return (max - min) / (24 * 60 * 60 * 1000)
}


function Specialday() {
  // 创建一个Date对象，表示当前的日期和时间
  var today = new Date();
  // 获取当前的年份和月份
  var year = today.getFullYear();
  var month = today.getMonth();
  // 创建一个Date对象，表示这个月的17号
  var date = new Date(year, month, 17);
  // 计算两个日期之间相差的毫秒数
  var diff = date.getTime() - today.getTime();
  // 将毫秒数转换为天数
  var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  // 输出结果
  return days
}

function Distance_rest(params) {
  // 创建一个Date对象，表示当前的日期和时间
  var today = new Date();
  // 获取当前是星期几，0表示星期日，1表示星期一，以此类推
  var weekday = today.getDay();
  // 计算距离这周五还有几天，如果今天是星期五或之后，则计算下周五
  var days = weekday < 5 ? 5 - weekday : 12 - weekday;
  return days
}

function convertToUpperCase(dayOfWeek) {
  let dayOfWeekString = "";
  switch (dayOfWeek) {
    case 1:
      dayOfWeekString = "星期一";
      break;
    case 2:
      dayOfWeekString = "星期二";
      break;
    case 3:
      dayOfWeekString = "星期三";
      break;
    case 4:
      dayOfWeekString = "星期四";
      break;
    case 5:
      dayOfWeekString = "星期五";
      break;
    case 6:
      dayOfWeekString = "星期六";
      break;
    case 7:
      dayOfWeekString = "星期日";
      break;
    default:
      console.log("输入错误！");
      return "";
  }
  return dayOfWeekString;
}


module.exports = {
  sendMessage,
  GetWeather,
  convertToUpperCase,
  getDistanceDays,
  Specialday,
  Distance_rest
}
