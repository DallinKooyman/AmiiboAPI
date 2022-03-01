document.getElementById("amiiboNameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const name = document.getElementById("amiiboName").value;

  if (name === ""){
    return;
  }

  if (name.includes("(")) {
    let result = ""
    
    result += `<div class="error">`;
    result += "<p>Sorry, you can't have parenthesis in the name. Check <a href=\"https://amiiboapi.com/\">amiiboapi.com</a> for more</p>";
    result += `</div>`

    document.getElementById("result").innerHTML = result;
    return
  }



  console.log("Amiibo name: " + name);

  const url = "https://www.amiiboapi.com/api/amiibo/?name=" + name + "&showusage";

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let response = "";
    console.log(data);

    let allAmiibo = data.amiibo;

    response += `<div class="amiibo-header">`;
    response += `<h3>`;
    response += allAmiibo[0].character;
    response += `</h3>`;

    response += `<h4>`;
    response += allAmiibo[0].gameSeries;
    response += `</h4>`;
    response += `</div>`;
    
    //start amiibo container div
    response += `<div class="amiibo-container">`;

    for (let i = 0; i < allAmiibo.length; i += 1){
      //start amiibo-info-container
      response += `<div class="amiibo-info-container">`;

      //start img-container div 
      response += `<div class="img-container">`;

      response += `<img src="` + allAmiibo[i].image + `"/>`;

      response += '</div>';
      //end img-container div 

      //start details
      response += `<div class="details">`;

      //start release container
      response += '<div class="release-container">';

      for(const value in allAmiibo[i].release) {
        response += `<div class="release">`;
        response += `<h5 class="region">` + value.toUpperCase() + `: </h5>`;
        response += `<p class="date">` + allAmiibo[i].release[value] + `</p>`;
        response += `</div>`;
      }

      response += `</div>`;
      //end release container


      //start compatible games
      response += `<div class="games-container">`;

      response += `<h5 id="switchGames">Total Compatible Switch Games: `;
      response += allAmiibo[i].gamesSwitch.length + `</h5>`;
      response += `<div class="consoleInfo">`;
      let switchGames = allAmiibo[i].gamesSwitch;
      if (switchGames.length > 0) {
        for (let j = 0; j < switchGames.length; j += 1){
          response += `<p class="usable-game">`;
          response += switchGames[j].gameName;
          response += `</p>`;
        }
      }
      response += `</div>`;

      
      response += `<h5 id="wiiUGames">Total Compatible Wii U Games: `;
      response += allAmiibo[i].gamesWiiU.length + `</h5>`;
      response += `<div class="consoleInfo">`;
      let wiiUGames = allAmiibo[i].gamesWiiU;
      if (wiiUGames.length > 0) {
        for (let j = 0; j < wiiUGames.length; j += 1){
          response += `<p class="usable-game">`;
          response += wiiUGames[j].gameName;
          response += `</p>`;
        }
      }
      response += `</div>`;

      response += `<h5 id="3DSGames">Total Compatible 3DS Games: `;
      response += allAmiibo[i].games3DS.length + `</h5>`;
      response += `<div class="consoleInfo">`;
      let game3DS = allAmiibo[i].games3DS;
      if (game3DS.length > 0) {
        for (let j = 0; j < game3DS.length; j += 1){
          response += `<p class="usable-game">`;
          response += game3DS[j].gameName;
          response += `</p>`;
        }
      }
      response += `</div>`;

      response += `</div>`;
      //end compatible games

      response += `</div>`;
      //end details

      response += '</div>';
      //end amiibo-info-container
    }

    response += '</div>';
    //end amiibo container div
    
    document.getElementById("result").innerHTML = response;
  })
  .catch((error) => {
    let result = `<div class="error">`;
    result += "<p>Sorry, we couldn't find an amiibo with that name.</p>";
    result += "<p>Make sure you spelt the name correctly.</p>";
    result += "<p>Some amiibo that contain special characters (\"&\", \"(\", \")\" and \"-\") don't work with the API.</p>"
    result +=  "<p>Check <a href=\"https://amiiboapi.com/\">amiiboapi.com</a> for more!</p>";
    result += `</div>`
    console.log(error);
    document.getElementById("result").innerHTML = result;
  })



})