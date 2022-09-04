import * as React from 'react';
import { useFileUpload, IFileUploadApiResponse } from '@muzzy/file';

interface IUploadContext {
  apiResponse: IFileUploadApiResponse;
  inputRef: React.RefObject<HTMLInputElement>;
  dropzoneRef: React.RefObject<HTMLDivElement> | null;
  selectedExpiryValue: string;
  expiryOptions: IExpiry[];
  onChangeExpiry: (e: React.SyntheticEvent) => void;
  onUpload: (e: React.SyntheticEvent) => void;
}

const UploadContext = React.createContext<IUploadContext | null>(null);

type IExpiry = {
  value: string;
  text: string;
};

export interface IUploadChildrenProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onUpload: (e: React.SyntheticEvent) => void;
}

export function useUploadContext() {
  return React.useContext(UploadContext) as IUploadContext;
}

export const Upload = ({
  children,
  onUploadComplete,
}: {
  children: React.FC<IUploadChildrenProps>;
  onUploadComplete: (id: string) => void;
}) => {
  const {
    apiResponse,
    inputRef,
    dropzoneRef,
    selectedExpiryValue,
    expiryOptions,
    onChangeExpiry,
    onUpload,
  } = useFileUpload();

  React.useEffect(() => {
    if (apiResponse?.url) {
      const id = apiResponse.url.split('/').at(-1) || '';
      onUploadComplete(id);
    }
  }, [apiResponse, onUploadComplete]);

  return (
    <UploadContext.Provider
      value={{
        apiResponse,
        inputRef,
        dropzoneRef,
        selectedExpiryValue,
        expiryOptions,
        onChangeExpiry,
        onUpload,
      }}
    >
      <div ref={dropzoneRef}>
        <form onSubmit={onUpload}>
          {children({
            inputRef,
            onUpload,
          })}
        </form>
      </div>
    </UploadContext.Provider>
  );
};

export interface ISelectChildrenProps {
  option: IExpiry;
  key: number;
}

const ExpirySelect = ({
  children,
}: {
  children: React.FC<ISelectChildrenProps>;
}) => {
  const { selectedExpiryValue, onChangeExpiry, expiryOptions } =
    useUploadContext();
  return (
    <select value={selectedExpiryValue} onChange={onChangeExpiry}>
      {expiryOptions.map((option, key) => children({ option, key }))}
    </select>
  );
};
const ExpiryOption = ({
  option,
  children,
}: {
  option: IExpiry;
  children: string;
}) => {
  return <option value={option.value}>{children}</option>;
};

const FileInput = () => {
  const { inputRef } = useUploadContext();
  return <input type="file" ref={inputRef} />;
};

Upload.ExpirySelect = ExpirySelect;
Upload.ExpiryOption = ExpiryOption;
Upload.FileInput = FileInput;
