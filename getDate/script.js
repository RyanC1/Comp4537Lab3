let xhttp = new XMLHttpRequest()
let i = 0;

xhttp.onreadystatechange = function () {
    if (this.readyState == 3 && this.status == 200) {
        i++;
        console.log(this.responseText);
        console.log(i);
    }
}

xhttp.open("GET", url, true);
xhttp.send();