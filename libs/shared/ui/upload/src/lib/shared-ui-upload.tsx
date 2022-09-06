import * as React from 'react';
import { useFileUpload, IFileUploadApiResponse } from '@muzzy/file';
import { duration } from '@muzzy/shared/utils/duration';

interface IUploadContext {
  apiResponse: IFileUploadApiResponse;
  inputRef: React.RefObject<HTMLInputElement>;
  dropzoneRef: React.RefObject<HTMLDivElement> | null;
  selectedExpiryInSeconds: number;
  setSelectedExpiryInSeconds: (expiry: number) => void;
  onUpload: (e: React.SyntheticEvent) => void;
}

const UploadContext = React.createContext<IUploadContext | null>(null);

type IExpiry = {
  value: string;
  text: string;
};

export function useUploadContext() {
  return React.useContext(UploadContext) as IUploadContext;
}

export const Upload = ({
  children,
  onUploadComplete,
}: {
  children: React.ReactNode;
  onUploadComplete: (id: string) => void;
}) => {
  const {
    apiResponse,
    inputRef,
    dropzoneRef,
    selectedExpiryInSeconds,
    setSelectedExpiryInSeconds,
    onUpload,
  } = useFileUpload({ defaultExpiryInSeconds: 60 });

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
        selectedExpiryInSeconds,
        setSelectedExpiryInSeconds,
        onUpload,
      }}
    >
      <div ref={dropzoneRef}>
        <form onSubmit={onUpload}>{children}</form>
      </div>
    </UploadContext.Provider>
  );
};

export interface ISelectChildrenProps {
  option: IExpiry;
  key: number;
}

interface ExpirySelectProps<T extends React.ElementType> {
  as?: T;
  children: React.FC<ISelectChildrenProps>;
  options: string[];
}

const ExpirySelect = <T extends React.ElementType = 'select'>({
  as,
  children,
  options,
}: ExpirySelectProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ExpirySelectProps<T>>) => {
  const Component = as || 'select';
  const { setSelectedExpiryInSeconds } = useUploadContext();
  const expiryOptions = options.map((value) => ({
    value,
    text: value,
  }));
  const [expiry, setExpiry] = React.useState(options[0]);
  const onChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newValue: string = (e.target as HTMLSelectElement).value;
    const newValueInSeconds = duration.toSeconds(newValue);
    setExpiry(newValue);
    setSelectedExpiryInSeconds(newValueInSeconds);
  };
  return (
    <Component value={expiry} onChange={onChange}>
      {expiryOptions.map((option, key) => children({ option, key }))}
    </Component>
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
