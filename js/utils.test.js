import { writeFileAsync, readFileAsync, deleteFileAsync } from './utils.js';
import { writeFile, readFile, unlink } from 'node:fs/promises';

// Мокаем модуль fs/promises
jest.mock('node:fs/promises');

describe('File System Utils', () => {
  const filename = 'test.txt';
  const content = 'hello world';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('writeFileAsync should log success', async () => {
    writeFile.mockResolvedValue(undefined);
    await writeFileAsync(filename, content);
    expect(console.log).toHaveBeenCalledWith('Файл успішно записано');
  });

  test('readFileAsync should return content and log success', async () => {
    readFile.mockResolvedValue(content);
    const result = await readFileAsync(filename);
    expect(result).toBe(content);
    expect(console.log).toHaveBeenCalledWith('Файл успішно прочитано:', content);
  });

  test('deleteFileAsync should log success', async () => {
    unlink.mockResolvedValue(undefined);
    await deleteFileAsync(filename);
    expect(console.log).toHaveBeenCalledWith('Файл успішно видалено');
  });

  test('should log "Файл не існує" when file is missing (ENOENT)', async () => {
    const error = new Error('not found');
    error.code = 'ENOENT';
    readFile.mockRejectedValue(error);
    
    await expect(readFileAsync(filename)).rejects.toThrow();
    expect(console.error).toHaveBeenCalledWith('Файл не існує:', filename);
  });
});
