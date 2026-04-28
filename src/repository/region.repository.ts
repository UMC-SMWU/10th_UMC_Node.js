const regions = [
  { id: 1, name: '서울' },
  { id: 2, name: '부산' },
];

export const findRegionById = async (regionId: number) => {
  return regions.find((region) => region.id === regionId) || null;
};