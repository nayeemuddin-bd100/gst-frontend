import LanguageSwitcher from "../../LanguageSwitch";
import HeaderButton from "../../Header-contact-button";
import { FaPhoneAlt } from "react-icons/fa";
import ProcessText from "../../../functions/LanguageSorter";
import { IoIosArrowDown } from "react-icons/io";
import { usePageData } from "../../../modules/PageDataContext";
import MobileMenu from "../../MobileMenu";

const FormHeader = () => {
  const { headerData, setHeaderData } = usePageData();

  const titleExplore = ProcessText("Explore Tours***Explorar Tours");
  const titleTravel = ProcessText("Travel styles *** Estilos de viaje");
  const titleAbout = ProcessText("About us ***Sobre nosotros");
  const callAdvisorText = headerData.callAdvisorText;

  return (
    <div className="header-container d-p-header-container ">
      <div className="top-bar" style={{ backgroundColor: "#333333" }}>
        <div>
          <input
            style={{
              backgroundColor: "rgb(255 255 255)",
              color: "var(--primary-color)",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "lighter",
              marginRight: "5px",
              width: "fit-content",
            }}
            onChange={(e) =>
              setHeaderData((prev) => ({ ...prev, topbarText: e.target.value }))
            }
            value={headerData.topbarText}
          />
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="header">
        <div className="header-items">
          <div>
            <img className="" src={headerData.logo} alt="Logo" />
            <div>
              <span style={{ fontSize: "0.7rem", color: "#fff" }}>
                File Path :{" "}
              </span>
              <input
                onChange={(e) =>
                  setHeaderData((prev) => ({ ...prev, logo: e.target.value }))
                }
                type="text"
                className="input-field"
                style={{ width: "90px", color: "#fff", margin: "0 5px" }}
                value={headerData.logo}
              />
            </div>
          </div>
          <button className="mobile-dropdown-button">
            <p>{titleExplore}</p> <IoIosArrowDown fill="#fff" />
          </button>
          <button className="mobile-dropdown-button">
            <p>{titleTravel}</p> <IoIosArrowDown fill="#fff" />
          </button>
          <button className="mobile-dropdown-button">
            <p>{titleAbout}</p> <IoIosArrowDown fill="#fff" />
          </button>
        </div>
        <div className="header-items header-number-contact">
          <HeaderButton />
          <div>
            <a className="phone-container">
              <FaPhoneAlt fill="#fff" size={20} />
              <input
                type="text"
                onChange={(e) =>
                  setHeaderData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="input-field"
                value={headerData.phone}
              />
            </a>
            <input
              type="text"
              onChange={(e) =>
                setHeaderData((prev) => ({
                  ...prev,
                  callAdvisorText: e.target.value,
                }))
              }
              className="input-field"
              style={{ color: "#fff", fontSize: "12px" }}
              value={callAdvisorText}
            />
          </div>
        </div>
      </nav>
      <MobileMenu />
    </div>
  );
};

export default FormHeader;
