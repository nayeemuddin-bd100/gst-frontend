
import { useAutoResizeTextarea } from "../../../functions/useAutoResizeTextarea";

const FormSectionHeader = ({
  image = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg",
  title = "title ",
  subtitle = "subtitle",
  description = "description",
  onHeaderChange,
  children,
}) => {

  const {ref, onInput} = useAutoResizeTextarea();


  return (
    <>
      <header className="hs-container">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="hs-background"
        ></div>

        <input
          type="text"
          value={image}
          className="s-h-img-input"
          onChange={(e) => onHeaderChange(e, "image")}
        />
      </header>
      {children ? (
        <div className="hs-text-container">
          <input
            type="text"
            value={title}
            className="input-field d-s-header-h1"
            onChange={(e) => onHeaderChange(e, "title")}
          />
          {children}
        </div>
      ) : (
        <div className="hs-text-container">
          <input
            type="text"
            value={title}
            className="input-field d-s-header-h1"
            onChange={(e) => onHeaderChange(e, "title")}
          />
          <div className="hs-text">
            <input
              type="text"
              value={subtitle}
              className="input-field d-s-header-h2"
              onChange={(e) => onHeaderChange(e, "subtitle")}
            />
            <textarea
              type="text"
            //   style={{ whiteSpace: "pre-line" }}
            ref={ref}
            onInput={onInput}
              value={description}
              className="input-field d-s-header-p"
              onChange={(e) => onHeaderChange(e, "description")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormSectionHeader;
