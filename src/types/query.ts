type Cast<X, Y> = X extends Y ? X : Y

type Fn = (...args: any[]) => any[]

export type TypeQueryKey = {
  [k: string]: TypeQueryKey | Fn | unknown
}

export type TypeQueryKeyHelper<T extends TypeQueryKey, P extends string[] = []> = {
  [k in keyof T]: T[k] extends (...args: any[]) => any[]
    ? {
        toKey: () => [...P, k]
        toKeyWithArgs: (...args: Parameters<T[k]>) => [...P, k, ...ReturnType<T[k]>]
      }
    : T[k] extends TypeQueryKey
      ? { toKey: () => [...P, k] } & TypeQueryKeyHelper<Cast<T[k], TypeQueryKey>, Cast<[...P, k], string[]>>
      : { toKey: () => [...P, k] }
}

export type TypeFetch<T, P, K extends TypeQueryKey = Record<string, never>> = (kidId: P, params: K) => Promise<T>

export type TypeMutation<T, K extends TypeQueryKey = Record<string, never>> = (params: K) => Promise<T>
