const MangoNode = require('./MangoNode')
module.exports = class VarDeclarationNode extends MangoNode {
    constructor() {
        super()
        this.isBlock = false // 是否为block声明语句
    }
    dump() {
        if (!this.isBlock) {
            return super.dump()
        }
        let content = ``
        for (let index = 1; index < this.children.length; index++) {
            const element = this.children[index];
            content = `${content} ${element.dump()}`
        }

        return content
    }
}