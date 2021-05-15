
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        import Link from 'next/link'
        
        export default function reateAJamstackBlog() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}><h1 id="new-blog-who-dis">New Blog, Who Dis?</h1>
<h2 id="how-to-create-a-blog-with-markdown">How to create a blog with markdown</h2>
<p>Author: <a href="http://haydenlinder.com">Hayden Linder</a></p>
<p>Published 5/15/2021</p>
<p><br/></p>
<hr />
<p><br/></p>
<h2 id="motivation">Motivation</h2>
<p>I've been meaning to start a blog for a while now and while I was looking around for options, I didn't see anything that met my needs, so I decided to roll my own.</p>
<h2 id="requirements">Requirements</h2>
<p>I wanted to be able to write blog posts in <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a> and then have the file converted to HTML. This would help the site maintain consistent styling, make it easy for people who don't necessarily know much HTML to contribute, and allow me to leverage GitHub as a stand-in for user authentication. I also wanted to make sure that my site had great SEO, so that people could easily find the articles online. Finally, I needed syntax highlighting for code blocks. </p>
<h2 id="stack">Stack</h2>
<p>After doing more research, here's the stack I settled on:</p>
<table>
<thead>
<tr>
<th id="**tech**"><strong>Tech</strong></th>
<th id="**purpose**"><strong>Purpose</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://nextjs.org/">Next.js</a></td>
<td>SEO</td>
</tr>
<tr>
<td><a href="http://showdownjs.com/">Showdown.js</a></td>
<td>Markdown -> HTML</td>
</tr>
<tr>
<td><a href="https://highlightjs.org/">Highlight.js</a></td>
<td>Syntax Highlighting</td>
</tr>
<tr>
<td><a href="https://material-ui.com/">Material-UI</a></td>
<td>Plug-and-play buttons, menus, media queries for react, etc</td>
</tr>
</tbody>
</table>
<h2 id="implementation">Implementation</h2>
<p>The tricky part of this whole project was converting markdown to HTML. This was made even trickier by the fact that I am using a React framework, so the converted HTML needed to play nicely with React.</p>
<p>This involved escaping special characters, like \`, {'{'}, {'}'}, {'<'}, {'>'}, and \${'{'}…{'}'} - which, if that looks weird, I still haven't fully dealth with yet.</p>
<p>Here's the script that does the conversion from <strong>.md -> .jsx</strong>.</p>
<pre><code className="js language-js">{`const fs = require('fs');
const showdown = require('showdown');
const { 
    escapeCurlyBrackets,
    escapeCodeBlocksWithStringLiteral,
    unescapeAngleBrackets,
    escape$,
    escapeBackticks
} = require('./my-plugins')

showdown.setFlavor('github')

// we need to pass these options to read ops, otherwise the default is Buffer
const fsOptions = { encoding: 'utf8' }

const converter = new showdown.Converter({
    extensions: [
        ...escapeBackticks,
        ...escapeCodeBlocksWithStringLiteral,
        ...unescapeAngleBrackets,
        ...escape$,
    ]
});

const filenames = fs.readdirSync('markdown', fsOptions)
console.log('converting ', filenames)

const manifest = []

for(const filename of filenames) {
    const sourcepath = \`markdown/\${filename}\`
    const functionName = filename.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('').slice(1,-3)

    const md = fs.readFileSync(sourcepath, fsOptions)
    const html = converter.makeHtml(md)
    // convert className= to className= for React
    const jsx = \`
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        import Link from 'next/link'

        export default function \${functionName}() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])

            return (
                <div ref={ref}>\${html}</div>
            )
        }
    \`.replace(/className=/g, 'className=')

    // replace .md with .jsx
    const title = filename.slice(0, -3)
    const distpath = 'pages/' + title + '.jsx'
    fs.writeFileSync(distpath, jsx)

    title !== 'index' &amp;&amp; manifest.push(title)
    console.log(\`\${sourcepath} -> \${distpath}\`)
}

const json = JSON.stringify(manifest)
fs.writeFileSync('scripts/manifest.js', \`module.exports = \${json}\`)
console.log('\nsuccess\n')`}</code></pre></div>
            )
        }
    