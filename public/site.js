window.onload = function () {
  const styleToggle = document.getElementById('style-toggle')
  const body = document.body

  styleToggle.addEventListener('click', function (event) {
    event.preventDefault()

    body.classList.toggle('dark-mode')

    const isDarkMode = body.classList.contains('dark-mode')
    styleToggle.textContent = isDarkMode ? '☀️' : '🌙'
  })
}
