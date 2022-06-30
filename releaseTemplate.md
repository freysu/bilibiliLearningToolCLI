- 功能列表

  - [x] (new)设置功能
        可以设置是否显示功能提示、功能的默认值，减少操作量，免选择相关的对话框
  - [x] (new)检查更新
        可以检查当前版本是否为最新的，提示是否需要更新

- 下载地址  
  现已用<a href="https://www.npmjs.com/package/pkg">`pkg`</a>打包成可执行文件了，可以免安装 node 等任何依赖，不出意外的话可以直接运行！欢迎下载体验！
  **当前最新版本号为 v0.2.3**

  - **`Windows` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.3/bilibililearningtoolcli.v0.2.3-win.exe">`bilibililearningtoolcli.v0.2.3-win.exe`</a>**
  - **`Mac OS` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.3/bilibililearningtoolcli.v0.2.3-macos">`bilibililearningtoolcli.v0.2.3-macos `</a>**
  - **`Linux` 的用户请下载 <a href="https://github.com/freysu/bilibiliLearningToolCLI/releases/download/v0.2.3/bilibililearningtoolcli.v0.2.3-linux">`bilibililearningtoolcli.v0.2.3-linux`</a>**

## 开发记录

- bug

1. 在设置的每个单独的功能页先打印当前所有相关的存储信息，然后还要加个退出和返回

- 任务

1. 修改默认值的地方 第一次运行的时候先恢复 询问是否要为以后设成默认值
   第一次运行的时候想先标记用户 然后如果确定或者进去设置就设成默认值 Y
2. 优化布局 Y/2
3. 用户系统 leancloud uuid ctime uptime 运行次数 Y
4. 每日推送软件运行状态 N
