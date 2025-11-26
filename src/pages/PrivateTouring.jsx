import HeaderSection from "../components/HeaderSection";

import "../styles/private-touring.css";
import { usePageData } from "../modules/PageDataContext";
import ProcessText from "../functions/LanguageSorter";

const PrivateTouring = () => {
  const { privateTourPageData } = usePageData();
  const data = privateTourPageData;

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <HeaderSection image={data.sectionHeader.image} title={data.sectionHeader.title}>
        <div className="pt-container">
          <div>
            <h2>{ProcessText(data.titleText)}</h2>
            <p>
              {ProcessText(data.para1)}
              <br />
              <br />
              <b>{ProcessText(data.para2)}</b>
              <br />
              <b>{ProcessText(data.para3)}</b>
              <br />
              {ProcessText(data.para4)}
              <br />
              <br />
              {ProcessText(data.para5)}
            </p>
          </div>
          <img src={data.rightImage} alt="Private Touring" />
        </div>
      </HeaderSection>

      <div className="pt-container pt-second-container">
        <img src={data.section2.leftImage} alt="Private Touring Secondary" />

        <div className="hs-text-container">
          <h2>{ProcessText(data.section2.title)}</h2>
          <p>{ProcessText(data.section2.text1)}</p>

          <h4>{ProcessText(data.section2.exTitle)}</h4>

          <ul className="pt-list-ul">
            {data.section2.pricingList.map((item, index) => (
              <li key={index}>
                {ProcessText(item.name)}
              </li>
            ))}
          </ul>

          <p>{ProcessText(data.section2.bottomText)}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateTouring;

