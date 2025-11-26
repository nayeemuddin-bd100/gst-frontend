import React from 'react'
import HeaderSection from '../components/HeaderSection'
import TitleText from '../components/TitleText'
import ReasonsSection from '../modules/Reasons'
import ProcessText from '../functions/LanguageSorter'
import { usePageData } from '../modules/PageDataContext'

const SoloTravel = () => {
   const {soloTravelPageData} = usePageData();
  return (
    <div style={{backgroundColor: '#eee'}}>
      <HeaderSection image={soloTravelPageData.sectionHeader.image} title={soloTravelPageData.sectionHeader.title} subtitle={soloTravelPageData.sectionHeader.subtitle} description={soloTravelPageData.sectionHeader.description}  />

      <TitleText title={ProcessText(soloTravelPageData.titleText1.title)} text={ProcessText(soloTravelPageData.titleText1.text)} />

      <TitleText title={ProcessText(soloTravelPageData.titleText2.title)} text={ProcessText(soloTravelPageData.titleText2.text)} />

      <TitleText title={ProcessText(soloTravelPageData.titleText3.title)} text={ProcessText(soloTravelPageData.titleText3.text)} />
      <ReasonsSection />
    </div>
  )
}

export default SoloTravel