import { writeFile, readFile, unlink } from 'node:fs/promises';

async function writeFileAsync(filename, content) {
  try {
    await writeFile(filename, content, 'utf8');
    console.log('Файл успішно записано');
  } catch (error) {
    console.error('Помилка при записі файлу:', error);
  }
}

async function readFileAsync(filename) {
  try {
    const content = await readFile(filename, 'utf8');
    console.log('Файл успішно прочитано:', content);
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Файл не існує:', filename);
    } else {
      console.error('Помилка при читанні файлу:', error);
    }
    throw error;
  }
}

async function deleteFileAsync(filename) {
  try {
    await unlink(filename);
    console.log('Файл успішно видалено');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Файл не існує:', filename);
    } else {
      console.error('Помилка при видаленні файлу:', error);
    }
  }
}

// Экспорт должен быть только тут!
export { writeFileAsync, readFileAsync, deleteFileAsync };

