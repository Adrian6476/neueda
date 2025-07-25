# 天气查询系统 (Weather Query System)

一个基于 Node.js、MySQL 和高德地图API的天气查询网站，支持用户注册、登录和天气数据查询功能。

## 功能特性

- 🔐 用户注册和登录系统
- 🌤️ 实时天气查询
- 📅 天气预报查询
- 📊 查询历史记录
- 🛡️ JWT 身份验证
- 🚦 API 访问限制
- 📱 响应式设计

## 技术栈

- **后端**: Node.js, Express.js
- **数据库**: MySQL
- **包管理**: pnpm
- **API**: 高德地图天气API
- **身份验证**: JWT (JSON Web Tokens)
- **安全**: Helmet, CORS, bcryptjs
- **前端**: 原生 HTML/CSS/JavaScript

## 项目结构

```
neueda/
├── src/
│   ├── config/          # 数据库配置
│   ├── controllers/     # 控制器
│   ├── middleware/      # 中间件
│   ├── models/         # 数据模型
│   ├── routes/         # 路由定义
│   ├── services/       # 服务层
│   └── server.js       # 主服务器文件
├── public/
│   └── index.html      # 前端页面
├── database_setup.sql  # 数据库初始化脚本
├── .env               # 环境变量
└── package.json       # 项目配置
```

## 安装和配置

### 1. 环境要求

- Node.js >= 16.0.0
- MySQL >= 8.0
- pnpm

### 2. 克隆项目并安装依赖

```bash
# 安装依赖
pnpm install
```

### 3. 数据库设置

1. 创建 MySQL 数据库：
```sql
CREATE DATABASE weather_app;
```

2. 运行数据库初始化脚本：
```bash
mysql -u your_username -p weather_app < database_setup.sql
```

或者启动应用时会自动创建表结构。

### 4. 环境变量配置

复制 `.env` 文件并配置以下参数：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=weather_app

# JWT 密钥（请使用强密码）
JWT_SECRET=your_very_secure_secret_key_here

# 高德地图API密钥
AMAP_API_KEY=your_amap_api_key_here

# 服务器配置
PORT=3000
NODE_ENV=development
```

### 5. 获取高德地图API密钥

1. 访问 [高德开放平台](https://lbs.amap.com/dev/)
2. 注册账号并创建应用
3. 选择"Web服务API"类型
4. 获取API Key并配置到 `.env` 文件中

## 运行应用

### 开发模式
```bash
pnpm run dev
```

### 生产模式
```bash
pnpm start
```

服务器将在 `http://localhost:3000` 启动。

## API 文档

### 认证接口

#### 用户注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123"
}
```

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}
```

#### 获取用户信息
```
GET /api/auth/profile
Authorization: Bearer <token>
```

### 天气接口

#### 查询实时天气
```
GET /api/weather/current?city=110101
Authorization: Bearer <token> (可选)
```

#### 查询天气预报
```
GET /api/weather/forecast?city=110101
Authorization: Bearer <token> (可选)
```

#### 获取查询历史
```
GET /api/weather/history
Authorization: Bearer <token>
```

### 城市编码说明

使用高德地图的城市编码（adcode），例如：
- 北京东城区: 110101
- 上海黄浦区: 310101
- 广州荔湾区: 440101
- 深圳罗湖区: 440303

完整城市编码请参考：[高德地图城市编码表](https://lbs.amap.com/api/webservice/download)

## 使用方法

### 前端界面

1. 打开浏览器访问 `http://localhost:3000`
2. 注册新用户或登录现有账户
3. 在天气查询区域输入城市编码
4. 选择查询类型（实况天气或天气预报）
5. 查看天气信息和查询历史

### 直接API调用

```javascript
// 获取北京东城区实时天气
const response = await fetch('/api/weather/current?city=110101');
const weatherData = await response.json();
console.log(weatherData);
```

## 安全特性

- **密码加密**: 使用 bcryptjs 进行密码哈希
- **JWT认证**: 安全的用户身份验证
- **访问限制**: 15分钟内每IP最多100次请求
- **CORS保护**: 跨域访问控制
- **Helmet**: HTTP头安全防护
- **输入验证**: express-validator 参数验证

## 错误处理

应用包含完整的错误处理机制：
- 数据库连接错误
- API调用失败
- 身份验证错误
- 参数验证错误

## 开发和调试

### 查看日志
应用会输出详细的日志信息，包括：
- 数据库连接状态
- API调用结果
- 错误信息

### 健康检查
访问 `/api/health` 端点检查服务状态。

## 部署

### 生产环境配置

1. 设置 `NODE_ENV=production`
2. 使用强JWT密钥
3. 配置反向代理（如Nginx）
4. 启用HTTPS
5. 设置适当的数据库权限

### PM2 部署示例
```bash
npm install -g pm2
pm2 start src/server.js --name weather-app
pm2 save
pm2 startup
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

ISC License

## 联系方式

如有问题请创建 Issue 或联系项目维护者。
