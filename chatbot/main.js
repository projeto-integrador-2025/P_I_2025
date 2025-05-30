const apiKey = ""

function sendMessage(){
    var message = document.getElementById('mesasage-input')
    if(!message.value)
    {
        message.style.border = '1px solid red'
        return
    }
    message.style.border = 'none'

    var status = document.getElementById ('status')
    var btnSubmit = document.getElementById('btn-submit')

    status.style.display = 'block'
    status.innerHTML = 'Carregando...'
    btnSubmit.disabled = true
    btnSubmit.style.cursor = 'not-allowed'
    message.disabled = true

    fetch("https://api.openai.com/v1/completions", { //url da API chatgpt
        method: 'POST',  
        headers:{
            Accept: "aplication/json",
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${apiKey}` //autoização da api do GPT
        },
        body: JSON.stringify({
            model: "text-davinci-003", //modelo do gpt
            prompt: message.value,
            max_tokens: 2048,
            temperature: 0.5
        })
    }) 
    .then((response) => response.json())
    .then((response) => {
        let r = (response.choices[0]['text'])
        status.style.display = 'none'
        showHistoric(message.value,r)
    })
    .catch((e) => {
        console.log('Error -> ', e)
    })
    .finally(() =>{
        btnSubmit.disabled = false
        btnSubmit.style.cursor = 'pointer'
        message.disabled = false
    })
}

function showHistoric(message,response){
    var historic = document.getElementById('historic')

    //My msg
    var boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    var MyMessage = document.createElement('p')
    MyMessage.className = 'my-message'
    MyMessage.innerHTML = message

    boxMyMessage.appendChild(MyMessage)
    historic.appendChild(boxMyMessage)



    //Response Msg

    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var ChatResponse = document.createElement('p')
    ChatResponse.className = 'chat-message'
    ChatResponse.innerHTML = response

    boxResponseMessage.appendChild(ChatResponse)
    historic.appendChild(boxResponseMessage)

    //levar o scroll pra o final 
    historic.scrollTop = historic.scrollHeight

} 