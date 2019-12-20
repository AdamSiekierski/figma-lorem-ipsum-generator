import './ui.scss'

const button = <HTMLButtonElement>document.getElementById('createBtn')
const input = <HTMLInputElement>document.getElementById('count')

input.focus();

input.oninput = () => {
  button.disabled = parseInt(input.value) == 0 || !parseInt(input.value) || parseInt(input.value) > 1000;
}

button.onclick = () => {
  parent.postMessage({
    pluginMessage: {
      type: 'createText',
      count: parseInt(input.value)
    }
  }, '*')
}