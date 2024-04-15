const selector = document.getElementById('selector');
  const output = document.getElementById('output');

  selector.addEventListener('change', function() {
    const selectedOption = selector.value;
    let textToShow = '';

    switch (selectedOption) {
      case 'option1':
        textToShow = 'Вы выбрали Опцию 1';
        break;
      case 'option2':
        textToShow = 'Вы выбрали Опцию 2';
        break;
      case 'option3':
        textToShow = 'Вы выбрали Опцию 3';
        break;
      default:
        textToShow = 'Выберите опцию';
        break;
    }

    output.textContent = textToShow;
  });