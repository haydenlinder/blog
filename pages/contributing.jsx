
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        
        export default function ontributing() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}><h1 id="contributing">Contributing</h1>
<h2 id="getting-started">Getting Started</h2>
<p>First, run the development server:</p>
<pre><code className="bash language-bash">{`npm run dev
# or
yarn dev`}</code></pre>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
<h2 id="contributing-1">Contributing</h2>
<ol>
<li><p>Create a new markdown (.md) file in the <code>{`/markdown/`}</code> folder. Use dash-deliniated file names, for example: <code>{`New-Blog-Post.md`}</code>.</p></li>
<li><p>Write some <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a>.</p></li>
<li><p>Run <code>{`npm run parse`}</code>.</p></li>
<li><p>Visit <a href="http://localhost:3000/New-Blog-Post">http://localhost:3000/New-Blog-Post</a>, but replace <code>{`New-Blog-Post`}</code> with the name of the file you created, excluding the .md extension.</p></li>
</ol></div>
            )
        }
    