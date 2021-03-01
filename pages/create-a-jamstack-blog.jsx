
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        
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
<ul>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ul>
<pre><code className="jsx language-jsx">{`// javascript
const Component = () => {
    return (
        <OtherComponent />
    )
}`}</code></pre>
<pre><code className="py language-py">{`# python
def BeCool():
    return me`}</code></pre></div>
            )
        }
    