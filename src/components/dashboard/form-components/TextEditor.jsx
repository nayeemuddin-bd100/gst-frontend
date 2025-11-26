import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ color: [] }, { background: [] }], 
    [{ font: [] }],                    
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};


const formats = [
  "header",
  "font",
  "color",
  "background",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const TextEditor = ({value, setValue}) => {

  return (
    <div className="text-editor">
      <ReactQuill  theme="snow" modules={modules} formats={formats} value={value} onChange={setValue}></ReactQuill>
    </div>
  );
};

export default TextEditor;


