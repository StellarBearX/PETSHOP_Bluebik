package com.petshop

import com.petshop.database.DatabaseFactory
import com.petshop.plugins.configureCORS
import com.petshop.plugins.configureSerialization
import com.petshop.routes.configureRoutes
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureCORS()
    configureSerialization()
    DatabaseFactory.init()
    configureRoutes()
}

