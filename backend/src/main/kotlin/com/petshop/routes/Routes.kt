package com.petshop.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRoutes() {
    routing {
        get("/api/health") {
            call.respond(mapOf("status" to "ok", "message" to "Pet Shop API is running"))
        }
    }
}

