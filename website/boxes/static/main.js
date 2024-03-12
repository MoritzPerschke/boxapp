  // JavaScript to handle adding box and filament combinations to JSON list
  var jsonList = [];

  // Event listener for "Add to List" button
  document.querySelectorAll('.add-to-list').forEach(button => {
    button.addEventListener('click', function() {
      var boxName = this.closest('.boxItem').querySelector('.boxHeading h2').textContent.trim();
      var filamentId = this.previousElementSibling.value;
      var filamentName = this.previousElementSibling.options[this.previousElementSibling.selectedIndex].text;
      var filamentPricePerKg = parseFloat(this.closest('.boxItem').querySelector('.filament-dropdown').querySelector('option:checked').getAttribute('data-price-per-kg'));
      var boxPrintTime = parseFloat(this.closest('.boxItem').querySelector('.boxPrintTime').textContent.trim());
      var boxWeight = parseFloat(this.closest('.boxItem').querySelector('.boxWeight').textContent.trim());
      var totalWeight = boxWeight / 1000; // Convert grams to kilograms
      var totalPrice = (boxPrintTime + (totalWeight * (filamentPricePerKg * 1.2))).toFixed(2);
      var pricePreview = this.closest('.boxItem').querySelector('.calculated-price-preview');
      pricePreview.textContent = 'Price: €' + totalPrice;
      pricePreview.dataset.price = totalPrice; // Store the price in dataset for later retrieval

      var boxFilament = { box_name: boxName, filament_name: filamentName, price: totalPrice };
      jsonList.push(boxFilament);
      renderJsonList();

      updateTotalPrice();
    });
  });

  // Function to render JSON list
  function renderJsonList() {
    var jsonListElement = document.getElementById('json-list');
    jsonListElement.innerHTML = '<h2>Selected Combinations:</h2>';
    jsonList.forEach(item => {
      jsonListElement.innerHTML += '<p>Box: ' + item.box_name + ', Filament: ' + item.filament_name + ', Price: €' + item.price + '</p>';
    });
  }

  // Function to update total price
  function updateTotalPrice() {
    var totalPrice = 0;
    jsonList.forEach(item => {
      totalPrice += parseFloat(item.price);
    });
    document.getElementById('total-price').textContent = '€' + totalPrice.toFixed(2);
  }

  // Download JSON list as a text file
  document.getElementById('download-btn').addEventListener('click', function() {
    var listname = document.getElementById('list-name').value;
    var listContent = '';

    jsonList.forEach(item => {
      listContent += 'Box: ' + item.box_name + 'Filament: ' + item.filament_name + 'Preis: ' + item.price + '\n';
    });
    listContent += 'Gesamt: ' + document.getElementById('total-price').textContent;
    console.log(listContent)

    var blob = new Blob([listContent], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = listname + '.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
