function handleKeyClick(key) {
    var input = document.getElementById('phone-number');
    var value = input.value;
    var keyText = key.textContent.trim();
  
    if (keyText === '(?123)') {
      if (currentKeyboard === 'qwerty') {
        toggleKeyboardMode();
      }
    } else if (keyText === '⌫') {
      input.value = value.slice(0, -1);
    } else if (keyText === '⏎') {
      // Send input value to Python script
      sendInputToPython(value);
    } else if (keyText === 'ABC') {
      if (currentKeyboard === 'numeric') {
        toggleKeyboardMode();
      }
    } else if (keyText === '⇧') {
      toggleShiftMode();
    } else {
      input.value += keyText;
    }
  }
  
  function sendInputToPython(inputValue) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'main.py', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.responseText;
        alert('Response from Python script: ' + response);
      }
    };
    var data = JSON.stringify({ input: inputValue });
    xhr.send(data);
  }
  