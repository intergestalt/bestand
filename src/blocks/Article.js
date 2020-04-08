import React, {Fragment} from "react"
import styled from 'styled-components'

//import {p as P} from '../components/HtmlElements'
import DownloadLink from '../components/DownloadLink'

export function Article({ data }) {
  const {text, text2, file} = data
  return (
    <>
      <LargeText>
        {parseText(text)}
      </LargeText>
      <SmallText>
        {text2}
      </SmallText>      
      <DownloadLink title={file} text=".PDF" href={file} />
    </>
  )
}

const parseText = function(text) {
  let out =[]
  let groups = text
    .split("{")
    .map( g => g.split("}") )
  if (groups.length > 0) {
    for (let gg of groups) {
      if (gg.length > 1) {
        out.push(<mark>{gg[0]}</mark>)
        out.push(<span>{gg[1]}</span>)
      } else {
        out.push(<span>{gg[0]}</span>)
      }
    }
  }
  //console.log(out);
  return out.map(c => <Fragment key={c.props.children}>{c}</Fragment>)
  //return text.replace(/\{/, '<mark>').replace(/\}/, '</mark>')  
}

const LargeText = styled.p`
  font-size: 30px;
`

const SmallText = styled.p`
`

export const ArticleBlock = {
  name: "article",
  itemProps: (article) => ({
    label: `Landscape: ${article.text}`,
    key: `Landscape: ${article.text}`,
  }),
  defaultItem: {
    text: `„It was due to the new system, that
        humanity redifined its relation to
        nature. Today, {nature is an active
        political agent: land, water, air and
        light cannot be owned anymore.}“`,
    text2: 'Conversation with Eyal Weizman',
    file: ''
  },
  fields: [
    { name: "text", label: "Text", component: "textarea", description: "Use {} to highlight" },
    { name: "text2", label: "Small Text", component: "text" },
    {
      name: "file",
      label: "PDF",
      component: "file",
      description: 'This is a pdf upload field',
      /*accept: 'application/pdf',*/
      clearable: true,
      parse: (file) => `/pdfs/${file}`,
      uploadDir: () => '/content/pdfs/', 
    },
  ],
}
