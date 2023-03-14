class ProductManager {
  products = [];
  static id = 0;

  getProducts() {
    return this.products;
  }

  addProduct(newProduct) {
    const codeExist = this.products.find(
      (product) => product.code === newProduct.code
    );

    if (codeExist) throw Error("This code exist");

    if (
      typeof newProduct.title !== "string" ||
      newProduct.title.trim().length === 0
    )
      throw Error("Empty title field");

    if (
      typeof newProduct.description !== "string" ||
      newProduct.description.trim().length === 0
    )
      throw Error("Empty description field");

    if (typeof newProduct.price !== "number" || !newProduct.price)
      throw Error("Empty price field");

    if (
      typeof newProduct.thumbnail !== "string" ||
      newProduct.thumbnail.trim().length === 0
    )
      throw Error("Empty thumbnail field");

    if (
      typeof newProduct.code !== "string" ||
      newProduct.code.trim().length === 0
    )
      throw Error("Empty code field");

    if (typeof newProduct.stock !== "number" || !newProduct.stock)
      throw Error("Empty stock field");

    this.products.push({ ...newProduct, id: ProductManager.id++ });
  }

  getProductById(idProduct) {
    const productExist = this.products.find(
      (product) => product.id === idProduct
    );

    if (productExist) return productExist;
    else throw Error("This product no exist");
  }
}

const listProducts = new ProductManager();

console.log(listProducts.getProducts());

listProducts.addProduct({
  title: "Producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(listProducts.getProducts());

console.log(listProducts.getProductById(0));
