import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button } from 'antd'

const style = { marginRight: '0.4rem', padding: 0 }

const Tagging: FC<{ text: string; first?: number; showFull?: boolean }> = ({
  text,
  first,
  showFull,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsToggle] = useState(text.split(' ').length > 15 && !showFull)
  const toggleExpansion = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])
  const nodes = useMemo(() => {
    const toProcess = text.split(' ').slice(0, showFull || isExpanded ? undefined : first)
    const textNodes = []
    const temp = []
    for (const node of toProcess) {
      switch (node[0]) {
        case '@':
        case '#':
          if (temp.length) {
            textNodes.push(temp.join(' '))
            temp.length = 0
          }
          textNodes.push(node)
          break
        default:
          temp.push(node)
      }
    }
    if (temp.length) {
      textNodes.push(temp.join(' '))
      temp.length = 0
    }
    return textNodes
  }, [text, first, isExpanded, showFull])

  return (
    <>
      {nodes.map((node) => {
        switch (node[0]) {
          case '@':
            return (
              <a
                href={`https://www.instagram.com/${node.substring(1)}/`}
                target="_blank"
                rel="noreferrer noopener"
                style={style}
              >
                {node}
              </a>
            )
          case '#':
            return (
              <a
                href={`https://www.instagram.com/explore/tags/${node.substring(1)}/`}
                target="_blank"
                rel="noreferrer noopener"
                style={style}
              >
                {node}
              </a>
            )
          default:
            return <span style={style}>{node}</span>
        }
      })}
      {needsToggle ? (
        <Button onClick={toggleExpansion} type="link" style={style}>
          {isExpanded ? '... less' : '... more'}
        </Button>
      ) : null}
    </>
  )
}

Tagging.defaultProps = {
  first: 15,
  showFull: false,
}

export default Tagging
