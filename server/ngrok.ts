import * as ngrok from 'ngrok'

ngrok.connect({
  addr: 3000,
}).then(url => {
  console.log(`Connected to ${url}`)
})