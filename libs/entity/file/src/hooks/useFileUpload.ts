import * as React from 'react';

import { fileUpload } from '@muzzy/file';
import { IFileUploadApiResponse } from '@muzzy/shared/api-interface';

export function useFileUpload() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropzoneRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [apiResponse, setApiResponse] = React.useState<IFileUploadApiResponse>({
    url: '',
  });

  // @ts-ignore
  const grabFile = (event) => {
    if (
      (dropzoneRef.current && dropzoneRef.current.contains(event.target)) ||
      (inputRef.current && inputRef.current.contains(event.target))
    ) {
      const files = getFilesFromEvent(event);

      // @ts-ignore
      if (files[0]) setSelectedFile(files[0]);
    }
  };

  React.useEffect(() => {
    document.addEventListener('drop', grabFile, false);
    document.addEventListener('change', grabFile, false);
  }, [dropzoneRef.current, inputRef.current]);

  const onUpload = () => {
    if (selectedFile)
      fileUpload(selectedFile).then((res) => setApiResponse(res));
  };

  return {
    inputRef,
    dropzoneRef,
    onUpload,
    apiResponse,
  };
}

const getFilesFromEvent = (
  event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
): Array<File | DataTransferItem> => {
  let items = null;

  if ('dataTransfer' in event) {
    const dt = event.dataTransfer;

    // NOTE: Only the 'drop' event has access to DataTransfer.files, otherwise it will always be empty
    if ('files' in dt && dt.files.length) {
      items = dt.files;
    } else if (dt.items && dt.items.length) {
      items = dt.items;
    }
  } else if (event.target && event.target.files) {
    items = event.target.files;
  }

  return Array.prototype.slice.call(items);
};
