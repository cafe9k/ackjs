// Class节点
const MangoNode = require('./MangoNode')
module.exports = class ClassImplementationNode extends MangoNode {
    constructor(){
        super()
        this.indentLevel = 0
    }
    dump() {
        const genericTypeSpecifier = this.children[1]
        let identifier = null
        let implementationDefinitionList = null
        if (this.children.length == 4) {
            implementationDefinitionList = this.children[2]
        } else if (this.children.length == 5) {
            identifier = this.children[2]
            implementationDefinitionList = this.children[3]
        }
        let content = `\nclass ${genericTypeSpecifier.dump()}`
        if (identifier) { // super
            content = `${content} : ${identifier.dump()}`
        }
        if (implementationDefinitionList) {
            content = `${content}\n{\n ${implementationDefinitionList.dump()} \n}\n`
        }
        return content
    }
}