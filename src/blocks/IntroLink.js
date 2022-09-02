import React from "react"
import styled from 'styled-components'

import BackgroundVideo from "../components/BackgroundVideo"
import {p as P, Block} from '../components/HtmlElements'
import { 
  BlockListItem, 
  ButtonBlock,
  Spacer,
  ButtonLarge,
  BlockWrapper } from '../components'

import { genericFields } from '../helpers/misc'
import { hasFile } from '../helpers/validators'
import { colors, spaces, typoSizes, typoStyles, blockTypoSnippet, blockSnippet  } from '../../config/styles'

const blockLabel = "INTRO HUBS"

export function IntroLink({ data }) {
  const {text,text2,videoId, file, hide, link, linkText, usePdf} = data
  const buttonColor = colors.white
  return (
    <BlockWrapper label={blockLabel} hide={hide}>
      <VideoBlock>
        <OverlayContainer>
          <BackgroundVideo vimeoId={videoId} />
          <ButtonContainer href={link} target="_blank">
            <ButtonLarge highlight={!!buttonColor} color={buttonColor} style={{ mixBlendMode: "screen", fontWeight: "500", textAlign: "center" }}
            >
              {linkText.toUpperCase()}
            </ButtonLarge>
            <ExtraLink href={link} target="_blank" />
          </ButtonContainer>
        </OverlayContainer>
      </VideoBlock>
      <Block
        typoSize={typoSizes.moduleMedium}
        typoStyle={typoStyles.RobotoMonoRegular}  
        spaceBottom={spaces.medium}
      >
        {text}
      </Block>
      <SmallText>
        <span>{text2}</span>
      </SmallText>

      { (file && usePdf || !usePdf && link) &&
        <>
          <Spacer space={spaces.small} />
          { !usePdf ?
            link && <ButtonBlock href={link} title={link} theme="blue-on-white">LINK</ButtonBlock>
            :
            hasFile(file, "pdf") && <ButtonBlock theme="blue-on-white" title={file} text=".PDF" href={file} />
          }
        </>
      }

      <Spacer space={spaces.large} />
    </BlockWrapper>
  )
}

const LargeText = styled(P)`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleSmall, 
      typoStyle: typoStyles.RobotoMonoRegular,
    }) 
  };
  color: ${ colors.blue };
  text-align: center;
`

const VideoBlock = styled.div`
  overflow: hidden;
  ${
    blockSnippet({
      spaceSide: spaces.none,
      spaceBottom: spaces.mediumShrink,
    })
  }
`

const SmallText = styled(P)`
  ${ 
    blockTypoSnippet({ 
      typoSize: typoSizes.moduleSmall, 
      typoStyle: typoStyles.RobotoMonoRegular,
    }) 
  };
  color: ${ colors.blue };
  text-align: center;
  span { max-width: 800px; }
  display: flex;
  justify-content: center;  
`

const ButtonContainer = styled.a`
  text-decoration: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: column;
`

const ExtraLink = styled.a`
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  display: block;
`

const OverlayContainer = styled.div`
  position: relative;
`

export const IntroLinkBlock = {
  label: blockLabel,
  name: "introLink",
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} hide={item.hide} />,
  }),  
  defaultItem: {
    videoId: "382051967",
    text: "Welcome in 2038, Welcome to the German Pavilion.",
    text2: "The Hubs Pavilion — La Biennale di Venezia",
    link: "https://thenewserenity.com",
    linkText: "Enter",
  },
  fields: [
    { name: "videoId", label: "Vimeo Video ID", component: "text" },
    { name: "link", label: "Link", component: "text", description: "URL, e.g. https://thenewserenity.com" },
    { name: "linkText", label: "Link Text", component: "text", description: "Link Text, e.g. VISIT NOW" },
    { name: "text", label: "Text", component: "textarea" },
    { name: "text2", label: "Small Text", component: "text" },
    {
      label: 'Link or PDF',
      name: 'usePdf',
      description: 'Choose Link (left) or PDF (right)',
      component: "condition",
      trigger: {
        component: "toggle"
      },
      fields: (usePdf) => {
        return !usePdf ? [
          { name: "link", label: "Link", component: "text", description: "URL, e.g. https://theatlantic.com" },
        ] : [
          {
            name: "file",
            label: "PDF",
            component: "file",
            description: '.PDF Upload',
            accept: 'application/pdf',
            clearable: true,
            parse: (file) => `/uploads/pdfs/${file}`,
            uploadDir: () => '/static/uploads/pdfs/',
          },
        ]
      }
    },
    ...genericFields
  ],
}
