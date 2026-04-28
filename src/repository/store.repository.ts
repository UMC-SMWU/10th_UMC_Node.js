import { CreateStoreDto } from '../dto/store.dto';

// ⭐ 타입 정의
interface Store {
  id: number;
  regionId: number;
  name: string;
  address: string;
  category: string;
}

// ⭐ 임시 데이터
const stores: Store[] = [
  {
    id: 1,
    regionId: 1,
    name: '테스트 가게',
    address: '서울시 용산구',
    category: 'KOREAN',
  },
];

// ⭐ 가게 조회
export const findStoreById = async (storeId: number): Promise<Store | null> => {
  return stores.find((store) => store.id === storeId) || null;
};

// ⭐ 가게 생성
export const createStore = async (
  regionId: number,
  data: CreateStoreDto
): Promise<Store> => {
  const newStore: Store = {
    id: stores.length + 1,
    regionId,
    name: data.name,
    address: data.address,
    category: data.category ?? '', // ⭐ 여기 핵심
  };

  stores.push(newStore);

  return newStore;
};