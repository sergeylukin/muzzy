import {
  fileApiBaseUrl,
  getFileApiUrlWithId,
  IFileUploadApiResponse,
} from '../';

export const fileUpload = (file: File): Promise<IFileUploadApiResponse> => {
  return fetch(fileApiBaseUrl, {
    method: 'POST',
    body: file,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const find = async (id: string | undefined) =>
  await fetch(`${getFileApiUrlWithId(id)}`)
    .then((response) => response.blob())
    .then((imageBlob) => {
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL);
      return imageObjectURL;
    })
    .catch((error) => console.log(error));
