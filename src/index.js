const PATH = require('path')
const OCASTWalker = require('./ast/OCASTWalker')

const sourceFile = PATH.join(PATH.dirname(__dirname), 'example', 'test.m')
const walker = new OCASTWalker()
walker.translate(sourceFile)