<div align="center">
    <h1>B站分 P 视频信息助手(bilibiliLearningToolCLI)</h1>
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
        <a href="https://wakatime.com/badge/user/0f30e30e-f3f5-49fc-98da-0aa8c0aa6042/project/2d841a77-cb58-4a91-889e-1217170a5bd3">
            <img src="https://wakatime.com/badge/user/0f30e30e-f3f5-49fc-98da-0aa8c0aa6042/project/2d841a77-cb58-4a91-889e-1217170a5bd3.svg" alt="wakatime">
        </a>
        <a href="https://wakatime.com/badge/user/0f30e30e-f3f5-49fc-98da-0aa8c0aa6042/project/d0979b6d-27f2-4b02-9a5f-ad9d2e900a07">
            <img src="https://wakatime.com/badge/user/0f30e30e-f3f5-49fc-98da-0aa8c0aa6042/project/d0979b6d-27f2-4b02-9a5f-ad9d2e900a07.svg" alt="wakatime">
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
  **这是一个基于 Node.js 的 B 站分 P 视频时长统计的命令行工具。**  
  _目前只在 Windows 系统测试，其他系统没设备可以测试。欢迎大家帮忙在 Mac OS 系统 或者 Linux 系统测试_  
  _在此给没有用过的或者不常用 B 站的小伙伴简单地说一下，**P 数就类似于集数**_
- 关键词  
  分 P 狂魔、分 P、学习、网课、教程、电视剧
- 使用场景
  1. 查询视频信息，只用知道 BV 号就能知道以下信息
     查看 up 主名、视频标题、总 P 数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间
     > 其实不仅可以用到分 P 视频，其他类型视频也是通用的，所以想查当前的弹幕、分享、点赞、投币、收藏数都是可以的，用代码提取出来就看你怎么用了
  2. 学了多少？还剩下多少？多久就能学完？
  3. 花 X 倍数看完这么多 P 要多久？如果每天看 X 个分 P 的话又要多久能看完呢？那每天看 X 个小时的话又要多久能看完呢？
  4. 我现在学到的那个分 P 视频的标题是什么？
  5. P 数太多了，找想要的 P 要花很长时间，有没有工具能帮我快速筛选出要找的 P 呢

- 下载地址  
  现已用<a href="https://www.npmjs.com/package/pkg">`pkg`</a>打包成可执行文件了，可以免安装 node 等任何依赖，不出意外的话可以直接运行！欢迎下载体验！
  **当前最新版本号为 v0.2.4**

  - **`Windows` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.4/bilibililearningtoolcli.v0.2.4-win.exe">`bilibililearningtoolcli.v0.2.4-win.exe`</a>**
  - **`Mac OS` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.4/bilibililearningtoolcli.v0.2.4-macos">`bilibililearningtoolcli.v0.2.4-macos `</a>**
  - **`Linux` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.4/bilibililearningtoolcli.v0.2.4-linux">`bilibililearningtoolcli.v0.2.4-linux`</a>**

- 使用到的模块

  - 需要安装的
    <a href="https://www.npmjs.com/package/axios">`axios`</a>、<a href="https://www.npmjs.com/package/chalk">`chalk`</a>、<a href="https://www.npmjs.com/package/figlet">`figlet`</a>、<a href="https://www.npmjs.com/package/inquirer">`inquirer `</a>
  - node 自带的
    `fs`、`path`、`url`

- 功能列表
  - [x] 通过 BV 号来获取视频信息/本地读取视频信息 JSON 文件
  - [x] 观看进度百分比查询
  - [x] 模糊搜索分 P 视频列表符合的分 P
  - [x] 查询一个或多个分 P 的标题时长
  - [x] 计算一个或多个视频时长（X 倍数播放\|每日看 X 小时\|每天看 X 个分 P）
  - [x] 设置功能
  - [x] 检查更新

### 功能详情

1.  初始界面
    ![initui.png](https://s2.loli.net/2022/07/03/PvwOhNx653lCUmI.png)
2.  获取视频信息
    可以校验 BV 号，查看 up 主名、视频标题、总 P 数、总时长、简介、播放量、弹幕数、分享数、点赞数、投币数、收藏数、所属分区、视频地址、创建时间、发布时间
    ![getvideo.jpg](https://s2.loli.net/2022/07/03/t3OKEzdfFR7JLUu.jpg)
3.  观看进度百分比查询
    可以查询当前看了多少还剩余多少
    ![watchper.png](https://s2.loli.net/2022/07/03/fsVXJKcURnQeld1.png)
4.  模糊查询视频列表符合的分 P
    可以选择是否区分大小写
    ![vq.jpg](https://s2.loli.net/2022/07/03/iKBevgnN5TDSx9j.jpg)
5.  查询一个或多个分 P 的标题时长
    比如第 2P 到第 11P
    ![smoreorsingle.jpg](https://s2.loli.net/2022/07/03/rdKoXy63CxTfbOI.jpg)
6.  计算一个或多个视频时长-
    比如预计每天看 X 个小时/每天看 X 集 可以看完多少 P 到多少 P
    ![computed.jpg](https://s2.loli.net/2022/07/03/SN5dEKiJLtkyApf.jpg)
7.  检查更新
    可以检查当前版本是否为最新的，提示是否需要更新
    ![checkUpdate.png](https://s2.loli.net/2022/07/03/fA9PcFdXrUW2K5Y.png)
8.  设置功能
    可以设置是否显示功能提示、功能的默认值，减少操作量，免选择相关的对话框
    ![settings.jpg](https://s2.loli.net/2022/07/03/pJF3RjcHeuCbBym.jpg)
    - 基本设置如下：  
      |index | value |
      |----|---- |
      |运行前是否默认"检查更新"| '否' |
      | 当成功获取到视频时，是否默认显示"视频信息" | '是' |
      | 视频信息的"字体颜色的 HEX 值" | '#57b5c1' |
      | 是否默认显示"主界面的提示" | '是' |
      | 是否默认显示"观看进度百分比查询功能"的说明 | '是' |
      | 是否默认显示"模糊搜索功能"的说明 | '是' |
      | 在模糊搜索功能中是否默认"区分大小写" | '否' |
      | 是否默认显示"查询标题时长功能"的说明 | '是' |
      | 在查询标题时长功能中是否默认"查询多个" | '否' |
      | 是否默认显示"计算功能"的说明 | '是' |
      | 在计算功能中是否默认"开启预计功能" | '否' |
      | 预计功能的"默认单位" | '每天看 X 个小时'|

## 快速开始

1. **如果没有安装过 node，请先去官网下载最新版的再安装！安装了的话，跳过这一步。**

1. 克隆或者 fork 本项目，然后下载下来，打开终端进入文件夹，输入以下命令：
   npm 用户

   ```shell
   npm install
   #or
   npm install --save axios@0.27.2 chalk@4.1.2 figlet@1.5.2 inquirer@7.3.3
   ```

   yarn 用户

   ```shell
   yarn
   #or
   yarn add axios@0.27.2 chalk@4.1.2 figlet@1.5.2 inquirer@7.3.3
   ```

1. 等安装好模块后，继续输入以下命令：
   ```shell
   node index.js
   ```
1. 在终端中看提示进行操作。
   如果不联网，请先访问`https://api.bilibili.com/x/web-interface/view?bvid=你要查的BV号`，将网页内容保存成.json 格式文件到当前目前下，然后本工具将会读取它。  
   例如：我要查的视频的 BV 号是 `BV1hZ4y1b7SN`，那么就访问这个链接 `https://api.bilibili.com/x/web-interface/view?bvid=BV1hZ4y1b7SN`

## 常见问题 QA

欢迎 Star 本项目！  
欢迎关注我的 B 站账号！<a href="https://space.bilibili.com/14642614">https://space.bilibili.com/14642614</a>  
若有使用不明白的话，你可以在 B 站私信我！<a href="https://space.bilibili.com/14642614">(uid：14642614)</a>  
你也可以加 QQ 交流群(群号：1537505888)！<a href="https://sourl.cn/hNKSgk">https://sourl.cn/hNKSgk</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=freysu/bilibiliLearningToolCLI&type=Date)](https://star-history.com/#freysu/bilibiliLearningToolCLI&Date)
