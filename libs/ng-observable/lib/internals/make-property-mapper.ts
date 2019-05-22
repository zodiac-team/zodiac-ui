export function makePropertyMapper<T>(prototype: any, key: string, mapper: () => (state: any) => T) {
    Object.defineProperty(prototype, key, {
        set() {
            const getValue = mapper()

            Object.defineProperty(this, key, {
                get() {
                    return getValue(Object.create(this))
                },
                enumerable: true,
            });
        },
        enumerable: true,
        configurable: true,
    });
}
