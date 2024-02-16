export const MAX_IMAGE_SIZE_MB = 5;

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Url = reader.result as string;
      resolve(base64Url);
    };
    reader.onerror = (error) => reject(error);
  });
};
