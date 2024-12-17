
const { ObjectiveCLexer } = require('../../antlr/ObjectiveCLexer')
function notNeedWhiteSpaceToken(left,token) {
    // Lexer存在空token？
    // const tokens = [
    //     // Separators
    //     'SEMI',//';';
    //     'LP',//'(';
    //     'RP',//')';
    //     'LBRACE', //'{';
    //     'RBRACE',// '}';
    //     'LBRACK',// '[';
    //     'RBRACK',// ']';
    //     'SEMI',//';';
    //     'COMMA',// ',';
    //     'DOT',// '.';
    //     'STRUCTACCESS',// '->';
    //     'AT',// '@';
    // ]

    const tokens = [
        // Separators
        ';',
        '(',//;
        ')',//;
        '{', //;
        '}',// '';
        '[',// '';
        ']',// '';
        ',',// ',';
        '.',// '';
        '->',// '';
        '@',// '';
        '-',
        ':',
        '^',
        '"',
        '!',
    ]

    for (const t of tokens) {
        if (t == token) {
            return true
        }
        if(left){ // 表达式左边
            if (token.endsWith(t)) {
                return true
            }
        }else{
            if(token.startsWith(t)){
                return true
            }
        }
    }
    return false
}

module.exports = {
    notNeedWhiteSpaceToken
}