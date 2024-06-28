function splitDomains() {
  var inputText = document.getElementById('input').value;
  var domains = inputText.split('\n').map(domain => domain.trim());

  var domainLists = {};
  domains.forEach(domain => {
    var extension = domain.split('.').pop();
    if (!domainLists[extension]) {
      domainLists[extension] = [];
    }
    domainLists[extension].push(domain);
  });

  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  Object.keys(domainLists).forEach(extension => {
    var listDiv = document.createElement('div');
    listDiv.classList.add('list');
    var heading = document.createElement('h2');
    heading.textContent = '.' + extension.toUpperCase() + ' Domains';
    var list = document.createElement('ul');
    domainLists[extension].forEach(domain => {
      var listItem = document.createElement('li');
      listItem.textContent = domain;
      list.appendChild(listItem);
    });
    listDiv.appendChild(heading);
    listDiv.appendChild(list);
    outputDiv.appendChild(listDiv);
  });

  // Store domain lists in global variable for downloading
  window.domainLists = domainLists;
}

function downloadResult() {
  var content = '';
  Object.keys(window.domainLists).forEach(extension => {
    content += '.' + extension.toUpperCase() + ' Domains\n';
    window.domainLists[extension].forEach(domain => {
      content += domain + '\n';
    });
    content += '\n';
  });

  var blob = new Blob([content], { type: 'text/plain' });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'domain_lists.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
