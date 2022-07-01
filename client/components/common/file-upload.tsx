import React, { useRef } from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  name: string;
  children: React.ReactNode;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  name,
  children,
  className,
}) => {
  const ref = useRef<HTMLInputElement>();
  const handleUploadFile = () => {
    ref.current.click();
  };
  const handleChange = ({ target }): void => {
    setFile({ name: target.name, value: target.files[0] });
  };
  return (
    <div onClick={handleUploadFile} className={className}>
      <input
        ref={ref}
        name={name}
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
