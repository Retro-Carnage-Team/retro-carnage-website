package net.retrocarnage.backend.errors

import org.springframework.data.annotation.Id

data class ScriptError(
        @Id var id: String?,
        var timeStamp: String?,
        var message: String?,
        var source: String?,
        var lineno: Int?,
        var colno: Int?,
        var stack: String?
)
