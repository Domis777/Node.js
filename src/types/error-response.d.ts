type RecursiveStringObject = {
  [Key: string]: string | RecursiveStringObject;
};

type ErrorResponse = {
  error: string,
  errors?: string[] | RecursiveStringObject,
};
