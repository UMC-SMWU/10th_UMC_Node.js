export interface AddStoreRequest {
  regionId: number;
  name:     string;
  address:  string;
}

export const responseFromStore = (store: any) => ({
  storeId:   store.id,
  name:      store.name,
  address:   store.address,
  createdAt: store.created_at,
});