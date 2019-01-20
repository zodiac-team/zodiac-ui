export type ActionSanitizer = (action: any, id: number) => any
export type StateSanitizer = (state: any, index: number) => any

export interface StoreDevtoolsConfig {
    maxAge: number | boolean
    // TODO: implement remaining options
    // trace?: boolean
    // state?: {
    //     include?: Selector<any, any>
    //     exclude?: Selector<any, any>
    // }
    // logOnly?: boolean,
    // serialize?: boolean
    // features?: {
    //     dispatch?: boolean
    //     import?: string
    //     test?: boolean
    //     lock?: boolean
    //     skip?: boolean
    //     reorder?: boolean
    //     persist?: boolean
    //     export?: boolean
    //     pause?: boolean
    //     jump?: boolean
    // }
    // stateSanitizer?: StateSanitizer
    // actionSanitizer?: ActionSanitizer
    // name?: string
    // monitor?: null
}
