import { StoreSnapshotChanges } from "./interfaces"

export function getChanges<T extends object>(current, previous) {
    const changes: StoreSnapshotChanges<T> = Object.create(null)

    previous = previous || Object.create(null)

    for (const key in current) {
        // noinspection JSUnfilteredForInLoop
        if (previous[key] !== current[key]) {
            // noinspection JSUnfilteredForInLoop
            changes[key] = Object.create(null)
            // noinspection JSUnfilteredForInLoop
            changes[key].previousValue = previous[key]
            // noinspection JSUnfilteredForInLoop
            changes[key].currentValue = current[key]
        }
    }

    return changes
}

export function toPreviousValue<T extends object>(currentValue: T) {
    return Object.getPrototypeOf(currentValue)
}

function isOwnObject(o, prop) {
    return (o.hasOwnProperty ? o.hasOwnProperty(prop) : true)
        // noinspection JSUnfilteredForInLoop
        && o[prop] !== null
        // noinspection JSUnfilteredForInLoop
        && (typeof o[prop] === "object" || typeof o[prop] === "function");

}

export function toEnumeratedValue<T extends object>(value: T, deep?: boolean): T {
    const enumerated: any = Object.create(null)
    const previous = toPreviousValue(value)

    if (previous !== null) {
        for (const key in previous) {
            // noinspection JSUnfilteredForInLoop
            enumerated[key] = value[key]
        }
    }

    if (value) {
        for (const key in value) {
            // noinspection JSUnfilteredForInLoop
            enumerated[key] = value[key]
        }
    }

    if (deep) {
        for (const key in enumerated) {
            // noinspection JSUnfilteredForInLoop
            if (isOwnObject(enumerated, key)) {
                // noinspection JSUnfilteredForInLoop
                enumerated[key] = toEnumeratedValue(enumerated[key], deep)
            }
        }
    }

    return enumerated
}
