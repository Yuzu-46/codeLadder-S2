# CodeLadder-S2

CodeLadder-S2 是一个神奇代码岛项目，使用 ArenaPro Cli 开发。

**许可证：[MIT](./LICENSE) | 作者：Yuzu-46 (柚子 46)**

---

## 项目概述

本项目是为参加神岛代码天梯 S2 赛季（疯狂厨房）而开发的多人协作厨房游戏。

**赛事信息**：https://dao3.fun/codeLadder  
**评审标准**：https://docs.qq.com/doc/DSHZYTHFKT3hiVVBk  
**Git 参考**：https://docs.qq.com/doc/DSE1rVVZTeUxxR29N  
**赛题说明**：https://pd.qq.com/s/1gtva84yo

> ⚠️ **当前进度**：已完成第一章（基础厨房协作）的部分内容

---

## 玩法说明

这是一个多人协作的厨房模拟游戏。玩家需要分工合作完成食材处理、烹饪和订单交付：

- 玩家控制角色在厨房中移动，可以拾取食材和厨具
- 通过切菜台处理食材，通过锅具烹饪食物
- 按照订单要求组装菜品并送到出餐口
- 游戏支持多人实时协作，玩家可以传递物品和接力操作
- 系统会追踪订单完成情况和效率统计

### 游戏机制详解

#### 基础操作

- **移动**：WASD 键控制角色移动
- **交互**：E 键进行拾取、放置、切菜、拿盘子等操作
- **携带限制**：玩家只能携带 1 个堆叠单位物品
- **交互提示**：玩家前方会显示当前 E 键交互的对象

#### 食材状态系统

- 食材具有五种状态流转：
    - Raw (生)：从箱子取出时的初始状态
    - Chopped (已切)：在切菜台完成 3 次鼠标点击后转变
    - Cooking (烹饪中)：放入锅具后的过程状态（烹饪时长：7s）
    - Cooked (熟)：进度条满后的状态
    - Burnt (糊)：熟了之后若 6 秒 内未取出，转变为"糊"
- 糊掉的食物必须倒入垃圾桶，且锅具需要清洗（耗时 5s）才能再次使用
- 未切好的蔬菜/肉类无法放入锅中

#### 订单系统

- 订单生成规则：
    - 生成频率：游戏开始后，每隔 15-25 秒 随机生成一个新订单
    - 订单队列：界面顶部最多同时显示 6 个 订单
    - 耐心值：每个订单拥有独立的进度条（基础耐心值 60-90 秒）
    - 倒计时归零则订单失败
- 订单完成：当菜品送到出餐口时，如果订单正确即可完成，销毁订单

#### 合成配方

- 荤汉堡 = 盘子 + 面包（生） + 牛肉（已切 + 熟）
- 荤素汉堡 = 盘子 + 面包（生） + 牛肉（已切 + 熟） + 蔬菜（已切）
- 营养汉堡 = 盘子 + 面包（生） + 牛肉（已切 + 熟） + 蔬菜（已切） + 番茄（已切）
- 牛肉汤 = 盘子 + 牛肉（已切）（需在煮锅烹饪）

#### 容器机制

- 汉堡类菜品不能直接手持，必须放在盘子上进行组装
- 玩家携带的盘子和上面的食物算作一个整体

#### 多人协作

- 支持"接力"操作：玩家 A 切完菜放在桌上，玩家 B 拿去煮
- 双端状态实时同步
- 玩家可以传递物品

---

## 项目规范

- 本项目使用 TypeScript 开发
- 遵循 TypeScript ESLint 代码规范
- 使用 React Hooks 规范（客户端）
- 统一的事件系统和单例模式
- 模块化的代码结构
- 前后端分离架构
- 所有代码注释使用 JSDoc 格式，注释语言统一使用中文
- 遵循以下命名规范
- 遵循以下分支管理规范

### 命名规范

- 变量和函数名使用小驼峰命名法（camelCase）：`playerName`, `getPlayerPosition`, `createInstanceWithDependencies`
- 类名和接口名使用大驼峰命名法（PascalCase）：`PlayerManager`, `IGameEntity`, `AbstractFactory`
- 常量使用全大写字母加下划线（UPPER_CASE）：`METADATA_KEYS`, `CACHE_TTL`
- 类型定义使用大驼峰命名法（PascalCase）：`FactoryConfig`, `CacheItem`
- 文件夹和文件名使用小驼峰或短横线分隔（kebab-case），保持项目内统一
- 私有或内部方法使用下划线前缀：`_privateMethod`, `_internalProperty`
- 静态属性和方法使用大驼峰命名法（PascalCase）：`getInstance`, `DEFAULT_CONFIG`
- 泛型参数通常使用单个大写字母：`T`, `U`, `K`, `V`
- 单例类继承命名：`extends Singleton<ClassName>()`

### 分支管理规范

- `master`：主分支，用于稳定版本发布
- `dev`：开发主分支
- `dev_{开发者标识}`：开发者个人分支（如：`dev_yuzi`, `dev_teammate`）
- `docs`：文档分支
- `feature/*`：功能分支（如：`feature/ingredient-system`, `feature/order-ui`）
- `fix/*`：修复分支
- `bugFix/*`：Bug 修复分支
- `hotfix/*`：紧急热修复分支

---

## 项目结构

使用 ArenaPro 脚手架和 AP framework 的标准结构：

```
app/
├── client/                         # 客户端代码
│   ├── src/
│   │   ├── App.tsx                 # 客户端应用入口
│   │   ├── framework/              # 客户端框架代码
│   │   │   └── common/             # 通用工具（单例、事件发射器等）
│   │   └── play/                   # 客户端游戏逻辑
│   │       ├── mgr/                # 客户端管理器（UI 管理等）
│   │       └── ui/                 # UI 组件（消息提示等）
│   └── types/                      # 客户端类型定义
├── server/                         # 服务端代码
│   ├── src/
│   │   ├── App.ts                  # 服务端应用入口
│   │   ├── framework/              # 服务端框架代码
│   │   │   ├── common/             # 通用模式（工厂、状态机、观察者等）
│   │   │   └── util/               # 工具类（数学计算等）
│   │   └── play/                   # 服务端游戏逻辑
│   │       ├── config/             # 配置管理
│   │       │   ├── ContainerConfig/        # 容器配置
│   │       │   ├── FoodConfig/             # 食物配置
│   │       │   ├── InteractableConfig/     # 交互物配置
│   │       │   ├── MovablePropConfig/      # 可移动道具配置
│   │       │   └── SceneConfig/            # 场景配置
│   │       ├── const/              # 常量定义
│   │       │   ├── ContainerConst.ts       # 容器常量
│   │       │   ├── EventConst.ts           # 事件常量
│   │       │   ├── FoodConst.ts            # 食物常量
│   │       │   ├── GamePlayerConst.ts      # 游戏玩家常量
│   │       │   ├── SceneConst.ts           # 场景常量
│   │       │   ├── StorageConst.ts         # 存储常量
│   │       │   └── TokenConst.ts           # 令牌常量
│   │       ├── data/               # 数据结构定义
│   │       │   ├── ContainerData.ts        # 容器数据
│   │       │   ├── EventData.ts            # 事件数据
│   │       │   ├── FoodData.ts             # 食物数据
│   │       │   ├── GamePlayerData.ts       # 游戏玩家数据
│   │       │   ├── InteractableData.ts     # 交互物数据
│   │       │   ├── MovablePropData.ts      # 可移动道具数据
│   │       │   ├── PlayerData.ts           # 玩家数据
│   │       │   ├── PropBindingData.ts      # 道具绑定数据
│   │       │   └── SceneData.ts            # 场景数据
│   │       ├── entity/             # 实体定义
│   │       │   ├── bag/            # 背包系统
│   │       │   ├── interactable/   # 交互物
│   │       │   │   ├── base/       # 基础交互物
│   │       │   │   ├── npc/        # NPC
│   │       │   │   └── prop/       # 道具
│   │       │   │       ├── immovableProp/  # 不可移动道具（垃圾桶、水槽、炉灶等）
│   │       │   │       └── movableProp/    # 可移动道具（容器、食物等）
│   │       │   └── player/         # 玩家系统
│   │       │       ├── BasePlayer.ts       # 基础玩家
│   │       │       ├── GamePlayer.ts       # 游戏玩家
│   │       │       └── OBPlayer.ts         # 旁观者玩家
│   │       └── mgr/                # 管理器系统
│   │           ├── BagMgr.ts               # 背包管理器
│   │           ├── ConfigMgr.ts            # 配置管理器
│   │           ├── InteractableMgr.ts      # 交互物管理器
│   │           ├── PlayerDataMgr.ts        # 玩家数据管理器
│   │           ├── PlayerMgr.ts            # 玩家管理器
│   │           ├── PropBindingMgr.ts       # 道具绑定管理器
│   │           ├── PropMgr.ts              # 道具管理器
│   │           ├── RemoteMgr.ts            # 远程管理器
│   │           └── SceneMgr.ts             # 场景管理器
│   └── types/                      # 服务端类型定义
└── shares/                         # 前后端共享代码
    ├── App.ts                      # 共享应用定义
    ├── data/                       # 共享数据结构
    └── types/                      # 共享类型定义
```

---

## 贡献

欢迎提交 Issue 和 Pull Request 从改进本项目。

### Issue 规范

- **Issue 状态标签**:
    - `open`: 待办/进行中 - 任务尚未完成
    - `closed`: 已关闭 - 任务已完成或取消

---

## 版权声明

本项目采用 MIT 许可证，详情请参见 [LICENSE](./LICENSE) 文件。

本项目受版权保护，虽然代码以 MIT 许可证发布，但强烈反对任何形式的抄袭行为。请在学习和使用时注重理解与创新，而非简单的复制。

**作者：Yuzu-46 (柚子 46)**
