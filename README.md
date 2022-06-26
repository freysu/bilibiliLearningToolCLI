<div align="center">
    <h1>B站分 P 视频信息助手(Node.js 版)(bilibiliLearningToolCLI)</h1>
    <div>
        <a href="https://www.npmjs.com/package/axios">
            <img src="https://raster.shields.io/badge/axios-0.27.2-brightgreen.svg" />
        </a>
        <a href="https://www.npmjs.com/package/chalk">
            <img src="https://raster.shields.io/badge/chalk-5.0.1-brightgreen.svg" />
        </a>
        <a href="https://www.npmjs.com/package/figlet">
            <img src="https://raster.shields.io/badge/figlet-1.5.2-brightgreen.svg" />
        </a>
        <a href="https://www.npmjs.com/package/inquirer">
            <img src="https://raster.shields.io/badge/inquirer-9.0.0-brightgreen.svg" />
        </a>
        <a href="https://www.npmjs.com/package/pkg">
            <img src="https://raster.shields.io/badge/pkg-5.7.0-brightgreen.svg" />
        </a>
    </div>
    <div>
        <a href="https://github.com/freysu/bilibiliLearningToolCLI">
            <img title="GitHub forks" src="https://img.shields.io/github/forks/freysu/bilibiliLearningToolCLI.svg?style=social" />
        </a>
        <a href="https://github.com/freysu/bilibiliLearningToolCLI">
            <img title="GitHub stars" src="https://img.shields.io/github/stars/freysu/bilibiliLearningToolCLI.svg?style=social" />
        </a>
        <a href="https://github.com/freysu/bilibiliLearningToolCLI">
            <img title="GitHub watchers"
                src="https://img.shields.io/github/watchers/freysu/bilibiliLearningToolCLI.svg?style=social" />
        </a>
    </div>
</div>

---

## 项目介绍

- 项目概况  
  **这是一个基于 Node.js 的 B 站分 P 视频时长统计的命令行工具。**_目前只在 Windows 系统测试，其他系统没设备可以测试。欢迎大家帮忙在 Mac OS 或者 Linux 系统测试。_

- 下载地址：
  **现已用<a href="https://www.npmjs.com/package/pkg">`pkg`</a>打包成可执行文件了，可以免安装 node 等任何依赖，欢迎下载体验。**

  - **`Windows` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.0/bilibililearningtool.v0.2.0-win.exe">`bilibililearningtool.v0.2.0-win.exe`</a>**
  - **`Mac OS` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.0/bilibililearningtool.v0.2.0-macos">`bilibililearningtool.v0.2.0-macos `</a>**
  - **`Linux` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.0/bilibililearningtool.v0.2.0-linux">`bilibililearningtool.v0.2.0-linux`</a>**

- 使用到的模块：

  - 需要安装的
    <a href="https://www.npmjs.com/package/axios">`axios`</a>、<a href="https://www.npmjs.com/package/chalk">`chalk`</a>、<a href="https://www.npmjs.com/package/figlet">`figlet`</a>、<a href="https://www.npmjs.com/package/inquirer">`inquirer `</a>
  - node 自带的
    `fs`、`path`、`url`

- 功能列表

  - [x] 通过 BV 号来获取视频信息/本地读取视频信息 JSON 文件  
         可以校验 BV 号，查看 up 主名、视频标题、总 P 数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间
  - [x] 观看进度百分比查询  
         可以查询当前看了多少还剩余多少
  - [x] 模糊搜索分 P 视频列表符合的分 P  
         可以选择是否区分大小写
  - [x] 查询一个或多个分 P 的标题时长  
         比如第 2P 到第 11P
  - [x] 计算一个或多个视频时长（X 倍数播放|每日看 X 小时|每天看 X 个分 P）  
         比如预计每天看 X 个小时/每天看 X 集 可以看完多少 P 到多少 P

## 预览截图

- 初始界面
  ![initui.png](https://s2.loli.net/2022/06/27/v8CmQFR3lfJKbS1.png)
- 通过 BV 号来获取视频信息
  ![bvsearch.png](https://s2.loli.net/2022/06/27/NAeImzcRlr6Yuqn.png)
- 本地读取视频信息 JSON 文件
  ![localjson.png](https://s2.loli.net/2022/06/27/MQnT92oPlIE1z4G.png)
- 观看进度百分比查询
  ![watchper.png](https://s2.loli.net/2022/06/27/G3wyDkQPjKWlb65.png)
- 模糊查询视频列表符合的分 P-区分大小写
  ![vqcase.png](https://s2.loli.net/2022/06/27/57PNk3nUoAWhaFi.png)
- 模糊查询视频列表符合的分 P-不区分大小写
  ![vqnocase.png](https://s2.loli.net/2022/06/27/4KHN3RqrWyGaUt2.png)
- 查询一个分 P 的标题时长
  ![ssingle.png](https://s2.loli.net/2022/06/27/GVxR2BN4eJu9dkh.png)
- 查询多个分 P 的标题时长
  ![smore.png](https://s2.loli.net/2022/06/27/4klzQKwH31nVt2u.png)
- 计算一个或多个视频时长-每天看 N 个分 P
  ![cnp.png](https://s2.loli.net/2022/06/27/YzogwQ3m2CxRE1A.png)
- 计算一个或多个视频时长-每天看 N 个小时
  ![cnh.png](https://s2.loli.net/2022/06/27/8Sog1npIrHFuxh3.png)

## 快速开始

1. **如果没有安装过 node，请先去官网下载最新版的再安装！安装了的话，跳过这一步。**

1. 克隆或者 fork 本项目，然后下载下来，打开终端进入文件夹，输入以下命令：  
    npm 用户：
   ```
   npm install
   ```
   yarn 用户：
   ```
   yarn
   ```
1. 等安装好模块后，继续输入以下命令：
   ```
   node index.js
   ```
1. 在终端中看提示进行操作。
   如果不联网，请先访问`https://api.bilibili.com/x/web-interface/view?bvid=你要查的BV号`，将网页内容保存成.json 格式文件到当前目前下，然后本工具将会读取它。  
   例如：https://api.bilibili.com/x/web-interface/view?bvid=BV1GL4y1v79M

## 常见问题 QA：

欢迎关注我的 B 站账号！欢迎 star 本项目！若有使用不明白的话可以在 B 站私信我！<a href="https://space.bilibili.com/14642614">(uid：14642614)</a>  
<a href="https://space.bilibili.com/14642614">https://space.bilibili.com/14642614</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=freysu/bilibiliLearningToolCLI&type=Date)](https://star-history.com/#freysu/bilibiliLearningToolCLI&Date)
