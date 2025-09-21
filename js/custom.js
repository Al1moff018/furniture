try {
    const profileInputName = document.querySelector("#fnamemodal");
    const profileInputEmail = document.querySelector("#email");
    const modalFormProfile = document.querySelector(".modal-form");
    const username = document.querySelector(".user-name");
    const useremail = document.querySelector(".user-email");
    
    if (localStorage.getItem("name")) {
        username.innerHTML = `${localStorage.getItem("name")}`;
    }
    if (localStorage.getItem("email")) {
        useremail.innerHTML = `${localStorage.getItem("email")}`;
    }
    
    modalFormProfile.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let profileInputNameValue = profileInputName.value;
        let profileInputEmailValue = profileInputEmail.value;
    
        localStorage.setItem("name", profileInputNameValue);
        localStorage.setItem("email", profileInputEmailValue);
    
        username.innerHTML = profileInputNameValue;
        useremail.innerHTML = profileInputEmailValue;
    
        profileInputName.value = "";
        profileInputEmail.value = "";
    });
    
    const editProfileName = document.querySelector("#fname1");
    const editProfileEmail = document.querySelector("#fname2");
    const editProfileBtn = document.querySelector("#editprofilebtn");
    
    editProfileBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        let editProfileNameValue = editProfileName.value;
        let editProfileEmailValue = editProfileEmail.value;
    
        if (editProfileNameValue !== "" && editProfileEmailValue !== "") {
            username.innerHTML = editProfileNameValue;
            useremail.innerHTML = editProfileEmailValue;
    
            localStorage.setItem("name", editProfileNameValue);
            localStorage.setItem("email", editProfileEmailValue);
    
            editProfileName.value = "";
            editProfileEmail.value = "";
        }
    });
    console.log("Hozirgi ism:", localStorage.getItem("name"));
    console.log("Hozirgi email:", localStorage.getItem("email"));
} catch (error) {
    
}
const getProducts = async () => {
    const url = "products.json";
    const productsContainer = document.querySelector("#product-container");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((item) => {
            const card = `
            <div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <a class="product-item" href="cart.html">
                <img src="${item.image}" class="img-fluid product-thumbnail">
                <h3 class="product-title">${item.title}</h3>
                <strong class="product-price">${item.price}</strong>
                <span class="icon-cross">
                  <img src="images/cross.svg" class="img-fluid">
                </span>
              </a>
            </div>
            `;
            // console.log faqat tekshirish uchun
            console.log(card);
            // bu esa htmlga qo‘shadi
            productsContainer.insertAdjacentHTML("beforeend", card);
        });
    } catch (error) {
        console.error("Xatolik:", error);
    }
};
getProducts();
fetch("posts.json")
  .then(response => response.json())
  .then(posts => {
    const postsRow = document.getElementById("posts-row");

    posts.forEach(post => {
      postsRow.insertAdjacentHTML("beforeend", `
        <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
          <div class="post-entry">
            <a href="#" class="post-thumbnail">
              <img src="${post.img}" alt="Image" class="img-fluid">
            </a>
            <div class="post-content-entry">
              <h3><a href="#">${post.title}</a></h3>
              <div class="meta">
                <span>by <a href="#">${post.author}</a></span>
                <span>on <a href="#">${post.date}</a></span>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  })
  .catch(error => console.error("JSON yuklashda xato:", error));
