function sendRequest(request, url) {
  request.onreadystatechange = updatePage;
  request.open("GET", url, true);
  request.send();
}

function updatePage() {
  if (request.readyState == 4) {
    if (request.status == 200) {
      /*Do some work*/
      /*
      var response = request.responseText;
      var jsonSerialized =  JSON.parse(response);
    */
    var teste = JSON.parse(request.responseText);

    console.log(teste);
      var response = {
   "Nome": "Sao Jose dos Campos",

   "Data": "2015-07-25",

   "mm": 45,

   "ReservatorioNome": "Cantareira",

   "ReservatorioPercent": 18,

   "PassadoMM": 10,

   "FuturoMM": 5,

   "Indice": 3
};
    
    /*var obj = JSON.parse(response);*/

      var item = response;
      var name = document.getElementById("name");
      var date = document.getElementById("date");
      var mm = document.getElementById("mm");
      var reservatorio = document.getElementById("reservoir");
      var percent = document.getElementById("reservoirPer");
      var passado = document.getElementById("passado");
      var futuro = document.getElementById("futuro");
      var indice = document.getElementById("indice");

      name.innerHTML = item.Nome;
      date.innerHTML = item.Data;
      mm.innerHTML = item.mm;
      reservatorio.innerHTML = item.ReservatorioNome;
      percent.innerHTML = item.ReservatorioPercent;
      passado.innerHTML = item.PassadoMM;
      futuro.innerHTML = item.FuturoMM;
      indice.innerHTML = item.Indice;

      document.getElementById("dadosRetorno").style.display = 'block';
    } else {
      alert("Error! Request status is " + request.status);
    }
  }
}

function makeIt() {

  var url = "https://sabesp-api.herokuapp.com/";
  sendRequest(request, url);
}
