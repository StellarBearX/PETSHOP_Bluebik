package com.petshop.routes

import com.petshop.dao.CouponDAO
import com.petshop.dto.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.couponRoutes() {
    route("/api/coupons") {
        get {
            val storeId = call.request.queryParameters["storeId"]
            
            val coupons = if (storeId != null) {
                CouponDAO.getStoreCoupons(UUID.fromString(storeId))
            } else {
                CouponDAO.getAllCoupons()
            }
            
            val couponResponses = coupons.map { coupon ->
                val store = coupon.storeId?.let { com.petshop.dao.ProductDAO.getStoreById(it) }
                CouponResponse(
                    id = coupon.id.toString(),
                    code = coupon.code,
                    title = coupon.title,
                    description = coupon.description,
                    discountAmount = coupon.discountAmount.toDouble(),
                    minSpend = coupon.minSpend.toDouble(),
                    type = coupon.type,
                    status = "available",
                    expiryDate = coupon.expiryDate.toString(),
                    conditions = coupon.conditions,
                    storeId = coupon.storeId?.toString(),
                    storeName = store?.name,
                    storeLogo = store?.logoUrl,
                    color = coupon.color,
                    badgeIcon = coupon.badgeIconUrl
                )
            }
            
            call.respond(CouponListResponse(coupons = couponResponses))
        }
        
        post("/{id}/collect") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val couponId = call.parameters["id"] ?: return@post call.respond(
                mapOf("error" to "Coupon ID is required")
            )
            
            val coupon = CouponDAO.getCouponById(UUID.fromString(couponId))
            if (coupon == null) {
                call.respond(
                    mapOf("error" to "Coupon not found")
                )
                return@post
            }
            
            if (CouponDAO.isCouponCollected(userId, coupon.id)) {
                call.respond(
                    mapOf("error" to "Coupon already collected")
                )
                return@post
            }
            
            val userCoupon = CouponDAO.collectCoupon(userId, coupon.id)
            call.respond(mapOf("success" to true, "couponId" to userCoupon.id.toString()))
        }
    }
    
    route("/api/user/coupons") {
        get {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val userCoupons = CouponDAO.getUserCoupons(userId)
            val coupons = userCoupons.mapNotNull { uc ->
                val coupon = CouponDAO.getCouponById(uc.couponId) ?: return@mapNotNull null
                val store = coupon.storeId?.let { com.petshop.dao.ProductDAO.getStoreById(it) }
                CouponResponse(
                    id = coupon.id.toString(),
                    code = coupon.code,
                    title = coupon.title,
                    description = coupon.description,
                    discountAmount = coupon.discountAmount.toDouble(),
                    minSpend = coupon.minSpend.toDouble(),
                    type = coupon.type,
                    status = uc.status,
                    expiryDate = coupon.expiryDate.toString(),
                    conditions = coupon.conditions,
                    storeId = coupon.storeId?.toString(),
                    storeName = store?.name,
                    storeLogo = store?.logoUrl,
                    color = coupon.color,
                    badgeIcon = coupon.badgeIconUrl
                )
            }
            
            call.respond(CouponListResponse(coupons = coupons))
        }
    }
}

