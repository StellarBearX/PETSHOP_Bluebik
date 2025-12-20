package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Coupon
import com.petshop.models.UserCoupon
import com.petshop.util.JsonUtils
import java.sql.ResultSet
import java.time.LocalDate
import java.util.*

object CouponDAO {
    
    fun getAllCoupons(): List<Coupon> {
        val sql = "SELECT * FROM coupons WHERE expiry_date >= CURRENT_DATE ORDER BY created_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToCoupon(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getCouponById(id: UUID): Coupon? {
        val sql = "SELECT * FROM coupons WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCoupon(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getStoreCoupons(storeId: UUID): List<Coupon> {
        val sql = "SELECT * FROM coupons WHERE store_id = ? AND expiry_date >= CURRENT_DATE ORDER BY created_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, storeId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToCoupon(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getPlatformCoupons(): List<Coupon> {
        val sql = "SELECT * FROM coupons WHERE store_id IS NULL AND expiry_date >= CURRENT_DATE ORDER BY created_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToCoupon(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun collectCoupon(userId: UUID, couponId: UUID): UserCoupon {
        val sql = """
            INSERT INTO user_coupons (id, user_id, coupon_id, status, collected_at)
            VALUES (?, ?, ?, 'collected', CURRENT_TIMESTAMP)
            RETURNING *
        """.trimIndent()
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, UUID.randomUUID())
                stmt.setObject(2, userId)
                stmt.setObject(3, couponId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToUserCoupon(rs)
                    } else {
                        throw RuntimeException("Failed to collect coupon")
                    }
                }
            }
        }
    }
    
    fun getUserCoupons(userId: UUID): List<UserCoupon> {
        val sql = "SELECT * FROM user_coupons WHERE user_id = ? ORDER BY collected_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToUserCoupon(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun isCouponCollected(userId: UUID, couponId: UUID): Boolean {
        val sql = "SELECT COUNT(*) FROM user_coupons WHERE user_id = ? AND coupon_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.setObject(2, couponId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        rs.getInt(1) > 0
                    } else {
                        false
                    }
                }
            }
        }
    }
    
    fun useCoupon(userId: UUID, couponId: UUID) {
        val sql = "UPDATE user_coupons SET status = 'used', used_at = CURRENT_TIMESTAMP WHERE user_id = ? AND coupon_id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.setObject(2, couponId)
                stmt.executeUpdate()
            }
        }
    }
    
    private fun mapRowToCoupon(rs: ResultSet): Coupon {
        val conditionsArray = rs.getArray("conditions")
        val conditions = if (conditionsArray != null) {
            (conditionsArray.array as? Array<*>)?.mapNotNull { it?.toString() } ?: emptyList()
        } else {
            emptyList()
        }
        
        return Coupon(
            id = UUID.fromString(rs.getString("id")),
            storeId = rs.getObject("store_id")?.let { UUID.fromString(it.toString()) },
            code = rs.getString("code"),
            title = rs.getString("title"),
            description = rs.getString("description"),
            type = rs.getString("type"),
            discountAmount = rs.getBigDecimal("discount_amount"),
            minSpend = rs.getBigDecimal("min_spend"),
            expiryDate = rs.getDate("expiry_date").toLocalDate(),
            conditions = conditions,
            color = rs.getString("color"),
            badgeIconUrl = rs.getString("badge_icon_url"),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime()
        )
    }
    
    private fun mapRowToUserCoupon(rs: ResultSet): UserCoupon {
        return UserCoupon(
            id = UUID.fromString(rs.getString("id")),
            userId = UUID.fromString(rs.getString("user_id")),
            couponId = UUID.fromString(rs.getString("coupon_id")),
            status = rs.getString("status"),
            collectedAt = rs.getTimestamp("collected_at").toLocalDateTime(),
            usedAt = rs.getTimestamp("used_at")?.toLocalDateTime()
        )
    }
}

