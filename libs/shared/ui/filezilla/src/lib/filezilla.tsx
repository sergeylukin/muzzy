import * as React from 'react';
import { duration } from '@muzzy/shared/utils/duration';
import { useFilezilla } from './useFilezilla';

interface IUploadContext {
  inputRef: React.RefObject<HTMLInputElement>;
  dropzoneRef: React.RefObject<HTMLDivElement> | null;
  selectedExpiryInSeconds: number;
  setSelectedExpiryInSeconds: (expiry: number) => void;
}

const UploadContext = React.createContext<IUploadContext | null>(null);

type IExpiry = {
  value: string;
  text: string;
};

export function useUploadContext() {
  return React.useContext(UploadContext) as IUploadContext;
}

export const Filezilla = ({
  children,
  uploader,
}: {
  children: React.ReactNode;
  uploader: (file: File | null, expiry: number) => void;
}) => {
  const {
    inputRef,
    dropzoneRef,
    selectedFile,
    selectedExpiryInSeconds,
    setSelectedExpiryInSeconds,
  } = useFilezilla({ defaultExpiryInSeconds: 60 });

  return (
    <UploadContext.Provider
      value={{
        inputRef,
        dropzoneRef,
        selectedExpiryInSeconds,
        setSelectedExpiryInSeconds,
      }}
    >
      <div ref={dropzoneRef}>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            uploader(selectedFile, selectedExpiryInSeconds);
          }}
        >
          {children}
        </form>
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

  React.useEffect(() => {
    setSelectedExpiryInSeconds(duration.toSeconds(options[0]));
  }, [options, setSelectedExpiryInSeconds]);

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

Filezilla.ExpirySelect = ExpirySelect;
Filezilla.ExpiryOption = ExpiryOption;
Filezilla.FileInput = FileInput;
