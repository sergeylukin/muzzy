import { useNavigate } from 'react-router-dom';
import { Upload } from '@muzzy/ui/upload';

export const FrontFeatureUploadZone = () => {
  const navigate = useNavigate();

  return (
    <Upload
      onUploadComplete={(id: string) => {
        navigate(`/p/${id}`);
      }}
    >
      <h1>upload a meme</h1>
      <Upload.ExpirySelect options={['5s', '5m', '1h', '1d', '1w']}>
        {({ option, key }) => (
          <Upload.ExpiryOption option={option} key={key}>
            {option.text}
          </Upload.ExpiryOption>
        )}
      </Upload.ExpirySelect>
      <Upload.FileInput />
      <button id="muzzy-upload-button" type="submit">
        Upload!
      </button>
    </Upload>
  );
};

export default FrontFeatureUploadZone;
