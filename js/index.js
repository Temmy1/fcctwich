(function() {

  // создаю переменные url и каналы
  let url = "https://wind-bow.glitch.me/twitch-api/";
  let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
  
  // переменные для работы с DOM 
  let channels = document.getElementById("channels");
  let all = document.getElementById('all');
  let online = document.getElementById('online');
  let offline = document.getElementById('offline');
  //console.log(offline);
  
  // делаю url-адреса
  function makeUrl(type,name) {
    return url + type + "/" + name;
  }
  
  // запрос 
  function getInfo(name) {
    return new Promise(function(resolve, reject){
      $.getJSON(makeUrl("streams", name), function(data) {
        //console.log(data);
        //data.status = data.stream;
        if(data.stream !== null) {
          data.status = "online";
        } else {
          data.status = "offline";
        }
        $.getJSON(makeUrl("channels", name), function(response) {
          data.channel = response;
          //console.log(data.status);
          resolve(data);
        });
      });
      
    });
  }
  
let allInfo = streamers.map(getInfo);

  // обрабатываю запрос
  
  Promise.all(allInfo)
  .then(allResults => {
    
    //console.log(allResults);

    allResults.forEach(item => {
    let newEl = document.createDocumentFragment();
    let channelBox = document.createElement("div");
    
      //console.log(item.status);
      if(item.status === 'online') {
        channelBox.className = "channel-info online";
        channelBox.innerHTML = "<img src='" + item.channel.logo + "' alt='channels icon'> <p class='channels-name'><a href='" + item.channel.url + "' target='_blank'>" + item.channel.display_name + "</a></p><p class='details'>" + item.channel.status + " </p>"
      newEl.appendChild(channelBox);
      channels.appendChild(newEl);
      } else {
        channelBox.className = "channel-info offline";
        channelBox.innerHTML = "<img src='" + item.channel.logo + "' alt='channels icon'> <p class='channels-name'><a href='" + item.channel.url + "' target='_blank'>" + item.channel.display_name + "</a></p><p class='details'>" + item.status + " </p>"
      newEl.appendChild(channelBox);
      channels.appendChild(newEl);
      }
      
    });
  });
//ещё обработчик ошибок!

  
  $("#all").click(function(){
    $(".channel-info").show();
  });
  
  $("#online").click(function(){
    $(".online").show();
    $(".offline").hide();
  });
  
  $("#offline").click(function(){
     $(".offline").show();
     $(".online").hide();
  });

})();