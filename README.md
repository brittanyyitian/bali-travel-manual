# 巴厘岛空间旅行手册

一个可直接带着旅行用的巴厘岛空间行程网站原型。

## 本地运行

```bash
cd /Users/edy/bali-travel-manual
python3 -m http.server 5179
```

然后打开：

```text
http://127.0.0.1:5179
```

## 地图方案

当前版本默认不接 Google Maps API，也不需要付费 key。

页面中间显示 Travel OS 自绘空间路线图，并保留“打开导航”链接跳到 Google Maps 官方页面。

如果要加个人本地地图截图，把图片放在：

```text
/Users/edy/bali-travel-manual/assets/maps/day1.png
/Users/edy/bali-travel-manual/assets/maps/day2.png
...
```

刷新页面后，对应日期会自动显示截图；没有截图时继续显示自绘路线图。

## 功能

- 按 Ubud / Lovina / South 三阶段组织路线。
- 明确标记今天是玩、换城市还是恢复。
- 中间显示自绘空间路线图：每段距离、预计车程、为什么现在去。
- 右侧显示今天状态：总车程、疲劳、换酒店、跨区域、结束时间、下一站。
- Open-Meteo 获取当日核心区域天气；失败时显示雨天 Plan B。
- 根据人数实时计算 7 人包车分摊费用。
- 支持记录每日实际开支：项目、金额、付款人、分摊人数和备注，数据保存在本机浏览器。
