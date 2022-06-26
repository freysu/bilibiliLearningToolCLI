#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const axios = require('axios')
let oRes, res, extractResData, data

/**
 * 初始化字符画，打印文本
 */
const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('FreySu', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
  myToast.tip(
    '欢迎使用我制作的 “B站分P视频信息助手(Node.js版)”！若有使用不明白的话可以在B站私信我！\n欢迎关注我的B站账号(uid：14642614)！\thttps://space.bilibili.com/14642614'
  )
  myToast.tip(
    `功能列表：\n1. [通过BV号来获取视频信息/本地读取视频信息JSON文件]: \n> 可以校验BV号，查看up主名、视频标题、总P数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间\n2. [观看进度百分比查询]: \n> 可以查询当前看了多少还剩余多少\n3. [模糊搜索分P视频列表符合的分P]: \n> 可以选择是否区分大小写\n4. [查询一个或多个分P的标题时长]: \n> 比如第2P或者第3P到第11P\n5. [计算一个或多个视频时长（X倍数播放|每日看X小时|每天看X个分P）]: \n> 比如预计每天看X个小时/每天看X集 可以看完多少P到多少P\n`
  )
  console.log('')
}

/**
 * 公共函数
 */
const utils = {
  /**
   * 得到一个两数之间的随机整数，包括两个数在内
   * @param {number} min
   * @param {number} max
   * @returns number 整数
   */
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
  },
  /**
   * 数组求和
   * @param {array} arr 一维数组或者二维数组 [1,2] || [[1,2],[1,2]]
   * @param {*} pos 二位数组中要计算的位数
   * @returns 累加值
   */
  sumArr(arr, pos) {
    if (arr.length > 0 && arr[0].length > 0) {
      // 二维数组
      return arr.reduce(function (accumulator, currentValue) {
        // 如果当前的值是
        if (isNaN(parseFloat(currentValue[pos]).toString())) {
          return accumulator
        }
        return accumulator + currentValue[pos]
      }, 0)
    } else if (arr.length > 0) {
      // 一维数组
      return arr.reduce(function (accumulator, currentValue) {
        // 如果当前的值是
        if (isNaN(parseFloat(currentValue).toString())) {
          return accumulator
        }
        return accumulator + currentValue
      }, 0)
    }
    return '被传递的参数不是数组'
  },
  /**
   * 求百分比
   * @param  num 当前数
   * @param  total 总数
   */
  getPercent(num, total) {
    num = parseFloat(num)
    total = parseFloat(total)
    if (isNaN(num) || isNaN(total)) {
      return '-'
    }
    return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0 + '%'
  },
  /**
   * 格式化日期，如月、日、时、分、秒保证为2位数
   * @param {number} n 要补位的日期数
   * @returns 11 , 01
   */
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 格式化时间
   * @param {number} number 毫秒时间戳
   * @param {string} format 需要转换成的日期格式
   * @returns
   */
  formatTime(number, format) {
    let time = new Date(number)
    let newArr = []
    let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
    newArr.push(time.getFullYear())
    newArr.push(this.formatNumber(time.getMonth() + 1))
    newArr.push(this.formatNumber(time.getDate()))

    newArr.push(this.formatNumber(time.getHours()))
    newArr.push(this.formatNumber(time.getMinutes()))
    newArr.push(this.formatNumber(time.getSeconds()))

    for (let i in newArr) {
      format = format.replace(formatArr[i], newArr[i])
    }
    return format
  },
  /**
   * 把秒格式化成天时分秒
   * @param {number} second 秒为单位的number 例如360秒就是6分钟
   * @param {boolean} isHandle 是否要处理
   * @returns 2天1小时10分49秒 ,49:10.49 , 05:10
   */
  formatSecond(second, isHandle) {
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
}

/**
 * 控制台输出提示
 */
const myToast = {
  success(msg) {
    console.log(
      `${chalk.white.bgGreen.italic(` SUCCESS `)} ${chalk.green.bold(`${msg}`)}`
    )
  },
  tip(msg) {
    console.log(
      `${chalk.white.bgMagenta.italic(` TIPS `)} ${chalk.magenta.bold(
        `${msg}`
      )}`
    )
  },
  error(msg) {
    console.log(
      `${chalk.white.bgRed.italic(` ERROR `)} ${chalk.red.bold(`${msg}`)}`
    )
  }
}

/**
 * 清屏函数
 */
const clear = () =>
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  )

/**
 * 提问
 * @param {array} questions 问题数组
 * @returns Promise
 */
const askQuestions = (questions) => inquirer.prompt(questions)

/**
 * 主程序入口
 */
async function main() {
  init()
  var isFirstRun = true
  var isFirstRunMode = true
  await firstRun(isFirstRun, isFirstRunMode)
}
main()

async function firstRun(isFirstRUN, isFirstRUNMODE) {
  if (!isFirstRUN) clear()
  else isFirstRUN = false
  const { isMainChoice } = await askQuestions([
    {
      name: 'isMainChoice',
      type: 'list',
      message: '主菜单',
      choices: ['[开始使用]', '[查看帮助]', '[退出]']
    }
  ])
  switch (isMainChoice) {
    case '[开始使用]':
      await chooseRunMode(isFirstRUNMODE)
      break
    case '[退出]':
      const a = true
      if (a) {
        myToast.success('即将退出！')
        process.exit(1)
      }
      break
    case '[查看帮助]':
      clear()
      myToast.tip(
        `功能列表：\n1. [通过BV号来获取视频信息/本地读取视频信息JSON文件]: \n> 可以校验BV号，查看up主名、视频标题、总P数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间\n2. [观看进度百分比查询]: \n> 可以查询当前看了多少还剩余多少\n3. [模糊搜索分P视频列表符合的分P]: \n> 可以选择是否区分大小写\n4. [查询一个或多个分P的标题时长]: \n> 比如第2P或者第3P到第11P\n5. [计算一个或多个视频时长（X倍数播放|每日看X小时|每天看X个分P）]: \n> 比如预计每天看X个小时/每天看X集 可以看完多少P到多少P\n`
      )
      const { isBack } = await askQuestions([
        {
          name: 'isBack',
          type: 'confirm',
          message: '返回？',
          default: true
        }
      ])
      isBack && (await firstRun(false))
      break
  }
}

/**
 * 选择运行模式-》网络获取或本地读取
 */
async function chooseRunMode(isFirstRunMode) {
  if (!isFirstRunMode) clear()
  try {
    myToast.tip(
      '如果选择的是通过本地的JSON文件来获取视频信息，请先访问https://api.bilibili.com/x/web-interface/view?bvid=你要查的BV号，再将网页内容保存成.json格式文件到当前目前下，本工具将会读取这个文件\n例如：https://api.bilibili.com/x/web-interface/view?bvid=BV1GL4y1v79M'
    )
    console.log('')
    const { isNeedNetwork } = await askQuestions([
      {
        name: 'isNeedNetwork',
        type: 'list',
        message: '请选择获取视频信息的方式?',
        choices: [
          '[通过BV号来获取视频信息]',
          '[通过本地的JSON文件来获取视频信息]',
          new inquirer.Separator('---'),
          '[返回]'
        ]
      }
    ])
    switch (isNeedNetwork) {
      case '[通过BV号来获取视频信息]':
        {
          const { inputBvid } = await askQuestions([
            {
              name: 'inputBvid',
              type: 'input',
              message: '请输入要查询的BV号(例:BV1GL4y1v79M)：',
              filter: function (val) {
                return val.trim()
              }
            }
          ])
          const bvReg =
            /[bB][vV][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/g
          if (bvReg.test(inputBvid)) {
            try {
              oRes = await getBiliVideoDesc(inputBvid)
              res = oRes.data.data
              extractResData = extractParseResFn(res)
            } catch (err) {
              myToast.error(
                '获取视频信息失败！请检查输入的BV号是否正确！请检查当前网络状态！'
              )
              console.log('')
              await chooseRunMode()
            }
          } else {
            myToast.error('BV号输入有误!请重新操作！')
            console.log('')
            await chooseRunMode(true)
          }
        }
        break

      case '[通过本地的JSON文件来获取视频信息]':
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
          myToast.success(
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
            extractResData = extractParseResFn(res)
          } catch (e) {
            myToast.error(`读取JSON文件失败！`)
            console.log('')
            await chooseRunMode(true)
          }
        }
        break
      case '[返回]':
        await firstRun()
        break
      default:
        myToast.error('输入有误，运行结束！')
        process.exit()
    }
    showVideoDesc(res, isNeedNetwork)
    await featureListFn(data, res, extractResData)
  } catch (e) {
    console.log(e)
  }
}

/**
 * 网络获取B站视频信息
 * @param {string} bvid BV号
 * @returns Promise
 */
async function getBiliVideoDesc(bvid) {
  return axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
}

/**
 * 功能列表入口
 * @param {*} data
 * @param {*} res
 * @param {*} extractResData
 */
async function featureListFn(data, res, extractResData) {
  const { doTarget } = await askQuestions([
    {
      name: 'doTarget',
      type: 'list',
      message: '请选择功能：',
      choices: [
        '[观看进度百分比查询]',
        '[模糊搜索分P视频列表符合的分P]',
        '[查询一个或多个分P的标题和时长]',
        '[计算一个或多个视频时长（X倍数播放|每日看X小时|每天看X个分P）]',
        new inquirer.Separator('---'),
        '[重新获取视频信息]',
        '[退出]',
        new inquirer.Separator('---')
      ]
    }
  ])

  await everyFeatureListFn(doTarget)
  console.log('')
  await featureListFn(data, res, extractResData)
  console.log('')
}

/**
 * 各个功能列表
 * @param {string} doTarget 功能列表返回的字符串答案
 */
async function everyFeatureListFn(doTarget) {
  switch (doTarget) {
    case '[查询一个或多个分P的标题和时长]':
      {
        myToast.tip(`当前视频的总P数：${extractResData.videos}`)
        const { isMultiple, searIdx1, endIdx1 } = await askQuestions([
          {
            name: 'isMultiple',
            type: 'confirm',
            message: `要查询多个吗？(Y/N)`,
            default: true
          },
          {
            name: 'searIdx1',
            type: 'input',
            message: `请输入开始的分P数(例：1)：`
          },
          {
            name: 'endIdx1',
            type: 'input',
            message: `请输入结束的分P数(例：${extractResData.videos})：`,
            when: function (answer) {
              return answer.isMultiple
            }
          }
        ])
        if (!isMultiple) {
          const searchRes = searchVideoTitleAndDuration(
            searIdx1 - 1,
            extractResData
          )
          if (searchRes) {
            console.log(
              `>\tP${searIdx1}  ${searchRes.name}  ${utils.formatSecond(
                searchRes.duration
              )}`
            )
          } else {
            return myToast.error('错误输入！')
          }
        } else {
          if (
            isNaN(searIdx1) ||
            isNaN(endIdx1) ||
            Number(searIdx1) < 0 ||
            Number(searIdx1) > Number(extractResData.videos) ||
            Number(endIdx1) < 0 ||
            Number(endIdx1) > Number(extractResData.videos)
          ) {
            return myToast.error(`输入与实际集数不符！`)
          }
          myToast.success(
            '将会按以下格式输出结果 =》 当前P数 标题 - 时间（大于等于1小时就显示小时）'
          )

          for (let i = searIdx1 - 1; i < endIdx1; i++) {
            let searchRes = searchVideoTitleAndDuration(i, extractResData)
            if (searchRes.name && searchRes.duration) {
              console.log(
                `>\tP${i + 1}  ${searchRes.name}  ${utils.formatSecond(
                  searchRes.duration
                )}`
              )
            } else {
              myToast.error('输入与实际集数不符！')
              break
            }
          }
        }
      }
      break
    case '[计算一个或多个视频时长（X倍数播放|每日看X小时|每天看X个分P）]':
      {
        myToast.tip(`当前视频的总P数：${extractResData.videos}`)
        const { startIdx, endIdx, pts } = await askQuestions([
          {
            name: 'startIdx',
            type: 'input',
            message: `请输入开始的分P数(例：1): `
          },
          {
            name: 'endIdx',
            type: 'input',
            message: `请输入结束的分P数(例：${extractResData.videos})：`
          },
          {
            name: 'pts',
            type: 'input',
            message: `请输入播放的倍数(例：2)：`
          }
        ])

        const ptsResult = setVideoPTS(pts, extractResData, startIdx, endIdx)
        if (ptsResult.computedDurationRes && ptsResult.newDuration) {
          myToast.success(
            `第${startIdx}集到第${endIdx}集的总时长为${utils.formatSecond(
              ptsResult.computedDurationRes
            )}`
          )
          myToast.success(
            `你将要${pts}倍数播放原时长为${utils.formatSecond(
              ptsResult.computedDurationRes
            )}视频,总需要${utils.formatSecond(ptsResult.newDuration)}`
          )
        } else return myToast.error('输入与实际集数不符！')

        console.log('')

        const { isComputed, inputType } = await askQuestions([
          {
            name: 'isComputed',
            type: 'confirm',
            message: '需要帮你计算吗？(Y/N)',
            default: true
          },
          {
            name: 'inputType',
            type: 'list',
            message: '你要以什么单位来计算？',
            choices: ['每天看N个小时', '每天看N个分P'],
            when: function (answer) {
              // 当watch为true的时候才会到达这步
              return answer.isComputed //只有我return true才会这个confirm
            }
          }
        ])
        if (isComputed) {
          switch (inputType) {
            case '每天看N个小时':
              {
                // 用于举例的时间
                const fakerEveryDayHour =
                  +ptsResult.newDuration / 18000 >= 1
                    ? utils.getRandomIntInclusive(1, 5)
                    : +ptsResult.newDuration / 3600 >= 1
                    ? 1
                    : ((0.00028 * ptsResult.newDuration) / 2).toFixed(2)
                const { everyDayHour } = await askQuestions([
                  {
                    name: 'everyDayHour',
                    type: 'input',
                    message: `你要每天看多少个小时(例：${fakerEveryDayHour})？`
                  }
                ])
                if (+everyDayHour < 1) {
                  myToast.tip(
                    `${everyDayHour}小时=${60 * everyDayHour}分钟=${
                      3600 * everyDayHour
                    }秒`
                  )
                }
                if (everyDayHour && everyDayHour <= 24) {
                  const template = `每天看${everyDayHour}个小时的话，将要看${(
                    (0.00028 * ptsResult.newDuration) /
                    everyDayHour
                  ).toFixed(3)}天`
                  myToast.success(template)
                } else myToast.error(`输入有误！`)
              }
              break
            case '每天看N个分P':
              {
                // 用于举例的N个分p
                const fakerEveryDayVideoNum =
                  endIdx > 2 ? Math.floor(+endIdx / 2) : 1
                const { everyDayVideoNum } = await askQuestions([
                  {
                    name: 'everyDayVideoNum',
                    type: 'input',
                    message: `你要每天看多少个分P(例：${fakerEveryDayVideoNum})？`
                  }
                ])

                everyDayVideoNum >= 1 &&
                everyDayVideoNum <= extractResData.videos
                  ? myToast.success(
                      `每天看${everyDayVideoNum}P的话，需要看${(
                        extractResData.videos / everyDayVideoNum
                      ).toFixed(3)}天`
                    )
                  : myToast.error(`输入有误！`)
              }
              break
          }
        } else {
          myToast.success('已为你跳过计算！')
        }
      }
      break
    case '[模糊搜索分P视频列表符合的分P]':
      {
        const firstPageName =
          extractResData.partArr && extractResData.partArr[0]
            ? extractResData.partArr[0].toString().slice(0, 5)
            : 'XXX'
        const { curSearchText, isCaseS } = await askQuestions([
          {
            name: 'curSearchText',
            type: 'input',
            message: `请输入要查找的标题(例：${firstPageName})：`
          },
          {
            name: 'isCaseS',
            type: 'confirm',
            message: `是否需要区分大小写？(Y/N)`,
            default: false
          }
        ])
        vagueSearchNameMainFn(curSearchText, isCaseS)
      }
      break
    case '[观看进度百分比查询]':
      {
        myToast.tip(`当前视频的总P数：${extractResData.videos}`)
        const { curReadProcessing } = await askQuestions([
          {
            name: 'curReadProcessing',
            type: 'number',
            message: `你现在看到哪个P啦？`
          }
        ])
        if (
          +curReadProcessing < 1 ||
          +curReadProcessing > +extractResData.videos
        ) {
          myToast.error('错误输入！')
        } else {
          const {
            hasWatchTimePer,
            restWatchTimePer,
            hasWatchPagesPer,
            restWatchPagesPer
          } = computedCurReadProcessing(extractResData, curReadProcessing)
          var ddd = +hasWatchTimePer.replace('%', '')
          if (ddd == 100) {
            myToast.success('真厉害！这么长，你都看完啦！？')
          } else {
            myToast.success(
              `这个分P视频总共要看${utils.formatSecond(
                extractResData.duration,
                true
              )}欸！你已看了${hasWatchTimePer}，还剩${restWatchTimePer}没看哦~${
                ddd > 50 ? '真厉害！你已经看这么多了！' : '加油！坚持就是胜利'
              }！`
            )
          }
          var eee = +hasWatchPagesPer.replace('%', '')
          if (eee == 100) {
            myToast.success('真厉害！这么多集，你都看完啦！？')
          } else {
            myToast.success(
              `这个分P视频总共有${
                extractResData.videos
              }集欸！你已看${hasWatchPagesPer}啦，还剩下${restWatchPagesPer}没看哦~${
                eee > 50 ? '真厉害！你已经看这么多了！' : '加油！坚持就是胜利！'
              }`
            )
          }
        }
      }
      break
    case '[退出]':
      const a = true
      if (a) {
        myToast.success('即将退出！')
        process.exit(1)
      }
      break
    case '[重新获取视频信息]':
      console.log('')
      await chooseRunMode()
      break
    default:
      myToast.error('选择有误')
      break
  }
}

/**
 * 提取解析的视频的信息
 * @param {object} data 要提取的视频信息对象
 * @returns  false|{title：标题，videos：总分P数 ，duration：总时长，partArr：各分P标题数组， durationArr：各分P时长数组}
 */
function extractParseResFn(data) {
  if (typeof data !== 'object') return false
  const { title, videos, duration, pages } = data
  return {
    title,
    videos,
    duration,
    partArr: Array.from(pages, (pages) => {
      return pages.part
    }),
    durationArr: Array.from(pages, (pages) => {
      return pages.duration
    })
  }
}

/**
 *  打印输出视频详情
 * @param {object} oData 要读取的视频信息对象
 * @param {boolean} isNeedNetwork 是否需要网络
 */
function showVideoDesc(oData, isNeedNetwork) {
  myToast.success(`成功读取到当前视频的信息!`)
  console.log('')
  const {
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
  const { view, coin, favorite, share, danmaku, like } = stat
  const url = 'https://www.bilibili.com/video/' + bvid
  const url1 = 'https://www.bilibili.com/video/av' + aid
  const url2 = 'https://space.bilibili.com/' + owner.mid
  const templateStr = `------ BV号：${bvid} (AV号：${aid}) ------\n> UP主：${
    owner.name
  }(uid:${
    owner.mid
  })\t${url2} \n> 标题：${title}\n> 总P数：${videos}\t总时长：${utils.formatSecond(
    duration
  )}\n> 视频描述：\n\t${desc}\n>${
    isNeedNetwork == '[通过本地的JSON文件来获取视频信息]'
      ? '(此类型数据不会自动更新)'
      : ''
  } 播放量：${view}  弹幕数：${danmaku}  分享数：${share}\t 点赞数：${like}  投币数：${coin}  收藏数：${favorite}\n> 分区：${tname}\n> 视频链接：${url}\n\t\t${url1}\n> 创建时间：${utils.formatTime(
    Number(String(ctime) + '000'),
    'Y年M月D日 h:m:s'
  )}\t发布时间：${utils.formatTime(
    Number(String(pubdate) + '000'),
    'Y年M月D日 h:m:s'
  )}\n------------------------------------------------\n`
  console.log(chalk.blue(templateStr))
}

/**
 * 查询某个分P的标题&时长
 * @param {number} idx 要查找的索引
 * @param {object} oData 要读取的视频信息对象
 * @returns false | {name：标题,duration：时长}
 */
function searchVideoTitleAndDuration(idx, oData) {
  return Number(idx) < 0 || Number(idx) > Number(oData.videos) || isNaN(idx)
    ? false
    : {
        name: oData.partArr[idx],
        duration: oData.durationArr[idx]
      }
}

/**
 * 倍数播放计算
 * @param {number} videoPTS 倍数
 * @param {object} oData 要读取的视频信息对象
 * @param {number} startIdx 开始集数
 * @param {number} endIdx 结束集数
 * @returns false 或者 {computedDurationRes：计算后的时长(秒)，newDuration:倍数播放的时长（秒）}
 */
function setVideoPTS(videoPTS, oData, startIdx = 0, endIdx) {
  const { videos } = oData
  if (
    isNaN(videoPTS) ||
    isNaN(startIdx) ||
    isNaN(endIdx) ||
    Number(videoPTS) < 0 ||
    Number(startIdx) < 1 ||
    Number(endIdx) < Number(startIdx) ||
    Number(endIdx) > videos
  )
    return false

  let computedDurationRes = 0

  for (let i = startIdx - 1; i < endIdx; i++) {
    computedDurationRes += oData.durationArr[i]
  }
  return {
    computedDurationRes,
    newDuration: computedDurationRes / videoPTS
  }
}
/**
 * 处理->通过标题模糊查询分P
 * @param {string} curSearchText 搜索文本
 * @param {boolean} isCaseSensitive 是否区分大小写
 * @returns
 */
function vagueSearchNameMainFn(curSearchText, isCaseSensitive) {
  const { searchIndexResArr, searchResArr, searchDurationResArr } =
    searchNameFn(extractResData, curSearchText, isCaseSensitive)
  let curSearchRes = ''
  if (searchIndexResArr.length > 0 && searchResArr.length > 0) {
    myToast.success(`\t查询到${searchResArr.length}条结果，结果如下：`)
    for (let i = 0; i < searchResArr.length; i++) {
      let template1 = `>\tP${searchIndexResArr[i]} ${
        searchResArr[i]
      } ${utils.formatSecond(searchDurationResArr[i])}`
      // console.log(template)
      curSearchRes += template1 + '\n'
    }
    console.log(curSearchRes)
  } else return myToast.error('未查找符合的分P！')
}

/**
 * 通过标题模糊查询分P
 * @param {object} oData 源数据
 * @param {string} searchText 搜索内容
 * @param {boolean} isCaseSensitive 是否区分大小写，如果为真就区分，为假就不区分
 * @returns false |{ searchIndexResArr：结果中分P对应的P数数组, searchResArr：结果中分P的标题数组, searchDurationResArr：结果中分P的时长数组 }
 */
function searchNameFn(oData, searchText, isCaseSensitive) {
  let searchIndexResArr = []
  let searchDurationResArr = []
  if (typeof searchText !== 'string' || typeof oData !== 'object') return false
  const { partArr, durationArr } = oData
  const searchResArr = partArr.filter((data, index) => {
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

/**
 * 观看进度百分比查询
 * @param {object} oData 源对象
 * @param {number} curReadProcessing 当前阅读的分P数
 * @returns false | { hasWatchTimePer: 已看时间百分比   restWatchTimePer：剩余时间百分比
    hasWatchPagesPer: 已看分P数百分比   restWatchPagesPer: 剩余分P数百分比}
 */
function computedCurReadProcessing(oData, curReadProcessing) {
  if (
    typeof oData != 'object' ||
    isNaN(curReadProcessing) ||
    +curReadProcessing > +oData.videos
  )
    return false
  const { videos, duration: allDuration, durationArr: allDurationArr } = oData
  const duration = utils.sumArr(allDurationArr.slice(0, curReadProcessing))
  return {
    hasWatchTimePer: utils.getPercent(duration, allDuration),
    restWatchTimePer: utils.getPercent(allDuration - duration, allDuration),
    hasWatchPagesPer: utils.getPercent(curReadProcessing, videos),
    restWatchPagesPer: utils.getPercent(videos - curReadProcessing, videos)
  }
}
