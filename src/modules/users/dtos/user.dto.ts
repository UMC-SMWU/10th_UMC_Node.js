export interface UserSignUpRequest {
  /** 유저 이메일 */
  email: string;

  /** 유저 이름 */
  name: string;

  /** 유저 성별 */
  gender?: string;

  /** 유저 생년월일 */
  birth?: string;

  /** 유저 주소 */
  address?: string;

  /** 유저 상세 주소 */
  detailAddress?: string;

  /** 유저 전화번호 */
  phoneNumber?: string;

  /** 선호 음식 카테고리 ID 목록 */
  preferences?: number[];
}

export interface UserSignUpResponse {
  /** 생성된 유저 ID */
  userId: number;

  /** 유저 이메일 */
  email: string;

  /** 유저 이름 */
  name: string;

  /** 선호 음식 카테고리 ID 목록 */
  preferences: string[];
}
