import { CreateStoreDto } from '../dto/store.dto';
import * as regionRepository from '../repository/region.repository';
import * as storeRepository from '../repository/store.repository';

// ⭐ 가게 생성
export const createStore = async (
  regionId: number,
  data: CreateStoreDto
) => {
  const region = await regionRepository.findRegionById(regionId);

  if (!region) {
    throw new Error('존재하지 않는 지역입니다.');
  }

  return await storeRepository.createStore(regionId, data);
};