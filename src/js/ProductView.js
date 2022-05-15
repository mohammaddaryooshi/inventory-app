import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("addproductbtn");
const productTitle = document.getElementById("product-title");
const productCategory = document.getElementById("categoreis-container");
const ProductQuantity = document.getElementById("productquantity");
const searchInput = document.getElementById("product-search");
const selectedSort = document.getElementById("product-sort");
const closeProductModalBtn = document.getElementById("close-product-modal");
const ProductModal = document.getElementById("product-modal");
const darkBg = document.getElementById("dark");
const editproductbtn = document.getElementById("editproductbtn");

class ProductView{
    constructor(){
        addNewProductBtn.addEventListener("click",(e)=>this.addNewProduct(e));
        searchInput.addEventListener("input",(e)=>this.searchProducts(e));
        selectedSort.addEventListener("change",(e)=>this.sortProducts(e));
        closeProductModalBtn.addEventListener("click",()=>this.closeProductModal());
        editproductbtn.addEventListener("click",(e)=>this.editProduct(e))
        
        this.products = [];
    }   
    
    setApp(){
        this.products = Storage.getAllProducts();
    }

    addNewProduct(e){
        e.preventDefault();
        const title = productTitle.value;
        const quantity = ProductQuantity.value;
        const selectedCategory = productCategory.value;

        if(!title || !quantity || !selectedCategory) return;

        Storage.SaveProduct({title,selectedCategory,quantity});
        this.products = Storage.getAllProducts();
        this.creatProductList(this.products);
        productTitle.value = "";
        productCategory.value = "";
        ProductQuantity.value = 0;
    }

    creatProductList(products){
        const productsContainer = document.getElementById("products-container");
        let result = "";

       products.forEach((item)=>{
            const selectedCategory = Storage.getAllCategories().find((c)=>c.id == item.selectedCategory);
            result += `
            <div class="w-full flex   items-center justify-between mb-3">
            <div class="produc-right">
            <span class="text-slate-300">${item.title}</span>
            </div>
            <div class="produc-left flex items-center justify-center">
                <span class="ml-5 text-slate-300">${new Date(item.createdAt).toLocaleDateString("fa-IR")}</span>
                <span class="ml-5 text-slate-300 border border-slate-300 rounded-lg py-1 px-3">${selectedCategory.title}</span>
                <span class="ml-5  h-8 w-8 border-2 border-slate-300 rounded-full flex items-center justify-center bg-slate-600 text-slate-400">${item.quantity}</span>
                <button class="ml-5 edit-product text-yellow-500 border border-yellow-500 py-1 px-3 rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-all duration-100" data-id="${item.id}" data-title="${item.title}" data-quantity = "${item.quantity}" data-category = "${item.selectedCategory}" >Edit</button>
                <button class="ml-5 delete-product text-red-600 border border-red-600 py-1 px-3 rounded-lg hover:bg-red-600 hover:text-slate-900 transition-all duration-100" data-id="${item.id}" >delete</button>
            </div>
            </div>
            `;
        });

        productsContainer.innerHTML = result;

        const deleteBtns = document.querySelectorAll(".delete-product");
        deleteBtns.forEach((item)=>{
            item.addEventListener("click",(e)=>this.deleteProduct(e));
        });

        const editProductBtns = document.querySelectorAll(".edit-product");
        editProductBtns.forEach((item)=>{
            item.addEventListener("click",(e)=>{this.openProductModal(e)});
        });

    }

    searchProducts(e){
        const InputValue = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter((p)=>p.title.toLowerCase().includes(InputValue));
        this.creatProductList(filteredProducts);
    }

    sortProducts(e){
        const sortValue = e.target.value;
        this.products = Storage.getAllProducts(sortValue);
        this.creatProductList(this.products);
    }

    deleteProduct(e){
        const productId = e.target.dataset.id;
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts();
        this.creatProductList(this.products);
    }

    openProductModal(e){
        ProductModal.style.display = "flex"
        darkBg.style.display = "block";
        
        const productId = e.target.dataset.id;
        const title = e.target.dataset.title;
        const quantity = e.target.dataset.quantity;
        const categoryId = e.target.dataset.category;

        const modalTitle = document.getElementById("editeproduct-title");
        const modalCategory = document.getElementById("edit-product-category");
        const modalQuantity = document.getElementById("edit-productquantity");

        const allCategories = Storage.getAllCategories();

        let result = `<option value="" class="bg-slate-500 text-slate-200" >select a category</option>`;
        allCategories.forEach(element => {
            result+=` <option value=${element.id} class="bg-slate-500 text-slate-200" ${element.id == categoryId ? "selected" : ""} >${element.title}</option>`;
        });

        const modalCategoriesContainer = document.getElementById("edit-product-category");
        modalCategoriesContainer.innerHTML = result;
        
        modalTitle.value = title;
        modalQuantity.value = quantity;
        editproductbtn.dataset.id = productId;
        
    }

    closeProductModal(){
        ProductModal.style.display = "none"
        darkBg.style.display = "none"
        
    }

    editProduct(e){

        e.preventDefault();
        const modalTitle = document.getElementById("editeproduct-title");
        const modalCategory = document.getElementById("edit-product-category");
        const modalQuantity = document.getElementById("edit-productquantity");

        const producId = e.target.dataset.id;
        const newTitle = modalTitle.value;
        const newCategory = modalCategory.value;
        const newQuantity = modalQuantity.value;

        Storage.editProduct(producId,{title:newTitle,selectedCategory:newCategory,quantity:newQuantity});
        this.closeProductModal();
        this.products = Storage.getAllProducts();
        this.creatProductList(this.products);
        


    }


}


export default new ProductView();