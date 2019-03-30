module.exports = {
    name: "editor",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/libs/editor",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
}
