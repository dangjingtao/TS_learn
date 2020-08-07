import _A, { a, a1, a2, A, aaa } from "./a"
import * as All from "./a"

export const c: Function = (): string => {
  // 单独导出
  a()
  // 批量导出
  console.log(a1, a2)

  // 别名
  aaa()

  //导出接口
  const obj: A = {
    x: 1,
    y: 2,
  }

  // 默认导出
  _A()

  //批量导入
  console.log("All", All)

  console.log("module c")
  return "c"
}
