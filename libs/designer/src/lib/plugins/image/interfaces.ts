export interface ImagePluginState {
    selected: boolean
    attrs: ImageNodeAttrs
}

export type ImageNodeAttrs = {
    src?: string
    alt?: string
    title?: string
}
