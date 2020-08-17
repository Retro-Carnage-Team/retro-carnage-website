package net.retrocarnage.backend.errors

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@RestController
@RequestMapping("script-errors")
class ScriptErrorController(
        private val repository: ScriptErrorRepository
) {

    @PostMapping("/")
    @CrossOrigin(origins = [
        "http://retro-carnage.net",
        "http://www.retro-carnage.net",
        "https://retro-carnage.net",
        "https://www.retro-carnage.net"
    ])
    @ResponseStatus(HttpStatus.CREATED)
    fun addScriptError(@RequestBody scriptError: ScriptError) {
        scriptError.timeStamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        repository.save(scriptError)
    }

}
