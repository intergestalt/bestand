import React from 'react'
import styled from 'styled-components'

import Accordion from '../components/Accordion'
import Logos from '../components/Logos'
import Document from '../components/Document'
import Spacer from '../components/Spacer'
import { BlockListItem, ButtonBlock, BlockWrapper } from '../components'
import { Block } from '../components/HtmlElements'

import { hasFile } from '../helpers/validators'
import { genericFields } from '../helpers/misc'
import { spaces, typoSizes, typoStyles } from '../../config/styles'

const blockLabel = "WITH"

export function With({ data }) {
  const {
    text,
    text2,
    file,
    hide
  } = data
  return (
    <BlockWrapper label={blockLabel} hide={hide}>
      <Accordion head="WITH" initOpen>
        <Document>
          <Spacer space={spaces.medium}/>
          <Block 
              typoSize={typoSizes.moduleSmall} 
              typoStyle={typoStyles.RobotoMonoRegular}
              spaceSide={spaces.small}
              spaceBottom={spaces.medium}
            >
            {text}
          </Block>
          {/*<p>
            2038 is an international team of architects, artists, ecologists, economists, scientists, politicians and writers, initiated in 2019, aiming to tell a (hi)story that today we call future:
          </p>
          <p>
            Blaise Agüera y Arcas, Diana Alvarez-Marin, Andrés Arauz, Arts of the Working Class, Mara Balestrini, Sandra Bartoli, Diann Bauer, Jan Bauer, BBSR, BMI, Oana Bogdan, Mohamed Bourouissa, Arno Brandlhuber, Jakob Brandtberg Knudsen & Lorenz von Seidlein, Francesca Bria, Vera Bühlmann, Bureau N, Benjamin Burq, Vint Cerf, cfk architetti, Elke Doppelbauer, Tobia de Eccher, Keller Easterling, Eidotech, Kurt Eggenschwiler, Ludwig Engel, ExRotaprint, Cosimo Flohr, Lenny Flohr, Michaela Friedberg, Jan-Peter Gieseking, Goethe Institut, Olaf Grawert, Dorothee Hahn, Nils Havelka, Hecker’s Hotel Kurfürstendamm, Helene Hegemann, Holger Heissmeyer, Angelika Hinterbrandner, Nikolaus Hirsch, Fabrizio Hochschild Drummond, Ludger Hovestadt, Pan Hu, JUNG, Jennifer Jacquet & Becca Franks, Mitchell Joachim, Sonja Junkers, Roberta Jurcic, Claudia Kessler, Sénamé Koffi Agbodjinou, Ulrich Kriese, Lukas Kubina, Nikolaus Kuhnert, Christopher Kulendran Thomas & Annika Kuhlmann, Lawrence Lessig, Ferdinand Ludwig & Daniel Schoenle, Suhail Malik, Charlotte Malterre-Barthes, Hilary Mason, V. Mitch McEwen, James Meadway, Omoju Miller, Evgeny Morozov, Motif, Motor Productions, Caroline Nevejan, Bahar Noorizadeh, Sabine Oberhuber, Jorge Orozco, Verena Otto, Poligonal, Leif Randt, Thomas Rau, RAUE Rechtsanwälte und Rechtsanwältinnen, Rebiennale, Denis 'Jaromil' Roio, Raquel Rolnik, Meghan Rolvien, Christopher Roth, Juliana Rotich, Saygel, Schreiber & Gioberti, Jan Schmidt-Garre, Patrik Schumacher, Max Senges, Deane Simpson, Sol Marino, Bruce Sterling, Michael Stöppler, Lia Strenge, Audrey Tang, TECE, The Laboratory of Manuel Bürger, Jeanne Tremsal, Galaad Van Daele, Iris van der Tuin, VITRA International, Georg Vrachliotis, Julian Wäckerlin, Eyal Weizman, Julia Werlen, E. Glen Weyl, Why Ventures, Mark Wigley, Erez Yoeli, Tirdad Zolghadr and many others
          </p>
          <p>
            Commissioned by Bundesministerium des Innern, für Bau und Heimat (BMI)
          </p>*/}
          <Logos />
          <Block
            typoSize={typoSizes.moduleSmall}
            typoStyle={typoStyles.RobotoMonoRegular}
            spaceSide={spaces.small}
            spaceTop={spaces.medium}
            spaceBottom={spaces.medium}
          >
            {text2}
          </Block>
          <Logos imgSrcLarge="/logos2.png" imgSrcSmall="/logosSmall2.png"/>
          <Spacer space={spaces.medium} />
          { hasFile(file,"pdf") &&
            <>
              <ButtonBlock text=".PDF" href={file} />
              <Spacer space={spaces.small} />
            </>
          }
        </Document>
      </Accordion>
    </BlockWrapper>
  )
}

export const WithBlock = {
  name: "with",
  label: blockLabel,
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} hide={item.hide} />,
  }),   
  defaultItem: {
    text: `2038 is an international team of architects, artists, ecologists, economists, scientists, politicians and writers, initiated in 2019, aiming to tell a (hi)story that today we call future:

      Blaise Agüera y Arcas, Diana Alvarez-Marin, Andrés Arauz, Arts of the Working Class, Mara Balestrini, Sandra Bartoli, Diann Bauer, Jan Bauer, BBSR, BMI, Oana Bogdan, Mohamed Bourouissa, Arno Brandlhuber, Jakob Brandtberg Knudsen & Lorenz von Seidlein, Francesca Bria, Vera Bühlmann, Bureau N, Benjamin Burq, Vint Cerf, cfk architetti, Elke Doppelbauer, Tobia de Eccher, Keller Easterling, Eidotech, Kurt Eggenschwiler, Ludwig Engel, ExRotaprint, Cosimo Flohr, Lenny Flohr, Michaela Friedberg, Jan-Peter Gieseking, Goethe Institut, Olaf Grawert, Dorothee Hahn, Nils Havelka, Hecker’s Hotel Kurfürstendamm, Helene Hegemann, Holger Heissmeyer, Angelika Hinterbrandner, Nikolaus Hirsch, Fabrizio Hochschild Drummond, Ludger Hovestadt, Pan Hu, JUNG, Jennifer Jacquet & Becca Franks, Mitchell Joachim, Sonja Junkers, Roberta Jurcic, Claudia Kessler, Sénamé Koffi Agbodjinou, Ulrich Kriese, Lukas Kubina, Nikolaus Kuhnert, Christopher Kulendran Thomas & Annika Kuhlmann, Lawrence Lessig, Ferdinand Ludwig & Daniel Schoenle, Suhail Malik, Charlotte Malterre-Barthes, Hilary Mason, V. Mitch McEwen, James Meadway, Omoju Miller, Evgeny Morozov, Motif, Motor Productions, Caroline Nevejan, Bahar Noorizadeh, Sabine Oberhuber, Jorge Orozco, Verena Otto, Poligonal, Leif Randt, Thomas Rau, RAUE Rechtsanwälte und Rechtsanwältinnen, Rebiennale, Denis 'Jaromil' Roio, Raquel Rolnik, Meghan Rolvien, Christopher Roth, Juliana Rotich, Saygel, Schreiber & Gioberti, Jan Schmidt-Garre, Patrik Schumacher, Max Senges, Deane Simpson, Sol Marino, Bruce Sterling, Michael Stöppler, Lia Strenge, Audrey Tang, TECE, The Laboratory of Manuel Bürger, Jeanne Tremsal, Galaad Van Daele, Iris van der Tuin, VITRA International, Georg Vrachliotis, Julian Wäckerlin, Eyal Weizman, Julia Werlen, E. Glen Weyl, Why Ventures, Mark Wigley, Erez Yoeli, Tirdad Zolghadr and many others

      Commissioned by Bundesministerium des Innern, für Bau und Heimat (BMI)`,
    text2: "in collaboration with"
  },
  fields: [
    { name: "text", label: "Text", component: "textarea", description: "Main text"},
    { name: "text2", label: "Secondary Text", component: "textarea", description: "(between 1st and 2nd row of logos"},
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
    ...genericFields
  ],
}
