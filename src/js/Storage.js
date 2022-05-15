export default class Storage{

    static getAllCategories(){
        const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

        const sortedCategories = savedCategories.sort((a,b)=>{
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1:1 ;
        });

        return sortedCategories;
    }

    static saveCategory(categoryToSave){
        const savedCategories = Storage.getAllCategories();

        const existedItem = savedCategories.find((c)=>c.id === categoryToSave.id);

        if(existedItem){
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;

        }else{
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }

        localStorage.setItem("category",JSON.stringify(savedCategories));
    }

    static getAllProducts(sort = "newst"){
        const savedProducts = JSON.parse(localStorage.getItem("product")) || [];

        const sortedProducts = savedProducts.sort((a,b)=>{
           if(sort === "newst"){
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1:1 ;
           }else if(sort==="oldest"){
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1:-1 ;
           }
        });

        return sortedProducts;
    }

    static SaveProduct(ProductToSave){
        const savedProducts = Storage.getAllProducts();

        const existedItem = savedProducts.find((c)=>c.id === ProductToSave.id);

        if(existedItem){
            existedItem.title = ProductToSave.title;
            existedItem.quantity = ProductToSave.quantity;
            existedItem.category = ProductToSave.category;

        }else{
            ProductToSave.id = new Date().getTime();
            ProductToSave.createdAt = new Date().toISOString();
            savedProducts.push(ProductToSave);
        }

        localStorage.setItem("product",JSON.stringify(savedProducts));
    }

    static deleteProduct(id){
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter((p)=>p.id != id);
        localStorage.setItem("product",JSON.stringify(filteredProducts));
    }

    static editProduct(id,toEdite){
       const savedProducts = Storage.getAllProducts();
       const editedProduct = savedProducts.find((p)=>p.id == id); 
       const editedProductIndex = savedProducts.findIndex((p)=>p.id == id);
       editedProduct.title = toEdite.title;
       editedProduct.quantity = toEdite.quantity;
       editedProduct.selectedCategory = toEdite.selectedCategory;
       editedProduct.createdAt =  new Date().toISOString();

       savedProducts[editedProductIndex] = editedProduct;

       localStorage.setItem("product",JSON.stringify(savedProducts));
    }
    


}