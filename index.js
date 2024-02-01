document.addEventListener('DOMContentLoaded', function () {
  // Зміна кольору

  const colorForm = document.getElementById('color-form');
  const bgColorInput = document.getElementById('background-color');
  const textColorInput = document.getElementById('text-color');
  const bgColorPreview = document.getElementById('bgColorPreview');
  const textColorPreview = document.getElementById('textColorPreview');

  function updatePlaceholder(element, color) {
    element.textContent = `rgb(${hexToRgb(color).join(', ')})`;
    element.style.color = color;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  function setLocalStorageWithTimeout(key, value, timeout) {
    localStorage.setItem(key, value);
    setTimeout(() => {
      localStorage.removeItem(key);
    }, timeout);
  }

  colorForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const backgroundColor = bgColorInput.value;
    const textColor = textColorInput.value;

    setLocalStorageWithTimeout('bgColor', backgroundColor, 10000);
    setLocalStorageWithTimeout('textColor', textColor, 10000);

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;

    updatePlaceholder(bgColorPreview, textColor);
    updatePlaceholder(textColorPreview, textColor);
  });

  const storedBgColor = localStorage.getItem('bgColor');
  const storedTextColor = localStorage.getItem('textColor');

  if (storedBgColor) {
    bgColorInput.value = storedBgColor;
    document.body.style.backgroundColor = storedBgColor;
    updatePlaceholder(bgColorPreview, storedTextColor);
  }

  if (storedTextColor) {
    textColorInput.value = storedTextColor;
    document.body.style.color = storedTextColor;
    updatePlaceholder(textColorPreview, storedTextColor);
  }

  // Антиспам і форма
  function generateAntiSpam() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    return {
      question: `Solve the equation: ${num1} + ${num2} = ?`,
      answer: num1 + num2
    };
  }

  function updateAntiSpam() {
    const antiSpamContainer = document.querySelector('.antispam');
    const antiSpam = generateAntiSpam();

    antiSpamContainer.innerHTML = `
      <label for="captcha">${antiSpam.question}</label>
      <input type="number" name="captcha" required>
    `;

    return antiSpam.answer;
  }

  const contactForm = document.getElementById('contact-form');
  let captchaAnswer = updateAntiSpam(); // Початкове значення CAPTCHA

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const captchaInput = document.querySelector('input[name="captcha"]');
    const userAnswer = parseFloat(captchaInput.value);

    if (isNaN(userAnswer) || userAnswer !== captchaAnswer) {
      alert('Incorrect CAPTCHA! Please solve the equation.');
      captchaInput.value = '';
      captchaAnswer = updateAntiSpam();
      return;
    }

    alert('Form submitted successfully!');
    contactForm.reset();
  });

  // Сайдбар
  const sidebar = document.querySelector('aside');
  const sidebarSwitches = document.querySelectorAll('input[name="sidebar"]');

  sidebarSwitches.forEach(function (switchInput, index) {
    switchInput.addEventListener('change', function () {
      const selectedValue = document.querySelector('input[name="sidebar"]:checked').value;

      if (selectedValue === 'left') {
        sidebar.style.left = '10px';
        sidebar.style.right = 'auto';
      } else if (selectedValue === 'right') {
        sidebar.style.left = 'auto';
        sidebar.style.right = '10px';
      } else if (selectedValue === 'none') {
        sidebar.style.display = 'none';
      }

    });
  });

  // Перемикач header
  function updateHeader() {
    const headerContainer = document.querySelector('.header-container');
    const selectedHeaderInput = document.querySelector('input[name="header"]:checked');

    if (!headerContainer || !selectedHeaderInput) {
      console.error('Header container or selected option not found.');
      return;
    }

    const selectedHeader = selectedHeaderInput.value;
    if (selectedHeader === 'header1') {
      headerContainer.innerHTML = '<h1>This is Header 1</h1>';
    } else if (selectedHeader === 'header2') {
      headerContainer.innerHTML = '<h2>This is Header 2</h2>';
    }
  }

  const headerSwitches = document.querySelectorAll('input[name="header"]');
  headerSwitches.forEach(function (switchInput) {
    switchInput.addEventListener('change', function () {
      updateHeader();
    });
  });

  updateHeader();

  // Перемикач footer
  function updateFooter() {
    const footerContainer = document.querySelector('.footer-container');
    const selectedFooterInput = document.querySelector('input[name="footer"]:checked');

    if (!footerContainer || !selectedFooterInput) {
      console.error('Footer container or selected option not found.');
      return;
    }

    footerContainer.style.display = 'none';
    const selectedFooter = selectedFooterInput.value;

    if (selectedFooter === 'footer1') {
      footerContainer.innerHTML = '<h2>This is Footer 1</h2>';
      footerContainer.style.display = 'block';
    } else if (selectedFooter === 'footer2') {
      footerContainer.innerHTML = '<h3>This is Footer 2</h3>';
      footerContainer.style.display = 'block';
    }
  }


  const footerSwitches = document.querySelectorAll('input[name="footer"]');
  footerSwitches.forEach(function (switchInput) {
    switchInput.addEventListener('change', function () {
      updateFooter();
    });
  });


  updateFooter();

});
