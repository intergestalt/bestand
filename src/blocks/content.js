import React from "react"
import styled, { css } from "styled-components"

import { snippets, breakpoints, metrics, dist } from '../../config/styles'

const blockLabel = "Plain Text"

export function Content({ data, html }) {
  const centered = data.center ? data.center : false
  return (
    <StyledContent
      center={centered}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></StyledContent>
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

export const ContentBlock = {
  label: blockLabel,
  itemProps: (article) => ({
    label: `${blockLabel}: ${article.content}`,
  }),
  name: "content",
  key: "test",
  defaultItem: {
    content: "",
    center: false,
  },
  fields: [
    { name: "content", label: "Content", component: "textarea" },
  ],
}
