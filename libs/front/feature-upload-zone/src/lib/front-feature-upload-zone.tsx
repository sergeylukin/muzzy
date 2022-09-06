import { useNavigate } from 'react-router-dom';
import { Filezilla } from '@muzzy/ui/filezilla';
import { fileUpload, IFileUploadApiResponse } from '@muzzy/file';

export const FrontFeatureUploadZone = () => {
  const navigate = useNavigate();

  const uploader = (file: File | null, expiry: number) => {
    if (file) {
      fileUpload(file, expiry).then((res: IFileUploadApiResponse) => {
        const id = res.url.split('/').at(-1) || '';
        navigate(`/p/${id}`);
      });
    }
  };

  return (
    <Filezilla uploader={uploader}>
      <h1>upload a meme</h1>
      <Filezilla.ExpirySelect options={['5s', '5m', '1h', '1d', '1w']}>
        {({ option, key }) => (
          <Filezilla.ExpiryOption option={option} key={key}>
            {option.text}
          </Filezilla.ExpiryOption>
        )}
      </Filezilla.ExpirySelect>
      <Filezilla.FileInput />
      <button type="submit">Upload!</button>
    </Filezilla>
  );
};

export default FrontFeatureUploadZone;
