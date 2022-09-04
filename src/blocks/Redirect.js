import React from "react"
import { Helmet } from "react-helmet"
import styled from 'styled-components'
import { BlockListItem, BlockWrapper } from '../components'

import { genericFields } from '../helpers/misc'
import { colors, spaces, typoSizes, blockSnippet, blockTypoSnippet, typoStyles, breakpoints, typoSnippet } from '../../config/styles'

const blockLabel = "Subpage REDIRECT"

export function Redirect({ data }) {
  const { text, text2, hide } = data
  const url = text
  const edit = /*( show || cms.sidebar.isOpen ) && */ process.env.NODE_ENV === "development"

  const info = 
    <Asmall href={url}>
      {url}
    </Asmall>
  

  const action =
    <Helmet>
      {url && <meta http-equiv="refresh" content={`1; url = ${url}`} />}
      <link rel="prefetch" href={url} />
    </Helmet>

  const content = 
    <Container>
      <A href={url}>
        {text2}
      </A>
      { edit || hide || action }
    </Container>
  
  
  return <BlockWrapper label={blockLabel} hide={hide}>
    { content }
  </BlockWrapper>
  
};

const A = styled.a`
  white-space: pre-line;
  ${
    blockSnippet({
      spaceSide: spaces.large
    })
  };
  color: ${ colors.turquoise };
`

const Asmall = styled.a`
  word-wrap: break-word;
  ${blockSnippet({
    spaceSide: spaces.small,
    spaceSide: spaces.small
  })
  };
  color: ${colors.bg};
  font-size: 0.5rem;
  position: absolute;
  top: 0;
  opacity: 0.4;
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  top:0;
  left: 0;
  background-color: black;
  display: flex;
  align-items: center;
  place-content: center;

`

export const RedirectBlock = {
  label: blockLabel,
  name: "Redirect",
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} />,
  }),
  defaultItem: {
    text: "https://bestand.global",
    text2: "Redirecting...",
  },
  fields: [
    { name: "text", label: "URL", component: "text" },
    { name: "text2", label: "Text", component: "textarea" },
    ...genericFields
  ],
}
