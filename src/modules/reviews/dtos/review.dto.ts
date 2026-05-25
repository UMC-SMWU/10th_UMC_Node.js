export interface CreateReviewRequest {
  /** 리뷰 내용 */
  content: string;
}

export interface ReviewResponse {
  /** 리뷰 ID */
  id: number;

  /** 가게 ID */
  storeId: number;

  /** 작성자 ID */
  userId: number;

  /** 리뷰 내용 */
  content: string;
}
