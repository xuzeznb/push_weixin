let { params, listConfig, } = require('./src/config/config')
const getToken = require('./src/getToken/index')
const { sendMessage, GetWeather, convertToUpperCase,getDistanceDays,Specialday,Distance_rest } = require('./src/sendMessage/index')
const { default: axios } = require("axios")

async function start() {
  let access_token

  try {
    access_token = await getToken(params)
    console.log(access_token)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }

  let { data } = await GetWeather()
  listConfig.data.city.value = data.result.location.name
  // 温度
  listConfig.data.low.value = data.result.now.temp + "°C"
  // feels_like 体感温度
  listConfig.data.high.value = data.result.now.feels_like + "°C"
  // 天气
  listConfig.data.condition.value = data.result.now.text
  // 风力
  listConfig.data.windpower.value = data.result.now.wind_dir + '' + data.result.now.wind_class

  // 获取当前时间戳（毫秒）
  var timestamp = new Date().getTime();

  // 转换为日期对象
  var date = new Date(timestamp);

  // 获取星期几（0代表星期日，1代表星期一，以此类推）
  var dayOfWeek = date.getDay();

  // 获取日期和时间的字符串表示
  var formattedDate = date.toLocaleString();

  listConfig.data.nowDate.value = formattedDate + ' ' + convertToUpperCase(dayOfWeek)
  // 计算恋爱天数
  let DaysofLove  = getDistanceDays('2023/5/24',new Date())
  listConfig.data.loveDate.value  = Math.trunc(DaysofLove)

  // 距离宝宝的例假日时间
  listConfig.data.Special_Day.value =  Specialday()

  // 距离周六
  listConfig.data.Distance_rest.value =  Distance_rest() + "天";

  sendMessage({
    ...params,
    access_token,
    ...listConfig,
  })
    .then((res) => {
      if (res.data && res.data.errcode) {
        console.error('发送失败', res.data)
        return
      }
      console.log('发送成功-请在微信上查看对应消息')
    })
    .catch((err) => console.error('发送失败', err))
}


start()
