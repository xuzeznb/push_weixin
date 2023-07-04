const { default: axios } = require("axios")

const params = {
  appid: 'wx036b367f7139522b',
  secret: 'a303306c08aba6942e62496091f0c38f',
  touser: 'oUch86Gqjr9fwBFtuvVKc4vknqCk',
  // touser: 'oUch86PeOjj37i9TPrv6Luj3xf38',
  template_id: '2jI40bXjxdJUhtGD0iRaFIPueXjN9OpLmb3mqnhVzKg',
}


const listConfig = {
  data: {
    nowDate: {
      value: '今天是 2022/08/20 周天 ',
    },
    city: {
      value: '沈阳',
    },
    // 最高温度
    low: {
      value: '28°C',
    },
    // 体感温度
    high: {
      value: '37°C',
    },
    rh:{
      value:'',
    },
    windpower:{
      value:'',
    },
    condition:{
      value:'',
    },
    loveDate: {
      value: '999',
    },
    Special_Day:{
      value: 0,
    },
    Distance_rest:{
        value:0
    },
    txt: {
      value: '我习惯在包里藏一瓶百无聊赖，打发人间的白云和苍狗设计睡着的未来',
    },
  },
}


/* 上述代码是需要自定义的配置项 */
function verifyEmpty() {
  var flag = ''
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      if (!params[key]) {
        flag = key
        break
      }
    }
  }
  return flag
}

// 校验为空
if (verifyEmpty()) {
  console.error(
    '警告：请完善 “/src/config/config.js中的配置项: ' +
      verifyEmpty() +
      '”的内容,再执行代码！'
  )
  process.exit(0)
}

module.exports = {
  params,
  listConfig,
}
