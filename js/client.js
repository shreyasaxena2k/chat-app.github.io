const socket= io('http://localhost:8000')

const form=document.getElementById("send-con")
const messageinput =document.getElementById("messageinp")
const messagecontainer=document.querySelector(".container")


const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)

}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
     message=messageinput.value
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageinput.value=''
  })
const name= prompt('Enter your name to join')
socket.emit('new-user-joined',name)      
socket.on('user-joined',name=>{
     append(`${name} joined the chat`,'right')
})


socket.on('receive',data=>{
     append(`${data.name} : ${data.message}`,'left')
})

socket.on('left',name=>{
     append(`${name} left the chat`,'left')
}) 