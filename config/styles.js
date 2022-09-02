const metrics = {
  veryLarge: {
    fontSizePx: 30 * 1.25,
  },
  large: {
    fontSizePx: 30,
    lineHeightPx: 33,
    lineTopPx: 5,
  },
  medium: {
    fontSizePx: 20,
    lineHeightPx: 25,
    lineTopPx: 5,
  },
  small: {
    fontSizePx: 15,
    lineHeightPx: 19,
    lineTopPx: 2,
  }  
}

const typoSizes = {
  button: {
    fontSizePx:   { l: 40, s: 25 },
    lineHeightPx: { l: 60, s: 35 },
  },
  buttonSmall: {
    fontSizePx:   { l: 20, s: 15 },
    lineHeightPx: { l: 28, s: 22 },
  },
  title: {
    fontSizePx:   { l: 70, s: 30 },
    lineHeightPx: { l: 73, s: 34 },
  },
  moduleBig: {
    fontSizePx:   { l: 50, s: 25 },
    lineHeightPx: { l: 53, s: 28 },
  },
  moduleMedium: {
    fontSizePx:   { l: 30, s: 18 },
    lineHeightPx: { l: 33, s: 22 },
  },
  moduleSmall: {
    fontSizePx:   { l: 20, s: 15 },
    lineHeightPx: { l: 25, s: 19 },
  },
  moduleTitle: {
    fontSizePx:   { l: 20, s: 18 },
    lineHeightPx: { l: 25, s: 22 },
  },
  sectionHeader: {
    fontSizePx:   { l: 40, s: 25 },
    lineHeightPx: { l: 60, s: 40 },
  },  
  videoLoop: {
    fontSizePx:   { l: 90, s: 38 },
    lineHeightPx: { l: 90, s: 40 },
  },
}

const fontStack_Roboto = "'Roboto Mono', 'Menlo', 'Andale Mono', monospace, sans-serif"
const fontStack_Haas = "NeueHaasUnicaW1G-Bold, Arial, sans-serif"

const typoStyles = {
  RobotoMonoLight:   { name: fontStack_Roboto, weight: 300, lineTopPerc: 0.12, lineBottomPerc: 0.12 },
  RobotoMonoRegular: { name: fontStack_Roboto, weight: 400, lineTopPerc: 0.12, lineBottomPerc: 0.12 },
  RobotoMonoMedium:  { name: fontStack_Roboto, weight: 500, lineTopPerc: 0.12, lineBottomPerc: 0.12 },
  NeueHaasUnicaBold: { name: fontStack_Haas,   weight: "normal" /*???*/, lineTopPerc: 0.1, lineBottomPerc: 0.1 },
}

const fontSnippet = ({typoSize, typoStyle}) => {
  const { name, weight} = typoStyle
  const { fontSizePx, lineHeightPx } = typoSize
  return `
    font-family: ${ name };
    font-weight: ${ weight };

    font-size: ${fontSizePx.l + "px"};
    line-height: ${lineHeightPx.l + "px"};
    
    @media ${ breakpoints.small } {

      font-size: ${fontSizePx.s + "px"};
      line-height: ${lineHeightPx.s + "px"};

    }
  `  
}

// usage: typoSnippet({
//  typoStyle: typoStyles.RobotoMonoRegular, 
//  typoSize: typoSizes.moduleMedium
// })
const typoSnippet =  function({typoSize, typoStyle}) {
  const { name, weight} = typoStyle
  let { lineTopPerc, lineBottomPerc} = typoStyle
  const { fontSizePx, lineHeightPx } = typoSize

  //lineTopPerc = lineTopPerc * fontSizePx
  const diff = {
    l: lineHeightPx.l  - fontSizePx.l,
    s: lineHeightPx.s  - fontSizePx.s,
  }

  return `
    position: relative;
    font-family: ${ name };
    font-weight: ${ weight };

    font-size: ${fontSizePx.l + "px"};
    line-height: ${lineHeightPx.l + "px"};

    margin-top: ${ (-(lineTopPerc+lineBottomPerc)*fontSizePx.l - diff.l) + "px" };
    top: ${ (lineBottomPerc*fontSizePx.l + (diff.l/2)) + "px" };
    
    @media ${ breakpoints.small } {

      font-size: ${fontSizePx.s + "px"};
      line-height: ${lineHeightPx.s + "px"};

      margin-top: ${ (-(lineTopPerc+lineBottomPerc)*fontSizePx.s - diff.s) + "px" };
      top: ${ (lineBottomPerc*fontSizePx.s + (diff.s/2)) + "px" };  
    }
  `
}

const breakpoints = {
  large: "(min-width: 751px)",
  small: "(max-width: 750px)",
  tiny: "(max-width: 550px)",
  smallPx: 750,
}

const spaces = {
  large: {
    px: { l: 60, s: 40 },
  },
  medium: {
    px: { l: 40, s: 30 },
  },
  mediumShrink: {
    px: { l: 40, s: 20 },
  },
  small: {
    px: { l: 20, s: 20 },
  },
  verySmall: {
    px: { l:  5, s:  5 }
  },
  none: {
    px: { l: 0, s: 0 }
  }
}

// usage: spaced(`
//   margin: %large;
//   padding-top: %small;
// `)
//
//
const spaced = function(string) {
  //const largeSpaces = objectMap(spaces, space => space.l)
  //const smallSpaces = objectMap(spaces, space => space.s)
  let largeString = string
  let smallString = string
  for (let space in spaces) {
    //console.log(`%${space}`, `${spaces[space].px.l}px`)
    largeString = largeString.replace(new RegExp(`%${space}([ ;])`,'g'), `${spaces[space].px.l}px$1`)
    smallString = smallString.replace(new RegExp(`%${space}([ ;])`,'g'), `${spaces[space].px.s}px$1`)
  }
  return `
    ${largeString};
    @media ${ breakpoints.small } {
      ${smallString};
    }
  `
}

const dist = {
  lineTop: -metrics.large.lineTopPx + "px",
  spacer: "40px",
  smallSpacer: "20px",
  largeButtonHeight: "60px",
  smallButtonHeight: "30px",
  letterWidth: "0.65em",
}

const colors = {
  bg: "#D8D8D8",
  grey1: "#a0a0a0",
  grey2: "#7f7f7f",
  blue: "#0000ff",
  turquoise: "#00ffff",
  white: "white",
  green: "#00ff00",
  mark: "#ff00ff",
  black: "#000000"
}

let snippets = {
  typography: {
    topAdjust: `
      position: relative;
      margin-top: ${-2*metrics.large.lineTopPx + "px"};
      top: ${metrics.large.lineTopPx + "px"};
      @media ${ breakpoints.small } {
        margin-top: ${-2*metrics.small.lineTopPx + "px"};
        top: ${metrics.small.lineTopPx + "px"};
      }
    `,
    underline: `
      text-decoration: none;
      background-size: 1px 1em;
      display: inline;
      box-shadow:
        inset 0px -0.1em ${colors.bg},
        inset 0 -0.2em #000;
    `,
    grid: `
      background-size: 20px 20px;
      background-image:
        linear-gradient(to right, grey 1px, transparent 1px),
        linear-gradient(to bottom, grey 1px, transparent 1px);  
    `
  }
}

/*
snippets.spaceSnippet = function({

  }){
  let largeString = string
  let smallString = string
  for (let space in spaces) {
    console.log(`%${space.substr(0,space.length-2)}`, `${spaces[space].l}px`)
    largeString = largeString.replace(`%${space.substr(0,space.length-2)}`, `${spaces[space].l}px`)
    smallString = smallString.replace(`%${space.substr(0,space.length-2)}`, `${spaces[space].s}px`)
  }
  return `
    ${largeString};
    @media ${ breakpoints.small } {
      ${smallString};
    }
  `
}
*/

snippets.blockStyle = `
  ${typoSnippet({
      typoStyle: typoStyles.RobotoMonoRegular, 
      typoSize: typoSizes.moduleMedium
     })};
  ${ spaced(`
    margin: %medium;
    `)}
  white-space: pre-wrap;
`

const blockSnippet = function({
    spaceTop = {px: {s:0, l:0}},
    spaceSide = spaces.mediumShrink,
    spaceBottom = {px: {s:0, l:0}},
  }) {
  return `
    padding-top: ${spaceTop.px.l}px;
    margin: 0 ${spaceSide.px.l}px ${spaceBottom.px.l}px;
    @media ${ breakpoints.small } {
      padding-top: ${spaceTop.px.s}px;
      margin: 0 ${spaceSide.px.s}px ${spaceBottom.px.s}px;
    }
    white-space: pre-wrap;
  `
}

const blockTypoSnippet = function({
    typoStyle,
    typoSize,
    spaceTop,
    spaceSide,
    spaceBottom,
  }) {
  return `
  ${blockSnippet({
    spaceTop,
    spaceSide,
    spaceBottom,
  })}  
  ${typoSnippet({
    typoStyle: typoStyle, 
    typoSize: typoSize
   })};
  `
}



/*
  border-style: solid;
  border-color: black;
  border-width: 0 0 1px 0;
  padding-bottom: -1px;
*/

/*
  background-size: 1px 1em;
  box-shadow:
    inset 0 -0.1em black,
    inset 0 -0.2em ${colors.bg};
*/

const globalStyles = `
  /* NOTE: font import in gatsby-config.js */

  :root {
    font-size: ${ metrics.large.fontSizePx }px;
    letter-spacing: 1px;

    @media ${ breakpoints.small } {
      font-size: ${ metrics.medium.fontSizePx }px;
    }

    background-color: ${ colors.bg };
  }

  * {
    scroll-behavior: smooth;
  }

  body {
    line-height: ${ metrics.large.lineHeightPx }px;
    @media ${ breakpoints.small } {
      line-height: ${ metrics.medium.lineHeightPx }px;
    }    
    font-family: ${fontStack_Roboto};
  }
`

/***** EXAMPLE USE 

  ${ 
    typoSnippet({ 
      typoSize: typoSizes.moduleBig, 
      typoStyle: typoStyles.RobotoMonoLight
    }) 
  };

******/

export {
  globalStyles,
  dist,
  spaces,
  colors,
  spaced,
  snippets,
  fontStack_Roboto,
  breakpoints,
  metrics,
  typoSizes,
  typoStyles,
  fontSnippet,
  typoSnippet,  
  blockSnippet,
  blockTypoSnippet,
}