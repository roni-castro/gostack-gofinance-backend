import path from 'path';
import { diskStorage } from 'multer';

const tmpFolderPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolderPath,
  storage: diskStorage({
    destination: tmpFolderPath,
    filename(request, file, callback) {
      const filenameHashed = `${new Date().getTime()}-${file.originalname}`;
      callback(null, filenameHashed);
    },
  }),
};
