const { ObjectiveCParser } = require('../../antlr/ObjectiveCParser')
const ClassNode = require('./ClassNode')
const CompoundStatementNode = require('./CompoundStatementNode')
const VarDeclarationNode = require('./VarDeclarationNode')
const DeclaratorNode = require('./DeclaratorNode')
const MessageExpressionNode = require('./MessageExpressionNode')
const MessageSelectorNode = require('./MessageSelectorNode')
const ClassImplementationNode = require('./ClassImplementationNode')
const CategoryInterfaceNode = require('./CategoryInterfaceNode')
const BlockTypeNode = require('./BlockTypeNode')
const OCMethodDefinitionNode = require('./OCMethodDefinitionNode')
const SimpleNode = require('./SimpleNode')
const CRYPTO = require('crypto')
const { TerminalNodeImpl } = require('antlr4/tree/Tree')
class MangoAST {
    constructor() {
        this.classes = [] // 所有得类
        this.stacks = [] // 栈
        this.nodeMap = {} // ctx : MangoNode
        this.topMangoNodes = [] // 顶级节点
    }

    pushStack(ctx) {
        let managNode = null
        if (ctx.ruleIndex == ObjectiveCParser.RULE_importDeclaration) { // 如果是类声明
            managNode = this._createClassNode(ctx)
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_compoundStatement) {
            managNode = this._createCompoundStatementNode(ctx)
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_varDeclaration) {
            managNode = this._createVarDeclarationNode(ctx)
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_declarator) {
            managNode = new DeclaratorNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_messageExpression) {
            managNode = new MessageExpressionNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_messageSelector) {
            managNode = new MessageSelectorNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_classImplementation) {
            managNode = new ClassImplementationNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_categoryInterface) {
            managNode = new CategoryInterfaceNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_blockType) {
            managNode = new BlockTypeNode()
        }
        else if (ctx.ruleIndex == ObjectiveCParser.RULE_ocMethodDefinition) {
            managNode = new OCMethodDefinitionNode()
        }
        else {
            managNode = this._createSimpleNode(ctx)
        }
        managNode.ctx = ctx
        this.setCTXMangoNodeMap(ctx, managNode)
        if (ctx.parentCtx) {
            let parentMangoNode = this.getMangoNode(ctx.parentCtx)
            managNode.parent = parentMangoNode
        } else {
            this.topMangoNodes.push(managNode)
        }

        this._updateProperty(ctx, managNode)
    }

    popStack(ctx) {
        let managNode = this.getMangoNode(ctx)
        for (const child of ctx.children) {
            if (!child.toStringTree) { // 忽略终结符节点
                continue
            }
            let childMangoNode = this.getMangoNode(child)
            managNode.children.push(childMangoNode)
        }
        this._updateParentProperty(ctx, managNode)  // 更新业务属性
        this._updateParentTerminalNode(ctx, managNode) // 补全终结符
    }

    getCTXIdentifier(ctx) {
        return CRYPTO.createHash('md5').update(ctx.toStringTree()).digest("hex")
    }

    // 创建Mango ClassNode
    _createClassNode(ctx) {
        const className = ctx.identifier().getText()
        const classNode = new ClassNode(className)
        classNode.ctx = ctx
        return classNode
    }

    // 普通节点
    _createSimpleNode(ctx) {
        const simpleNode = new SimpleNode()
        simpleNode.ctx = ctx
        return simpleNode
    }

    _createCompoundStatementNode(ctx) {
        const node = new CompoundStatementNode()
        node.ctx = ctx
        return node
    }
    _createVarDeclarationNode(ctx) {
        const node = new VarDeclarationNode()
        node.ctx = ctx
        return node
    }

    /**
     * 因为listener不会遍历终结符，导致MangoAST会丢失终结符节点，在这儿方法中做一个补偿
     * @param {*} ctx 
     */
    _updateParentTerminalNode(ctx, managNode) {
        if (!managNode) return // 顶级节点

        for (const childCTX of ctx.children) {
            let index = ctx.children.indexOf(childCTX)
            if (childCTX instanceof TerminalNodeImpl) { // 如果是终结符
                let childMangoNode = this._createSimpleNode(childCTX)
                childMangoNode.parent = managNode
                managNode.children.splice(index, 0, childMangoNode)
            }
            if (childCTX == ctx) {
                break;
            }
        }
    }

    // 更新MangoNode的一些业务属性
    _updateParentProperty(ctx, mangoNode) {
        if (!mangoNode) return
        if (mangoNode instanceof DeclaratorNode) {//1.语句声明,判断是否为block类型
            if (mangoNode.isBlock()) {
                let parentNode = mangoNode
                do {
                    parentNode = parentNode.parent
                    if (parentNode instanceof VarDeclarationNode) {
                        parentNode.isBlock = true
                        break;
                    }
                } while (parentNode);
            }
        } else if (mangoNode instanceof CompoundStatementNode) {
            if (ctx.parentCtx instanceof ObjectiveCParser.BlockExpressionContext) {
                mangoNode.isBlock = true
            }
        }
    }


    _updateProperty(ctx, mangoNode) {
        if (!mangoNode) return
        if (mangoNode instanceof CompoundStatementNode) {
            // 更新缩进
            let parentNode = mangoNode
            do {
                parentNode = parentNode.parent
                if (parentNode instanceof CompoundStatementNode) {
                    mangoNode.indentLevel = parentNode.indentLevel + 1;
                    break;
                }
            } while (parentNode);
        }
    }

    setCTXMangoNodeMap(ctx, mangoNode) {
        let ctxIdentifier = this.getCTXIdentifier(ctx)
        this.nodeMap[ctxIdentifier] = mangoNode
    }
    getMangoNode(ctx) {
        let ctxIdentifier = this.getCTXIdentifier(ctx)
        return this.nodeMap[ctxIdentifier]
    }


}

module.exports = MangoAST