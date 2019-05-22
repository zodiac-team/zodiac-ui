;(function(mod) {
    if (typeof exports == "object" && typeof module == "object")
        // CommonJS
        mod(require("../../lib/codemirror"))
    else if (typeof define == "function" && define.amd)
        // AMD
        define(["../../lib/codemirror"], mod)
    // Plain browser env
    else mod(CodeMirror)
})(function(CodeMirror) {
    "use strict"

    function Context(state, mode, depth, prev) {
        this.state = state
        this.mode = mode
        this.depth = depth
        this.prev = prev
    }

    function copyContext(context) {
        return new Context(
            CodeMirror.copyState(context.mode, context.state),
            context.mode,
            context.depth,
            context.prev && copyContext(context.prev),
        )
    }

    CodeMirror.defineMode(
        "angular",
        function(config, modeConfig) {
            var xmlMode = CodeMirror.getMode(config, {
                name: "xml",
                allowMissing: true,
                multilineTagIndentPastTag: false,
                allowMissingTagName: true,
            })
            var jsMode = CodeMirror.getMode(config, (modeConfig && modeConfig.base) || "javascript")
            var cssMode = CodeMirror.getMode(config, { name: "css" })
            var nullMode = CodeMirror.getMode(config, { name: "null" })

            function token(stream, state) {
                if (state.context.mode == xmlMode) return xmlToken(stream, state, state.context)
                else if (state.context.mode == cssMode) {
                    return cssToken(stream, state, state.context)
                } else if (state.context.mode == nullMode) {
                    return nullToken(stream, state, state.context)
                } else return jsToken(stream, state, state.context)
            }

            function cssToken(stream, state, cx) {
                var style = cssMode.token(stream, cx.state)

                if (stream.match(/(?<!\\)`/)) {
                    state.context = state.context.prev
                }

                return style
            }

            function nullToken(stream, state, cx) {
                if (cx.depth === 0) {
                    if (stream.match(/[\[(*]/)) {
                        return "keyword"
                    }

                    if (stream.match(/]\)|\)]|[\])=]/)) {
                        if (stream.peek() === '"') {
                            stream.backUp(1)
                        }
                        state.context = state.context.prev
                        return "keyword"
                    }

                    stream.next()

                    return "attribute"
                }

                if (stream.match("{{")) {
                    state.openBracket = true
                    state.context = new Context(
                        CodeMirror.startState(jsMode),
                        jsMode,
                        1,
                        state.context,
                    )

                    return "keyword"
                }

                if (stream.match("}}") && state.openBracket) {
                    state.openBracket = false
                    return "keyword"
                }

                stream.next()
                var cur = stream.current()
                if (/\s?(?<!\\)"/.test(cur)) {
                    state.context = state.context.prev
                }

                return "string"
            }

            function xmlToken(stream, state, cx) {
                var style = xmlMode.token(stream, cx.state)
                var cur = stream.current()
                var stop

                if (stream.match(/(?<!\\)`/)) {
                    state.context = state.context.prev
                }

                if (/\battribute\b/.test(style)) {
                    state.inAttr = true
                    if (/\*.*|\[.*]|\(.*\)|(bind|on|bindon)-.*/.test(cur)) {
                        stream.backUp(cur.length)
                        state.inBinding = true
                        state.context = new Context(
                            CodeMirror.startState(nullMode),
                            nullMode,
                            0,
                            state.context,
                        )
                    }
                }
                if (/\bstring\b/.test(style)) {
                    if (state.inBinding) {
                        stream.backUp(cur.length - 1)
                        state.context = new Context(
                            CodeMirror.startState(jsMode),
                            jsMode,
                            2,
                            state.context,
                        )
                    } else {
                        stream.backUp(cur.length - 1)
                        state.context = new Context(
                            CodeMirror.startState(nullMode),
                            nullMode,
                            1,
                            state.context,
                        )
                    }
                    state.inAttr = false
                    state.inBinding = false

                    return style
                }

                stop = cur.indexOf("{{")
                if (stop > -1) {
                    stream.backUp(cur.length - stop)
                    state.context = new Context(
                        CodeMirror.startState(jsMode),
                        jsMode,
                        1,
                        state.context,
                    )
                }

                return style
            }

            function jsToken(stream, state, cx) {
                var style = jsMode.token(stream, cx.state)
                var cur = stream.current()
                var stop

                if (stream.match(/template:\s?`/)) {
                    state.context = new Context(
                        CodeMirror.startState(xmlMode),
                        xmlMode,
                        0,
                        state.context,
                    )
                }

                if (stream.match(/styles:\s?\[\s?`/)) {
                    state.context = new Context(
                        CodeMirror.startState(cssMode),
                        cssMode,
                        0,
                        state.context,
                    )
                }

                if (cx.depth === 1) {
                    cx.brackets = cx.brackets || 0

                    if (cur === "{") {
                        cx.brackets++

                        if (cx.brackets <= 2) {
                            style = "keyword"
                        }
                    }

                    if (cur === "}") {
                        cx.brackets--

                        if (cx.brackets < 2) {
                            style = "keyword"
                        }
                    }

                    if (cx.brackets === 0) {
                        state.context = state.context.prev
                    }

                    return style
                }

                if (cx.depth === 2) {
                    stop = cur.indexOf('"')
                    if (stop > -1) {
                        stream.backUp(cur.length - stop - 1)
                        state.context = state.context.prev
                    }

                    return style
                }

                return style
            }

            return {
                startState: function() {
                    return { context: new Context(CodeMirror.startState(jsMode), jsMode) }
                },

                copyState: function(state) {
                    return { context: copyContext(state.context) }
                },

                token: token,

                indent: function(state, textAfter, fullLine) {
                    return state.context.mode.indent(state.context.state, textAfter, fullLine)
                },

                innerMode: function(state) {
                    return state.context
                },
            }
        },
        "xml",
        "javascript",
        "css",
    )

    CodeMirror.defineMIME("text/angular", {
        name: "angular",
        base: { name: "javascript", typescript: true },
    })
})
