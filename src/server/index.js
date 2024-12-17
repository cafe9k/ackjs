const PATH = require('path')
const EXPRESS = require('express')
const OCASTWalker = require('../ast/OCASTWalker')

const app = EXPRESS()
const PORT = process.env.PORT || 3000;  
const cors = require('cors');

// 记录启动信息
console.log(`[${new Date().toISOString()}] Server starting...`)
console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || 'development'}`)

// 使用cors中间件，允许所有跨域请求
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// 请求日志中间件
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

app.use(EXPRESS.json())

// 静态资源路由
app.use('/Public', EXPRESS.static(PATH.join(__dirname, 'html/Public')))

// 页面路由
app.get('/', (req, res) => {
    console.log(`[${new Date().toISOString()}] Serving index page`)
    res.sendFile(PATH.join(__dirname, 'html', 'index.html'))
})

app.get('/converter', (req, res) => {
    console.log(`[${new Date().toISOString()}] Serving converter page`)
    res.sendFile(PATH.join(__dirname, 'html', 'converter.html'))
})

// API路由，转换OC代码为代码
app.use('/convertCode', EXPRESS.urlencoded({ extended: false }), (req, res) => {
    console.log(`[${new Date().toISOString()}] Converting code, input length: ${req.body.code?.length || 0}`)
    const { code } = req.body
    let walker = new OCASTWalker()
    try {
        let translateCode = walker.translateCode(code)
        console.log(`[${new Date().toISOString()}] Code conversion successful`)
        res.json({
            code: translateCode,
            errors: [],
            status: 0,
        })
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Code conversion error:`, error)
        res.json({
            code: '',
            errors: [`${error}`],
            status: 1,
        })
    }
})

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err)
    res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] App listening on port ${PORT}!`)
    console.log(`[${new Date().toISOString()}] Server URL: ${process.env.RAILWAY_STATIC_URL || `http://localhost:${PORT}`}`)
})