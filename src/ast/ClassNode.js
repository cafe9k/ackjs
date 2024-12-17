// Class节点
const MangoNode = require('./MangoNode')
module.exports = class ClassNode extends MangoNode {
    constructor(className) {
        super()
        this.className = className
        this.methods = [] // 存放所有的方法
    }
    addMethod(method) {
        this.methods.push(method)
    }
    dump(){
        return ''
    }
}