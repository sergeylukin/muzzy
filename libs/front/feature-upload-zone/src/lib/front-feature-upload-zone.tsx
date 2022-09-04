import { useNavigate } from 'react-router-dom';
import { Upload, IUploadChildrenProps } from '@muzzy/ui/upload';

export const FrontFeatureUploadZone = () => {
  const navigate = useNavigate();

  const onUploadComplete = (id: string) => {
    const redirectPattern = '/p/:id';
    const postURL = redirectPattern.replace(/:id/g, id);
    navigate(postURL);
  };

  return (
    <Upload onUploadComplete={onUploadComplete}>
      {({ onUpload }: IUploadChildrenProps) => (
        <>
          <h1>upload a meme</h1>
          <Upload.ExpirySelect>
            {({ option, key }) => (
              <Upload.ExpiryOption option={option} key={key}>
                {option.text}
              </Upload.ExpiryOption>
            )}
          </Upload.ExpirySelect>
          <Upload.FileInput />
          <button id="muzzy-upload-button" type="submit" onClick={onUpload}>
            Upload!
          </button>
        </>
      )}
    </Upload>
  );
};

export default FrontFeatureUploadZone;
