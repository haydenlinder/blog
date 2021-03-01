// For proper indenting in <code></code> tags, 
// we need to wrap out code expressions with literal: {``} 
// I used this similar solution from https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element
module.exports = {
    escapeCodeBlocksWithStringLiteral: [
        {
            type: 'output',
            regex: new RegExp(`<code>`, 'g'),
            replace: `<code>{\``
        },
        {
            type: 'output',
            regex: new RegExp(`<code (.*)>`, 'g'),
            replace: `<code $1>{\``
        },
        {
            type: 'output',
            regex: new RegExp(`</code>`, 'g'),
            replace: `\`}</code>`
        }
    ],
    unescapeAngleBrackets: [
        {
            type: 'output',
            regex: new RegExp(`&lt;`, 'g'),
            replace: `<`
        },
        {
            type: 'output',
            regex: new RegExp(`&gt;`, 'g'),
            replace: `>`
        }
    ],
    escapeCurlyBrackets: [
        {
            type: 'output',
            regex: new RegExp(`{`, 'g'),
            replace: `&#123;`
        },
        {
            type: 'output',
            regex: new RegExp(`}`, 'g'),
            replace: `&#125;`
        }
    ]
}