import "../styles/guide-card.css";
import { Adress } from "../functions/Variables";
import ProcessText from "../functions/LanguageSorter";

function GuideCard({ name, image, description }) {
  return (
    <div className="guide-container">
      {/* Left Section */}
      <div className="guide-left-section">
        <p>{ProcessText("Your Local Expert***Tu experto local")}</p>
        <h4>{ProcessText("Tour Director***Director del tour")}</h4>
        <img
          src={Adress + "uploads/guide-profile/" + image}
          alt="guide-profile-image"
          className="guide-responsive-image"
        />
      </div>

      {/* Right Section */}
      <div className="guide-right-section">
        <h4>{name}</h4>
        <p>{ProcessText(description)}</p>
      </div>
    </div>
  );
}

export default GuideCard;
