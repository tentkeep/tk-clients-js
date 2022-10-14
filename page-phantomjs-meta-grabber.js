const page = require('webpage').create()
const system = require('system')

// page.onConsoleMessage = function (str) {
//   console.log(str)
// }
const url = system.args[1]
page.open(url, function (status) {
  setTimeout(function () {
    console.log(page.content)
    phantom.exit()
  }, 1500)
})
