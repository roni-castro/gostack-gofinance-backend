import path from 'path';
import fs from 'fs';
import uploadConfig from './uploadConfig';

export const getFilePath = (filename: string): string => {
  return path.join(uploadConfig.directory, filename);
};

export const deleteFile = async (filename: string): Promise<boolean> => {
  const filePath = getFilePath(filename);
  try {
    await fs.promises.stat(filePath);
    await fs.promises.unlink(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
