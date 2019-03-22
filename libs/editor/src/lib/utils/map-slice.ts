import { Node, Fragment, Slice } from "prosemirror-model"

/**
 * A helper to get the underlying array of a fragment.
 */
export function getFragmentBackingArray(
    fragment: Fragment,
): ReadonlyArray<Node> {
    return (fragment as any).content as Node[];
}

export function mapFragment(
    content: Fragment,
    callback: (
        node: Node,
        parent: Node | null,
        index: number,
    ) => Node | Node[] | Fragment | null,
    parent: Node | null = null,
) {
    const children = [] as Node[];
    for (let i = 0, size = content.childCount; i < size; i++) {
        const node = content.child(i);
        const transformed = node.isLeaf
            ? callback(node, parent, i)
            : callback(
                node.copy(mapFragment(node.content, callback, node)),
                parent,
                i,
            );
        if (transformed) {
            if (transformed instanceof Fragment) {
                children.push(...getFragmentBackingArray(transformed));
            } else if (Array.isArray(transformed)) {
                children.push(...transformed);
            } else {
                children.push(transformed);
            }
        }
    }
    return Fragment.fromArray(children);
}

export function mapSlice(
    slice: Slice,
    callback: (
        nodes: Node,
        parent: Node | null,
        index: number,
    ) => Node | Node[] | Fragment | null,
): Slice {
    const fragment = mapFragment(slice.content, callback);
    return new Slice(fragment, slice.openStart, slice.openEnd);
}
