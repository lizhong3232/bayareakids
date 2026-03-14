Project: BayAreaKids - AI-Driven Playdate & Activity Scout
1. 产品愿景
解决湾区家长（尤其是 1-4 岁幼儿家庭）的“决策疲劳”与“社交孤立”。通过 AI 聚合每周活动，并基于地理位置、孩子年龄、家长背景实现精准的 Playdate (PD) 撮合。

2. 核心功能模块 (MVP)
A. 智能活动发现 (AI Aggregator)

数据源： 爬取 SF/South Bay/East Bay 的市官网、510 Families、小红书热点、天气预报。

AI 处理： - 自动打标签：Age: 1-2, Age: 3-4, Fenced, Shade, Restroom, Parking.

风险预警：如“周末气温 95°F，自动锁定带水池的公园”。

B. 用户画像与注册 (Profile & Match)

用户信息： - 孩子年龄（精确到月）、居住地（如 Sunnyvale）、职业背景（可选，增加信任感）。

兴趣标签：Hiking, Skiing, STEM, Art.

匹配机制： - Intention-based Match: 用户勾选本周末计划去的地点（如：Ortega Park）。

Dashboard: 显示“已有 5 个家庭计划前往，其中 3 个与你孩子同岁”。

C. 社交闭环 (The Connection)

临时群组： 匹配成功后，生成一个有效期为 48 小时的临时聊天室。

AI 破冰： 根据双方画像生成话题（例如：“两家都喜欢 Tesla Model Y，可以聊聊二排遮阳帘”）。

3. 技术栈建议 (For Claude Code)
Frontend: Next.js (App Router) + Tailwind CSS + Shadcn UI.

Backend: Supabase (Auth, Postgres Database, Real-time).

AI Engine: Vercel AI SDK + GPT-4o/Claude 3.5 (用于文本抓取清洗与匹配建议)。

Map: Mapbox 或 Google Maps API (用于公园分布展示)。

4. 数据库设计 (Database Schema)
SQL
-- Profiles: 存储家长与孩子信息
table profiles {
  id uuid primary_key,
  parent_name text,
  kids_age_months int,
  location_zip text,
  interests text[], -- ['hiking', 'skiing', 'tech']
  employer_verified boolean
}

-- Activities: 每周抓取的活动/公园
table activities {
  id uuid primary_key,
  title text,
  location_lat_lng point,
  age_range int[], -- [1, 2, 3, 4]
  tags text[],
  event_date date
}

-- Attendance: 用户出行意向（匹配核心）
table intentions {
  id uuid primary_key,
  user_id references profiles.id,
  activity_id references activities.id,
  status text -- 'going', 'interested'
}
5. 迭代计划 (Milestones)
Phase 1: 静态信息流 (Week 1)

[ ] 编写 Python/Node 脚本爬取并清洗湾区周末活动数据。

[ ] 展示按年龄段分类的 Markdown/Web 页面。

Phase 2: 注册与意向勾选 (Week 2)

[ ] 集成 Clerk 或 Supabase Auth。

[ ] 实现“我要去 (Check-in)”功能，统计每个公园的家长人数。

Phase 3: 精准匹配与通知 (Week 3)

[ ] 逻辑：当同一公园出现 3 个以上同龄孩子家庭时，触发邮件/Push 通知。

[ ] 建立基于地点的小型社区墙。

6. 开发者指令 (Instructions for Claude Code)
Scraping: 优先搜索 "Best toddler parks in South Bay with shade" 和 "Cupertino library story time schedules"。

UI Design: 采用简洁、温馨的风格（推荐颜色：#4FAD5B 森林绿 或 #FFD700 阳光黄）。

Security: 仅允许登录用户查看其他家长的具体匹配信息。