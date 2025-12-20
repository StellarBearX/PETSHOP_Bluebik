package com.petshop.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.postgresql.ds.PGSimpleDataSource
import java.sql.Connection

object DatabaseFactory {
    private val dataSource: HikariDataSource

    init {
        val config = HikariConfig().apply {
            jdbcUrl = System.getenv("DATABASE_URL") ?: "jdbc:postgresql://localhost:5432/petshop"
            username = System.getenv("DB_USER") ?: "postgres"
            password = System.getenv("DB_PASSWORD") ?: "postgres"
            driverClassName = "org.postgresql.Driver"
            maximumPoolSize = 10
            minimumIdle = 2
            connectionTimeout = 30000
            idleTimeout = 600000
            maxLifetime = 1800000
        }
        dataSource = HikariDataSource(config)
    }

    fun getConnection(): Connection {
        return dataSource.connection
    }

    fun init() {
        // Initialize database schema if needed
        dataSource.connection.use { connection ->
            connection.createStatement().use { statement ->
                // Create tables here if needed
                // Example:
                // statement.execute("CREATE TABLE IF NOT EXISTS ...")
            }
        }
    }

    fun close() {
        dataSource.close()
    }
}

