# CHANGELOG

## v0.1.0

-   Bump supported Angular version.

-   Make reselect an optional peer dependency.

-   Effects are now written as pure functions.

-   Introduced GlobalStore for global state management.

**BREAKING CHANGES**

-   Stores no longer maintains a parent/child hierarchy each store
    is now a sibling of every other store no matter how many levels deep
    they are provided.

-   Removed select and dispatch methods from `Store`.

-   `Actions` moved to `ActionDispatcher`.

-   Remove devtools until it can be properly supported.
