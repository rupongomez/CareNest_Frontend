export const formateFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    // If the file size is less than 1 MB

    return `${(bytes / 1024).toFixed(0)} KB`; // Convert to KB and format to 0 decimal places
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`; // Convert to MB and format to 1 decimal place
};
