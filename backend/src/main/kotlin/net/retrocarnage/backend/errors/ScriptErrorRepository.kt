package net.retrocarnage.backend.errors

import org.springframework.data.mongodb.repository.MongoRepository

interface ScriptErrorRepository : MongoRepository<ScriptError, String>
