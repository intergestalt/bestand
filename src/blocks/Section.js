import React from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'

import {p as P} from '../components/HtmlElements'
import Header from '../components/SectionHeader'
import { BlockListItem, BlockWrapper } from '../components'

import { genericFields } from '../helpers/misc'
import { colors } from '../../config/styles'

const blockLabel = "SECTION"

export function Section({ data }) {
  const {text, color, hide, link} = data

  const content = link ? link.indexOf("://") > -1 
    ? <a href={link} >{text}</a> : <Link to={link}>{text}</Link> 
    : text

  return (
    <BlockWrapper label={blockLabel} hide={hide} >
      <Header backgroundColor={color}>
        {content}
      </Header>
    </BlockWrapper>
  )
}

const Container = styled.div``


export const SectionBlock = {
  label: blockLabel,
  name: "section",
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text}  hide={item.hide}/>,
  }),  
  defaultItem: {
    text: `Bestand.global`,
    color: colors.blue,
    link: ""
  },
  fields: [
    { name: "text", label: "Text", component: "text" },
    { name: "link", label: "Link", component: "text", description: `Use "/" to link to home page. Leave empty for no link.`},
    {
      name: 'color',
      component: 'color',
      label: 'Background Color',
      colorFormat: 'hex',
      colors: [colors.blue, colors.green],
      widget: 'block',
    },   
    ...genericFields 
  ],
}
