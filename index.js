#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const { fileURLToPath } = require('url')
let oRes, res, extractResData, data

run()

async function run() {
  init()
  await chooseRunMode()
}

async function chooseRunMode() {
  try {
    tipToast(
      '如果不联网，请先访问https://api.bilibili.com/x/web-interface/view?bvid=你要查的BV号，将网页内容保存成.json格式文件到当前目前下，然后本工具将会读取它\n例如：https://api.bilibili.com/x/web-interface/view?bvid=BV1GL4y1v79M'
    )
    const { isNeedNetwork } = await askQuestions([
      {
        name: 'isNeedNetwork',
        type: 'list',
        message: '请选择是否联网：',
        choices: ['yes', 'no', '退出']
      }
    ])
    switch (isNeedNetwork) {
      case 'yes':
        {
          const { inputBvid } = await askQuestions([
            {
              name: 'inputBvid',
              type: 'input',
              message: '请输入要查询的BV号(e.g.:BV1GL4y1v79M)：',
              filter: function (val) {
                return val.trim()
              }
            }
          ])
          var bvReg =
            /[bB][vV][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/g
          if (bvReg.test(inputBvid)) {
            // if (inputBvid.indexOf('BV') !== -1) {
            try {
              oRes = await getBiliVideoDesc(inputBvid)
              res = oRes.data.data
              extractResData = extractResFn(res)
            } catch (err) {
              errorToast(
                '获取视频信息失败！请检查输入的BV号是否正确！请检查当前网络状态！'
              )
              console.log('')
              await chooseRunMode()
            }
          } else {
            errorToast('BV号输入有误!')
            console.log('')
            await chooseRunMode()
          }
        }
        break

      case 'no':
        {
          const { inputJsonPath } = await askQuestions([
            {
              name: 'inputJsonPath',
              type: 'input',
              message:
                '请输入本地的json文件路径（例如："X:/xxx/xxx.json"或者"x:\\xxx\\xxx.json"）：',
              filter: function (val) {
                val = val.replace(/"/g, '')
                if (val.length > 0 && path.basename(val).indexOf('.json') == -1)
                  return (val += '.json')
                else return val.trim()
              }
            }
          ])
          successToast(
            `正在读取JSON文件!其文件绝对路径：${path.join(inputJsonPath)}`
          )
          try {
            data = fs.readFileSync(
              inputJsonPath.indexOf('/') !== -1
                ? path.join(inputJsonPath)
                : inputJsonPath,
              'utf8'
            )
            res = JSON.parse(data).data
            extractResData = extractResFn(res)
          } catch (e) {
            errorToast(`读取JSON文件失败！`)
            console.log('')
            await chooseRunMode()
          }
        }
        break
      case '退出':
        var a = true
        if (a) {
          successToast('即将退出！')
          process.exit(1)
        }
        break
      default:
        errorToast('输入有误，运行结束！')
        process.exit()
    }
    getVideoDesc(res, isNeedNetwork)
    await mainTask(data, res, extractResData)
  } catch (e) {
    console.log(e)
  }
}

async function mainTask(data, res, extractResData) {
  const { doTarget } = await askQuestions([
    {
      name: 'doTarget',
      type: 'list',
      message: '请选择功能：',
      choices: [
        '【查询某个分P的标题&时长】',
        '【统计一个或多个视频时长】',
        '【查询各个分P的标题&时长】',
        '【模糊查询视频列表符合的分P】',
        '【重新获取视频信息】',
        '【退出】'
      ]
    }
  ])

  async function main(doTarget) {
    switch (doTarget) {
      case '【查询某个分P的标题&时长】':
        {
          tipToast(`当前视频的总P数：${extractResData.videos}`)
          const { searIdx } = await askQuestions([
            {
              name: 'searIdx',
              type: 'input',
              message: `请输入 要查的分P数(number)`
            }
          ])
          const searchRes = searchVideo(searIdx - 1, extractResData)
          if (searchRes) {
            console.log(
              `>\tP${searIdx}  ${searchRes.name}  ${formatSecond(
                searchRes.duration
              )}`
            )
          } else return errorToast('错误输入')
        }
        break
      case '【统计一个或多个视频时长】':
        {
          tipToast(`当前视频的总P数：${extractResData.videos}`)
          const { startIdx, endIdx, pts } = await askQuestions([
            {
              name: 'startIdx',
              type: 'input',
              message: `请输入 开始的分P数(number)`
            },
            {
              name: 'endIdx',
              type: 'input',
              message: `请输入 结束的分P数(number)`
            },
            {
              name: 'pts',
              type: 'input',
              message: `请输入 播放倍数(number)：`
            }
          ])

          var ptsResult = setVideoPTS(pts, extractResData, startIdx, endIdx)
          if (ptsResult.computedDurationRes && ptsResult.newDuration) {
            successToast(
              `第${startIdx}集到第${endIdx}集的总时长为${formatSecond(
                ptsResult.computedDurationRes
              )}`
            )
            successToast(
              `你将要${pts}倍数播放原时长为${formatSecond(
                ptsResult.computedDurationRes
              )}视频,总需要${formatSecond(ptsResult.newDuration)}`
            )
          } else return errorToast('输入与实际集数不符')

          const { isComputed } = await askQuestions([
            {
              name: 'isComputed',
              type: 'list',
              message: '需要帮你计算吗？(yes or no)',
              choices: ['yes', 'no']
            }
          ])
          switch (isComputed) {
            case 'yes':
              {
                const { inputType } = await askQuestions([
                  {
                    name: 'inputType',
                    type: 'list',
                    message: '你要以什么单位来计算？',
                    choices: ['每天N小时', '每天看N集']
                  }
                ])
                switch (inputType) {
                  case '每天N小时':
                    {
                      const { everyDayHour } = await askQuestions([
                        {
                          name: 'everyDayHour',
                          type: 'input',
                          message: '你要每天看多少个小时(number,e.g:1)？'
                        }
                      ])
                      everyDayHour <= 24
                        ? successToast(
                            `每天看${everyDayHour}个小时的话，将要看${(
                              ptsResult.newDuration /
                              3600 /
                              everyDayHour
                            ).toFixed(2)}天`
                          )
                        : errorToast(`输入有误`)
                    }
                    break
                  case '每天看N集':
                    {
                      const { everyDayVideoNum } = await askQuestions([
                        {
                          name: 'everyDayVideoNum',
                          type: 'input',
                          message: '你要每天看多少P(number,e.g:1)？'
                        }
                      ])

                      everyDayVideoNum >= 1 &&
                      everyDayVideoNum <= extractResData.videos
                        ? successToast(
                            `每天看${everyDayVideoNum}P的话，需要看${(
                              extractResData.videos / everyDayVideoNum
                            ).toFixed(2)}天`
                          )
                        : errorToast(`输入有误`)
                    }
                    break
                }
              }
              break
            case 'no':
              {
                successToast('已取消计算')
              }
              break
            default:
              errorToast('输入有误！')
              break
          }
        }
        break
      case '【查询各个分P的标题&时长】':
        {
          tipToast(`当前视频的总P数：${extractResData.videos}`)
          var { startIdx1, endIdx1 } = await askQuestions([
            {
              name: 'startIdx1',
              type: 'input',
              message: `请输入 开始的分P数(number)`
            },
            {
              name: 'endIdx1',
              type: 'input',
              message: `请输入 结束的分P数(number)`
            }
          ])

          if (
            isNaN(startIdx1) ||
            isNaN(endIdx1) ||
            Number(startIdx1) < 0 ||
            Number(startIdx1) > Number(extractResData.videos) ||
            Number(endIdx1) < 0 ||
            Number(endIdx1) > Number(extractResData.videos)
          ) {
            return errorToast(`输入与实际集数不符`)
          }
          successToast(
            '将会按以下格式输出结果，当前P数 标题 - 时间（有小时就显示，没小时就不显示）'
          )
          for (let i = startIdx1 - 1; i < endIdx1; i++) {
            var searchRes = searchVideo(i, extractResData)
            if (searchRes.name && searchRes.duration) {
              console.log(
                `>\tP${i + 1}  ${searchRes.name}  ${formatSecond(
                  searchRes.duration
                )}`
              )
            } else {
              errorToast('输入与实际集数不符')
              break
            }
          }
        }
        break
      case '【模糊查询视频列表符合的分P】':
        {
          var { curSearchText, isCaseS } = await askQuestions([
            {
              name: 'curSearchText',
              type: 'input',
              message: `请输入 要查找的标题(string)：`
            },
            {
              name: 'isCaseS',
              type: 'list',
              message: `是否需要区分大小写？`,
              choices: ['yes', 'no']
            }
          ])
          switch (isCaseS) {
            case 'yes':
              templateTask(curSearchText, true)
              break
            case 'no':
              templateTask(curSearchText, false)
              break
            default:
              errorToast('未做选择！')
              break
          }
          function templateTask(curSearchText, isCaseSensitive) {
            var { searchIndexResArr, searchResArr, searchDurationResArr } =
              searchNameFn(extractResData, curSearchText, isCaseSensitive)
            var curSearchRes = ''
            if (searchIndexResArr.length > 0 && searchResArr.length > 0) {
              successToast(`\t查询到${searchResArr.length}条结果，结果如下：`)
              for (let i = 0; i < searchResArr.length; i++) {
                var template1 = `>\tP${searchIndexResArr[i]} ${
                  searchResArr[i]
                } ${formatSecond(searchDurationResArr[i])}`
                // console.log(template)
                curSearchRes += template1 + '\n'
              }
              console.log(curSearchRes)
            } else return errorToast('未查找符合的分P！')
          }
        }
        break
      case '【退出】':
        var a = true
        if (a) {
          successToast('即将退出！')
          process.exit(1)
        }
        break
      case '【重新获取视频信息】':
        console.log('')
        await chooseRunMode()
        break
      default:
        errorToast('选择有误')
        break
    }
  }

  await main(doTarget)
  console.log('')
  await mainTask(data, res, extractResData)
  console.log('')
}

/**
 *  打印输出视频详情
 * @param {object} oData 要读取的视频信息对象
 * @param {boolean} isNeedNetwork 是否需要网络
 */
function getVideoDesc(oData, isNeedNetwork) {
  successToast(`成功读取到当前视频的信息!`)
  console.log('')
  var {
    title,
    videos,
    tname,
    ctime,
    pubdate,
    desc,
    owner,
    stat,
    bvid,
    aid,
    duration
  } = oData
  var { view, coin, favorite, share, danmaku, like } = stat
  var url = 'https://www.bilibili.com/video/' + bvid
  var url1 = 'https://www.bilibili.com/video/av' + aid
  var url2 = 'https://space.bilibili.com/' + owner.mid
  var templateStr = `------ BV号：${bvid} (AV号：${aid}) ------\n> UP主：${
    owner.name
  }(uid:${
    owner.mid
  })\t${url2} \n> 标题：${title}\n> 总P数：${videos}\t总时长：${formatSecond(
    duration
  )}\n> 视频描述：\n\t${desc}\n>${
    isNeedNetwork == 'no' ? '(此类型数据不会自动更新)' : ''
  } 播放量：${view}  弹幕数：${danmaku}  分享数：${share}\t 点赞数：${like}  投币数：${coin}  收藏数：${favorite}\n> 分区：${tname}\n> 视频链接：${url}\n\t\t${url1}\n> 创建时间：${formatTime(
    Number(String(ctime) + '000'),
    'Y年M月D日 h:m:s'
  )}\t发布时间：${formatTime(
    Number(String(pubdate) + '000'),
    'Y年M月D日 h:m:s'
  )}\n------------------------------------------------\n`
  console.log(chalk.blue(templateStr))
}

/**
 *
 * @param {number} idx 要查找的索引
 * @param {object} oData 要读取的视频信息对象
 * @returns false | {name,duration}
 */
function searchVideo(idx, oData) {
  return Number(idx) < 0 || Number(idx) > Number(oData.videos) || isNaN(idx)
    ? false
    : {
        name: oData.partArr[idx],
        duration: oData.durationArr[idx]
      }
}

/**
 *
 * @param {number} videoPTS 倍数
 * @param {object} oData 要读取的视频信息对象
 * @param {number} startIdx 开始集数
 * @param {number} endIdx 结束集数
 * @returns false 或者 {computedDurationRes，newDuration}
 */
function setVideoPTS(videoPTS, oData, startIdx = 0, endIdx = videos) {
  var { videos } = oData
  if (
    isNaN(videoPTS) ||
    isNaN(startIdx) ||
    isNaN(endIdx) ||
    Number(videoPTS) < 0 ||
    Number(startIdx) < 1 ||
    Number(endIdx) < Number(startIdx) ||
    Number(endIdx) > videos
  ) {
    return false
  }
  var computedDurationRes = 0

  for (let i = startIdx - 1; i < endIdx; i++) {
    computedDurationRes += oData.durationArr[i]
  }

  var newDuration = computedDurationRes / videoPTS
  return {
    computedDurationRes,
    newDuration
  }
}

/**
 *
 * @param {object} data 要提取的视频信息对象
 * @returns title videos duration partArr durationArr pageNumArr
 */
function extractResFn(data) {
  var { title, videos, duration, pages } = data
  return {
    title,
    videos,
    duration,
    partArr: Array.from(pages, (pages) => {
      return pages.part
    }),
    durationArr: Array.from(pages, (pages) => {
      return pages.duration
    }),
    pageNumArr: Array.from(pages, (pages) => {
      return pages.page
    })
  }
}

function searchNameFn(oData, searchText, isCaseSensitive) {
  var searchIndexResArr = []
  var searchDurationResArr = []
  if (typeof searchText !== 'string' || typeof oData !== 'object') return false
  var { partArr, durationArr } = oData
  var searchResArr = partArr.filter((data, index) => {
    if (!isCaseSensitive) {
      // 不区分大小写
      if (data.match(new RegExp(searchText, 'ig'))) {
        searchIndexResArr.push(index + 1)
        searchDurationResArr.push(durationArr[index])
        return data
      }
    } else {
      //区分大小写
      if (data.indexOf(searchText) > -1) {
        searchIndexResArr.push(index + 1)
        searchDurationResArr.push(durationArr[index])
        return data
      }
    }
  })
  return { searchIndexResArr, searchResArr, searchDurationResArr }
}

function init() {
  console.log('')
  console.log(
    chalk.green(
      figlet.textSync('FreySu', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
  console.log(
    chalk.green.bold(
      '欢迎使用 FreySu@Bilibili 制作的 “B站分P视频信息助手(Node.js版)”！若有使用不明白的话可以在B站私信我！\n欢迎关注我的B站账号(uid：14642614)！\thttps://space.bilibili.com/14642614\n'
    )
  )
  console.log(
    chalk.green.bold(
      `功能列表：\n1. 网络获取视频信息/本地读取视频信息JSON文件\n\t可以校验BV号，查看up主名、视频标题、总P数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间\n2. 查询某个分P的标题&时长\n\t比如第2P\n3. 统计一个或多个视频时长\n\t比如预计每天看X个小时/每天看X集 可以看完多少P到多少P\n4. 查询多个分P的标题&时长\n\t比如第2P到第11P\n5. 模糊查询视频列表中符合的分P\n\t可以选择是否区分大小写`
    )
  )
  console.log('')
}

function askQuestions(questions) {
  return inquirer.prompt(questions)
}

function successToast(msg) {
  console.log(
    `${chalk.white.bgGreen.bold(`SUCCESS`)} ${chalk.green.italic(`${msg}`)}`
  )
}

function tipToast(msg) {
  console.log(
    `${chalk.white.bgMagenta.bold(`TIPS`)} ${chalk.magenta.italic(`${msg}`)}`
  )
}

function errorToast(msg) {
  console.log(
    `${chalk.white.bgRed.bold(`ERROR`)} ${chalk.red.italic(`${msg}`)}`
  )
}

/**
 * 格式化日期，如月、日、时、分、秒保证为2位数
 * @param {number} n 要补位的日期数
 * @returns 11 , 01
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 格式化时间
 * @param {number} number 毫秒时间戳
 * @param {string} format 需要转换成的日期格式
 * @returns
 */
function formatTime(number, format) {
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format
}

/**
 *
 * @param {number} second 秒为单位的数字 例如360就是6分钟
 * @param {boolean} isHandle 是否要处理
 * @returns 2天1小时10分49秒 ,49:10.49 , 05:10
 */
function formatSecond(second, isHandle) {
  const days = Math.floor(second / 86400)
  const hours = Math.floor((second % 86400) / 3600)
  const minutes = Math.floor(((second % 86400) % 3600) / 60)
  const seconds = Math.floor(((second % 86400) % 3600) % 60)
  const hours1 = Math.floor(second / 3600)
  let seconds1 = seconds.toString()
  if (isHandle) return `${days}天${hours}小时${minutes}分${seconds}秒`
  return hours1 !== 0
    ? `${hours1}:${minutes}:${
        seconds1.length == 1 ? (seconds1 += '0') : seconds1
      }`
    : `${minutes < 10 ? '0' + String(minutes) : minutes}:${
        seconds1.length == 1 ? seconds1 + '0' : seconds1
      }`
}

async function getBiliVideoDesc(bvid) {
  return axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
}
