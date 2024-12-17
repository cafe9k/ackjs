const { notNeedWhiteSpaceToken } = require('../config')
module.exports = class MangoNode {
    constructor() {
        this.ctx = null // 对应的OBJC CTX
        this.parent = null
        this.children = []
        this.indentLevel = 0
    }
    getText() {
        return this.ctx.getText()
    }
    dump() {
        if (this.children.length == 0) {
            return this.getText()
        }
        let dump = ''
        for (const child of this.children) {
            let sperator = this._getSperator(dump, child)
            dump = `${dump}${sperator}${child.dump()}`
        }
        return dump
    }
    getIndent() {
        return this.getIndentString(this.indentLevel)
    }
    getIndentString(indentLevel) {
        let indent = ''
        for (let index = 0; index < indentLevel; index++) {
            indent += '\t'
        }
        return indent
    }
    _getSperator(dump, child) {
        if (!dump) return ''
        if (dump.endsWith('=') ||
            dump == 'return'
        ) {
            return ' '
        }
        return (this._needWhiteSpace(false,child.getText()) && this._needWhiteSpace(true,dump)) ? ' ' : ''
    }
    _needWhiteSpace(left,token) {
        return !notNeedWhiteSpaceToken(left,token)
    }
}