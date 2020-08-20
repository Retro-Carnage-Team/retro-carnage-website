package net.retrocarnage.backend.usage

import org.springframework.data.annotation.Id

data class DailyUsage(
        @Id var id: String?,
        var date: String,
        var games: Long?
)