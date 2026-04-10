import { writeFileAsync, readFileAsync, deleteFileAsync } from './utils.js';

const FILE_NAME = 'demo_file.txt';
const CONTENT = 'Привіт! Це дані, записані асинхронно через Node.js.';

async function runDemo() {
  console.log('🚀 Початок демонстрації роботи з файловою системою...\n');

  // --- Етап 1: Запис ---
  console.log('Шаг 1: Спроба запису файлу...');
  await writeFileAsync(FILE_NAME, CONTENT);
  console.log('-------------------------------------------');

  // --- Етап 2: Читання ---
  console.log('Шаг 2: Читання вмісту щойно створеного файлу...');
  const data = await readFileAsync(FILE_NAME);
  if (data) {
    console.log(`✅ Отримані дані: "${data}"`);
  }
  console.log('-------------------------------------------');

  // --- Етап 3: Видалення ---
  console.log('Шаг 3: Видалення файлу для очищення системи...');
  await deleteFileAsync(FILE_NAME);
  console.log('-------------------------------------------');

  // --- Етап 4: Перевірка помилки ---
  console.log('Шаг 4: Перевірка обробки помилки (спроба прочитати видалений файл)...');
  try {
    await readFileAsync(FILE_NAME);
  } catch {
    console.log('ℹ️  Як і очікувалося, виникла помилка, бо файлу немає.');
  }

  console.log('\n🏁 Демонстрацію завершено успішно!');
}

// Запуск
runDemo();




