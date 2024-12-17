const PATH = require('path')
const EXPRESS = require('express')
const OCASTWalker = require('../ast/OCASTWalker')

const app = EXPRESS()
const PORT = process.env.PORT || 3000;  

app.use(EXPRESS.json())

// 静态资源路由
app.use('/Public', EXPRESS.static(PATH.join(__dirname, 'html/Public')))

// 页面路由
app.get('/', (req, res) => {
    res.sendFile(PATH.join(__dirname, 'html', 'index.html'))
})

app.get('/converter', (req, res) => {
    res.sendFile(PATH.join(__dirname, 'html', 'converter.html'))
})

// API路由，转换OC代码为Mango热修代码
app.use('/convertCode', EXPRESS.urlencoded({ extended: false }), (req, res) => {
    const { code } = req.body
    let walker = new OCASTWalker()
    try {
        let translateCode = walker.translateCode(code)
        res.json({
            code: translateCode,
            errors: [],
            status: 0,
        })
    } catch (error) {
        res.json({
            code: '',
            errors: [`${error}`],
            status: 1,
        })
    }
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))