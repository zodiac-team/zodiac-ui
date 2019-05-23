export function createMask(...flags: number[]) {
    let len = flags.length
    let count = 0
    while (len--) {
        count += flags[len]
    }
    return count
}
