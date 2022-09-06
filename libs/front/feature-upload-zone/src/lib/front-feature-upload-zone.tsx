import { useNavigate } from 'react-router-dom';
import { Filezilla } from '@muzzy/ui/filezilla';

export const FrontFeatureUploadZone = () => {
  const navigate = useNavigate();

  return (
    <Filezilla
      onUploadComplete={(id: string) => {
        navigate(`/p/${id}`);
      }}
    >
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
