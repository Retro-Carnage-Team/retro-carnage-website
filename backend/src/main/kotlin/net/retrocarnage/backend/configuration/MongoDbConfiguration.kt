package net.retrocarnage.backend.configuration

import com.mongodb.ConnectionString
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AppConfig(
        @Value("\${application.mongodb.host}") private val dbHost: String,
        @Value("\${application.mongodb.user}") private val dbUser: String,
        @Value("\${application.mongodb.password}") private val dbPassword: String
) {

    private val options = "retryWrites=true&w=majority"
    private val protocol = "mongodb+srv"

    /*
     * Use the standard Mongo driver API to create a
     * com.mongodb.client.MongoClient instance.
     */
    @Bean
    fun mongoClient(): MongoClient {
        val conString = "${protocol}://${dbUser}:${dbPassword}@${dbHost}/?${options}"
        return MongoClients.create(ConnectionString(conString))
    }
}
