import * as Yup from "yup";

const AddMealValidator = Yup.object().shape({
  name: Yup.string()
    .label("Meal Name")
    .required("The meal can't be unnamed")
    .min(5, "Meal name must have at least 5 characters"),
  discount: Yup.number().label("Discount").required(),
  price: Yup.number().label("Price").required(),
  time: Yup.number().label("Preparation Time").required(),
  filePath: Yup.string()
    .label("Image")
    .required("Image of the Meal is required")
    .min(5, "Please select an Image"),
});

export default AddMealValidator;
