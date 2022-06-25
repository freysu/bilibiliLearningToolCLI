<div align="center">
    <h1>B站合集视频信息助手(Node.js版)(bilibiliLearningToolCLI)</h1>
    <div>
        <a href="https://www.npmjs.com/package/axios">
            <img src="https://raster.shields.io/badge/axios-0.27.2-red.svg" />
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
  **这是一个基于 Node.js 的 B 站分 P 视频时长统计的命令行工具。目前只在 Windows 系统测试，其他系统暂时没测试。**

- 使用到的模块：

  - 需要安装的
    <a href="https://www.npmjs.com/package/axios">`axios`</a>、<a href="https://www.npmjs.com/package/chalk">`chalk`</a>、<a href="https://www.npmjs.com/package/figlet">`figlet`</a>、<a href="https://www.npmjs.com/package/inquirer">`inquirer `</a>
  - node 自带的
    `fs`、`path`、`url`

- 功能列表

  - [x] 网络获取视频信息/本地读取视频信息 JSON 文件  
         可以校验 BV 号，查看 up 主名、视频标题、总 P 数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间
  - [x] 查询某个分 P 的标题&时长  
         比如第 2P
  - [x] 统计一个或多个视频时长  
         比如预计每天看 X 个小时/每天看 X 集 可以看完多少 P 到多少 P
  - [x] 查询多个分 P 的标题&时长  
         比如第 2P 到第 11P
  - [x] 模糊查询视频列表中符合的分 P  
         可以选择是否区分大小写

## 预览截图

- 初始界面
  ![初始界面.png](https://s2.loli.net/2022/06/25/vco9MlDpb1KadfV.png)
- 网络获取视频信息
  ![网络获取视频信息.png](https://s2.loli.net/2022/06/25/mwpThRqGEyzobjZ.png)
- 本地读取视频信息
  ![本地读取视频信息.png](https://s2.loli.net/2022/06/25/MLuIydD83q1fTlP.png)
- 查询某个分 P 的标题&时长
  ![查询某个分P的标题&时长.png](https://s2.loli.net/2022/06/25/j4F8MuPBl2tV3c1.png)
- 查询各个(多个)分 P 的标题&时长
  ![查询各个分P的标题&时长.png](https://s2.loli.net/2022/06/25/oID9WkQaOTnNMqP.png)
- 统计一个或多个视频时长-每天看 N 集
  ![统计一个或多个视频时长-每天看N集.png](https://s2.loli.net/2022/06/25/rjPHClgGtWQyX1e.png)
- 统计一个或多个视频时长-每天 N 小时
  ![统计一个或多个视频时长-每天N小时.png](https://s2.loli.net/2022/06/25/K2AIBn4LHtuOMYi.png)
- 模糊查询视频列表符合的分 P-区分大小写
  ![模糊查询视频列表符合的分P-区分大小写.png](https://s2.loli.net/2022/06/25/Dc7SrGfPoQk8jeb.png)
- 模糊查询视频列表符合的分 P-不区分大小写
  ![模糊查询视频列表符合的分P-不区分大小写.png](https://s2.loli.net/2022/06/25/Ii6VQBjlcde37au.png)

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
