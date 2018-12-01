var textBox =  document.getElementById("text-input");

var sendButton = document.getElementById("send-button");
sendButton.addEventListener('click', function(event) {
  var textBoxContent = textBox.value;
  if (textBoxContent !== "") {
    var postRequest = new XMLHttpRequest();
    var requestURL = '/message/addMessage';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      message: textBoxContent
    });
    console.log("sent message");

    postRequest.addEventListener('load', function (even) {
      console.log("printing message");
      if (event.target.status === 200) {
        sendMessage(textBoxContent);
        textBox.value = "";
      }
    });

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);
  }
});

function sendMessage(message) {
  var messageContext = {
    "message": message
  }

  var messageHTML = Handlebars.templates.messageBubble(messageContext);
  var messageContainer = document.getElementById("messages"); 

  messageContainer.insertAdjacentHTML('beforeend', messageHTML);
}
