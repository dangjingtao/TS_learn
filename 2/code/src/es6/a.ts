// 单独导出
export const a: Function = (): string => {
  console.log("module a")
  return "a"
}

// 批量导出
const a1: string = "a1"
const a2: string = "a2"

export { a1, a2 }

// 导出接口
export interface A {
  x: number
  y: number
}

// 别名
const a3 = () => {
  console.log("aaa")
}

export { a3 as aaa }

// 默认导出无需起名
export default () => {
  console.log("export default")
}
