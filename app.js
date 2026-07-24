const manual = window.BALI_MANUAL;
const LOCALE_KEY = "bali-manual-locale";

function readInitialLocale() {
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    return saved === "en" ? "en" : "zh";
  } catch (error) {
    return "zh";
  }
}

const state = {
  activeDayId: manual.travelOS?.dayPlans?.day5 ? "day5" : manual.days[0]?.id || "day1",
  selectedRouteIndex: 1,
  routeSelectionTouched: false,
  locale: readInitialLocale(),
};

const els = {
  languageToggle: document.getElementById("languageToggle"),
  overviewPanel: document.getElementById("overviewPanel"),
  phasePanel: document.getElementById("phasePanel"),
  routeHeader: document.getElementById("routeHeader"),
  routeMapSlot: document.getElementById("routeMapSlot"),
  spatialRoute: document.getElementById("spatialRoute"),
  todayStatus: document.getElementById("todayStatus"),
  budgetPanel: document.getElementById("budgetPanel"),
  toast: document.getElementById("toast"),
};

const EN_TEXT = {
  "巴厘岛路线手册": "Bali Route Manual",
  "行程总览": "Trip Overview",
  "8 天 7 晚 · 巴厘岛 + 东爪哇": "8 days, 7 nights · Bali + East Java",
  "每日行程": "Daily Itinerary",
  "总里程约 720km": "Approx. 720 km total",
  "车船约 27h": "Approx. 27h by car + ferry",
  "目的地概览": "Destination Overview",
  "巴厘岛空间总览": "Bali route overview",
  "南部 Nusa Dua": "South Bali · Nusa Dua",
  "D0-D2 海边": "D0-D2 by the beach",
  "落地直睡 + 南部 + 佩尼达": "Arrive, rest, South Coast, Penida",
  "中部 Ubud": "Central Bali · Ubud",
  "D3 一晚": "D3 one night",
  "北部 Lovina": "North Bali · Lovina",
  "D4-D5 海豚": "D4-D5 dolphins",
  "漂流后北上": "Head north after rafting",
  "跨岛 Bromo": "Cross-island to Bromo",
  "D5-D6 跟团": "D5-D6 guided tour",
  "车 + 轮渡 + 火山": "Car, ferry, volcano",
  "泗水 Surabaya": "Surabaya",
  "D6-D7 收尾": "D6-D7 wrap-up",
  "向导送达 + 早班机": "Guide drop-off + morning flight",
  "D0 抵达": "D0 Arrival",
  "D1 南部": "D1 South Coast",
  "D2 佩尼达": "D2 Penida",
  "D3 乌布": "D3 Ubud",
  "D4 Lovina": "D4 Lovina",
  "D5 海豚": "D5 Dolphins",
  "D5 跨岛": "D5 Crossing",
  "D6 Bromo": "D6 Bromo",
  "D7 返程": "D7 Departure",

  "武汉抵达 Nusa Dua": "Wuhan to Nusa Dua",
  "南部经典海岸线": "South Coast classics",
  "佩尼达浮潜 + 恐龙湾": "Penida snorkeling + Kelingking",
  "去乌布 + ATV + SPA": "To Ubud + ATV + spa",
  "漂流 → Lovina": "Rafting to Lovina",
  "海豚 + 跟团跨岛去 Bromo": "Dolphins + guided crossing to Bromo",
  "跟团跨岛去 Bromo": "guided crossing to Bromo",
  "Bromo 团": "Bromo tour",
  "Bromo 火山": "Mount Bromo",
  "Bromo 酒店": "Bromo hotel",
  "Lovina 海豚出海": "Lovina dolphin trip",
  "Bromo 山下酒店": "Bromo hotel",
  "Gilimanuk 码头": "Gilimanuk ferry port",
  "Ketapang 码头": "Ketapang ferry port",
  "Bromo 火山 → 泗水": "Bromo to Surabaya",
  "泗水 → 武汉": "Surabaya to Wuhan",
  "9/29｜武汉 → Nusa Dua": "Sep 29 | Wuhan to Nusa Dua",
  "9/30｜南部经典海岸线": "Sep 30 | South Coast classics",
  "10/1｜佩尼达浮潜": "Oct 1 | Nusa Penida snorkeling",
  "10/2｜去乌布 + ATV": "Oct 2 | To Ubud + ATV",
  "10/3｜漂流 → Lovina": "Oct 3 | Rafting to Lovina",
  "10/4｜海豚 + Bromo 团": "Oct 4 | Dolphins + Bromo tour",
  "10/5｜Bromo → 泗水": "Oct 5 | Bromo to Surabaya",
  "10/6｜泗水 → 武汉": "Oct 6 | Surabaya to Wuhan",
  "抵达海边": "Beach arrival",
  "南部海岸": "South Coast",
  "佩尼达": "Nusa Penida",
  "乌布": "Ubud",
  "北上": "Northbound",
  "跨岛跟团": "Guided crossing",
  "返程": "Departure",
  "换酒店": "Change hotel",
  "不换酒店": "Same hotel",

  "巴厘岛机场 → Nusa Dua 酒店": "DPS Airport → Nusa Dua Hotel",
  "Nusa Dua → Melasti → Padang Padang → Uluwatu → Jimbaran → Nusa Dua": "Nusa Dua → Melasti → Padang Padang → Uluwatu → Jimbaran → Nusa Dua",
  "Nusa Dua → Sanur 码头 → Manta Bay → Crystal Bay → Gamat Bay → Kelingking → Nusa Dua": "Nusa Dua → Sanur Harbor → Manta Bay → Crystal Bay → Gamat Bay → Kelingking → Nusa Dua",
  "Nusa Dua → 乌布酒店 → ATV → SPA → 乌布酒店": "Nusa Dua → Ubud hotel → ATV → spa → Ubud hotel",
  "乌布酒店 → 阿勇河漂流 → 自由休息 → Lovina": "Ubud hotel → Ayung River rafting → easy break → Lovina",
  "Lovina → 海豚 → Gilimanuk → 轮渡 → Ketapang → Bromo": "Lovina → dolphins → Gilimanuk → ferry → Ketapang → Bromo",
  "Bromo 酒店 → 日出观景台 → 黑沙海 → 火山口 → 泗水酒店": "Bromo hotel → sunrise viewpoint → Sea of Sand → crater → Surabaya hotel",
  "泗水酒店 → 泗水机场 → 武汉": "Surabaya hotel → Surabaya Airport → Wuhan",

  "巴厘岛机场": "DPS Airport",
  "Nusa Dua 酒店": "Nusa Dua Hotel",
  "回 Nusa Dua 酒店": "Back to Nusa Dua Hotel",
  "Melasti Beach": "Melasti Beach",
  "Padang Padang": "Padang Padang",
  "Single Fin": "Single Fin",
  "乌鲁瓦图神庙": "Uluwatu Temple",
  "Kecak 火舞": "Kecak Fire Dance",
  "Jimbaran 海鲜晚餐": "Jimbaran seafood dinner",
  "Sanur 码头": "Sanur Harbor",
  "佩尼达码头": "Nusa Penida Harbor",
  "Manta Bay 蝠鲼湾": "Manta Bay",
  "Crystal Bay 水晶湾": "Crystal Bay",
  "Gamat Bay 加马特湾": "Gamat Bay",
  "返回码头 / 午餐": "Back to harbor / lunch",
  "Kelingking 恐龙湾": "Kelingking Viewpoint",
  "返回佩尼达码头": "Back to Nusa Penida Harbor",
  "快船回 Sanur": "Fast boat to Sanur",
  "Nusa Dua 退房": "Check out from Nusa Dua",
  "乌布酒店 / 放行李": "Ubud hotel / drop bags",
  "ATV 丛林越野": "Ubud jungle ATV",
  "乌布午餐 / 洗漱": "Ubud lunch / clean up",
  "乌布 SPA": "Ubud spa",
  "乌布晚餐": "Ubud dinner",
  "回乌布酒店": "Back to Ubud hotel",
  "乌布退房": "Check out from Ubud",
  "阿勇河漂流": "Ayung River rafting",
  "漂流后午餐 / 洗漱": "Post-rafting lunch / clean up",
  "取行李 / 自由休息": "Bags / easy break",
  "Lovina 酒店": "Lovina Hotel",
  "Lovina 海豚出海": "Lovina dolphin boat",
  "回酒店早餐 / 退房": "Breakfast back at hotel / check out",
  "Bromo 旅游团接人": "Bromo tour pickup",
  "Gilimanuk 码头": "Gilimanuk ferry terminal",
  "Ketapang 码头": "Ketapang ferry terminal",
  "Bromo 山下酒店": "Bromo base hotel",
  "日出观景台": "Bromo sunrise viewpoint",
  "黑沙海": "Sea of Sand",
  "Bromo 火山口": "Mount Bromo crater",
  "回酒店早餐 / 洗澡 / 退房": "Back to hotel / breakfast / shower / check out",
  "泗水酒店": "Surabaya hotel",
  "泗水晚餐": "Surabaya dinner",
  "泗水机场": "Surabaya Airport",

  "机场": "Airport",
  "酒店": "Hotel",
  "Uluwatu": "Uluwatu",
  "火舞": "Kecak",
  "海鲜": "Seafood",
  "码头": "Harbor",
  "上岛": "Arrive on Penida",
  "Manta Bay": "Manta Bay",
  "水晶湾": "Crystal Bay",
  "Gamat Bay": "Gamat Bay",
  "午餐": "Lunch",
  "恐龙湾": "Kelingking",
  "回码头": "Back to harbor",
  "回船": "Return boat",
  "Nusa Dua": "Nusa Dua",
  "ATV": "ATV",
  "SPA": "Spa",
  "漂流": "Rafting",
  "休息": "Break",
  "Lovina": "Lovina",
  "海豚": "Dolphins",
  "早餐": "Breakfast",
  "接人": "Pickup",
  "轮渡": "Ferry",
  "爪哇": "Java",
  "Bromo": "Bromo",
  "日出": "Sunrise",
  "火山口": "Crater",
  "泗水": "Surabaya",
  "晚餐": "Dinner",

  "到达": "Arrive",
  "Arrive": "Time",
  "今天活动范围": "Today's Activity Area",
  "今日亮点": "Today's Highlight",
  "今天晴朗": "Clear today",
  "导航": "Navigate",
  "第": "Stop",
  "站": "",
  "最佳时间": "Best time",
  "停留": "Stay",
  "下一段交通": "Next transfer",
  "门票": "Ticket",
  "预约": "Booking",
  "今天结束": "Done for today",
  "今天判断": "Today Check",
  "总车程": "Transit time",
  "预计结束": "Expected finish",
  "行程强度": "Pace",
  "换酒店": "Hotel change",
  "结束后": "After this",
  "出行提醒": "Travel Notes",
  "门票 / 预约": "Tickets / Bookings",
  "无必买": "Nothing urgent",
  "今天没有特殊提醒，按路线节奏走就好。": "No special notes today. Just follow the pace.",
  "今天不用提前处理门票，按路线走就行。": "No advance tickets needed today. Just follow the route.",
  "是": "Yes",
  "否": "No",
  "轻松": "Easy",
  "正常": "Balanced",
  "偏累": "A bit packed",
  "很累": "Very packed",
  "必做": "Must",
  "注意": "Note",
  "携带": "Pack",
  "风俗": "Culture",
  "安全": "Safety",
  "提醒": "Note",

  "入境 / 取行李": "Immigration + bags",
  "落地后": "Arrival",
  "凌晨": "Late arrival",
  "入住睡觉": "Check in",
  "到店即睡": "Straight to bed",
  "出发": "Depart",
  "上午": "Morning",
  "上午慢一点": "Easy morning",
  "午后": "Early afternoon",
  "下午": "Afternoon",
  "下午前": "Early afternoon",
  "傍晚": "Early evening",
  "晚上": "Evening",
  "日落前": "Before sunset",
  "日落场": "Sunset show",
  "19:30 后": "After 19:30",
  "18:00 后": "After 18:00",
  "办理登船": "Boat check-in",
  "直接上浮潜船": "Board snorkeling boat",
  "早上": "Morning",
  "候船": "Wait for boat",
  "下船": "Disembark",
  "中午前": "Before noon",
  "中午场": "Midday slot",
  "ATV 后": "After ATV",
  "早点睡": "Sleep early",
  "上午场": "Morning slot",
  "午后早场": "Early afternoon slot",
  "放行李": "Drop bags",
  "入住早睡": "Check in and sleep early",
  "清晨": "Early morning",
  "上车": "Get in the car",
  "按团单": "Per tour voucher",
  "下船转车": "Disembark and switch to car",
  "Jeep 出发": "Jeep departure",
  "日出后": "After sunrise",
  "入住": "Check in",
  "按航班倒推": "Work back from flight time",
  "值机 / 安检": "Check-in / security",
  "提前到达": "Arrive early",
  "航班前": "Before flight",

  "机场动线": "Airport flow",
  "浮潜 3 站 + 观景台": "3 snorkel stops + viewpoint",
  "看项目": "Depends on operator",
  "漂流动线": "Rafting flow",
  "海豚出海 + 长途转场": "Dolphin boat + long transfer",
  "火山口步行": "Crater walk",
  "车船约 4h30m": "About 4h30m by car + boat",
  "车船约 9-10h": "About 9-10h by car + ferry",
  "约 4h30m + Jeep": "About 4h30m + Jeep",
  "凌晨入住": "Late-night check-in",
  "08:00 起飞": "08:00 flight",

  "往返快船约￥180-250": "Round-trip fast boat approx. RMB 180-250",
  "需提前订船票": "Book boat tickets ahead",
  "浮潜团约￥250-400": "Snorkeling tour approx. RMB 250-400",
  "门票/停车小额": "Small entrance / parking fee",
  "岛上车分摊约￥80-120": "Island car share approx. RMB 80-120",
  "Bromo 跨岛团约￥800-1200": "Bromo cross-island tour approx. RMB 800-1,200",
  "需确认含酒店接/轮渡/Jeep/送泗水": "Confirm hotel pickup, ferry, Jeep, and Surabaya drop-off",
  "Bromo 团包含": "Included in Bromo tour",
  "Manta Snorkeling + Kelingking": "Manta Snorkeling + Kelingking",

  "住 Nusa Dua；Day1 做南部经典海岸线。": "Stay in Nusa Dua; Day 1 is the South Coast classics.",
  "继续住 Nusa Dua；Day2 去佩尼达浮潜。": "Stay in Nusa Dua; Day 2 is Nusa Penida snorkeling.",
  "继续住 Nusa Dua；Day3 上午去乌布做 ATV。": "Stay in Nusa Dua; Day 3 morning goes to Ubud for ATV.",
  "住乌布 1 晚；Day4 上午漂流，傍晚去 Lovina。": "One night in Ubud; raft in the morning on Day 4, then head to Lovina by evening.",
  "住 Lovina；Day5 清晨海豚后，旅游团接你们跨岛去 Bromo。": "Stay in Lovina; after the early dolphin boat on Day 5, the tour picks you up for Bromo.",
  "住 Bromo 山下；Day6 凌晨 03:00 Jeep 出发看日出。": "Stay near Bromo; the Jeep leaves at 03:00 on Day 6 for sunrise.",
  "住泗水；Day7 早上去机场，08:00 回武汉。": "Stay in Surabaya; go to the airport on Day 7 for the 08:00 flight to Wuhan.",
  "08:00 从泗水起飞回武汉。": "08:00 flight from Surabaya back to Wuhan.",

  "23:40 落地后直接去 Nusa Dua，少走夜路。": "After landing at 23:40, go straight to Nusa Dua and keep the late-night drive short.",
  "不用凌晨跑乌布，第一晚只负责睡好。": "No late-night run to Ubud; the only job tonight is to sleep well.",
  "南部海滩、悬崖、神庙、火舞和海鲜在一条线上。": "The southern beaches, cliffs, temple, Kecak, and seafood all sit on one clean route.",
  "第一整天不早起，适合从落地疲劳里缓过来。": "No early start on the first full day, so you can recover from the late arrival.",
  "佩尼达最值得体验的是海，上午把浮潜作为主角。": "Nusa Penida is best experienced from the water, so snorkeling leads the morning.",
  "下午只保留 Kelingking 观景台，不把西线和浮潜硬塞满。": "Keep only Kelingking Viewpoint in the afternoon instead of forcing a packed west-line day.",
  "乌布只住一晚，ATV 和 SPA 当天完成。": "Ubud is just one night, with ATV and spa finished the same day.",
  "从南部往中部走，路线开始向北推进，不再折返南部。": "The route moves from the south toward central Bali, then keeps heading north without looping back.",
  "乌布只剩漂流，上午完成后就不再占住宿。": "Ubud only has rafting left, so finish it in the morning and move on.",
  "傍晚去 Lovina 是为了第二天海豚和跨岛路线顺路。": "Going to Lovina by evening makes the dolphin boat and cross-island transfer line up naturally.",
  "Bromo 跟团后，Lovina 到 Gilimanuk 轮渡正好顺路。": "With the Bromo tour handling transport, Lovina to the Gilimanuk ferry is naturally on the way.",
  "包车、轮渡、Bromo、送泗水都交给向导，不再自己研究交通。": "Let the guide handle the car, ferry, Bromo logistics, and Surabaya drop-off.",
  "Bromo 是整趟旅行高潮，跟团负责 Jeep 和转场。": "Bromo is the trip's finale, with the tour handling the Jeep and transfers.",
  "看完日出和火山口后，向导送到泗水酒店。": "After sunrise and the crater, the guide drops you at the Surabaya hotel.",
  "最后一晚住泗水，是为了早班机不冒险。": "The final night in Surabaya keeps the morning flight low-risk.",
  "离境日不排景点，只保证航班稳。": "No sightseeing on departure day; the priority is making the flight comfortably.",

  "办理入境，和接机司机汇合。": "Clear immigration and meet the pickup driver.",
  "这版核心就是落地不折腾。": "The point of this version is no fuss after landing.",
  "前一晚很晚到，上午别排太早。": "You arrive late the night before, so keep the morning relaxed.",
  "梅拉斯蒂海滩和崖壁公路很经典。": "Melasti Beach and the cliff road are classic South Bali.",
  "小海湾和 Melasti 画面不同，顺路补一个海滩层次。": "This small cove feels different from Melasti and adds another beach layer on the way.",
  "悬崖海景咖啡，给火舞前留缓冲。": "Cliffside coffee with a view, and a useful buffer before the Kecak show.",
  "日落和悬崖神庙绑定，不能太晚到。": "Sunset and the cliff temple belong together, so do not arrive too late.",
  "南部经典体验，和 Uluwatu 一起看最顺。": "A South Bali classic, easiest when paired with Uluwatu.",
  "火舞后顺路去金巴兰吃海鲜。": "After the Kecak show, Jimbaran seafood is on the way back.",
  "明天早起去佩尼达。": "Early start for Nusa Penida tomorrow.",
  "要赶 Sanur 码头早班船，今天主角是海。": "Catch the early boat from Sanur; today is about the sea.",
  "提前到码头，留出票、托包和上船时间。": "Arrive early for tickets, bags, and boarding.",
  "不先跑陆地，直接进入今天最值得体验的海。": "Skip land stops first and go straight into the best part of the day: the water.",
  "佩尼达最有名的浮潜点，主要看巨型蝠鲼。": "Nusa Penida's best-known snorkel spot, mainly for manta rays.",
  "看到几只看海况和运气，安全比追 manta 更重要。": "Manta sightings depend on conditions and luck; safety matters more than chasing them.",
  "水质好，适合看海龟、珊瑚和热带鱼。": "Clear water for turtles, coral, and tropical fish.",
  "相对适合新手，按教练指示活动。": "Beginner-friendly by Penida standards; follow the guide's instructions.",
  "珊瑚层次和鱼群更丰富，是浮潜照片的重点。": "Richer coral and fish life, often the best photo stop.",
  "不要踩珊瑚，水流强就跟紧教练。": "Do not step on coral, and stay close to the guide if the current picks up.",
  "浮潜后先冲洗、换衣、补水吃饭，再去陆地观景。": "After snorkeling, rinse off, change, hydrate, eat, then head to the viewpoint.",
  "保留佩尼达最经典照片点。": "Keep Penida's most iconic photo stop.",
  "只看上方观景台，不下沙滩；上下要约 2h 且很累。": "Use the upper viewpoint only; the beach climb can take around 2 hours and is exhausting.",
  "不赶末班船，把回程和上船时间留足。": "Do not chase the last boat; leave enough time for the return and boarding.",
  "按 16:30 船回 Sanur，晚上不再加景点。": "Take the 16:30 boat back to Sanur and skip extra stops at night.",
  "回酒店恢复，明天去乌布。": "Recover at the hotel before heading to Ubud tomorrow.",
  "整理行李后往乌布走。": "Pack up, then head toward Ubud.",
  "先把行李放下，再去玩项目。": "Drop the bags first, then go for the activity.",
  "穿越稻田、丛林、山洞和河流，体验感比普通打卡更强。": "Ride through rice fields, jungle, tunnels, and river sections; it feels more immersive than a normal photo stop.",
  "ATV 后先洗漱、吃饭、补水。": "After ATV, clean up, eat, and hydrate.",
  "越野后用 SPA 把疲劳压下来。": "Use the spa to soften the ATV fatigue.",
  "今晚住乌布，晚餐后早点休息。": "Stay in Ubud tonight and rest early after dinner.",
  "明天漂流后要北上 Lovina。": "After rafting tomorrow, you head north to Lovina.",
  "行李提前整理好，漂流后直接北上。": "Have bags ready so you can go north right after rafting.",
  "上午漂流不压缩下午去 Lovina 的车程。": "Morning rafting leaves enough room for the afternoon drive to Lovina.",
  "换干衣服、吃饭、补水后再坐长车。": "Change into dry clothes, eat, hydrate, then take the long drive.",
  "把今天节奏放松一点，不漂流完马上赶路。": "Keep the pace softer today instead of rushing straight after rafting.",
  "今晚就是为了明天清晨海豚和跨岛接人。": "Tonight sets up the early dolphin boat and the Bromo pickup.",
  "清晨出海看海豚。": "Go out early for the dolphin boat.",
  "Lovina 的重点就是日出海豚。": "Lovina's key experience is dolphins at sunrise.",
  "洗漱、早餐、整理行李，准备跟团接人。": "Clean up, eat breakfast, pack, and be ready for the tour pickup.",
  "向导负责后续包车、轮渡、Bromo 和送泗水。": "The guide handles the car, ferry, Bromo, and Surabaya drop-off from here.",
  "从巴厘岛西端过海到爪哇。": "Cross from western Bali over to Java.",
  "到东爪哇后继续坐车去 Bromo 山下。": "After reaching East Java, continue by car toward the Bromo base area.",
  "凌晨 03:00 出发，今晚只睡觉。": "The 03:00 start is coming, so tonight is only for sleep.",
  "凌晨坐 Jeep 去日出观景台。": "Take the Jeep to the sunrise viewpoint before dawn.",
  "Bromo 最震撼的画面就是日出。": "Bromo's most dramatic view is sunrise.",
  "火山地貌和 Jeep 画面很有东爪哇感。": "The volcanic landscape and Jeep scene feel very East Java.",
  "走到火山口，把 Bromo 体验做完整。": "Walk to the crater to complete the Bromo experience.",
  "回酒店恢复，再坐车去泗水。": "Recover at the hotel, then drive to Surabaya.",
  "向导送达泗水，第二天早班机更稳。": "The guide drops you in Surabaya, which makes the next morning flight easier.",
  "今天已经很早起，晚餐后早点睡。": "You started very early today, so sleep early after dinner.",
  "早班机，酒店位置别太偏。": "For an early flight, do not stay too far from the airport.",
  "08:00 起飞回武汉，留足值机和安检时间。": "08:00 flight to Wuhan, so leave enough time for check-in and security.",

  "提前准备 eVOA / All Indonesia 到达卡 / Love Bali 旅游税凭证。": "Prepare eVOA, the All Indonesia arrival card, and the Love Bali tourism levy proof in advance.",
  "23:40 落地后直接去 Nusa Dua 睡觉，不临时加夜宵或跨区。": "After landing at 23:40, go straight to Nusa Dua to sleep; do not add a late-night meal or extra cross-town detour.",
  "护照、现金小钞、酒店地址截图和司机联系方式放在随身包。": "Keep passports, small cash, hotel address screenshots, and driver contact details in your day bag.",
  "Uluwatu 猴子会抢手机、墨镜和帽子，进寺前全部收进拉链包。": "Uluwatu monkeys grab phones, sunglasses, and hats; put everything in a zipped bag before entering.",
  "乌鲁瓦图神庙按寺庙着装，别踩供品，拍仪式先问。": "Dress properly for Uluwatu Temple, do not step on offerings, and ask before photographing ceremonies.",
  "Kecak 火舞日落场提前订票，16:30 到园区不算早。": "Book the sunset Kecak show ahead; arriving at 16:30 is not too early.",
  "浮潜以海况为先，浪大或船家建议取消时不要硬上，Manta 看运气。": "Let sea conditions decide snorkeling; if waves are high or the operator says cancel, do not force it. Mantas are luck-based.",
  "确认救生衣、教练带队、下水点顺序和回船时间，7 人尽量包船。": "Confirm life jackets, guide-led snorkeling, stop order, and return time. For 7 people, a private boat is worth considering.",
  "晕船药、干袋、防晒、毛巾、换洗衣物、防水手机袋和现金放随身包。": "Pack motion-sickness meds, dry bag, sunscreen, towel, change of clothes, waterproof phone pouch, and cash in your day bag.",
  "Kelingking 只看上方观景台，不下沙滩；今天不叠 Broken Beach / Angel Billabong。": "At Kelingking, use the upper viewpoint only and skip the beach climb. Do not add Broken Beach or Angel's Billabong today.",
  "ATV 穿会弄脏的衣裤和不心疼的鞋，车上备一套干净衣服。": "For ATV, wear clothes and shoes you do not mind getting muddy, and keep a clean set in the car.",
  "出发前确认头盔、护具、保险范围，不舒服就降速不硬冲。": "Before starting, confirm helmet, protective gear, and insurance coverage. Slow down if you feel uncomfortable.",
  "今天从 Nusa Dua 换到乌布，只住一晚，行李提前整理好。": "Today moves from Nusa Dua to Ubud for one night only, so pack neatly before leaving.",
  "漂流带干袋、毛巾、换洗衣物和防水手机袋，结束后换干衣再北上。": "For rafting, bring a dry bag, towel, change of clothes, and waterproof phone pouch. Change into dry clothes before driving north.",
  "漂流尽量订上午场，下午留给去 Lovina 的长车程。": "Book a morning rafting slot so the afternoon is reserved for the long drive to Lovina.",
  "晚上到 Lovina 后早点睡，第二天 05:30 海豚 + 跨岛转场会很长。": "Sleep early after reaching Lovina; the 05:30 dolphin boat plus cross-island transfer will be a long day.",
  "确认 Bromo 团单包含 Lovina 酒店接、包车、轮渡、Jeep、Bromo 住宿和送泗水。": "Confirm the Bromo tour includes Lovina hotel pickup, car, ferry, Jeep, Bromo lodging, and Surabaya drop-off.",
  "今天车船时间长，随身包放水、零食、纸巾、晕车药和充电宝。": "Today has a long car-and-ferry transfer; keep water, snacks, tissues, motion-sickness meds, and a power bank in your day bag.",
  "把 Bromo 外套、长裤、口罩、封闭鞋放在容易拿的位置，到酒店别翻箱倒柜。": "Keep your Bromo jacket, long pants, mask, and closed shoes easy to grab so you are not unpacking everything at the hotel.",
  "Bromo 日出很冷，穿外套/长裤/封闭鞋，带口罩或 buff 防火山灰。": "Bromo sunrise is cold. Wear a jacket, long pants, closed shoes, and bring a mask or buff for volcanic dust.",
  "出发前让向导确认火山、国家公园和 Jeep 路线开放状态。": "Before leaving, ask the guide to confirm the volcano, national park, and Jeep route are open.",
  "黑沙海和火山口灰大、厕所少，回酒店洗澡早餐后再去泗水。": "The Sea of Sand and crater are dusty with few toilets; shower and eat back at the hotel before going to Surabaya.",
  "按 08:00 起飞倒推离店，国际联程和行李规则提前确认。": "Work backward from the 08:00 flight and confirm through-check and baggage rules in advance.",
  "护照、登机牌、充电宝和托运行李液体分开放好。": "Keep passports, boarding passes, power banks, and checked-liquids sorted separately.",
  "早班机不排景点，酒店位置和叫车时间比早餐更重要。": "Do not plan sightseeing before an early flight; hotel location and pickup timing matter more than breakfast.",
};

const COMPOUND_SEPARATORS = [" → ", " · ", " + ", " / ", "；", "，", "、"];

const LOCAL_EN_TEXT = {
  "Trip Overview": "Trip Overview",
  "Bali Route Manual": "Bali Route Manual",
  "总里程约 720km": "720 km total",
  "车船约 27h": "27h car + ferry",
  "武汉抵达 Nusa Dua": "Arrival in Nusa Dua",
  "9/29｜武汉 → Nusa Dua": "Sep 29 | Arrival in Nusa Dua",
  "10/6｜泗水 → 武汉": "Oct 6 | Fly home",
  "泗水 → 武汉": "Fly home from Surabaya",
  "巴厘岛机场 → Nusa Dua 酒店": "DPS Airport → Nusa Dua",
  "Destination Overview": "Route Overview",
  "Today's Activity Area": "Today's Area",
  "Today's Highlight": "Highlight",
  "Today Check": "Day Check",
  "Transit time": "Travel time",
  "Expected finish": "Finish",
  "Hotel change": "Hotel move",
  "Tickets / Bookings": "Tickets & Bookings",
  "Nothing urgent": "No booking needed",
  "到达": "Time",
  "After landing": "Arrival",
  "Late night": "Late arrival",
  "Check in and sleep": "Check in",
  "Sleep on arrival": "Straight to bed",
  "Immigration / baggage claim": "Immigration + bags",

  "约 30min": "30 min",
  "约 2h30m": "2h30m",
  "约 4h": "4h",
  "车船约 4h30m": "4h30m car + boat",
  "车船约 9-10h": "9-10h car + ferry",
  "约 4h30m + Jeep": "4h30m + Jeep",
  "约 45min": "45 min",
  "约 14km": "14 km",
  "约 22km": "22 km",
  "约 25min": "25 min",
  "约 20min": "20 min",
  "约 15min": "15 min",
  "约 1h": "1h",
  "约 2h": "2h",
  "约 2.5h": "2.5h",
  "约 1h30m": "1h30m",
  "约 80km": "80 km",
  "约 90km": "90 km",
  "约 230km": "230 km",
  "约 120km": "120 km",
  "约 25km": "25 km",
  "海上": "By boat",
  "海峡": "Ferry crossing",
  "山路": "Mountain road",
  "回程": "Return leg",
  "短途": "Short hop",
  "周边": "Nearby",
  "园区内": "Inside the temple area",
  "步行": "Walk",
  "顺路": "On the way",
  "16:30 快船": "16:30 fast boat",
  "约 5200 步": "5,200 steps",

  "D0-D2 by the beach": "D0-D2 Beach base",
  "Arrive, rest, South Coast, Penida": "Arrival, South Coast, Penida",
  "D3 one night": "D3 One night",
  "D4-D5 dolphins": "D4-D5 Lovina dolphins",
  "Head north after rafting": "Raft, then head north",
  "Cross-island to Bromo": "Bali to Bromo",
  "D5-D6 guided tour": "D5-D6 guided",
  "Car, ferry, volcano": "Car + ferry + volcano",
  "Guide drop-off + morning flight": "Guide drop-off, morning flight",

  "South Coast classics": "South Coast",
  "Penida snorkeling + Kelingking": "Penida snorkel day",
  "To Ubud + ATV + spa": "Ubud ATV + spa",
  "Rafting to Lovina": "Rafting, then Lovina",
  "Dolphins + guided crossing to Bromo": "Lovina dolphins + Bromo transfer",
  "Bromo to Surabaya": "Bromo to Surabaya",

  "Bromo 跨岛团约￥800-1200": "Bromo tour · RMB 800-1,200",
  "需确认含酒店接/轮渡/Jeep/送泗水": "Check pickup, ferry, Jeep, Surabaya drop-off",
  "Bromo cross-island tour approx. RMB 800-1,200": "Bromo tour · RMB 800-1,200",
  "Bromo tour RMB 800-1,200": "Bromo tour · RMB 800-1,200",
  "Confirm hotel pickup, ferry, Jeep, and Surabaya drop-off": "Check pickup, ferry, Jeep, Surabaya drop-off",
  "Included in Bromo tour": "Included in Bromo tour",
  "Bromo 团需提前订": "Book Bromo tour ahead",
  "Bromo 跨岛团包含": "Included in Bromo tour",
  "Bromo 团约￥800-1200": "Bromo tour · RMB 800-1,200",
  "需提前预约向导": "Book guide ahead",
  "出海船费另计": "Boat fee extra",
  "建议提前订": "Book ahead",
  "轮渡团费含": "Ferry included",
  "约￥300-500": "RMB 300-500",
  "约￥250-400": "RMB 250-400",
  "约￥10-20": "RMB 10-20",
  "门票约￥26": "Entry RMB 26",
  "火舞约￥65": "Kecak RMB 65",
  "往返快船约￥180-250": "Fast boat · RMB 180-250",
  "浮潜团约￥250-400": "Snorkel tour · RMB 250-400",
  "门票/停车小额": "Small entry/parking fee",
  "岛上车分摊约￥80-120": "Island car share · RMB 80-120",
  "需提前预约": "Book ahead",
  "热门店建议预约": "Reserve popular spots",
  "热门时段建议预约": "Reserve peak times",
  "建议提前买": "Buy ahead",
  "建议预约餐厅": "Reserve restaurant",
  "需提前订船票": "Book boat tickets",
  "需预约浮潜船/岛上车": "Book snorkel boat + island car",
  "Manta Snorkeling + Kelingking": "Manta + Kelingking",
  "泗水→武汉机票": "SUB-WUH flight",
  "需提前订机票": "Book flight ahead",

  "Bromo 跟团后，Lovina 到 Gilimanuk 轮渡正好顺路。": "Lovina lines up neatly with the Gilimanuk ferry.",
  "包车、轮渡、Bromo、送泗水都交给向导，不再自己研究交通。": "Guide handles car, ferry, Bromo, and Surabaya drop-off.",
  "要赶 Sanur 码头早班船，今天主角是海。": "Sea day. Catch the early Sanur boat.",
  "海豚看运气，早上风浪、船只密度和追逐方式都要听船家安排。": "Dolphins are condition-based. Follow the boat crew.",
  "轮渡等候受车流和海况影响，跟团时让向导处理排队和票务。": "Ferry wait varies. Let the guide handle tickets and queues.",
  "到爪哇后还有长车程，随身包里放水、外套和晕车药。": "Long Java drive after the ferry. Keep water, jacket, meds handy.",
  "跟团安排住宿即可，关键是确认 03:00 Jeep 出发和保暖装备。": "Tour handles lodging. Confirm 03:00 Jeep and warm layers.",
  "这一晚是为了第二天早班机稳定，不要住太偏。": "Airport buffer night. Stay practical.",
  "10/6 早班机，按 08:00 起飞倒推离店和早餐。": "08:00 flight. Work back from airport timing.",
  "会弄脏衣服，确认是否含接送、保险、储物和淋浴。": "Muddy ride. Check pickup, insurance, lockers, showers.",
  "ATV 后先洗漱再 SPA，热门店建议提前约。": "Clean up before spa. Book popular spots.",
  "漂流后还要去 Lovina，尽量订上午场，结束后洗澡换衣再上车。": "Morning rafting. Shower before the Lovina drive.",
  "今晚一定早点睡，第二天清晨海豚后还要长途跨岛去 Bromo。": "Sleep early. Dolphin boat, then the long Bromo transfer.",
  "23:40 落地后只做入境、取行李和接机，不再凌晨跨区去乌布。": "Late arrival only: immigration, bags, pickup. No Ubud transfer.",
  "这里承担落地恢复、南部海岸和佩尼达往返，优先选舒服的海边酒店。": "Beach base for recovery, South Coast, and Penida.",
  "正午很晒，不适合长时间暴露。": "Harsh midday sun. Keep it short.",
  "楼梯和猴子都要注意，老人同行不要停太久。": "Stairs and monkeys. Keep the stop easy.",
  "日落前热门，别把火舞入场时间卡死。": "Busy before sunset. Leave room for Kecak entry.",
  "猴子会抢眼镜和帽子，火舞票尽量提前确认。": "Monkeys grab glasses and hats. Confirm Kecak tickets.",
  "按重量点单先问价格，别让店家直接上套餐。": "Seafood by weight. Ask price first.",
  "乌布只住一晚，重点放 ATV、SPA 和第二天漂流，不再把乌布拉长。": "One-night Ubud: ATV, spa, rafting next morning.",
};

function isEnglish() {
  return state.locale === "en";
}

function unitText(value) {
  return String(value)
    .replace(/(\d)\s*km/g, "$1 km")
    .replace(/(\d)\s*min/g, "$1 min")
    .replace(/(\d)\s*h/g, "$1h")
    .replace(/\s+/g, " ")
    .trim();
}

function translatePattern(text) {
  const itemCount = text.match(/^(\d+)\s*项$/);
  if (itemCount) return `${itemCount[1]} ${Number(itemCount[1]) === 1 ? "item" : "items"}`;

  const stop = text.match(/^第\s*(\d+)\s*站$/);
  if (stop) return `Stop ${stop[1]}`;

  if (text.startsWith("门票 ")) return `Ticket ${tr(text.slice(3))}`;
  if (text.startsWith("预约 ")) return `Booking ${tr(text.slice(3))}`;
  if (text.startsWith("✓ ")) return `✓ ${tr(text.slice(2))}`;
  if (text.startsWith("⚠ ")) return `⚠ ${tr(text.slice(2))}`;

  const carBoat = text.match(/^车船约\s*(.+)$/);
  if (carBoat) return `${unitText(carBoat[1])} car + boat`;

  const lunch = text.match(/^午餐约\s*(.+)$/);
  if (lunch) return `Lunch · ${unitText(lunch[1])}`;

  const approx = text.match(/^约\s*(.+)$/);
  if (approx) return unitText(approx[1]);

  return text;
}

function tr(value) {
  const text = String(value ?? "");
  if (!isEnglish() || !text) return text;
  if (LOCAL_EN_TEXT[text]) return LOCAL_EN_TEXT[text];
  if (EN_TEXT[text]) return EN_TEXT[text];

  const separator = COMPOUND_SEPARATORS.find((item) => text.includes(item));
  if (separator) {
    const joiner = separator === "；" ? "; " : separator === "，" || separator === "、" ? ", " : separator;
    return text
      .split(separator)
      .map((part) => tr(part.trim()))
      .join(joiner);
  }

  return translatePattern(text);
}

function setLocale(locale) {
  state.locale = locale === "en" ? "en" : "zh";
  try {
    window.localStorage.setItem(LOCALE_KEY, state.locale);
  } catch (error) {
    // Local files can block storage in some browsers; rendering can still continue.
  }
  render();
  toast(state.locale === "en" ? "Language set to English" : "已切换为中文");
}

function renderLanguageState() {
  const lang = isEnglish() ? "en" : "zh-CN";
  document.documentElement.lang = lang;
  document.body.classList.toggle("lang-en", isEnglish());
  document.body.classList.toggle("lang-zh", !isEnglish());
  document.title = tr("巴厘岛路线手册");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = tr(node.dataset.i18n || "");
  });
  els.languageToggle?.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === state.locale;
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function activeDay() {
  return manual.days.find((day) => day.id === state.activeDayId) || manual.days[0];
}

function activePlan() {
  return manual.travelOS.dayPlans[state.activeDayId] || manual.travelOS.dayPlans.day1;
}

function placeById(id) {
  return manual.places[id] || {};
}

function safeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(value) {
  const url = String(value || "").trim();
  return /^https?:\/\//i.test(url) ? url : "";
}

function stars(value) {
  const score = Math.max(0, Math.min(5, Number(value || 0)));
  return "★★★★★".slice(0, score) + "☆☆☆☆☆".slice(0, 5 - score);
}

function defaultRouteIndex(plan) {
  const firstRealStop = plan.route.findIndex((point) => {
    const type = placeById(point.place).type;
    return type !== "hotel" && type !== "transport";
  });
  return firstRealStop >= 0 ? firstRealStop : 0;
}

function imageForPoint(point) {
  const place = placeById(point.place);
  const src = point.image || place.image || "";
  if (!src || src.includes("source.unsplash.com")) return "";
  return src;
}

function numberLabel(index) {
  return String(index + 1).padStart(2, "0");
}

function mediaMarkup(point, index, className) {
  const image = imageForPoint(point);
  const label = point.shortLabel || point.label;
  const missingClass = image ? "" : " image-missing";
  const imageHtml = image
    ? `<img src="${safeHtml(image)}" alt="${safeHtml(tr(point.label))}" loading="lazy" onerror="this.parentElement.classList.add('image-missing'); this.remove();" />`
    : "";
  return `
    <span class="visual-frame ${safeHtml(className)}${missingClass}">
      ${imageHtml}
      <span class="visual-fallback">
        <b>${safeHtml(point.icon || "📍")}</b>
        <em>${safeHtml(tr(label))}</em>
      </span>
      <mark>${safeHtml(numberLabel(index))}</mark>
    </span>
  `;
}

function imageForDay(dayId) {
  const plan = manual.travelOS.dayPlans[dayId];
  if (!plan) return "";
  const point = plan.route.find((item) => imageForPoint(item)) || plan.route[0];
  return point ? imageForPoint(point) : "";
}

function imageForOverviewCard(card) {
  if (card.image) return card.image;
  const day = (card.days || []).find((item) => imageForDay(item.id));
  return day ? imageForDay(day.id) : "";
}

function imageMarkup(src, alt, className) {
  if (!src) return `<span class="${safeHtml(className)} image-empty"></span>`;
  return `<img class="${safeHtml(className)}" src="${safeHtml(src)}" alt="${safeHtml(tr(alt))}" loading="lazy" />`;
}

function highlightPoint(plan) {
  return (
    plan.route.find((point) => imageForPoint(point) && placeById(point.place).type !== "hotel" && placeById(point.place).type !== "transport") ||
    plan.route.find((point) => imageForPoint(point)) ||
    plan.route[0]
  );
}

function ticketForPoint(point) {
  const place = placeById(point.place);
  if (Object.prototype.hasOwnProperty.call(point, "ticket")) return point.ticket || "";
  return place.ticket || "";
}

function bookingForPoint(point) {
  const place = placeById(point.place);
  if (Object.prototype.hasOwnProperty.call(point, "booking")) return point.booking || "";
  return place.booking || "";
}

function ticketUrlForPoint(point) {
  const place = placeById(point.place);
  if (Object.prototype.hasOwnProperty.call(point, "ticketUrl")) return point.ticketUrl || "";
  return place.ticketUrl || "";
}

function bookingUrlForPoint(point) {
  const place = placeById(point.place);
  if (Object.prototype.hasOwnProperty.call(point, "bookingUrl")) return point.bookingUrl || "";
  return place.bookingUrl || "";
}

function linkedText(text, url) {
  const href = safeUrl(url);
  const label = tr(text);
  if (!href) return safeHtml(label);
  return `<a href="${safeHtml(href)}" target="_blank" rel="noreferrer">${safeHtml(label)} ↗</a>`;
}

function badgeMarkup(className, text, url) {
  const href = safeUrl(url);
  if (!text) return "";
  const label = tr(text);
  if (!href) return `<b class="${safeHtml(className)}">${safeHtml(label)}</b>`;
  return `<a class="${safeHtml(className)}" href="${safeHtml(href)}" target="_blank" rel="noreferrer">${safeHtml(label)} ↗</a>`;
}

const UI_ICONS = {
  sun: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2.5v3"></path>
      <path d="M12 18.5v3"></path>
      <path d="M2.5 12h3"></path>
      <path d="M18.5 12h3"></path>
      <path d="M4.9 4.9l2.1 2.1"></path>
      <path d="M17 17l2.1 2.1"></path>
      <path d="M19.1 4.9 17 7"></path>
      <path d="M7 17l-2.1 2.1"></path>
    </svg>
  `,
  car: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 11.5 7 7.8A2 2 0 0 1 8.9 6.5h6.2A2 2 0 0 1 17 7.8l1.5 3.7"></path>
      <path d="M5 11.5h14v5H5z"></path>
      <path d="M7 16.5v1.8"></path>
      <path d="M17 16.5v1.8"></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,
  plane: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 11.5 20 4.5l-5.4 15-3.2-6.2-6.8-1.8z"></path>
      <path d="m11.4 13.3 4.8-4.7"></path>
    </svg>
  `,
  boat: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13.5h14l-2 4.5H7z"></path>
      <path d="M8 13.5V7l6 2.6v3.9"></path>
      <path d="M4 20c1.4 0 1.4-1 2.8-1s1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1 1.4-1 2.8-1 1.4 1 2.8 1"></path>
    </svg>
  `,
  walk: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="13" cy="5" r="2"></circle>
      <path d="M12 8.5 9.5 12l3 2.5"></path>
      <path d="m14.5 10.5 2.5 1"></path>
      <path d="m12.5 14.5-2 5"></path>
      <path d="m14 15.5 3.5 4"></path>
    </svg>
  `,
  heart: `
    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2 8.3c0-2.2-1.7-3.8-3.8-3.8-1.8 0-3 1-4.4 2.6-1.4-1.6-2.6-2.6-4.4-2.6-2.1 0-3.8 1.6-3.8 3.8 0 4 4.2 7.2 8.2 10.6 4-3.4 8.2-6.6 8.2-10.6z"></path>
    </svg>
  `,
};

function transportIcon(mode = "") {
  if (String(mode).includes("✈") || String(mode).includes("飞")) return UI_ICONS.plane;
  if (String(mode).includes("🚤") || String(mode).includes("船")) return UI_ICONS.boat;
  if (String(mode).includes("🚶") || String(mode).includes("步")) return UI_ICONS.walk;
  return UI_ICONS.car;
}

function timelineTimeDetail(point, place) {
  const stay = point.stay || place.duration || "";
  const bestTime = point.bestTime || place.bestTime || "";
  if (isEnglish()) {
    return stay ? tr(stay) : tr(bestTime);
  }
  if (bestTime && bestTime !== point.arrive && bestTime !== stay) {
    return stay ? `${bestTime} · ${stay}` : bestTime;
  }
  return stay;
}

function nextSegment(plan, index) {
  return plan.route[index + 1]?.segment || null;
}

function googleRouteUrl(plan = activePlan()) {
  const places = plan.route.map((point) => placeById(point.place)).filter((place) => place?.coordinate);
  if (places.length < 2) return "https://www.google.com/maps";
  const origin = places[0].coordinate;
  const destination = places[places.length - 1].coordinate;
  const waypoints = places.slice(1, -1).map((place) => `${place.coordinate.lat},${place.coordinate.lng}`);
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
  });
  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function routePreview(plan) {
  return plan.route
    .map((point) => tr(point.shortLabel || point.label))
    .filter(Boolean)
    .join(" → ");
}

function fatigueLabel(value) {
  if (value <= 2) return "轻松";
  if (value === 3) return "正常";
  if (value === 4) return "偏累";
  return "很累";
}

function travelTipClass(type = "") {
  const map = {
    必做: "must",
    注意: "watch",
    携带: "pack",
    风俗: "custom",
    安全: "safe",
  };
  return map[type] || "note";
}

function toast(message) {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 1600);
}

function render() {
  const day = activeDay();
  const plan = activePlan();
  renderLanguageState();
  renderOverviewPanel();
  renderDayRail();
  renderRouteHeader(day, plan);
  renderRouteMap(plan);
  renderSelectedPoint(plan);
  renderTodayStatus(plan);
  renderTicketPanel(plan);
}

function renderOverviewPanel() {
  if (!els.overviewPanel) return;
  if (manual.travelOS.overviewCards) {
    els.overviewPanel.innerHTML = `
      <section class="bali-overview">
        <div class="overview-head">
          <p>${safeHtml(tr(manual.travelOS.overviewTitle || "目的地概览"))}</p>
        </div>
        <div class="destination-strip" aria-label="巴厘岛空间总览">
          ${(manual.travelOS.overviewCards || [])
            .filter((card) => card.type !== "leg")
            .map((card) => {
              const image = imageForOverviewCard(card);
              const dayId = card.days?.[0]?.id || "";
              const cardAccent = card.accent || "#3777f0";
              const active = (card.days || []).some((item) => item.id === state.activeDayId) ? "active" : "";
              return `
                <button class="destination-card ${active}" type="button" ${dayId ? `data-day="${safeHtml(dayId)}"` : ""} style="--card-accent: ${safeHtml(cardAccent)}">
                  ${imageMarkup(image, card.title, "destination-photo")}
                  <div>
                    <strong>${safeHtml(tr(card.title))}</strong>
                    <span>${safeHtml(tr(card.note || ""))}</span>
                    <p>${safeHtml(tr(card.meta || ""))}</p>
                  </div>
                  <i aria-hidden="true"></i>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
    return;
  }
  els.overviewPanel.innerHTML = `
    <section class="bali-overview">
      <div class="overview-copy">
        <p>Trip Map</p>
        <h2>9/29-10/6 空间总览</h2>
        <span>海边是主角，乌布体验即可，Bromo 作为最后高潮。</span>
      </div>
      <div class="overview-schematic" aria-label="巴厘岛空间总览">
        <div class="compass">北 ↑</div>
        <div class="geo-card north">
          <strong>🌿 Ubud</strong>
          <span>D0-D2 住 2 晚，体验压缩完成</span>
          <button class="${state.activeDayId === "day0" ? "active" : ""}" type="button" data-day="day0">D0 抵达乌布</button>
          <button class="${state.activeDayId === "day1" ? "active" : ""}" type="button" data-day="day1">D1 ATV / SPA</button>
        </div>
        <div class="geo-leg north-leg"><b>10/1 转场</b><em>乌布 → Nusa Dua</em></div>
        <div class="geo-card volcano">
          <strong>🌋 East Java / Bromo</strong>
          <span>D5-D7 飞泗水，Bromo 收尾</span>
          <button class="${state.activeDayId === "day5" ? "active" : ""}" type="button" data-day="day5">D5 去 Bromo</button>
          <button class="${state.activeDayId === "day6" ? "active" : ""}" type="button" data-day="day6">D6 Bromo 日出</button>
        </div>
        <div class="geo-card ubud">
          <strong>🌊 Nusa Dua</strong>
          <span>D2-D5 住 3 晚，海边是主角</span>
          <button class="${state.activeDayId === "day2" ? "active" : ""}" type="button" data-day="day2">D2 乌布 → 海边</button>
          <button class="${state.activeDayId === "day3" ? "active" : ""}" type="button" data-day="day3">D3 南部海岸</button>
          <button class="${state.activeDayId === "day4" ? "active" : ""}" type="button" data-day="day4">D4 佩尼达</button>
        </div>
        <div class="geo-leg south-leg"><b>一直往东</b><em>巴厘岛 → 泗水</em></div>
        <div class="geo-card penida">
          <strong>🏝️ Nusa Penida</strong>
          <span>D4 西线经典，不叠加浮潜</span>
          <button class="${state.activeDayId === "day4" ? "active" : ""}" type="button" data-day="day4">D4 恐龙湾 / 水晶湾</button>
        </div>
        <div class="geo-card south">
          <strong>🏙️ Surabaya</strong>
          <span>D6 住泗水，D7 早班机回武汉</span>
          <button class="${state.activeDayId === "day7" ? "active" : ""}" type="button" data-day="day7">D7 泗水 → 武汉</button>
        </div>
      </div>
    </section>
  `;
}

function renderDayRail() {
  els.phasePanel.innerHTML = manual.days
    .map((day) => {
      const plan = manual.travelOS.dayPlans[day.id];
      const active = day.id === state.activeDayId ? "active" : "";
      const modeClass = plan.hotelMove ? "move" : "stay";
      const mode = plan.hotelMove ? "Move" : "Stay";
      return `
        <button class="day-card ${active}" type="button" data-day="${day.id}">
          <span class="day-card-main">
            <strong>${safeHtml(day.short)}</strong>
            <b>${safeHtml(tr(plan.kind))}</b>
            <small>${safeHtml(tr(plan.totalDrive))}</small>
          </span>
          <span class="day-card-side">
            <em class="${safeHtml(modeClass)}">${safeHtml(mode)}</em>
            <small>${safeHtml(tr(day.region))}</small>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderRouteHeader(day, plan) {
  els.routeHeader.innerHTML = `
    <div>
      <p>${safeHtml(tr(plan.stage))} · ${safeHtml(tr(plan.hotelMove ? "换酒店" : "不换酒店"))}</p>
      <h2>${safeHtml(tr(day.title))}</h2>
      <div class="route-summary">${safeHtml(routePreview(plan))}</div>
    </div>
    <div class="route-actions">
      <span class="weather-pill">${UI_ICONS.sun}${safeHtml(tr("今天晴朗"))}</span>
      <a class="nav-link" href="${googleRouteUrl(plan)}" target="_blank" rel="noreferrer">${UI_ICONS.car}${safeHtml(tr("导航"))}</a>
    </div>
  `;
}

function renderRouteMap(plan) {
  const routeHtml = plan.route
    .map((point, index) => {
      const place = placeById(point.place);
      const selected = state.routeSelectionTouched && index === state.selectedRouteIndex ? "selected" : "";
      const segment = nextSegment(plan, index);
      const ticket = ticketForPoint(point);
      const booking = bookingForPoint(point);
      const timeDetail = timelineTimeDetail(point, place);
      return `
        <button class="timeline-row ${selected}" type="button" data-route-index="${index}">
          <span class="timeline-time">
            <small>${safeHtml(tr("到达"))}</small>
            <strong>${safeHtml(tr(point.arrive || "-"))}</strong>
            <em>${safeHtml(tr(timeDetail))}</em>
          </span>
          <span class="timeline-spine"><i>${safeHtml(numberLabel(index))}</i></span>
          ${mediaMarkup(point, index, "route-thumb")}
          <span class="timeline-body">
            <strong>${safeHtml(tr(point.label))}</strong>
            <small>${safeHtml(tr(point.bestTime || place.bestTime || "顺路"))}</small>
            <span class="node-tags">
              ${ticket ? `<b>${safeHtml(isEnglish() ? tr(ticket) : `${tr("门票")} ${tr(ticket)}`)}</b>` : ""}
              ${booking ? `<b>${safeHtml(isEnglish() ? tr(booking) : `${tr("预约")} ${tr(booking)}`)}</b>` : ""}
            </span>
          </span>
          <span class="timeline-next">
            ${
              segment
                ? `<b>${safeHtml(tr(segment.distance || "-"))}</b><em>${transportIcon(segment.mode)}${safeHtml(tr(segment.duration || ""))}</em>`
                : `<b>-</b><em>${safeHtml(tr("今天结束"))}</em>`
            }
          </span>
        </button>
      `;
    })
    .join("");
  const highlight = highlightPoint(plan);
  const highlightImage = highlight ? imageForPoint(highlight) : "";

  els.routeMapSlot.innerHTML = `
    <section class="route-map-card timeline-card">
      <div class="map-card-title">
        <span>${safeHtml(tr("今天活动范围"))}</span>
        <strong>${safeHtml(tr(plan.base))}</strong>
        <em>${safeHtml(tr(plan.totalDrive))}</em>
      </div>
      <div class="timeline-list">${routeHtml}</div>
      <div class="highlight-banner"${highlightImage ? ` style="background-image: linear-gradient(90deg, rgba(15,23,42,.68), rgba(15,23,42,.24)), url('${safeHtml(highlightImage)}')"` : ""}>
        <strong>${safeHtml(tr("今日亮点"))}</strong>
        <span>${safeHtml(tr(highlight?.label || plan.kind))} · ${safeHtml(tr((plan.why || [])[0] || routePreview(plan)))}</span>
      </div>
    </section>
  `;
}

function renderSelectedPoint(plan) {
  const index = Math.min(state.selectedRouteIndex, plan.route.length - 1);
  const point = plan.route[index] || plan.route[defaultRouteIndex(plan)] || plan.route[0];
  const place = placeById(point.place);
  const segment = nextSegment(plan, index);
  const reasons = (point.reason || []).slice(0, 2);
  const pitfall = point.pitfall || place.pitfall;
  const ticket = ticketForPoint(point);
  const booking = bookingForPoint(point);
  const ticketUrl = ticketUrlForPoint(point);
  const bookingUrl = bookingUrlForPoint(point);

  els.spatialRoute.innerHTML = `
    <section class="point-detail">
      ${mediaMarkup(point, index, "point-visual")}
      <div class="point-detail-body">
        <div class="point-detail-title">
          <span>${safeHtml(point.icon || "📍")}</span>
          <div>
            <p>${safeHtml(isEnglish() ? `Stop ${index + 1}` : `第 ${index + 1} 站`)} · ${safeHtml(tr(point.arrive))} · ${safeHtml(tr(point.stay || place.duration || ""))}</p>
            <h3>${safeHtml(tr(point.label))}</h3>
          </div>
        </div>
        <div class="point-facts">
          <div><span>${safeHtml(tr("最佳时间"))}</span><strong>${safeHtml(tr(point.bestTime || place.bestTime || "顺路"))}</strong></div>
          <div><span>${safeHtml(tr("停留"))}</span><strong>${safeHtml(tr(point.stay || place.duration || "-"))}</strong></div>
          <div><span>${safeHtml(tr("下一段交通"))}</span><strong>${segment ? `${safeHtml(segment.mode || "🚐")} ${safeHtml(tr(segment.duration))} · ${safeHtml(tr(segment.distance))}` : safeHtml(tr("今天结束"))}</strong></div>
          ${ticket ? `<div><span>${safeHtml(tr("门票"))}</span><strong>${linkedText(ticket, ticketUrl)}</strong></div>` : ""}
          ${booking ? `<div><span>${safeHtml(tr("预约"))}</span><strong>${linkedText(booking, bookingUrl)}</strong></div>` : ""}
        </div>
        <div class="point-lines">
          ${reasons.map((item) => `<p>✓ ${safeHtml(tr(item))}</p>`).join("")}
          ${pitfall ? `<p>⚠ ${safeHtml(tr(pitfall))}</p>` : ""}
        </div>
      </div>
    </section>
  `;
}

function renderTodayStatus(plan) {
  const tips = Array.isArray(plan.travelTips) ? plan.travelTips : [];
  els.todayStatus.innerHTML = `
    <section class="status-panel">
      <div class="panel-heading">
        <span>${safeHtml(tr("今天判断"))}</span>
      </div>
      <div class="status-grid">
        <div><span>${safeHtml(tr("总车程"))}</span><strong>${safeHtml(tr(plan.totalDrive))}</strong></div>
        <div><span>${safeHtml(tr("预计结束"))}</span><strong>${safeHtml(tr(plan.endTime))}</strong></div>
        <div><span>${safeHtml(tr("行程强度"))}</span><strong>${safeHtml(tr(fatigueLabel(plan.fatigue)))}</strong></div>
        <div><span>${safeHtml(tr("换酒店"))}</span><strong>${safeHtml(tr(plan.hotelMove ? "是" : "否"))}</strong></div>
      </div>
      <div class="reason-brief">
        ${(plan.why || []).slice(0, 2).map((item) => `<p>${safeHtml(tr(item))}</p>`).join("")}
      </div>
      <div class="next-stop">
        <span>${safeHtml(tr("结束后"))}</span>
        <p>${safeHtml(tr(plan.next))}</p>
      </div>
    </section>
    <section class="status-panel travel-tip-panel">
      <div class="panel-heading">
        <span>${safeHtml(tr("出行提醒"))}</span>
      </div>
      <div class="travel-tip-list">
        ${
          tips.length
            ? tips
                .map(
                  (item) => `
                    <div class="travel-tip-item ${safeHtml(travelTipClass(item.type))}">
                      <b>${safeHtml(tr(item.type || "提醒"))}</b>
                      <p>${safeHtml(tr(item.text))}</p>
                    </div>
                  `,
                )
                .join("")
            : `<p class="travel-tip-empty">${safeHtml(tr("今天没有特殊提醒，按路线节奏走就好。"))}</p>`
        }
      </div>
    </section>
  `;
}

function ticketItems(plan = activePlan()) {
  const seen = new Set();
  return plan.route
    .map((point) => ({
      label: point.label,
      ticket: ticketForPoint(point),
      booking: bookingForPoint(point),
      ticketUrl: ticketUrlForPoint(point),
      bookingUrl: bookingUrlForPoint(point),
    }))
    .filter((item) => item.ticket || item.booking)
    .filter((item) => {
      const key = `${item.label}-${item.ticket}-${item.booking}-${item.ticketUrl}-${item.bookingUrl}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function renderTicketPanel(plan) {
  const items = ticketItems(plan);
  els.budgetPanel.innerHTML = `
    <section class="cost-panel ticket-panel">
      <div class="panel-heading">
        <span>${safeHtml(tr("门票 / 预约"))}</span>
        <strong>${items.length ? safeHtml(tr(`${items.length} 项`)) : safeHtml(tr("无必买"))}</strong>
      </div>
      <div class="ticket-lines">
        ${
          items.length
            ? items
                .map(
                  (item) => `
                    <div>
                      <span>${safeHtml(tr(item.label))}</span>
                      <strong>
                        ${badgeMarkup("ticket-badge", item.ticket, item.ticketUrl)}
                        ${badgeMarkup("booking-badge", item.booking, item.bookingUrl)}
                      </strong>
                    </div>
                  `,
                )
                .join("")
            : `<p>${safeHtml(tr("今天不用提前处理门票，按路线走就行。"))}</p>`
        }
      </div>
    </section>
  `;
}

function selectDay(dayId) {
  if (!manual.travelOS.dayPlans[dayId]) return;
  state.activeDayId = dayId;
  state.selectedRouteIndex = defaultRouteIndex(activePlan());
  state.routeSelectionTouched = false;
  render();
  toast(tr(`${activeDay().short} · ${activePlan().kind}`));
}

function selectRoutePoint(index) {
  state.selectedRouteIndex = index;
  state.routeSelectionTouched = true;
  renderRouteMap(activePlan());
  renderSelectedPoint(activePlan());
}

function bindEvents() {
  els.languageToggle?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang]");
    if (button) setLocale(button.dataset.lang);
  });
  els.phasePanel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (button) selectDay(button.dataset.day);
  });
  els.routeMapSlot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-route-index]");
    if (button) selectRoutePoint(Number(button.dataset.routeIndex));
  });
  els.overviewPanel?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (button) selectDay(button.dataset.day);
  });
}

function boot() {
  state.selectedRouteIndex = defaultRouteIndex(activePlan());
  state.routeSelectionTouched = false;
  bindEvents();
  render();
}

boot();
