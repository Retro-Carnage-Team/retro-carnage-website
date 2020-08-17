package net.retrocarnage.backend.usage

import org.springframework.data.annotation.Id

data class Gamepad(
    var id: String
)

data class Screen(
    var name: String,
    var start: String,
    var data: String
)

data class Usage(
        @Id var id: String?,
        var sessionId: String,
        var start: String,
        var screens: Array<Screen>,
        var gamepads: Array<Gamepad>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other?.javaClass != javaClass) return false

        other as Usage
        return this.id === other.id
    }

    override fun hashCode(): Int{
        return id.hashCode()
    }
}