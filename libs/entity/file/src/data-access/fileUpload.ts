import {
  fileApiBaseUrl,
  getFileApiUrlWithId,
  IFileUploadApiResponse,
} from '../';

export const fileUpload = (
  file: File,
  expiry: number
): Promise<IFileUploadApiResponse> => {
  return fetch(`${fileApiBaseUrl}?expiry=${expiry}`, {
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
