const { ObjectiveCParserListener } = require('../../antlr/ObjectiveCParserListener')

class OCASTListener extends ObjectiveCParserListener {
    constructor(ast) {
        super()
        this.ast = ast // 转换树
    }
    enterEveryRule(ctx) {
        this.ast.pushStack(ctx)
    }
    exitEveryRule(ctx) {
        this.ast.popStack(ctx)
    }
}

module.exports = OCASTListener;