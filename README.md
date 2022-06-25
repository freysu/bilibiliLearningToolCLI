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
  **这是一个基于 Node.js 的 B 站分 P 视频时长统计的命令行工具。目前只在Windows系统测试，其他系统暂时没测试。**

  用到的模块： `axios`、`chalk`、`figlet`、`inquirer `

- 项目演示动图：  
   

## 快速开始
1. **如果没有安装过node，请先去官网下载最新版的再安装！安装了的话，跳过这一步。**

1. 克隆或者fork本项目，然后下载下来，打开终端进入文件夹，输入以下命令：
    npm用户：
    ```
   npm install
   ``` 
    yarn用户：
   ```
   yarn
   ```
1. 等安装好模块后，继续输入以下命令：
    ```
    node index.js
    ```
1. 在终端中看提示进行操作。
    如果不联网，请先访问`https://api.bilibili.com/x/web-interface/view?bvid=你要查的BV号`，将网页内容保存成.json格式文件到当前目前下，然后本工具将会读取它。
    例如：https://api.bilibili.com/x/web-interface/view?bvid=BV1GL4y1v79M

## 功能列表

- [x] 网络获取视频信息/本地读取视频信息JSON文件
    可以校验BV号，查看up主名、视频标题、总P数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间
- [x] 查询某个分P的标题&时长
    比如第2P
- [X] 统计一个或多个视频时长
    比如预计每天看X个小时/每天看X集 可以看完多少P到多少P
- [x] 查询多个分P的标题&时长
    比如第2P到第11P
- [x] 模糊查询视频列表中符合的分P
    可以选择是否区分大小写

## 预览截图
暂无，后续会加

## 常见问题 QA：
欢迎关注我的B站账号！欢迎star本项目！若有使用不明白的话可以在B站私信我！<a href="https://space.bilibili.com/14642614">(uid：14642614)</a>  
<a href="https://space.bilibili.com/14642614">https://space.bilibili.com/14642614</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=freysu/bilibiliLearningToolCLI&type=Date)](https://star-history.com/#freysu/bilibiliLearningToolCLI&Date)
