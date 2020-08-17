package net.retrocarnage.backend.usage

import org.springframework.data.mongodb.repository.MongoRepository

interface UsageRepository : MongoRepository<Usage, String> {
    fun findBySessionId(sessionId: String): List<Usage>
}