import React from 'react'
import HeaderSection from '../components/HeaderSection'
import ProcessText from '../functions/LanguageSorter'
import { usePageData } from '../modules/PageDataContext';


const TechOnTours = () => {
    const { mobileAppPageData } = usePageData();
  return (
    <div style={{ backgroundColor: "#eee" }}>
        <HeaderSection  image={mobileAppPageData.sectionHeader.image}
          title={mobileAppPageData.sectionHeader.title}
          subtitle={mobileAppPageData.sectionHeader.subtitle}
          description={mobileAppPageData.sectionHeader.description}/>
    </div>
  )
}

export default TechOnTours