import { CreateStoreDto } from '../dto/store.dto';
import { CustomError } from '../errors/customError';

import * as regionRepository from '../repository/region.repository';
import * as storeRepository from '../repository/store.repository';

export const createStore = async (
  regionId: number,
  data: CreateStoreDto
) => {
  const region = await regionRepository.findRegionById(regionId);

  if (!region) {
    throw new CustomError(
      404,
      'REGION_NOT_FOUND',
      '존재하지 않는 지역입니다.'
    );
  }

  return storeRepository.createStore(regionId, data);
};