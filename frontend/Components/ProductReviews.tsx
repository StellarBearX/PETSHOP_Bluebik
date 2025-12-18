"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, Camera } from "lucide-react";
import styles from "./ProductReviews.module.css";

// Review Interface
interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number; // 1-5
  date: string;
  variant: string; // รุ่นสินค้าที่ซื้อ
  comment: string;
  images?: string[]; // optional images
  likeCount: number;
}

// Mock Data
const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "สมศรี ใจดี",
      avatar: "https://ui-avatars.com/api/?name=สมศรี+ใจดี&background=FF6B35&color=fff",
    },
    rating: 5,
    date: "2024-12-15",
    variant: "สูตรปลาทู 1.2kg",
    comment: "อาหารดีมากค่ะ น้องแมวชอบกินมาก เม็ดใหญ่กำลังดี ไม่แข็งเกินไป กลิ่นหอม แถมราคาไม่แพง จะซื้อซ้ำอีกแน่นอนค่ะ",
    images: [
      "https://picsum.photos/seed/review1a/300/300",
      "https://picsum.photos/seed/review1b/300/300",
      "https://picsum.photos/seed/review1c/300/300",
    ],
    likeCount: 24,
  },
  {
    id: "2",
    user: {
      name: "วิชัย รักสัตว์",
      avatar: "https://ui-avatars.com/api/?name=วิชัย+รักสัตว์&background=4ECDC4&color=fff",
    },
    rating: 5,
    date: "2024-12-14",
    variant: "สูตรไก่ 500g",
    comment: "น้องหมากินได้อร่อยมาก ขนนุ่มขึ้น สุขภาพดีขึ้นเห็นได้ชัด จัดส่งเร็วมาก แพ็คของดีมาก ประทับใจมากครับ",
    images: [
      "https://picsum.photos/seed/review2a/300/300",
      "https://picsum.photos/seed/review2b/300/300",
    ],
    likeCount: 18,
  },
  {
    id: "3",
    user: {
      name: "นันทิยา สวยงาม",
      avatar: "https://ui-avatars.com/api/?name=นันทิยา+สวยงาม&background=FF6B9D&color=fff",
    },
    rating: 4,
    date: "2024-12-13",
    variant: "สูตรแซลมอน 680g",
    comment: "คุณภาพดีค่ะ แต่ของมาช้าไปนิด น้องแมวกินได้อร่อย ไม่มีปัญหาอะไร",
    likeCount: 12,
  },
  {
    id: "4",
    user: {
      name: "ประยุทธ์ มีชัย",
      avatar: "https://ui-avatars.com/api/?name=ประยุทธ์+มีชัย&background=95E1D3&color=fff",
    },
    rating: 5,
    date: "2024-12-12",
    variant: "สูตรเนื้อ 1.2kg",
    comment: "ซื้อมาหลายครั้งแล้ว น้องชอบมาก ราคาดีที่สุด จะแนะนำเพื่อนต่อครับ",
    images: [
      "https://picsum.photos/seed/review4a/300/300",
    ],
    likeCount: 31,
  },
  {
    id: "5",
    user: {
      name: "สุภาพร แสนดี",
      avatar: "https://ui-avatars.com/api/?name=สุภาพร+แสนดี&background=FFA07A&color=fff",
    },
    rating: 5,
    date: "2024-12-11",
    variant: "สูตรปลาทู 1.2kg",
    comment: "ดีมากๆ น้องหมาตัวโปรดของครอบครัว กินอร่อยทุกมื้อเลยค่ะ ขนสวย สุขภาพดี ราคาคุ้มค่ามาก จัดส่งรวดเร็วด้วย ประทับใจค่ะ",
    images: [
      "https://picsum.photos/seed/review5a/300/300",
      "https://picsum.photos/seed/review5b/300/300",
      "https://picsum.photos/seed/review5c/300/300",
      "https://picsum.photos/seed/review5d/300/300",
    ],
    likeCount: 42,
  },
  {
    id: "6",
    user: {
      name: "กฤษณะ ทองดี",
      avatar: "https://ui-avatars.com/api/?name=กฤษณะ+ทองดี&background=9B59B6&color=fff",
    },
    rating: 4,
    date: "2024-12-10",
    variant: "สูตรไก่ 500g",
    comment: "โอเคครับ คุณภาพดี แต่ถ้าจะให้ดีคงจะมีขนาดให้เลือกเยอะกว่านี้",
    likeCount: 8,
  },
  {
    id: "7",
    user: {
      name: "อรุณี สุขใจ",
      avatar: "https://ui-avatars.com/api/?name=อรุณี+สุขใจ&background=E74C3C&color=fff",
    },
    rating: 5,
    date: "2024-12-09",
    variant: "สูตรแซลมอน 680g",
    comment: "น้องแมว 3 ตัวชอบกินทุกตัวเลยค่ะ กลิ่นหอม เม็ดกรุบกรอบ ทานง่าย ราคาถูกกว่าร้านอื่นมาก จัดส่งไวมาก",
    images: [
      "https://picsum.photos/seed/review7a/300/300",
      "https://picsum.photos/seed/review7b/300/300",
    ],
    likeCount: 27,
  },
  {
    id: "8",
    user: {
      name: "ธนา เจริญสุข",
      avatar: "https://ui-avatars.com/api/?name=ธนา+เจริญสุข&background=3498DB&color=fff",
    },
    rating: 5,
    date: "2024-12-08",
    variant: "สูตรเนื้อ 1.2kg",
    comment: "ของดีมากครับ น้องหมากินแล้วไม่มีอาการแพ้ ทานจนหมดถุงเลย จะซื้อเพิ่มครับ",
    likeCount: 15,
  },
];

// Filter types
type FilterType = "all" | "5star" | "withImages";

export default function ProductReviews() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  // Calculate statistics
  const totalReviews = mockReviews.length;
  const averageRating = (mockReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
  
  const ratingCounts = mockReviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Filter reviews
  const filteredReviews = mockReviews.filter((review) => {
    if (activeFilter === "5star") return review.rating === 5;
    if (activeFilter === "withImages") return review.images && review.images.length > 0;
    return true;
  });

  // Handle like toggle
  const toggleLike = (reviewId: string) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>รีวิวสินค้า</h2>

      {/* Summary Section */}
      <div className={styles.summary}>
        <div className={styles.summaryLeft}>
          <div className={styles.averageRating}>{averageRating}</div>
          <div className={styles.outOf}>จาก 5</div>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`${styles.star} ${
                  i < Math.floor(Number(averageRating)) ? styles.starFilled : ""
                }`}
              />
            ))}
          </div>
          <div className={styles.totalReviews}>{totalReviews} รีวิว</div>
        </div>

        <div className={styles.summaryRight}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star] || 0;
            const percentage = (count / totalReviews) * 100;

            return (
              <div key={star} className={styles.ratingBar}>
                <div className={styles.ratingBarLabel}>
                  {star}
                  <Star className={styles.ratingBarStar} />
                </div>
                <div className={styles.ratingBarTrack}>
                  <div
                    className={styles.ratingBarFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className={styles.ratingBarCount}>{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "all" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setActiveFilter("all")}
        >
          ทั้งหมด ({mockReviews.length})
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "5star" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setActiveFilter("5star")}
        >
          <Star className={styles.filterIcon} />5 ดาว ({ratingCounts[5] || 0})
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "withImages" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setActiveFilter("withImages")}
        >
          <Camera className={styles.filterIcon} />
          มีรูปภาพ ({mockReviews.filter((r) => r.images && r.images.length > 0).length})
        </button>
      </div>

      {/* Review List */}
      <div className={styles.reviewList}>
        {filteredReviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            {/* User Info */}
            <div className={styles.reviewHeader}>
              <img
                src={review.user.avatar}
                alt={review.user.name}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <div className={styles.userName}>{review.user.name}</div>
                <div className={styles.reviewDate}>{formatDate(review.date)}</div>
              </div>
            </div>

            {/* Product Variant */}
            <div className={styles.variant}>รุ่นสินค้า: {review.variant}</div>

            {/* Rating */}
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${styles.ratingStar} ${
                    i < review.rating ? styles.ratingStarFilled : ""
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <div className={styles.comment}>{review.comment}</div>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className={styles.imageGrid}>
                {review.images.map((img, idx) => (
                  <div key={idx} className={styles.imageWrapper}>
                    <img
                      src={img}
                      alt={`Review ${review.id} - ${idx + 1}`}
                      className={styles.reviewImage}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={`${styles.likeButton} ${
                  likedReviews.has(review.id) ? styles.likeButtonActive : ""
                }`}
                onClick={() => toggleLike(review.id)}
              >
                <ThumbsUp className={styles.likeIcon} />
                มีประโยชน์ (
                {review.likeCount + (likedReviews.has(review.id) ? 1 : 0)})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📝</div>
          <div className={styles.emptyStateText}>ไม่พบรีวิวที่ตรงกับตัวกรอง</div>
        </div>
      )}
    </div>
  );
}


