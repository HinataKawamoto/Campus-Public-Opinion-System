import request from '../utils/request'
// 登陆
export function Login(data) {
  return request({
    url: '/login/userLogin',
    method: 'POST',
    headers: {
      isToken: false
    },
    data: data

  })
}
// 成绩
export function Avg(data) {
  return request({
    url: '/stdBigScreen/ScoreBar',
    method: 'GET',
    headers: {
      isToken: true
    },
    data: data

  })
}
// 报警原因
export function Actv(data) {
  return request({
    url: '/stdAlarm/ActvAlarmStd',
    method: 'POST',
    headers: {
      isToken: true
    },
    data: data

  })
}
// 报警原因2
export function Score(data) {
  return request({
    url: '/stdAlarm/ScoreAlarmStd',
    method: 'POST',
    headers: {
      isToken: true
    },
    data: data

  })
}
// 查看权限列表
export function Pin(data) {
  return request({
    url: '/stdBigScreen/Pin',
    method: 'POST',
    headers: {
      isToken: true
    },
    data: data

  })
}