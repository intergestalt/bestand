import React from "react"
import styled, { css } from "styled-components"

import { Spacer, Document as Doc } from '../components'

import { snippets, breakpoints, metrics, dist } from '../../config/styles'

const blockLabel = "DOCUMENT"

export function Document({ data, html }) {
  return (
    <Doc>
      <Spacer />
      <StyledContent
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Doc>
  )
}

const StyledContent = styled.div`
  p, ul {
    ${snippets.blockStyle}
  }

  li {
    &::before {
      content: "- ";
    }
    margin-left: calc( 2 * ${ dist.letterWidth} );
    text-indent: calc( -2 * ${ dist.letterWidth} );
  }

  br {
  }

  a {
    ${snippets.typography.underline};
    word-break: break-all;
  }
`

export const DocumentBlock = {
  label: blockLabel,
  name: "document",
  key: "test",
  itemProps: (item) => ({
    label: `${blockLabel}: ${item.content}`,
  }),    
  defaultItem: {
    content: "",
  },
  fields: [
    { name: "content", label: "Content", component: "textarea" },
  ],
}