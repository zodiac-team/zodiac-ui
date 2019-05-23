module.exports = {
    name: "ng-observable",
    preset: "../../jest.config.js",
    coverageDirectory: "../../coverage/libs/ng-observable",
    snapshotSerializers: [
        "jest-preset-angular/AngularSnapshotSerializer.js",
        "jest-preset-angular/HTMLCommentSerializer.js",
    ],
}
