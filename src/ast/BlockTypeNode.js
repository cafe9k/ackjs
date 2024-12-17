// Class节点
const MangoNode = require('./MangoNode')
module.exports = class BlockTypeNode extends MangoNode {
    dump() {
        return `Block`
    }
}