# AbstractFactory 使用指南 / AbstractFactory Usage Guide

## 概述 / Overview

AbstractFactory 现在支持两种注册方式：

1. **类型注册** - 通过接口类型注册实现类
2. **标识符注册** - 通过字符串标识符注册实现类（推荐用于配置表注入）

AbstractFactory now supports two registration methods:

1. **Type Registration** - Register implementation classes through interface types
2. **Token Registration** - Register implementation classes through string tokens (recommended for configuration-based injection)

## 字符串标识符注册 / String Token Registration

### 1. 基本用法 / Basic Usage

```typescript
import { factory, FactoryToken, SingletonToken } from './AbstractFactory';

// 定义接口 / Define interface
interface IPlayerService {
    getPlayer(id: string): Player;
}

// 实现类 / Implementation class
@FactoryToken('player.service')
class PlayerService implements IPlayerService {
    getPlayer(id: string): Player {
        // 实现逻辑 / Implementation logic
        return new Player(id);
    }
}

// 使用 / Usage
const playerService = factory.createByToken<IPlayerService>('player.service');
```

### 2. 单例模式 / Singleton Pattern

```typescript
@SingletonToken('database.connection', { cacheKey: 'db' })
class DatabaseConnection {
    private connection: any;

    constructor() {
        this.connection = this.establishConnection();
    }

    private establishConnection() {
        // 建立数据库连接 / Establish database connection
        return {
            /* connection details */
        };
    }

    query(sql: string) {
        // 执行查询 / Execute query
        return this.connection.execute(sql);
    }
}

// 使用单例 / Use singleton
const db1 = factory.createByToken<DatabaseConnection>('database.connection');
const db2 = factory.createByToken<DatabaseConnection>('database.connection');
console.log(db1 === db2); // true - 同一个实例 / Same instance
```

### 3. 依赖注入 / Dependency Injection

```typescript
@FactoryToken('logger.service')
class LoggerService {
    log(message: string) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}

@FactoryToken('user.service')
class UserService {
    constructor(
        @Inject('logger.service') private logger: LoggerService,
        @Inject('database.connection') private db: DatabaseConnection
    ) {}

    createUser(userData: any) {
        this.logger.log('Creating user...');
        // 使用数据库连接创建用户 / Use database connection to create user
        return this.db.query('INSERT INTO users ...');
    }
}

// 创建带依赖的实例 / Create instance with dependencies
const logger = factory.createByToken<LoggerService>('logger.service');
const db = factory.createByToken<DatabaseConnection>('database.connection');
const userService = factory.createWithDependenciesByToken<UserService>(
    'user.service',
    [logger, db]
);
```

## 配置表注入 / Configuration-Based Injection

### 1. 配置对象定义 / Configuration Object Definition

```typescript
// 配置表 / Configuration table
const serviceConfig = {
    'player.service': {
        implementation: PlayerService,
        config: { singleton: true, cacheKey: 'player' },
    },
    'database.connection': {
        implementation: DatabaseConnection,
        config: { singleton: true, cacheKey: 'db' },
    },
    'logger.service': {
        implementation: LoggerService,
        config: { singleton: true },
    },
    'user.service': {
        implementation: UserService,
        config: {
            singleton: false,
            dependencies: ['logger.service', 'database.connection'],
        },
    },
};

// 批量注册 / Batch registration
factory.registerFromConfig(serviceConfig);
```

### 2. 从配置文件加载 / Load from Configuration File

```typescript
// config/services.json
{
  "services": {
    "player.service": {
      "implementation": "PlayerService",
      "singleton": true,
      "cacheKey": "player"
    },
    "database.connection": {
      "implementation": "DatabaseConnection",
      "singleton": true,
      "cacheKey": "db"
    }
  }
}

// 加载配置 / Load configuration
import * as fs from 'fs';
import * as path from 'path';

function loadServiceConfig() {
  const configPath = path.join(__dirname, 'config/services.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // 实现类映射 / Implementation class mapping
  const implementationMap = {
    'PlayerService': PlayerService,
    'DatabaseConnection': DatabaseConnection,
    'LoggerService': LoggerService,
    'UserService': UserService
  };

  // 转换为工厂配置格式 / Convert to factory config format
  const factoryConfig: Record<string, { implementation: new () => unknown; config?: FactoryConfig }> = {};

  for (const [token, serviceConfig] of Object.entries(config.services)) {
    const implementationName = (serviceConfig as any).implementation;
    const implementation = implementationMap[implementationName];

    if (implementation) {
      factoryConfig[token] = {
        implementation,
        config: {
          singleton: (serviceConfig as any).singleton || false,
          cacheKey: (serviceConfig as any).cacheKey,
          dependencies: (serviceConfig as any).dependencies || []
        }
      };
    }
  }

  return factoryConfig;
}

// 注册服务 / Register services
const serviceConfig = loadServiceConfig();
factory.registerFromConfig(serviceConfig);
```

## 游戏示例 / Game Example

### 1. 游戏服务注册 / Game Service Registration

```typescript
// 游戏服务接口 / Game service interfaces
interface IGameEngine {
    start(): void;
    stop(): void;
}

interface IPhysicsEngine {
    update(deltaTime: number): void;
}

interface IRenderEngine {
    render(): void;
}

// 实现类 / Implementation classes
@SingletonToken('game.engine')
class GameEngine implements IGameEngine {
    constructor(
        @Inject('physics.engine') private physics: IPhysicsEngine,
        @Inject('render.engine') private render: IRenderEngine
    ) {}

    start() {
        console.log('Game engine started');
    }

    stop() {
        console.log('Game engine stopped');
    }
}

@SingletonToken('physics.engine')
class PhysicsEngine implements IPhysicsEngine {
    update(deltaTime: number) {
        // 物理更新逻辑 / Physics update logic
        console.log(`Physics updated: ${deltaTime}ms`);
    }
}

@SingletonToken('render.engine')
class RenderEngine implements IRenderEngine {
    render() {
        // 渲染逻辑 / Rendering logic
        console.log('Rendering frame');
    }
}

// 游戏配置 / Game configuration
const gameConfig = {
    'game.engine': {
        implementation: GameEngine,
        config: {
            singleton: true,
            dependencies: ['physics.engine', 'render.engine'],
        },
    },
    'physics.engine': {
        implementation: PhysicsEngine,
        config: { singleton: true },
    },
    'render.engine': {
        implementation: RenderEngine,
        config: { singleton: true },
    },
};

// 注册游戏服务 / Register game services
factory.registerFromConfig(gameConfig);

// 使用游戏引擎 / Use game engine
const gameEngine = factory.createByToken<IGameEngine>('game.engine');
gameEngine.start();
```

### 2. 动态服务切换 / Dynamic Service Switching

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
function switchRenderEngine(engineType: 'opengl' | 'vulkan') {
    const token = `render.engine.${engineType}`;
    const engine = factory.createByToken<IRenderEngine>(token);
    return engine;
}

// 使用 / Usage
const openglEngine = switchRenderEngine('opengl');
const vulkanEngine = switchRenderEngine('vulkan');
```

## 最佳实践 / Best Practices

### 1. 命名约定 / Naming Conventions

```typescript
// 推荐使用点分隔的命名方式 / Recommended dot-separated naming
'player.service'; // 玩家服务 / Player service
'database.connection'; // 数据库连接 / Database connection
'game.engine'; // 游戏引擎 / Game engine
'physics.engine'; // 物理引擎 / Physics engine
'render.engine.opengl'; // OpenGL渲染引擎 / OpenGL render engine
```

### 2. 配置管理 / Configuration Management

```typescript
// 环境配置 / Environment configuration
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
    // 使用默认实现 / Use default implementation
    const defaultService = new DefaultService();
}
```

## 性能优化 / Performance Optimization

### 1. 缓存策略 / Caching Strategy

```typescript
// 单例服务自动缓存 / Singleton services are automatically cached
@SingletonToken('heavy.service')
class HeavyService {
    constructor() {
        // 耗时的初始化 / Expensive initialization
        this.initialize();
    }

    private initialize() {
        // 初始化逻辑 / Initialization logic
    }
}

// 多次创建返回相同实例 / Multiple creations return the same instance
const service1 = factory.createByToken<HeavyService>('heavy.service');
const service2 = factory.createByToken<HeavyService>('heavy.service');
// service1 === service2
```

### 2. 延迟加载 / Lazy Loading

```typescript
// 服务只在需要时创建 / Services are created only when needed
function getPlayerService() {
    return factory.createByToken<IPlayerService>('player.service');
}

// 第一次调用时创建 / Created on first call
const playerService = getPlayerService();
```

## 总结 / Summary

字符串标识符注册提供了以下优势：

1. **配置驱动** - 可以通过配置文件管理依赖关系
2. **动态切换** - 运行时可以切换不同的实现
3. **解耦** - 代码不直接依赖具体的实现类
4. **可测试性** - 便于单元测试和模拟
5. **可扩展性** - 易于添加新的实现

String token registration provides the following advantages:

1. **Configuration-driven** - Dependency relationships can be managed through configuration files
2. **Dynamic switching** - Different implementations can be switched at runtime
3. **Decoupling** - Code doesn't directly depend on specific implementation classes
4. **Testability** - Easy for unit testing and mocking
5. **Extensibility** - Easy to add new implementations
