module.exports = {
    name: "editor-example",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/apps/editor-example/",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
}
