import React, { useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

const FileDemo = () => {
  const toast = useRef<Toast>(null);

  const onUpload = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  };

  // TODO upload

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <h5>Advanced</h5>
          <FileUpload
            name="demo[]"
            url="./upload.php"
            onUpload={onUpload}
            multiple
            accept="image/*"
            maxFileSize={1000000}
          />

          <h5>Basic</h5>
          <FileUpload
            mode="basic"
            name="demo[]"
            url="./upload.php"
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default FileDemo;
