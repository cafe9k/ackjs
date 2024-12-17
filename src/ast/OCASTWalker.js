const FS = require('fs')
const PATH = require('path')
const Antlr4 = require('antlr4/index')
const { ObjectiveCLexer } = require('../../antlr/ObjectiveCLexer')
const { ObjectiveCParser } = require('../../antlr/ObjectiveCParser')
const OCASTListener = require('./OCASTListener')
const MangoAST = require('./MangoAST')
class OCASTWalker {
    translate(file) {
        const mangoAST = new MangoAST() // 转换为Mango类型的AST
        const content = FS.readFileSync(file).toString()
        const chars = new Antlr4.InputStream(content)
        const lexer = new ObjectiveCLexer(chars)
        const tokens = new Antlr4.CommonTokenStream(lexer)
        const parse = new ObjectiveCParser(tokens)
        parse.buildParseTrees = true
        const ast = parse.translationUnit()
        const listener = new OCASTListener(mangoAST)
        Antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, ast)
        console.log(mangoAST.topMangoNodes)
        let top = mangoAST.topMangoNodes[0]
        this.dumpMangoNode(top)
    }

    translateCode(content) {
        const mangoAST = new MangoAST() // 转换为Mango类型的AST
        const chars = new Antlr4.InputStream(content)
        const lexer = new ObjectiveCLexer(chars)
        const tokens = new Antlr4.CommonTokenStream(lexer)
        const parse = new ObjectiveCParser(tokens)
        parse.buildParseTrees = true
        const ast = parse.translationUnit()
        const listener = new OCASTListener(mangoAST)
        Antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, ast)
        console.log(mangoAST.topMangoNodes)
        let top = mangoAST.topMangoNodes[0]
        return top.dump()
    }
    dumpMangoNode(mangoNode) {
        let output = PATH.join(PATH.dirname(PATH.dirname(__dirname)), 'example', 'result.m')
        let content = mangoNode.dump()
        FS.writeFileSync(output, content)
    }
}
module.exports = OCASTWalker;