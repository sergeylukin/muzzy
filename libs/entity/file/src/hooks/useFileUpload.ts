import * as React from 'react';

import { fileUpload, IFileUploadApiResponse } from '../';

export function useFileUpload() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropzoneRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [apiResponse, setApiResponse] = React.useState<IFileUploadApiResponse>({
    url: '',
  });
  const [selectedExpiryValue, setSelectedExpiryValue] = React.useState('5s');
  const expiryOptions = [
    {
      value: '5s',
      text: '5s',
    },
    {
      value: '1m',
      text: '1m',
    },
  ];

  const onChangeExpiry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newValue: string = (e.target as HTMLSelectElement).value;
    setSelectedExpiryValue(newValue);
  };

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

  const onUpload = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const expiry = 20;
    if (selectedFile)
      fileUpload(selectedFile, expiry).then((res) => setApiResponse(res));
  };

  return {
    inputRef,
    dropzoneRef,
    onUpload,
    apiResponse,
    selectedExpiryValue,
    expiryOptions,
    onChangeExpiry,
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
