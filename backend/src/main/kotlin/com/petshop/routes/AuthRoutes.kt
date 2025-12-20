package com.petshop.routes

import com.petshop.dao.UserDAO
import com.petshop.dto.*
import com.petshop.models.User
import com.petshop.util.AuthUtils
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.authRoutes() {
    route("/api/auth") {
        post("/register") {
            val request = call.receive<RegisterRequest>()
            
            // Check if user already exists
            val existingUser = UserDAO.getUserByEmail(request.email)
            if (existingUser != null) {
                call.respond(
                    mapOf("error" to "Email already registered")
                )
                return@post
            }
            
            // Create new user
            val user = User(
                email = request.email,
                passwordHash = AuthUtils.hashPassword(request.password),
                firstName = request.firstName,
                lastName = request.lastName,
                phone = request.phone
            )
            
            val createdUser = UserDAO.createUser(user)
            val token = AuthUtils.generateToken(createdUser.id.toString())
            
            call.respond(
                AuthResponse(
                    token = token,
                    user = UserResponse(
                        id = createdUser.id.toString(),
                        email = createdUser.email,
                        firstName = createdUser.firstName,
                        lastName = createdUser.lastName,
                        phone = createdUser.phone,
                        profileImageUrl = createdUser.profileImageUrl
                    )
                )
            )
        }
        
        post("/login") {
            val request = call.receive<LoginRequest>()
            
            val user = UserDAO.getUserByEmail(request.email)
            if (user == null || !AuthUtils.verifyPassword(request.password, user.passwordHash)) {
                call.respond(
                    mapOf("error" to "Invalid email or password")
                )
                return@post
            }
            
            val token = AuthUtils.generateToken(user.id.toString())
            
            call.respond(
                AuthResponse(
                    token = token,
                    user = UserResponse(
                        id = user.id.toString(),
                        email = user.email,
                        firstName = user.firstName,
                        lastName = user.lastName,
                        phone = user.phone,
                        profileImageUrl = user.profileImageUrl
                    )
                )
            )
        }
    }
}

