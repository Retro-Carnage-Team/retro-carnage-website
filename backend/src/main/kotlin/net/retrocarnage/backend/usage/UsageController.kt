package net.retrocarnage.backend.usage

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("usage")
class UsageController(
        private val repository: UsageRepository
) {

    @PostMapping("/start-session")
    @ResponseStatus(HttpStatus.CREATED)
    fun startSession(@RequestBody usage: Usage) {
        if(repository.findBySessionId(usage.sessionId).isEmpty()) {
            repository.save(usage)
        } else {
            throw IllegalArgumentException("A session with this ID already exists")
        }
    }



}