import React from "react"
import { graphql } from "gatsby"
import { Title, TitleBlock } from "../blocks/title"
import { Image, ImageBlock } from "../blocks/image"
import { Content, ContentBlock } from "../blocks/content"
import { Countdown, CountdownBlock } from "../blocks/Countdown"
import { Landscape, LandscapeBlock } from "../blocks/Landscape"
import { Publication, PublicationBlock } from "../blocks/Publication"
import { Article, ArticleBlock } from "../blocks/Article"
import { TalkingHeads, TalkingHeadsBlock } from '../blocks/TalkingHeads'
import { ImpLink, ImpLinkBlock } from '../blocks/ImpLink'
import { PageLayout } from "../components/pageLayout"
import { globalStyles } from '../../config/styles'

import { useLocalJsonForm } from "gatsby-tinacms-json"
import { createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`${globalStyles}`

export default function Page({ data }) {
  const [page] = useLocalJsonForm(data.page, PageForm)
  const blocks = page.blocks ? page.blocks : []

  return (
    <>
      <Reset />
      <GlobalStyle />
      <PageLayout page={page}>
        {blocks &&
          blocks.map(({ _template, ...data }, i) => {
            switch (_template) {
              case "TitleBlock":
                return <Title page={page} data={data} />
              case "ImageBlock":
                return <Image data={data} />
              case "CountdownBlock":
                return <Countdown key={"CountdownBlock" + i} data={data} />
              case "TalkingHeadsBlock":
                return <TalkingHeads key={"TalkingHeadsBlock" + i} data={data} />
              case "LandscapeBlock":
                return <Landscape key={"LandscapeBlock" + i} data={data} />
              case "PublicationBlock":
                return <Publication key={"PublicationBlock" + i} data={data} />
              case "ArticleBlock":
                return <Article key={"ArticleBlock" + i} data={data} />                    
              case "ImpLinkBlock":
                return <ImpLink key={"ImpLinkBlock" + i} data={data} />                                
              case "ContentBlock":
                if (data.content && page.childrenPagesJsonBlockMarkdown[i])
                  return (
                    <Content
                      data={data}
                      html={
                        page.childrenPagesJsonBlockMarkdown[i]
                          .childMarkdownRemark.html
                      }
                    />
                  )
                break
              default:
                return true
            }
          })}
      </PageLayout>
    </>
  )
}

const PageForm = {
  label: "Page",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Headline",
          name: "headline",
          component: "text",
        },
        {
          label: "Textline",
          name: "textline",
          component: "text",
        },
        {
          label: "Image",
          name: "image",
          component: "image",
          parse: filename => `../images/${filename}`,
          uploadDir: () => `/content/images/`,
          previewSrc: formValues => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return ""
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src
          },
        },
        {
          label: "Actions",
          name: "ctas",
          component: "group-list",
          itemProps: item => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Primary",
              name: "primary",
              component: "toggle",
            },
            {
              label: "Arrow",
              name: "arrow",
              component: "toggle",
            },
          ],
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
      ],
    },
    {
      label: "Page Sections",
      name: "rawJson.blocks",
      component: "blocks",
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
        CountdownBlock,
        TalkingHeadsBlock,
        PublicationBlock,
        LandscapeBlock,
        ArticleBlock,
        ImpLinkBlock
      },
    },
  ],
}

export const pageQuery = graphql`
  query($path: String!) {
    page: pagesJson(path: { eq: $path }) {
      title
      displayTitle
      hero {
        headline
        textline
        large
        overlay
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ctas {
          label
          link
          primary
          arrow
        }
      }
      blocks {
        _template
        content
        name
        title
        underline
        dateUTC
        videoId
        file
        text
        text2
        center
        recipient
        fields {
          label
          inputType
          autocomplete
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      childrenPagesJsonBlockMarkdown {
        childMarkdownRemark {
          html
        }
      }

      rawJson
      fileRelativePath
    }
  }
`
