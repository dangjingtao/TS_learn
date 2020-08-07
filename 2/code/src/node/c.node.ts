const a = require("./a.node")
const b = require("./b.node")

module.exports = () => {
  console.log(a)
  a()
  b()
  console.log("module c")
}
