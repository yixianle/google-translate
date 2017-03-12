# google translate
项目采用koa2+react <br>
由于google translate api是收费的，故翻译模块用的是我另外一个项目
[translate-api](https://github.com/yixianle/translate-api) <br>
基于爬虫技术 抓取google翻译，实现了文本翻译和网页翻译。
### 在线地址
http://translate.hotcn.top/

<img alt="google translate" src="https://github.com/yixianle/google-translate/blob/master/public/demo.gif">
### 文本翻译
文本翻译是先计算出google token，以post方式调用翻译接口。相比不需要计算token的get方式，突破了最大请求2048字符的限制。<br/>
### 网页翻译
网页翻译是通过爬虫模拟google translate 翻译步骤
# 使用
```
# 安装依赖
npm install
# 开发环境运行
npm start
# 打包编译
npm run build
# 生成环境启动
npm run pm2
# console
npm run console
```
