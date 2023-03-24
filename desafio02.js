const fs = require("fs").promises;

class ProductManager {
  products = [];
  static id = 1;

  constructor() {
    this.path = "./products.json";
  }

  async loadData() {
    this.products = await this.getProducts();
    ProductManager.id = this.products.length;
  }

  async getProducts() {
    try {
      const products = await fs.readFile(this.path, "utf-8");
      if (products) return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addProduct(newProduct) {
    const codeExist = this.products.find(
      (product) => product?.code === newProduct.code
    );

    if (codeExist) throw Error("This code exist");

    if (!newProduct.title || newProduct.title.trim().length === 0)
      throw Error("Empty title field");

    if (!newProduct.description || newProduct.description.trim().length === 0)
      throw Error("Empty description field");

    if (!newProduct.price) throw Error("Empty price field");

    if (!newProduct.thumbnail || newProduct.thumbnail.trim().length === 0)
      throw Error("Empty thumbnail field");

    if (!newProduct.code || newProduct.code.trim().length === 0)
      throw Error("Empty code field");

    if (!newProduct.stock) throw Error("Empty stock field");

    this.products.push({ ...newProduct, id: ProductManager.id++ });

    await fs.writeFile(this.path, JSON.stringify(this.products));
  }

    async getProductById(idProduct) {
    
    try{
        const products= await fs.readFile(this.path,'utf-8');
    
    const productsParsed = JSON.parse(products);    
    const productExist = productsParsed.find(
      (product) => product?.id === idProduct
    );
    return productExist
    }catch(error)
    {console.log(error);
    throw new Error("This product no exist");
    }
  }

  async updateProduct(productChange) {
    const product = this.getProductById(productChange.id);

    if (productChange.title) product.title = productChange.title;
    if (productChange.description)
      product.description = productChange.description;
    if (productChange.price) product.price = productChange.price;
    if (productChange.thumbnail) product.thumbnail = productChange.thumbnail;
    if (productChange.code) product.code = productChange.code;
    if (productChange.stock) product.stock = productChange.stock;

    this.products[product.id] = product;

    await fs.writeFile(this.path, JSON.stringify(this.products));
    return product;
  }

  async deleteProduct(id) {
    delete this.products[id];
    await fs.writeFile(this.path, JSON.stringify(this.products));
    if (!id) throw Error("This product no exist");
  }
}

const main = async () => {
  const listProducts = new ProductManager();

  console.log(await listProducts.getProducts());

  await listProducts.loadData();

  await listProducts.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  console.log(await listProducts.getProducts());

 console.log(await listProducts.getProductById(0));
  console.log(
    await listProducts.updateProduct({
      id: 0,
      title: "nuevo titulo",
      description: "nueva descripcion",
      price: 450,
    })
  );

  await listProducts.deleteProduct(0);
};
main();
