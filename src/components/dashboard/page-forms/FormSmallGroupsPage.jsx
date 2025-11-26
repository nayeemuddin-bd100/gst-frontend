import React from "react";
import FormSectionHeader from "../form-components/FormSectionHeader";
import ProcessText from "../../../functions/LanguageSorter";
import { usePageData } from "../../../modules/PageDataContext";
import { useAutoResizeTextarea } from "../../../functions/useAutoResizeTextarea";

const FormSmallGroupsPage = () => {
  const { smallGroupPageData, setSmallGroupPageData } = usePageData();
  const { ref, onInput } = useAutoResizeTextarea();


  const onHeaderChange = (e, type) => {
    setSmallGroupPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={smallGroupPageData.sectionHeader.image}
        title={smallGroupPageData.sectionHeader.title}
      >
        <div className="sg-container">
          <div>
            <img src={smallGroupPageData.leftImage} />
            <input
              type="text"
              onChange={(e) =>
                setSmallGroupPageData((prev) => ({
                  ...prev,
                  leftImage: e.target.value,
                }))
              }
              value={smallGroupPageData.leftImage}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                setSmallGroupPageData((prev) => ({
                  ...prev,
                  titleText: e.target.value,
                }))
              }
              className="input-field d-s-header-h2"
              value={smallGroupPageData.titleText}
            />
            <div>
              <textarea
                onChange={(e) =>
                  setSmallGroupPageData((prev) => ({
                    ...prev,
                    para1: e.target.value,
                  }))

                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={smallGroupPageData.para1}
                className="d-s-header-p"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setSmallGroupPageData((prev) => ({
                    ...prev,
                    para2: e.target.value,
                  }))
                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={smallGroupPageData.para2}
                className="d-s-header-p"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setSmallGroupPageData((prev) => ({
                    ...prev,
                    para3: e.target.value,
                  }))
                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={smallGroupPageData.para3}
                className="d-s-header-p"
              />
            </div>
          </div>
        </div>
      </FormSectionHeader>
    </div>
  );
};

export default FormSmallGroupsPage;
