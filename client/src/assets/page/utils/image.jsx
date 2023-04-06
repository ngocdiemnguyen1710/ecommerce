export function getImageUrl(data) {
  let baseUrl = "http://localhost:8080";

  return `${baseUrl}/api/v1/product/product-photo/${data}`;
}
