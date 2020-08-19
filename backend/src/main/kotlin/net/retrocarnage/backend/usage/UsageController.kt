package net.retrocarnage.backend.usage

import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import java.util.*
import java.util.concurrent.TimeUnit

@RestController
@RequestMapping("usage")
class UsageController(
        private val dailyUsageService: DailyUsageService,
        private val repository: UsageRepository
) {

    @PostMapping("/start-game")
    @ResponseStatus(HttpStatus.CREATED)
    fun startGame(): Usage {
        val usage = Usage(
                id = null,
                gameId = UUID.randomUUID().toString(),
                screens = Collections.emptyList(),
                start = Usage.dateFormatter.format(LocalDateTime.now())
        )
        repository.save(usage)
        return usage
    }

    @PostMapping("/{id}/next-screen/{screen}")
    @ResponseStatus(HttpStatus.OK)
    fun nextScreen(
            @PathVariable(value = "id") gameId: String,
            @PathVariable(value = "screen") screenName: String
    ) {
        val usage = repository.findByGameId(gameId)
        if (usage.singleOrNull() != null) {
            usage[0].screens.add(Screen(
                    name = screenName,
                    start = Screen.timeFormatter.format(LocalDateTime.now())
            ))
            repository.save(usage[0])
        }
    }

    @GetMapping("/chart")
    fun getUsageChart(): ResponseEntity<ByteArray>? {
        val headers = HttpHeaders()
        val chart = dailyUsageService.usageChart
        return if(null != chart) {
            headers.cacheControl = CacheControl.maxAge(1, TimeUnit.DAYS).headerValue
            headers.contentType = MediaType.IMAGE_PNG
            ResponseEntity(chart, headers, HttpStatus.OK)
        } else {
            ResponseEntity(null, headers, HttpStatus.NOT_FOUND)
        }
    }

}