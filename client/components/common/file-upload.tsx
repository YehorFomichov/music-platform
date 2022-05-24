import React, { useRef } from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();
  const handleUploadFile = () => {
    ref.current.click();
  };
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div onClick={handleUploadFile}>
      <input
        ref={ref}
        accept={accept}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
