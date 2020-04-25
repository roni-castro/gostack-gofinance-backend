import csvParse from 'csv-parse';
import fs from 'fs';

const csvOptions = {
  from_line: 2,
  ltrim: true,
  rtrim: true,
};

const loadCSV = async (filePath: string): Promise<any[]> => {
  const readCSVStream = fs.createReadStream(filePath);
  const parseStream = csvParse(csvOptions);
  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: any[] = [];
  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
};

export default loadCSV;
