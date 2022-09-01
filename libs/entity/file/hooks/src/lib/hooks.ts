import * as React from 'react';

import { fileUpload } from '@muzzy/file/data-access';
import { IFileUploadApiResponse } from '@muzzy/shared/api-interface';

export function useFileUpload() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [apiResponse, setApiResponse] = React.useState<IFileUploadApiResponse>({
    url: '',
  });

  const onUpload = () => {
    // @ts-ignore
    if (inputRef.current?.files.length > 0) {
      // @ts-ignore
      const file = inputRef.current.files[0];
      fileUpload(file).then((res) => setApiResponse(res));
    }
  };

  return {
    inputRef,
    onUpload,
    apiResponse,
  };
}
