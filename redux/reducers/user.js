import { FETCH_MEALS, SET_FILTERS } from "../actions/user";

const intialState = {
  meals: [],
  filteredMeals: [],
  mealsID: [],
  filteredMealsID: [],
};

const mealReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_MEALS:
      return {
        ...state,
        meals: action.mealsData,
        filteredMeals: action.mealsData,
        mealsID: action.mealsID,
        filteredMealsID: action.mealsID,
      };
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMealsID = [];
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.none) {
          if (appliedFilters.nonVeg && !meal.nonVeg) {
            return false;
          }
          if (appliedFilters.vegetarian && !meal.vegetarian) {
            return false;
          }
          updatedFilteredMealsID.push(meal.id);
          return true;
        }
        if (appliedFilters.dessert && !meal.dessert) {
          return false;
        }
        if (appliedFilters.mainCourse && !meal.mainCourse) {
          return false;
        }
        if (appliedFilters.starter && !meal.starter) {
          return false;
        }
        if (appliedFilters.nonVeg && !meal.nonVeg) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.vegetarian) {
          return false;
        }

        updatedFilteredMealsID.push(meal.id);
        return true;
      });
      return {
        ...state,
        filteredMeals: updatedFilteredMeals,
        filteredMealsID: updatedFilteredMealsID,
      };
    default:
      return state;
  }

  return state;
};

export default mealReducer;
