
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        
        export default function ndex() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}><h1 id="welcome">Welcome</h1>
<h2 id="what">What</h2>
<h2 id="contributing">Contributing</h2></div>
            )
        }
    