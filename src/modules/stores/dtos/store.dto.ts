export const responseFromReviews = (reviews: any[]) => {
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: { cursor: lastReview ? lastReview.id : null },
  };
};

export const responseFromMyReviews = (reviews: any[]) => {
  const lastReview = reviews[reviews.length - 1];
  return {
    data: reviews,
    pagination: { cursor: lastReview ? lastReview.id : null },
  };
};

export const responseFromStoreMissions = (missions: any[]) => {
  const last = missions[missions.length - 1];
  return {
    data: missions,
    pagination: { cursor: last ? last.id : null },
  };
};

export const responseFromMyMissions = (missions: any[]) => {
  const last = missions[missions.length - 1];
  return {
    data: missions,
    pagination: { cursor: last ? last.id : null },
  };
};