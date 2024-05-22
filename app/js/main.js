const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let getSettingsBtn = document.querySelector('#getSettings');
let getStateInstanceBtn = document.querySelector('#getStateInstance');
let sendMessageBtn = document.querySelector('#sendMessage');
let sendFileByURLBtn = document.querySelector('#sendFileByURL');
let answerFromWa = document.querySelector('#answerFromWa');
let apiURL = 'https://7103.api.greenapi.com';

function useGreenApiMethod(apiURL, method) {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  let idInstance = document.querySelector('#idInstance').value;
  let apiTokenInstance = document.querySelector('#apiTokenInstance').value;
  let arr = [apiURL, 'waInstance' + idInstance, method, apiTokenInstance];
  let url = arr.join('/');

  if (method === 'sendMessage') {
    let phoneNumber = document.querySelector('#phoneNumberForMessage').value + '@c.us';
    let message = document.querySelector('#waMessage').value;
    console.log(message);
    const raw = JSON.stringify({
      "chatId": phoneNumber,
      "message": message
    });

    requestOptions['body'] = raw;
    requestOptions['method'] = 'POST';
  }

  if (method === 'sendFileByUrl') {
    let phoneNumber = document.querySelector('#phoneNumberForFile').value + '@c.us';
    let link = document.querySelector('#filesURL').value;
    let arr = link.split('/');
    console.log(arr);
    const raw = JSON.stringify({
      "chatId": phoneNumber,
      "urlFile": link,
      "fileName": arr[arr.length - 1],
      "caption": arr[arr.length - 1]
    });
    requestOptions['body'] = raw;
    requestOptions['method'] = 'POST';
  }

  console.log(url);
  console.log(requestOptions);

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      answerFromWa.value = result;
      console.log(result);
    })
    .catch((error) => {
      answerFromWa.value = error;
      console.error(error);
    });
}

getSettingsBtn.addEventListener('click', () => useGreenApiMethod(apiURL, 'getSettings'));
getStateInstanceBtn.addEventListener('click', () => useGreenApiMethod(apiURL, 'getStateInstance'));
sendMessageBtn.addEventListener('click', () => useGreenApiMethod(apiURL, 'sendMessage'));
sendFileByURLBtn.addEventListener('click', () => useGreenApiMethod(apiURL, 'sendFileByUrl'));