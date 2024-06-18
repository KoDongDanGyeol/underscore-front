export type Nullable<T> = T | null | undefined

export type NonNullable<T> = T extends null | undefined ? never : T

export type NonUndefined<T> = T extends undefined ? never : T

export type ObjectEntries<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type ObjectKeys<T extends object> = Array<keyof T>

export type ObjectValues<T extends object> = Array<T[keyof T]>

export const checkAvailableClient = () => {
  return typeof window !== "undefined"
}

export const checkAuthenticated = () => {
  const token = localStorage.getItem("UNDERSCORE_TOKEN")
  return !!token
}

export const isEquals = (...arrays: unknown[][]): boolean => {
  if (arrays.length < 2) return false
  const [firstArray, ...restArrays] = arrays
  return restArrays.every((arr) => isEqualsInternal(firstArray, arr))
}

export const isEqualsInternal = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((element, index) => {
    if (!Array.isArray(element) || !Array.isArray(arr2[index])) return element === arr2[index]
    return isEqualsInternal(element, arr2[index] as unknown[])
  })
}

export const convertDateToString = (date: Date, format: string = "YYYY-MM-DD hh:mm:ss") => {
  const match = date.toISOString().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/)
  const [, YYYY, MM, DD, hh, mm, ss] = match ?? []
  const resources: { [key: string]: string } = { YYYY, MM, DD, hh, mm, ss }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (match) => resources[match])
}
