export const MAX_FILE_SIZE = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024; // 5MB in bytes

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

export const isAcceptedFileSize = (fileSize: number) => {
  //   console.log(fileSize >= MAX_FILE_SIZE_BYTES);
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPES.includes(fileType);
};
