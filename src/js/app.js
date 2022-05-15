import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
import "../../build/tailwind.css";
window.addEventListener('DOMContentLoaded',()=>{
    CategoryView.setApp();
    ProductView.setApp();
    ProductView.creatProductList(ProductView.products);
    CategoryView.creatCategoriesList();
});