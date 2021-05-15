const fs = require('fs');
const showdown = require('showdown');
const { 
    escapeCurlyBrackets,
    escapeCodeBlocksWithStringLiteral,
    unescapeAngleBrackets,
} = require('./my-plugins')

showdown.setFlavor('github')

// we need to pass these options to read ops, otherwise the default is Buffer
const fsOptions = { encoding: 'utf8' }

const converter = new showdown.Converter({
    extensions: [
        ...escapeCodeBlocksWithStringLiteral,
        ...unescapeAngleBrackets,
        // ...escapeCurlyBrackets
    ]
});

const filenames = fs.readdirSync('markdown', fsOptions)
console.log('converting ', filenames)

const manifest = []

for(const filename of filenames) {
    const sourcepath = `markdown/${filename}`
    const functionName = filename.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('').slice(1,-3)
    
    const md = fs.readFileSync(sourcepath, fsOptions)
    const html = converter.makeHtml(md)
    // convert class= to className= for React
    const jsx = `
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        import Link from 'next/link'
        
        export default function ${functionName}() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}>${html}</div>
            )
        }
    `.replace(/class=/g, 'className=')

    // replace .md with .jsx
    const title = filename.slice(0, -3)
    const distpath = 'pages/' + title + '.jsx'
    fs.writeFileSync(distpath, jsx)

    title !== 'index' && manifest.push(title)
    console.log(`${sourcepath} -> ${distpath}`)
}

const json = JSON.stringify(manifest)
fs.writeFileSync('scripts/manifest.js', `module.exports = ${json}`)
console.log('\nsuccess\n')