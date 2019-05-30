export interface TypedChange<T> {
    previousValue: T
    currentValue: T
    firstChange: boolean
    isFirstChange(): boolean
}

export type TypedChanges<T> = { [key in keyof T]?: TypedChange<T[key]> }
