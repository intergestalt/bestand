import React from "react"
import { graphql } from "gatsby"

import {Helmet} from "react-helmet"

import { Title, TitleBlock } from "../blocks/title"
import { Image, ImageBlock } from "../blocks/image"
import { Content, ContentBlock } from "../blocks/content"
import { Countdown, CountdownBlock } from "../blocks/Countdown"
import { Landscape, LandscapeBlock } from "../blocks/Landscape"
import { Publication, PublicationBlock } from "../blocks/Publication"
import { News, NewsBlock } from "../blocks/News"
import { Zip, ZipBlock  } from '../blocks/Zip'
import { With, WithBlock } from "../blocks/With"
import { AppPreview, AppPreviewBlock } from '../blocks/AppPreview'
import { Section, SectionBlock } from "../blocks/Section"
import { IntroVideo, IntroVideoBlock } from "../blocks/IntroVideo"
import { IntroLink, IntroLinkBlock } from "../blocks/IntroLink"
import { Article, ArticleBlock } from "../blocks/Article"
import { FilmQuote, FilmQuoteBlock } from "../blocks/FilmQuote"
import { TalkingHeads, TalkingHeadsBlock } from '../blocks/TalkingHeads'
import { YoutubePlaylist, YoutubePlaylistBlock } from '../blocks/YoutubePlaylist'
import { ImpLink, ImpLinkBlock } from '../blocks/ImpLink'
import { TypoTester, TypoTesterBlock } from '../blocks/TypoTester'
import { Takeover, TakeoverBlock } from '../blocks/Takeover'
import { Redirect, RedirectBlock } from '../blocks/Redirect'
import { StandaloneVideo, StandaloneVideoBlock } from "../blocks/StandaloneVideo"

import { PageLayout } from "../components/pageLayout"
import { Menu } from "../components/Menu"

import { globalStyles, spaces, fontStack_Roboto } from '../../config/styles'
import { Spacer } from '../components'

import { useLocalJsonForm } from "gatsby-tinacms-json"
import { createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'

const GlobalStyle = createGlobalStyle`${globalStyles}`

export default function Page(props) {
  const data = props.data
  const [page] = useLocalJsonForm(data.page, PageForm)
  const blocks = (page && page.blocks) ? page.blocks : []

  return (
    <>
      <Reset />
      <GlobalStyle />
      
      <Helmet>
        <style>
          {`div[class^=FormHeader] + div > div {
            overflow: auto;
          }
          :root {
            --tina-font-family: ${fontStack_Roboto} !important;
          }
          `}
        </style>
      </Helmet>

      <PageLayout page={page}>
        {/*<TypoTester />*/}
        {/*<Menu />*/}
        {mapBlocks(data,page,blocks)}
        { blocks.findIndex(b => b._template == "StandaloneVideo")  > -1 &&
          <Spacer space={spaces.large} />
        }
      </PageLayout>

    </>
  )
}

const mapBlocks = function(data,page,blocks) {
  if (!blocks || !Array.isArray(blocks)) return null
  return blocks.map(({ _template, ...data }, i, arr) => {
    switch (_template) {
      case "StandaloneVideoBlock":
        return <StandaloneVideo key={"StandaloneVideoBlock" + i} data={data} />
      case "RedirectBlock":
        return <Redirect key={"RedirectBlock" + i} data={data} />
      case "TakeoverBlock":
        return <Takeover key={"TakeoverBlock" + i} data={data}/>
      case "TitleBlock":
        return <Title key={"TitleBlock" + i} page={page} data={data} />
      case "CountdownBlock":
        return <>
          { (arr[i-1] && ["IntroVideoBlock"].indexOf(arr[i-1]._template) < 0 )
            && <Spacer key={"CountdownBlockSpacer" + i} space={spaces.none} /> }
          <Countdown key={"CountdownBlock" + i} data={data} />
        </>        
      case "TalkingHeadsBlock":
        return <TalkingHeads key={"TalkingHeadsBlock" + i} data={data} />
      case "YoutubePlaylistBlock":
        return <YoutubePlaylist key={"YoutubePlaylistBlock" + i} data={data} />
      case "LandscapeBlock":
        return <Landscape key={"LandscapeBlock" + i} data={data} />
      case "PublicationBlock":
        return <Publication key={"PublicationBlock" + i} data={data} />
      case "ArticleBlock":
        const repeatedArticle = (arr[i + 1] && ["ArticleBlock", "FilmQuoteBlock"].indexOf(arr[i + 1]._template) > -1)
        const shadeBlocks = ["SectionBlock", "WithBlock"]
        const shade = (arr[i+1] && shadeBlocks.indexOf(arr[i+1]._template) > -1 )
        return <>
          <Article key={"ArticleBlock" + i} shade={shade} data={data} />
          { repeatedArticle && <Spacer key={"ArticleBlockSpacer" + i} space={spaces.verySmall} />}
        </>
      case "FilmQuoteBlock":
        const repeatedFilmQuote = (arr[i + 1] && ["FilmQuoteBlock", "ArticleBlock"].indexOf(arr[i + 1]._template) > -1)
        const shadeBlocksFilm = ["SectionBlock", "WithBlock"]
        const shadeFilm = (arr[i + 1] && shadeBlocksFilm.indexOf(arr[i + 1]._template) > -1)
        return <>
          <FilmQuote key={"FilmQuoteBlock" + i} shade={shadeFilm} data={data} />
          { repeatedFilmQuote && <Spacer key={"NewsBlockSpacer" + i} space={spaces.verySmall} />}
        </>
      case "IntroVideoBlock":
        return <IntroVideo key={"IntroVideoBlock" + i} data={data} />
      case "IntroLinkBlock":
        return <IntroLink key={"IntroLinkBlock" + i} data={data} />
      case "WithBlock":
        return <>
          { (arr[i-1] && ["NewsBlock"].indexOf(arr[i-1]._template) > -1 )
            && <Spacer key={"WithBlockSpacer" + i} space={spaces.verySmall} /> }
          <With key={"WithBlock" + i} data={data} />
        </>
      case "SectionBlock":
        let sectionSpace = spaces.none
        if (arr[i-1] && ["CountdownBlock"].indexOf(arr[i-1]._template) >-1 ) sectionSpace = spaces.none
        if (arr[i-1] && ["NewsBlock"].indexOf(arr[i-1]._template) >-1 ) sectionSpace = spaces.none
        return <>
          <Spacer key={"SectionBlockSpacer" + i} space={sectionSpace} />
          <Section key={"SectionBlock" + i} data={data} />                
        </>
      case "AppPreviewBlock":
        return <AppPreview key={"AppPreviewBlock" + i} data={data} />                    
      case "ZipBlock":
        return <Zip key={"ZipBlock" + i} data={data} />  
      case "TypoTesterBlock":
        return <TypoTester key={"TypoTesterBlock" + i} data={data} />          
      case "NewsBlock":
        const repeatedNews = (arr[i+1] && ["NewsBlock"].indexOf(arr[i+1]._template) > -1 )
        return <>
          <News key={"NewsBlock" + i} data={data} />
          { repeatedNews && <Spacer key={"NewsBlockSpacer" + i} space={spaces.verySmall}/> }
        </>
      case "ImpLinkBlock":
        return <ImpLink key={"ImpLinkBlock" + i} data={data} />                                
      case "ContentBlock":
        if (data.content && page.childrenPagesJsonBlockMarkdown[i])
          return (
            <Content
              key={"ContentBlock" + i}
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
  })
}

const PageForm = {
  label: "Bestand.global",
  fields: [
    {
      label: "Modules",
      name: "rawJson.blocks",
      component: "blocks",
      templates: {
        AppPreviewBlock,
        ArticleBlock,
        FilmQuoteBlock,
        CountdownBlock,
        IntroVideoBlock,
        IntroLinkBlock,
        LandscapeBlock,
        NewsBlock,
        PublicationBlock,
        SectionBlock,
        TalkingHeadsBlock,
        YoutubePlaylistBlock,
        WithBlock,
        ContentBlock,
        ImpLinkBlock,
        ZipBlock,
        TakeoverBlock,
        RedirectBlock,
        StandaloneVideoBlock,
        TypoTesterBlock,
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
        hide
        title
        underline
        dateUTC
        videoId
        videoId2
        videoId3
        videoId4
        youtubePlaylistId
        file
        text
        text2
        link
        linkText
        center
        bool
        recipient
        usePdf
        color
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
