const MangoNode = require('./MangoNode')
module.exports = class CompoundStatementNode extends MangoNode {
    constructor() {
        super()
        this.isBlock = false
        this.indentLevel = 1 // 默认缩进等级
    }
    dump() {
        let indent = this.getIndent()
        let content = `\n${this.getCloseIndent()}{\n`
        for (let index = 1; index < this.children.length - 1; index++) {
            const child = this.children[index];
            content += `${indent}${child.dump()}\n`
        }
        content += `${this.getCloseIndent()}}${this.isBlock ? '' : ''}`
        return content
    }

    getCloseIndent() {
        return this.getIndentString(this.indentLevel - 1)
    }
}