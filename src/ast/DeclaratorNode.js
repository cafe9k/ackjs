const MangoNode = require('./MangoNode')
module.exports = class DeclaratorNode extends MangoNode {

    dump() {
        let isBlock = this.isBlock()
        if(!isBlock){
            return super.dump()
        }
        let pointer = null
        let directDeclarator = null
        let content = ``
        if (this.children.length >= 2) {
            pointer = this.children[0]
            directDeclarator = this.children[1]

        } else {
            directDeclarator = this.children[0]
        }
        content = `Block ${directDeclarator.ctx.identifier().getText()}`

        return content
        
    }

    isBlock() {
        return this.getText().indexOf('^') != -1
    }
}