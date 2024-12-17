const MangoNode = require('./MangoNode')
module.exports = class OCMethodDefinitionNode extends MangoNode {
    dump() {
        let content = super.dump()
        return `\n${content}\n`
    }
}