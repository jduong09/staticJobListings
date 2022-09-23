document.addEventListener('DOMContentLoaded', () => {
  const http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const jsonObj = JSON.parse(this.responseText);
      console.log(jsonObj);
    }
  }

  http.open('GET', './data.json', true);
  http.send();
});