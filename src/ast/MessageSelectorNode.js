const MangoNode = require('./MangoNode')
module.exports = class MessageSelectorNode extends MangoNode {
    dump() {
        if (this.children.length == 1) {
            let child = this.children[0] 
            if(child.children.length <= 1){ // 无参数
                return `${child.dump()}()`
            }
            return  `${child.children[0].dump()}${child.children[1].dump()}(${child.children[2].dump()})`
            
        }
        let content = ''
        let fullSelector = ``
        let fullArgument = ``
        for (const keywordArgument of this.children) {
            let selector = keywordArgument.children[0].dump()
            fullSelector += `${selector}${keywordArgument.children[1].dump()}`
            fullArgument += `${keywordArgument.children[2].dump()},`
        }
        fullArgument = fullArgument.substr(0, fullArgument.length - 1)
        content = `${fullSelector}(${fullArgument})`
        return content
    }
}