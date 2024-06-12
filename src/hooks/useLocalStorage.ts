import { useState } from "react"

type TypeKey = string
type TypeValue = unknown

const useLocalStorage = <T extends TypeValue>(key: TypeKey, defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T
      } else if (defaultValue !== undefined) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      } else {
        return undefined
      }
    } catch (error) {
      if (defaultValue !== undefined) {
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      } else {
        return undefined
      }
    }
  })

  const onUpdate = (valueOrFn: T | ((value: T | undefined) => T)) => {
    const newValue: T = typeof valueOrFn === "function" ? (valueOrFn as (value: T | undefined) => T)(value) : valueOrFn
    localStorage.setItem(key, JSON.stringify(newValue))
    setValue(newValue)
  }

  const onRemove = () => {
    localStorage.removeItem(key)
    setValue(defaultValue)
  }

  return {
    value,
    onUpdate,
    onRemove,
  }
}

export default useLocalStorage
