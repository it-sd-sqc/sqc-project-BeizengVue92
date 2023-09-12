const changeMode = document.getElementById('changeMode')
const body = document.body

changeMode.addEventListener('click', function (event) {
  // Change to light mode
  if (changeMode.innerHTML === '☀️') {
    changeMode.innerHTML = '🌙'
    body.classList.remove('dark')
    // Change to dark mode
  } else if (changeMode.innerHTML === '🌙') {
    changeMode.innerHTML = '☀️'
    body.classList.add('dark')
  }
})
