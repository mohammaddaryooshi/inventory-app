import Storage from "./Storage.js";

const Categorytitle = document.querySelector("#category-title");
const Categorydescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#addcategory-btn");

 class CategoryView {
    constructor(){
        addNewCategoryBtn.addEventListener("click",(e)=>{this.addNewCategory(e)})
        this.categories = [];
    }
    
    addNewCategory(e){
        e.preventDefault();
        const title = Categorytitle.value;
        const description =  Categorydescription.value;

        if(!title || !description) return;
        Storage.saveCategory({title,description});
        this.categories = Storage.getAllCategories();

        this.creatCategoriesList(this.categories);
        
        Categorytitle.value = "";
        Categorydescription.value = "";
    }

    setApp(){
        
        this.categories = Storage.getAllCategories();
    }

    creatCategoriesList(){
       
        let result = `<option value="" class="bg-slate-500 text-slate-200" >select a category</option>`;
        this.categories.forEach(element => {
            result+=` <option value=${element.id} class="bg-slate-500 text-slate-200" >${element.title}</option>`;
        });

        const categoriesContainer = document.getElementById("categoreis-container");
        categoriesContainer.innerHTML = result;
    }
}


export default new CategoryView();

