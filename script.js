// Первая карточка - Игра УГАДАЙКА, кнопка НАЧАТЬ ИГРУ
// Клик по кнопке НАЧАТЬ ИГРУ
// Диапазон значений Введите минимальное и максимальное значение числа для игры (от -999 до 999), кнопка ПРОДОЛЖИТЬ
document.getElementById('btnTobegin').addEventListener('click', function () {   // Клик по кнопке НАЧАТЬ ИГРУ --> Переход на карточку Диапазон значений
  document.querySelector('.title-page').classList.add('hidden');              // Игра УГАДАЙКА / добавляется класс hidden; надпись исчезает
  document.querySelector('.value-range').classList.remove('hidden');          // Диапазон значений / класс hidden удаляется; надпись появляется
  document.querySelector('.valueRange').classList.remove('hidden');           // Диапазон значений Текст / класс hidden удаляется; надпись появляется
  document.querySelector('.form-inline').classList.remove('hidden');          // Форма мин мах / класс hidden удаляется; форма появляется
  document.querySelector('#btnTobegin').classList.add('hidden');              // Кнопка НАЧАТЬ ИГРУ / добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnProceed').classList.remove('hidden');           // Кнопка ПРОДОЛЖИТЬ / класс hidden удаляется; кнопка появляется
})

// Клик по кнопке ПРОДОЛЖИТЬ
// Условия, Загадайте любое целое число от 0 до 100, а я его угадаю, кнопка ИГРАТЬ
document.getElementById('btnProceed').addEventListener('click', function () {   // Клик по кнопке ПРОДОЛЖИТЬ --> Переход на карточку Условия с кнопкой ИГРАТЬ
  document.querySelector('.value-range').classList.add('hidden');             // Диапазон значений / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.terms').classList.remove('hidden');                // Условия / класс hidden удаляется; надпись появляется
  document.querySelector('.valueRange').classList.add('hidden');              // Диапазон значений Текст / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.form-inline').classList.add('hidden');             // Форма мин мах / опять добавляется класс hidden; форма исчезает
  document.querySelector('.guessNumber').classList.remove('hidden');          // Фраза Загадайте любое целое число / класс hidden удаляется; Фраза появляется
  document.querySelector('#btnProceed').classList.add('hidden');              // Кнопка ПРОДОЛЖИТЬ / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnPlay').classList.remove('hidden');              // Кнопка ИГРАТЬ / класс hidden удаляется; кнопка появляется
  minValue = parseInt(document.querySelector('#formInputMin').value);
  maxValue = parseInt(document.querySelector('#formInputMax').value);
  minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
  maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
  if (maxValue < minValue) {
      [maxValue, minValue] = [minValue, maxValue]; // Значения меняются местами если max меньше min.
  }
  if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
      minValue = 0;
      maxValue = 100;
  }
  guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

// Клик по кнопке ИГРАТЬ
// Сама Игра - Карточка с Вопросом, кнопками: меньше, больше, верно, заново
document.getElementById('btnPlay').addEventListener('click', function () {      // Клик по кнопке ИГРАТЬ --> Переход на карточку Вопрос №, с кнопками: меньше, больше, верно, заново
  document.querySelector('.terms').classList.add('hidden');                   // Условия / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.question').classList.remove('hidden');             // Вопрос № / класс hidden удаляется; надпись появляется
  document.querySelector('.guessNumber').classList.add('hidden');             // Фраза Загадайте любое целое число / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.no-gutters').classList.remove('hidden');           // Вы загадали число / класс hidden удаляется; надпись появляется
  document.querySelector('#btnPlay').classList.add('hidden');                 // Кнопка ИГРАТЬ / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnLess').classList.remove('hidden');              // Кнопка меньше / класс hidden удаляется; кнопка появляется
  document.querySelector('#btnEqual').classList.remove('hidden');             // Кнопка Верно! / класс hidden удаляется; кнопка появляется
  document.querySelector('#btnOver').classList.remove('hidden');              // Кнопка больше / класс hidden удаляется; кнопка появляется
  document.querySelector('.btn-link').classList.remove('hidden');             // Кнопка Заново / класс hidden удаляется; кнопка появляется

  let answerNumber = Math.floor((minValue + maxValue) / 2); // Середина числового диапазона
  let orderNumber = 1; // Номер первого вопроса.
  let gameRun = true;

  const orderNumberField = document.getElementById('orderNumberField'); // Вопрос №_
  const answerField = document.getElementById('answerField');

  // Преобразования числа в текстовую форму. Число выводится в текстовой форме, если в текстовой форме меньше 20 символов, включая пробелы.

  let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

  function numberToText() { // Функция преобразования числа из цифр в слова (числа от -999 до 999).
      let number = Math.abs(answerNumber);
      let text = '';

      if (number == 0) {
          text = 'НОЛЬ';
          return text;
      }

      if (number <= 9) {
          return units[Math.floor(Math.abs(number) / 1)];
      }

      if (number > 9 && number < 20) {
          return teens[Math.floor(number / 10 + number % 10)];
      }

      if (number >= 20 && number <= 99) {
          return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
      }

      if (number >= 100 && number <= 999) {
          return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
      }
  }

  function numberToTextHundreds() { // Функция вычисления остатка от сотого числа и преобразования его в числа из цифр в слова (числа от 0 до 99) для последующего присоединения к функции numberToText() расчитывающей сотни hundreds.
      let unitsTeensDozens = Math.abs(answerNumber) % 100;

      if (unitsTeensDozens <= 9) {
          return units[Math.floor(unitsTeensDozens / 1)];
      }

      if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
          return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
      }

      if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
          return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
      }
  }

  orderNumberField.innerText = orderNumber; // Вопрос № 1
  answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
  // Вы загадали число [__]? - Середина числового диапазона (answerNumber - подставляется середина числового диапазона в функцию numberToText() которая преобразует в текст и записывается в переменную numberWord).

  document.getElementById('btnLess').addEventListener('click', function () { // Код для кнопки «Меньше».
      if (gameRun) {
          if (minValue === maxValue || minValue == answerNumber) {
              const phraseRandom = Math.round(Math.random() * 3);
              switch (phraseRandom) {
                  case 0:
                      answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                      break;

                  case 1:
                      answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                      break;

                  case 2:
                      answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                      break;

                  case 3:
                      answerPhrase = `Не жульничайте!\n\u{1F620}`
                      break;
              }
              answerField.innerText = answerPhrase;
              gameRun = false;
          } else {
              maxValue = answerNumber - 1; // Изменение верхней границы поискового диапазона.
              answerNumber = Math.floor((minValue + maxValue) / 2);
              orderNumber++;
              orderNumberField.innerText = orderNumber;
              const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
              switch (phraseRandom) {
                  case 1:
                      answerPhrase = `Наверное, это число `
                      break;

                  case 2:
                      answerPhrase = `Возможно `
                      break;

                  case 3:
                      answerPhrase = `Это число `
                      break;

                  case 4:
                      answerPhrase = `Скорее всего это число `
                      break;
              }
              answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
          }
      }
  })

  document.getElementById('btnOver').addEventListener('click', function () { // Код для кнопки «Больше».
      if (gameRun) {
          if (minValue === maxValue) {
              const phraseRandom = Math.round(Math.random() * 3);
              switch (phraseRandom) {
                  case 0:
                      answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                      break;

                  case 1:
                      answerPhrase = `Вы забыли, какое число загадали?\n\u{1F92A}`
                      break;

                  case 2:
                      answerPhrase = `Вы ошиблись с числом!\n\u{1F9D0}`
                      break;

                  case 3:
                      answerPhrase = `Не жульничайте!\n\u{1F620}`
                      break;
              }
              answerField.innerText = answerPhrase;
              gameRun = false;
          } else {
              minValue = answerNumber + 1; // Изменение нижней границы поискового диапазона.
              answerNumber = Math.floor((minValue + maxValue) / 2);
              orderNumber++;
              orderNumberField.innerText = orderNumber;
              const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
              switch (phraseRandom) {
                  case 0:
                      answerPhrase = `Вы загадали число `
                      break;

                  case 1:
                      answerPhrase = `Наверное, это число `
                      break;

                  case 2:
                      answerPhrase = `Возможно `
                      break;

                  case 3:
                      answerPhrase = `Это число `
                      break;

                  case 4:
                      answerPhrase = `Скорее всего это число `
                      break;
              }
              answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
          }
      }
  })

  document.getElementById('btnEqual').addEventListener('click', function () { // Код для кнопки "Верно".
      if (gameRun) {
          const phraseRandom = Math.round(Math.random() * 3);
          switch (phraseRandom) {
              case 0:
                  answerPhrase = `Я всегда угадываю\n\u{1F60E}`
                  break;

              case 1:
                  answerPhrase = `Yes! \n\u{1F60E}`
                  break;

              case 2:
                  answerPhrase = `Отлично!\n\u{1F973}`
                  break;

              case 3:
                  answerPhrase = `Я выиграл!\n\u{1F929}`
                  break;
          }
          answerField.innerText = answerPhrase;
          gameRun = false;
      }
  })
})

// Клик по кнопке Заново
// Диапазон значений Введите минимальное и максимальное значение числа для игры (от -999 до 999), кнопка ПРОДОЛЖИТЬ
document.getElementById('btnRetry').addEventListener('click', function () {     // Клик по кнопке Заново --> Переход на карточку Диапазон значений
  document.querySelector('.question').classList.toggle('hidden');             // Вопрос № / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.value-range').classList.toggle('hidden');          // Диапазон значений / класс hidden удаляется; надпись появляется
  document.querySelector('.no-gutters').classList.toggle('hidden');           // Вы загадали число / опять добавляется класс hidden; надпись исчезает
  document.querySelector('.valueRange').classList.toggle('hidden');           // Диапазон значений Текст / класс hidden удаляется; надпись появляется
  document.querySelector('.form-inline').classList.toggle('hidden');          // Форма мин мах / класс hidden удаляется; форма появляется
  document.querySelector('#btnLess').classList.toggle('hidden');              // Кнопка меньше / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnEqual').classList.toggle('hidden');             // Кнопка Верно! / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnOver').classList.toggle('hidden');              // Кнопка больше / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('.btn-link').classList.toggle('hidden');             // Кнопка Заново / опять добавляется класс hidden; кнопка исчезает
  document.querySelector('#btnProceed').classList.toggle('hidden');           // Кнопка Продолжить / класс hidden удаляется; кнопка появляется
  document.querySelector('#formInputMin').value = '';
  document.querySelector('#formInputMax').value = '';
  minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
  maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
  if (maxValue < minValue) {
      [maxValue, minValue] = [minValue, maxValue]; // Значения меняются местами если max меньше min.
  }
  if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
      minValue = 0;
      maxValue = 100;
  }
  guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

  // Клик по кнопке ПРОДОЛЖИТЬ
  // Условия, Загадайте любое целое число от 0 до 100, а я его угадаю, кнопка ИГРАТЬ
  document.getElementById('btnProceed').addEventListener('click', function () {   // Клик по кнопке ПРОДОЛЖИТЬ --> Переход на карточку Условия с кнопкой ИГРАТЬ
      document.querySelector('.value-range').classList.add('hidden');             // Диапазон значений / опять добавляется класс hidden; надпись исчезает
      document.querySelector('.terms').classList.remove('hidden');                // Условия / класс hidden удаляется; надпись появляется
      document.querySelector('.valueRange').classList.add('hidden');              // Диапазон значений Текст / опять добавляется класс hidden; надпись исчезает
      document.querySelector('.form-inline').classList.add('hidden');             // Форма min max / опять добавляется класс hidden; форма исчезает
      document.querySelector('.guessNumber').classList.remove('hidden');          // Фраза Загадайте любое целое число / класс hidden удаляется; Фраза появляется
      document.querySelector('#btnProceed').classList.add('hidden');              // Кнопка ПРОДОЛЖИТЬ / опять добавляется класс hidden; кнопка исчезает
      document.querySelector('#btnPlay').classList.remove('hidden');              // Кнопка ИГРАТЬ / класс hidden удаляется; кнопка появляется
  })
})