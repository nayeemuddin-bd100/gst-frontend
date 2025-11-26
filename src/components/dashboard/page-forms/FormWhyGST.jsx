
import { usePageData } from "../../../modules/PageDataContext";
import FormSectionHeader from "../form-components/FormSectionHeader";


const FormWhyGST = () => {
  const { whyGSTPageData, setWhyGSTPageData } = usePageData();

  const onHeaderChange = (e, type) => {
    setWhyGSTPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={whyGSTPageData.sectionHeader.image}
        title={whyGSTPageData.sectionHeader.title}
        subtitle={whyGSTPageData.sectionHeader.subtitle}
        description={whyGSTPageData.sectionHeader.description}
      />
      {/* description cards */}
      <div className="wg-description-cards-container">
        {whyGSTPageData.descriptionCards.map((item, idx) => (
          <div key={idx} className="dc-description-card">
            <input
              type="text"
              value={item.title}
              className="w-gst-card-title input-field"
              onChange={(e) =>
                setWhyGSTPageData((prev) => {
                  const updatedCards = [...prev.descriptionCards];
                  updatedCards[idx] = {
                    ...updatedCards[idx],
                    title: e.target.value,
                  };
                  return {
                    ...prev,
                    descriptionCards: updatedCards,
                  };
                })
              }
            />
            <div>
              <img className="dc-image" src={item.img} alt="landscape" />
              <input
                type="text"
                className="w-full input-field"
                value={item.img}
                onChange={(e) =>
                  setWhyGSTPageData((prev) => {
                    const updatedCards = [...prev.descriptionCards];
                    updatedCards[idx] = {
                      ...updatedCards[idx],
                      img: e.target.value,
                    };
                    return {
                      ...prev,
                      descriptionCards: updatedCards,
                    };
                  })
                }
              />
            </div>
            <p>
              <div>
                <img
                  className="dc-icon"
                  src={item.miniImg}
                  alt={`${item.title} icon`}
                />
                <input
                  type="text"
                  className="input-field"
                  value={item.miniImg}
                  onChange={(e) =>
                    setWhyGSTPageData((prev) => {
                      const updatedCards = [...prev.descriptionCards];
                      updatedCards[idx] = {
                        ...updatedCards[idx],
                        miniImg: e.target.value,
                      };
                      return {
                        ...prev,
                        descriptionCards: updatedCards,
                      };
                    })
                  }
                />
              </div>
              <textarea
                value={item.text}
                className="w-gst-card-text"
                onChange={(e) =>
                  setWhyGSTPageData((prev) => {
                    const updatedCards = [...prev.descriptionCards];
                    updatedCards[idx] = {
                      ...updatedCards[idx],
                      text: e.target.value,
                    };
                    return {
                      ...prev,
                      descriptionCards: updatedCards,
                    };
                  })
                }
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormWhyGST;
