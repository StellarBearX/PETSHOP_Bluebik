package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.User
import java.sql.ResultSet
import java.util.*

object UserDAO {
    
    fun createUser(user: User): User {
        val sql = """
            INSERT INTO users (id, email, password_hash, first_name, last_name, phone, gender, birth_date, profile_image_url, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        """.trimIndent()
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, user.id)
                stmt.setString(2, user.email)
                stmt.setString(3, user.passwordHash)
                stmt.setString(4, user.firstName)
                stmt.setString(5, user.lastName)
                stmt.setString(6, user.phone)
                stmt.setString(7, user.gender)
                stmt.setObject(8, user.birthDate)
                stmt.setString(9, user.profileImageUrl)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToUser(rs)
                    } else {
                        throw RuntimeException("Failed to create user")
                    }
                }
            }
        }
    }
    
    fun getUserByEmail(email: String): User? {
        val sql = "SELECT * FROM users WHERE email = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, email)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToUser(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getUserById(id: UUID): User? {
        val sql = "SELECT * FROM users WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToUser(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun updateUser(user: User): User {
        val sql = """
            UPDATE users 
            SET first_name = ?, last_name = ?, phone = ?, gender = ?, birth_date = ?, profile_image_url = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            RETURNING *
        """.trimIndent()
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, user.firstName)
                stmt.setString(2, user.lastName)
                stmt.setString(3, user.phone)
                stmt.setString(4, user.gender)
                stmt.setObject(5, user.birthDate)
                stmt.setString(6, user.profileImageUrl)
                stmt.setObject(7, user.id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToUser(rs)
                    } else {
                        throw RuntimeException("Failed to update user")
                    }
                }
            }
        }
    }
    
    private fun mapRowToUser(rs: ResultSet): User {
        return User(
            id = UUID.fromString(rs.getString("id")),
            email = rs.getString("email"),
            passwordHash = rs.getString("password_hash"),
            firstName = rs.getString("first_name"),
            lastName = rs.getString("last_name"),
            phone = rs.getString("phone"),
            gender = rs.getString("gender"),
            birthDate = rs.getDate("birth_date")?.toLocalDate(),
            profileImageUrl = rs.getString("profile_image_url"),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
}

