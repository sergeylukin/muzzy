import * as React from 'react';

export function useFilezilla({
  defaultExpiryInSeconds = 60,
}: {
  defaultExpiryInSeconds: number;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropzoneRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedExpiryInSeconds, setSelectedExpiryInSeconds] = React.useState(
    defaultExpiryInSeconds
  );

  const grabFileFromEvent = (
    event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = getFilesFromEvent(event);
    if (files[0]) setSelectedFile(files[0]);
  };

  React.useEffect(() => {
    document.addEventListener(
      'drop',
      (e) => {
        if (
          dropzoneRef.current &&
          dropzoneRef.current.contains(e.target as Node)
        )
          // @ts-ignore
          grabFileFromEvent(e);
      },
      false
    );
    document.addEventListener(
      'change',
      (e) => {
        if (inputRef.current && inputRef.current.contains(e.target as Node))
          // @ts-ignore
          grabFileFromEvent(e);
      },
      false
    );
  }, []);

  return {
    inputRef,
    dropzoneRef,
    selectedFile,
    selectedExpiryInSeconds,
    setSelectedExpiryInSeconds,
  };
}

const getFilesFromEvent = (
  event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
): Array<File> => {
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
