/**
 * 가게 리뷰 1개 응답 DTO
 */
export interface ReviewItem {
  /** 리뷰 ID */
  id: number;

  /** 리뷰 내용 */
  content: string;

  /** 별점 */
  rating: number;
}

/**
 * 커서 페이지네이션 응답 DTO
 */
export interface CursorPaginationDto {
  /** 다음 페이지 조회에 사용할 cursor 값. 다음 페이지가 없으면 null */
  cursor: number | null;
}

/**
 * 가게 리뷰 목록 응답 DTO
 */
export interface ReviewListResponse {
  /** 리뷰 목록 */
  data: ReviewItem[];

  /** 페이지네이션 정보 */
  pagination: CursorPaginationDto;
}

/**
 * 실패 응답 DTO
 */
export interface ErrorResponseDto {
  /** 성공 여부 */
  isSuccess: boolean;

  /** HTTP 상태 코드 */
  code: number;

  /** 에러 메시지 */
  message: string;
}

export const responseFromReviews = (reviews: any[]): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};
