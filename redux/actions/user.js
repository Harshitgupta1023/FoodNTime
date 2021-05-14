export const SET_FILTERS = "SET_FILTERS";
export const FETCH_MEALS = "FETCH_MEALS";

export const fetchMealsRedux = (meals, mealsId) => {
  return { type: FETCH_MEALS, mealsData: meals, mealsID: mealsId };
};
export const setFilters = (filterdMat) => {
  return { type: SET_FILTERS, filters: filterdMat };
};
