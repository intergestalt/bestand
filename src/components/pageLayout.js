import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import useVH from 'react-viewport-height';
import { Wrapper, Main } from "./style"
import { SEO } from "./seo"
import styled from 'styled-components'
import { ThemeForm } from "./theme"

import { useGlobalJsonForm } from "gatsby-tinacms-json"

const merge = require("lodash.merge")

export const PageLayout = ({ page, children, left, right }) => {
  const vh = useVH();

  const data = useStaticQuery(graphql`
    query PageLayoutQuery {
      site: settingsJson(
        fileRelativePath: { eq: "/content/settings/site.json" }
      ) {
        logo
        title
        description
        author

        rawJson
        fileRelativePath
      }
    }
  `)

  // useGlobalJsonForm(data.nav, NavForm)
  // useGlobalJsonForm(data.theme, ThemeForm)
  useGlobalJsonForm(data.site, SiteForm)

  const pageTitle =
    page && page.title
      ? page.title
      : page && page.frontmatter && page.frontmatter.title
      ? page.frontmatter.title
      : ""

  return (
    <>
      {pageTitle && <SEO title={pageTitle} />}
      { right.length > 0 ?
        <Container style={{ height: `${100 * vh}px` }}>
          <Left>
            {left}
          </Left>
          <Right>
            {right}
          </Right>
        </Container>
        :
        left
      }
      {children}
    </>
  )
}

const SiteForm = {
  label: "Site",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
      parse(value) {
        return value || ""
      },
    },
    {
      label: "Description",
      name: "rawJson.description",
      component: "text",
      parse(value) {
        return value || ""
      },
    },
    {
      label: "Author",
      name: "rawJson.author",
      component: "text",
      parse(value) {
        return value || ""
      },
    },
  ],
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

`

const Left = styled.div`
  height: 100%;
  overflow: auto;
  flex: 1;
`

const Right = styled.div`
  width: 50%; 
  height: 100%;
  overflow: auto;
  flex: 1;
`
