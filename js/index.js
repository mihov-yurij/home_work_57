const path = require('path'); // Підключення модуля path, який надає утиліти для роботи зі шляхами файлів

// Отримання абсолютного шляху з відносного
const filePath = './data/file.txt'; // Визначення відносного шляху до файлу
const absolutePath = path.resolve(__dirname, filePath); // Перетворення відносного шляху у абсолютний, використовуючи поточний каталог
console.log(absolutePath); // Виведення абсолютного шляху до файлу: /Users/username/projects/myapp/data/file.txt

// Отримання імені файлу
const fileName = path.basename(absolutePath); // Витягнення імені файлу з абсолютного шляху
console.log(fileName); // Виведення імені файлу: file.txt

// Отримання розширення файлу
const fileExtension = path.extname(absolutePath); // Витягнення розширення файлу з абсолютного шляху
console.log(fileExtension); // Виведення розширення файлу: .txt

// Об'єднання шляхів
const dirPath = 'folder'; // Визначення імені директорії
const newPath = path.join(absolutePath, '..', dirPath); // Створення нового шляху, переходячи на рівень вище і потім у вказану директорію
console.log(newPath); // Виведення нового шляху: /Users/username/projects/myapp/folder

// Нормалізація шляху
const normalizedPath = path.normalize('/folder//../file.js'); // Виправлення шляху, усуваючи зайві символи ('//', '..')
console.log(normalizedPath); 