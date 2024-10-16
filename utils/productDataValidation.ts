type ProductTypes = {
  name: string | undefined;
  barcode: string | undefined;
  category: string | undefined;
  expiration_date: Date | undefined;
  quantity: string | undefined; // Changed from number to string
  image_url: string | undefined;
  notes: string | undefined;
};

export function validateProductData(productData: ProductTypes): string[] {
  const { name, barcode, category, expiration_date, quantity, image_url, notes } = productData;
  const messages: string[] = [];

  // Helper function to check for null, undefined, or empty string
  const isInvalid = (value: any) => value === null || value === undefined || value === "";

  // Validate individual fields
  if (isInvalid(name)) {
    messages.push("Name is required.");
  }
  if (isInvalid(barcode)) {
    messages.push("Barcode is required.");
  }
  if (isInvalid(category)) {
    messages.push("Category is required.");
  }
  if (isInvalid(expiration_date)) {
    messages.push("Expiration date is required.");
  }
  if (isInvalid(image_url)) {
    messages.push("Image URL is required.");
  }
  if (isInvalid(notes)) {
    messages.push("Notes are required.");
  }

  // Convert quantity to a number and check that it's a whole number greater than zero
  if (quantity) {
    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber) || quantityNumber <= 0 || !Number.isInteger(quantityNumber)) {
      messages.push("Quantity must be a valid whole number greater than 0.");
    }
  } else {
    messages.push("Quantity must be a valid whole number greater than 0.");
  }

  return messages;
}
