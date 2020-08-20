package net.retrocarnage.backend.usage

import org.springframework.data.mongodb.repository.MongoRepository

interface UsageRepository : MongoRepository<Usage, String> {

    fun findByGameId(gameId: String): List<Usage>

    fun countByStart(start: String): Long

}