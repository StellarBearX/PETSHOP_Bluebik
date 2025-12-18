export function HeartIcon({ filled = false, className = "w-6 h-6" }: { filled?: boolean; className?: string }) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ filled = false, className = "w-5 h-5" }: { filled?: boolean; className?: string }) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarRatingIcon({ 
  rating = 5, 
  maxRating = 5,
  showScore = true,
  className = "" 
}: { 
  rating?: number
  maxRating?: number
  showScore?: boolean
  className?: string 
}) {
  // Clamp rating between 0 and 5
  const clampedRating = Math.min(Math.max(rating, 0), 5)
  const percentage = (clampedRating / maxRating) * 100
  
  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
      <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
        {/* Empty stars (background) */}
        <span style={{ color: '#ddd', letterSpacing: '2px' }}>★★★★★</span>
        {/* Filled stars (overlay) */}
        <span 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            overflow: 'hidden', 
            color: '#FFD700',
            width: `${percentage}%`,
            letterSpacing: '2px',
            whiteSpace: 'nowrap'
          }}
        >
          ★★★★★
        </span>
      </div>
      {/* Score display */}
      {showScore && (
        <span style={{ fontSize: '0.7em', color: '#666', fontWeight: 500 }}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
