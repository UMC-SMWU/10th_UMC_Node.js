export interface CreateStoreRequest {
  /** 가게 이름 */
  name: string;
}

export interface StoreResponse {
  /** 가게 ID */
  id: number;

  /** 가게 이름 */
  name: string;
}
