const MangoNode = require('./MangoNode')
module.exports = class MessageExpressionNode extends MangoNode {
    dump() {
        /*
            [a msg:b ] => a.msg:(b) 
        */
        let receiver = this.children[1]
        let messageSelector = this.children[2]
        let content = `${receiver.dump()}.${messageSelector.dump()}`
        return content
    }
}