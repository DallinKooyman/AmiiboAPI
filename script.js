document.getElementById("amiiboNameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const name = document.getElementById("amiiboName").value;

  if (name === ""){
    return;
  }

  console.log("Amiibo name: " + name);

  const baseURL = "https://www.amiiboapi.com/api/amiibo/?name=";

  fetch(baseURL+name)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let response = "";
    console.log(data);

    let allAmiibo = data.amiibo;

    for (let i = 0; i < allAmiibo.length; i += 1){
      //start amiibo container div
      response += `<div class="amiibo-container>`;
      
      //start amiibo-info-container
      response += `<div class="amiibo-info-container>`;
      response += `<h3>`;
      response += allAmiibo[i].character;
      response += `</h3>`

      response += `<h4>`;
      response += allAmiibo[i].gameSeries;
      response += `</h4>`;

      //start details
      response += `<div class="details">`;



      response += `</div>`;
      //end details

      response += '</div>';
      //end amiibo-info-container


      //start img-container div 
      response += `<div class="img-container">`;

      response += `<img src="` + allAmiibo[i].image + `"/>`;

      response += '</div>';
      //end img-container div 

      
      response += '</div>';
      //end amiibo container div
    }
    
    document.getElementById("result").innerHTML = response;


  })



})