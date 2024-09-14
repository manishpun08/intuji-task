import * as Yup from "yup";

export const blogValidation = Yup.object({
  title: Yup.string()
    .required("Title is required.")
    .trim()
    .max(20, "Title must be of max 20 characters."),

  description: Yup.string()
    .required("Description is required.")
    .trim()
    .max(55, "Description must be of max 55 characters."),

  category: Yup.string()
    .required("Category is required.")
    .trim()
    .oneOf(
      ["Technology", "Health", "Education", "Business"],
      "Category must be one of: Technology, Health, Education, or Business"
    ),
});
