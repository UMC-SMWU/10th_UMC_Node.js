// import { setPreference } from "../repositories/user.repository.js";
// 위 import는 현재 DTO 파일에서 사용하지 않으므로 주석 처리했습니다.
// DTO는 요청/응답 타입과 변환 함수만 담당하는 것이 좋습니다.

/**
 * 회원가입 요청 DTO
 */
export interface UserSignUpRequest {
  /** 사용자 이메일 */
  email: string;

  /** 사용자 이름 */
  name: string;

  /** 성별 */
  gender: "MALE" | "FEMALE";

  /** 생년월일 */
  birth: Date;

  /** 주소 */
  address?: string;

  /** 상세 주소 */
  detailAddress?: string;

  /** 전화번호 */
  phoneNumber: string;

  /** 선호 음식 카테고리 ID 목록 */
  preferences: number[];
}

/**
 * 회원가입 성공 응답 DTO
 */
export interface UserSignUpResponse {
  /** 생성된 사용자 ID */
  userId: number;

  /** 사용자가 선택한 선호 음식 카테고리 이름 목록 */
  preferences: string[];
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

// 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환
export const bodyToUser = (body: UserSignUpRequest) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
  };
};

// DB에서 받은 user와 preferences를 응답 DTO 형태로 변환
export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferences = data.preferences.map(
    (p) => p.foodCategory.name
  );

  return {
    userId: data.user.id,
    preferences,
  };
};
