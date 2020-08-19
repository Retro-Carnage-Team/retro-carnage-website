package net.retrocarnage.backend.usage

import org.springframework.data.mongodb.repository.MongoRepository

interface DailyUsageRepository : MongoRepository<DailyUsage, String> {

    fun findByDate(date: String): List<DailyUsage>

}