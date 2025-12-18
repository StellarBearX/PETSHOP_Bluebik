package com.petshop.util

import org.mindrot.jbcrypt.BCrypt

object AuthUtils {
    fun hashPassword(password: String): String {
        return BCrypt.hashpw(password, BCrypt.gensalt())
    }
    
    fun verifyPassword(password: String, hash: String): Boolean {
        return try {
            BCrypt.checkpw(password, hash)
        } catch (e: Exception) {
            false
        }
    }
    
    // Simple JWT-like token generation (in production, use proper JWT library)
    fun generateToken(userId: String): String {
        val timestamp = System.currentTimeMillis()
        return "$userId:$timestamp:${hashPassword("$userId$timestamp")}"
    }
}

