package net.retrocarnage.backend.usage

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import java.time.format.DateTimeFormatter

data class Screen(
    var name: String,
    var start: String
) {
    companion object {
        val timeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss.SSS")
    }
}

data class Usage(
        @Id var id: String?,
        @Indexed(unique = true) var gameId: String,
        var start: String,
        var screens: MutableList<Screen>
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

    companion object {
        val dateFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    }
}

