import { TypeQueryKey, TypeQueryKeyHelper } from "@/types/query"

export const getQueryKey = <T extends TypeQueryKey>(keyConfig: T, prefix: string[] = []): TypeQueryKeyHelper<T> => {
  const keyFn = (name: string) => prefix.concat([name])
  const keyObj = {} as TypeQueryKey
  for (const k of Object.keys(keyConfig)) {
    const v = keyConfig[k]
    if (typeof v === "function") {
      keyObj[k] = {
        toKeyWithArgs: (...args: unknown[]) => [...keyFn(k), ...v(...args)],
        toKey: () => keyFn(k),
      }
    } else if (v instanceof Object) {
      keyObj[k] = { toKey: () => keyFn(k), ...getQueryKey(v as TypeQueryKey, keyFn(k)) }
    } else {
      keyObj[k] = {
        toKey: () => keyFn(k),
      }
    }
  }
  return keyObj as TypeQueryKeyHelper<T>
}
