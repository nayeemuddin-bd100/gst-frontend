import React from "react";

const DashTopbar = ({
  title,
  buttonText = "Save",
  onSubmit,
  onCancel,
  cancelOption = true,
  disabled = false
}) => {

    const convertToTitleCase = (str) => {
        if (!str || str.length === "")  return
  return str
    .split('-')               // Split the string at each hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ');               // Join the words with a space
};

  return (
    <div className="flex flex-between my dash-header">
      <h2>
        {convertToTitleCase(title)}
      </h2>

      <div className="flex">
        {cancelOption && <button className="btn-secondary " onClick={onCancel}>Cancel</button>}
        <button className="btn-primary " onClick={onSubmit} disabled={disabled}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default DashTopbar;
