// Simulate network request
function request (sec = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(request.data)
    }, sec)
  })
}

request.data = {
  data: 'test'
}

module.exports = request
