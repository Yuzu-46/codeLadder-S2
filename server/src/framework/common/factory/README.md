# AbstractFactory 框架 / AbstractFactory Framework

一个强大的 TypeScript 抽象工厂模式实现，支持字符串标识符注册和配置表注入。

A powerful TypeScript implementation of the Abstract Factory pattern with support for string token registration and configuration-based dependency injection.

## ✨ 新功能 / New Features

### 🆕 字符串标识符注册 / String Token Registration

现在支持通过字符串标识符注册和创建实例，便于配置表注入：

Now supports registration and instance creation through string tokens, making configuration-based injection easier:

```typescript
// 使用装饰器注册 / Register using decorators
@FactoryToken('player.service')
class PlayerService {
    // 实现逻辑 / Implementation logic
}

// 通过标识符创建实例 / Create instance by token
const playerService = factory.createByToken<PlayerService>('player.service');
```

### 🔧 配置表注入 / Configuration-Based Injection

支持通过配置对象批量注册服务：

Supports batch service registration through configuration objects:

```typescript
const config = {
    'player.service': {
        implementation: PlayerService,
        config: { singleton: true },
    },
    'database.connection': {
        implementation: DatabaseConnection,
        config: { singleton: true },
    },
};

factory.registerFromConfig(config);
```

## 🚀 快速开始 / Quick Start

### 安装依赖 / Install Dependencies

```bash
cd server
npm install
```

### 基本用法 / Basic Usage

```typescript
import {
    factory,
    FactoryToken,
    SingletonToken,
    Inject,
} from './AbstractFactory';

// 定义接口 / Define interface
interface IPlayerService {
    getPlayer(id: string): Player;
}

// 实现类 / Implementation class
@FactoryToken('player.service')
class PlayerService implements IPlayerService {
    constructor(@Inject('logger.service') private logger: ILogger) {}

    getPlayer(id: string): Player {
        this.logger.log(`Getting player: ${id}`);
        return new Player(id);
    }
}

// 使用 / Usage
const playerService = factory.createByToken<IPlayerService>('player.service');
```

## 📚 核心功能 / Core Features

### 1. 字符串标识符注册 / String Token Registration

- **@FactoryToken()** - 通过标识符注册实现类
- **@SingletonToken()** - 通过标识符注册单例实现类
- **createByToken()** - 通过标识符创建实例
- **createWithDependenciesByToken()** - 通过标识符创建带依赖的实例

### 2. 配置表管理 / Configuration Management

- **registerFromConfig()** - 批量注册配置
- **registerByToken()** - 手动注册标识符映射
- **unregisterByToken()** - 注销标识符映射

### 3. 依赖注入 / Dependency Injection

- **@Inject()** - 注入依赖
- 支持构造函数参数注入
- 支持字符串标识符注入

### 4. 缓存管理 / Cache Management

- 自动单例缓存
- 可配置缓存键
- 缓存过期时间管理
- 缓存统计信息

## 🎮 游戏开发示例 / Game Development Example

```typescript
// 游戏服务配置 / Game service configuration
const gameConfig = {
    'logger.service': {
        implementation: LoggerService,
        config: { singleton: true },
    },
    'physics.engine': {
        implementation: PhysicsEngine,
        config: {
            singleton: true,
            dependencies: ['logger.service'],
        },
    },
    'render.engine': {
        implementation: RenderEngine,
        config: {
            singleton: true,
            dependencies: ['logger.service'],
        },
    },
    'game.engine': {
        implementation: GameEngine,
        config: {
            singleton: true,
            dependencies: ['physics.engine', 'render.engine', 'logger.service'],
        },
    },
};

// 注册游戏服务 / Register game services
factory.registerFromConfig(gameConfig);

// 使用游戏引擎 / Use game engine
const gameEngine = factory.createByToken<IGameEngine>('game.engine');
gameEngine.start();
```

## 🔄 动态服务切换 / Dynamic Service Switching

```typescript
// 不同渲染引擎实现 / Different render engine implementations
@FactoryToken('render.engine.opengl')
class OpenGLRenderEngine implements IRenderEngine {
    render() {
        console.log('OpenGL rendering');
    }
}

@FactoryToken('render.engine.vulkan')
class VulkanRenderEngine implements IRenderEngine {
    render() {
        console.log('Vulkan rendering');
    }
}

// 根据配置动态切换 / Dynamic switching based on configuration
function switchRenderEngine(engineType: 'opengl' | 'vulkan'): IRenderEngine {
    const token = `render.engine.${engineType}`;
    return factory.createByToken<IRenderEngine>(token);
}
```

## 📊 监控和调试 / Monitoring and Debugging

```typescript
// 获取注册表信息 / Get registry information
const registryInfo = factory.getRegistryInfo();
console.log(`Type registry: ${registryInfo.typeSize} entries`);
console.log(`Token registry: ${registryInfo.tokenSize} entries`);

// 获取缓存统计 / Get cache statistics
const cacheStats = factory.getCacheStats();
console.log(`Cache size: ${cacheStats.size}`);
console.log(`Cache entries: ${cacheStats.entries.join(', ')}`);
```

## 🧪 测试 / Testing

运行测试示例：

Run test examples:

```bash
# 编译 TypeScript
npm run build

# 运行示例
node dist/framework/common/factory/run-example.js
```

## 📖 API 参考 / API Reference

### 装饰器 / Decorators

- **@FactoryToken(token: string, config?: FactoryConfig)** - 通过标识符注册实现类
- **@SingletonToken(token: string, config?: Omit<FactoryConfig, 'singleton'>)** - 通过标识符注册单例实现类
- **@Inject(token?: string)** - 注入依赖

### 工厂方法 / Factory Methods

- **createByToken<T>(token: string): T** - 通过标识符创建实例
- **createWithDependenciesByToken<T>(token: string, dependencies: unknown[]): T** - 通过标识符创建带依赖的实例
- **registerByToken<T>(token: string, implementationType: new () => T, config?: FactoryConfig): void** - 注册标识符映射
- **unregisterByToken(token: string): void** - 注销标识符映射
- **registerFromConfig(config: Record<string, { implementation: new (...args: any[]) => unknown; config?: FactoryConfig }>): void** - 批量注册配置

### 配置选项 / Configuration Options

```typescript
interface FactoryConfig {
    singleton?: boolean; // 是否为单例
    cacheKey?: string; // 自定义缓存键
    dependencies?: string[]; // 依赖项列表
    token?: string; // 字符串标识符
}
```

## 🎯 最佳实践 / Best Practices

### 1. 命名约定 / Naming Conventions

```typescript
// 推荐使用点分隔的命名方式
'player.service'; // 玩家服务
'database.connection'; // 数据库连接
'game.engine'; // 游戏引擎
'physics.engine'; // 物理引擎
'render.engine.opengl'; // OpenGL渲染引擎
```

### 2. 配置管理 / Configuration Management

```typescript
// 环境配置
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        'database.connection': {
            implementation: SQLiteConnection,
            config: { singleton: true },
        },
    },
    production: {
        'database.connection': {
            implementation: PostgreSQLConnection,
            config: { singleton: true },
        },
    },
};

factory.registerFromConfig(config[env]);
```

### 3. 错误处理 / Error Handling

```typescript
try {
    const service = factory.createByToken<IService>('unknown.service');
} catch (error) {
    console.error('Service not found:', error.message);
    // 使用默认实现
    const defaultService = new DefaultService();
}
```

## 🔧 性能优化 / Performance Optimization

### 1. 缓存策略 / Caching Strategy

- 单例服务自动缓存
- 非单例服务根据需要缓存
- 定期清理过期缓存

### 2. 延迟加载 / Lazy Loading

```typescript
// 服务只在需要时创建
function getPlayerService() {
    return factory.createByToken<IPlayerService>('player.service');
}
```

## 📝 更新日志 / Changelog

### v2.0.0 - 字符串标识符支持

- ✨ 新增字符串标识符注册功能
- ✨ 新增配置表注入支持
- ✨ 新增动态服务切换功能
- ✨ 新增批量注册配置方法
- 🔧 优化依赖注入机制
- 📚 完善文档和示例

### v1.0.0 - 基础功能

- 🎯 实现抽象工厂模式
- 🔧 支持依赖注入
- 💾 实现缓存机制
- 🎮 提供游戏开发示例

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Welcome to submit Issues and Pull Requests!

## 📄 许可证 / License

MIT License
