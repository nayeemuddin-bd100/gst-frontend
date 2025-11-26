
import { usePageData } from "../../../modules/PageDataContext";
import FormSectionHeader from "../form-components/FormSectionHeader";

import { useAutoResizeTextarea } from "../../../functions/useAutoResizeTextarea";

const FormPrivateTour = () => {
  const { privateTourPageData, setPrivateTourPageData } = usePageData();
  const { ref, onInput } = useAutoResizeTextarea();

  const onHeaderChange = (e, type) => {
    setPrivateTourPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={privateTourPageData.sectionHeader.image}
        title={privateTourPageData.sectionHeader.title}
      >
        <div className="pt-container">
          <div>
            <input
              type="text"
              onChange={(e) =>
                setPrivateTourPageData((prev) => ({
                  ...prev,
                  titleText: e.target.value,
                }))
              }
              className="input-field d-s-header-h2"
              value={privateTourPageData.titleText}
            />
            <div className="">
              <textarea
                onChange={(e) =>
                  setPrivateTourPageData((prev) => ({
                    ...prev,
                    para1: e.target.value,
                  }))
                }
                ref={ref}
                onInput={onInput}
                type="text"
                value={privateTourPageData.para1}
                className="d-s-header-p"
              />

              <textarea
                onChange={(e) =>
                  setPrivateTourPageData((prev) => ({
                    ...prev,
                    para2: e.target.value,
                  }))
                }
                ref={ref}
                onInput={onInput}
                type="text"
                value={privateTourPageData.para2}
                className="d-s-header-p"
              />
              <textarea
                onChange={(e) =>
                  setPrivateTourPageData((prev) => ({
                    ...prev,
                    para3: e.target.value,
                  }))
                }
                ref={ref}
                onInput={onInput}
                type="text"
                value={privateTourPageData.para3}
                className="d-s-header-p"
              />
              <textarea
                onChange={(e) =>
                  setPrivateTourPageData((prev) => ({
                    ...prev,
                    para4: e.target.value,
                  }))
                }
                ref={ref}
                onInput={onInput}
                type="text"
                value={privateTourPageData.para4}
                className="d-s-header-p"
              />
              <textarea
                onChange={(e) =>
                  setPrivateTourPageData((prev) => ({
                    ...prev,
                    para5: e.target.value,
                  }))
                }
                   ref={ref}
                onInput={onInput}
                type="text"
                value={privateTourPageData.para5}
                className="d-s-header-p"
              />
            </div>
          </div>
          <div>
            <img src={privateTourPageData.rightImage} />
            <input
              type="text"
              onChange={(e) =>
                setPrivateTourPageData((prev) => ({
                  ...prev,
                  rightImage: e.target.value,
                }))
              }
              className="input-field w-full"
              value={privateTourPageData.rightImage}
            />
          </div>
        </div>
      </FormSectionHeader>

      <div className="pt-container pt-second-container">
        <div>
          <img src={privateTourPageData.section2.leftImage} />
          <input
            type="text"
            onChange={(e) =>
              setPrivateTourPageData((prev) => ({
                ...prev,
                section2: { ...prev.section2, leftImage: e.target.value },
              }))
            }
            className="input-field w-full"
            value={privateTourPageData.section2.leftImage}
          />
        </div>

        <div className="hs-text-container">
  {/* Title */}
  <input
    type="text"
    onChange={(e) =>
      setPrivateTourPageData((prev) => ({
        ...prev,
        section2: { ...prev.section2, title: e.target.value },
      }))
    }
    className="input-field d-p-touring-s2-h4"
    value={privateTourPageData.section2.title}
  />

  {/* text1 */}
  <textarea
        className="input-field d-tt-title-p"
    ref={ref}
    onInput={onInput}
    value={privateTourPageData.section2.text1}
    onChange={(e) =>
      setPrivateTourPageData((prev) => ({
        ...prev,
        section2: { ...prev.section2, text1: e.target.value },
      }))
    }
  />

  {/* exTitle */}
  <input
    type="text"
    className="input-field d-p-touring-s2-p"
    value={privateTourPageData.section2.exTitle}
    onChange={(e) =>
      setPrivateTourPageData((prev) => ({
        ...prev,
        section2: { ...prev.section2, exTitle: e.target.value },
      }))
    }
  />

  {/* pricing list */}
<ul className="pt-list-ul">
  {privateTourPageData.section2.pricingList.map((item, index) => (
    <li key={index}>
      {/* Name field */}
      <input
        type="text"
        className="input-field d-p-touring-s2-p"
        value={item.name}
        onChange={(e) =>
          setPrivateTourPageData((prev) => {
            const newList = [...prev.section2.pricingList];
            newList[index] = {
              ...newList[index],
              name: e.target.value,
            };
            return {
              ...prev,
              section2: {
                ...prev.section2,
                pricingList: newList,
              },
            };
          })
        }
      />

      {/* Path field */}
      <input
        type="text"
        className="d-p-touring-s2-path"
        placeholder="Enter path (e.g., /tour-path)"
        value={item.path || ""}
        onChange={(e) =>
          setPrivateTourPageData((prev) => {
            const newList = [...prev.section2.pricingList];
            newList[index] = {
              ...newList[index],
              path: e.target.value,
            };
            return {
              ...prev,
              section2: {
                ...prev.section2,
                pricingList: newList,
              },
            };
          })
        }
      />
    </li>
  ))}
</ul>


  {/* bottomText */}
  <textarea
    className="input-field d-tt-title-p"
    ref={ref}
    onInput={onInput}
    value={privateTourPageData.section2.bottomText}
    onChange={(e) =>
      setPrivateTourPageData((prev) => ({
        ...prev,
        section2: { ...prev.section2, bottomText: e.target.value },
      }))
    }
  />
</div>

      </div>
    </div>
  );
};

export default FormPrivateTour;
