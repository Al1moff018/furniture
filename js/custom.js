document.addEventListener("DOMContentLoaded", function () {

  // ================= PROFIL QISMI =================
  const profileInputName = document.querySelector("#fnamemodal");
  const profileInputEmail = document.querySelector("#email");
  const modalFormProfile = document.querySelector(".modal-form");
  const username = document.querySelector(".user-name");
  const useremail = document.querySelector(".user-email");

  // LocalStorage’dan ism va email chiqarish
  if (localStorage.getItem("name")) {
    if (username) {
      username.innerHTML = localStorage.getItem("name");
    }
  }
  if (localStorage.getItem("email")) {
    if (useremail) {
      useremail.innerHTML = localStorage.getItem("email");
    }
  }

  // Formadan ma’lumot olish va saqlash
  if (modalFormProfile) {
    modalFormProfile.addEventListener("submit", function (evt) {
      evt.preventDefault();

      let nameValue = profileInputName.value.trim();
      let emailValue = profileInputEmail.value.trim();

      localStorage.setItem("name", nameValue);
      localStorage.setItem("email", emailValue);

      if (username) {
        username.innerHTML = nameValue;
      }
      if (useremail) {
        useremail.innerHTML = emailValue;
      }

      profileInputName.value = "";
      profileInputEmail.value = "";
    });
  }

  // Profilni tahrirlash
  const editProfileName = document.querySelector("#fname1");
  const editProfileEmail = document.querySelector("#fname2");
  const editProfileBtn = document.querySelector("#editprofilebtn");

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", function (evt) {
      evt.preventDefault();

      let editName = editProfileName.value.trim();
      let editEmail = editProfileEmail.value.trim();

      if (editName !== "" && editEmail !== "") {
        localStorage.setItem("name", editName);
        localStorage.setItem("email", editEmail);

        if (username) {
          username.innerHTML = editName;
        }
        if (useremail) {
          useremail.innerHTML = editEmail;
        }

        editProfileName.value = "";
        editProfileEmail.value = "";
      }
    });
  }

  // ================= MAHSULOTLAR QISMI =================
  async function getProducts() {
    const url = "products.json";
    const productsContainer = document.querySelector("#product-container");

    if (!productsContainer) {
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      data.forEach(function (item) {
        const card = `
          <div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0 product-content">
            <div class="product-item">
              <img src="${item.image}" class="img-fluid product-thumbnail">
              <h3 class="product-title">${item.title}</h3>
              <strong class="product-price">${item.price}</strong>
              <button class="icon-cross add-btn" data-target="${item.id}">
                <img src="images/cross.svg" class="img-fluid">
              </button>
            </div>
          </div>
        `;
        productsContainer.insertAdjacentHTML("beforeend", card);
      });

      productsContainer.addEventListener("click", function (e) {
        if (e.target.closest(".add-btn")) {
          const btn = e.target.closest(".add-btn");
          const id = btn.dataset.target;

          let cartProducts = JSON.parse(localStorage.getItem("cart-products")) || [];

          let exist = cartProducts.find(function (p) {
            return p.id == id;
          });

          if (exist) {
            exist.quantity += 1;
          } else {
            const selected = data.find(function (p) {
              return p.id == id;
            });
            cartProducts.push({
              ...selected,
              quantity: 1
            });
          }

          localStorage.setItem("cart-products", JSON.stringify(cartProducts));
          cartCount();
        }
      });

    } catch (error) {
      console.log("Xatolik:", error);
    }
  }
  getProducts();

  // ================= POSTLAR QISMI =================
  fetch("posts.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (posts) {
      const postsRow = document.getElementById("posts-row");
      if (!postsRow) return;

      posts.forEach(function (post) {
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
    });

  // ================= SAVATCHA QISMI =================
  function cartCount() {
    const cartProducts = JSON.parse(localStorage.getItem("cart-products")) || [];
    const basketCount = document.querySelector(".basket-product-count");

    if (basketCount) {
      basketCount.textContent = cartProducts.length;
    }
  }
  cartCount();

  const cartContainer = document.querySelector("#cart-container");
  if (cartContainer) {
    const cartProducts = JSON.parse(localStorage.getItem("cart-products")) || [];

    cartProducts.forEach(function (item) {
      cartContainer.insertAdjacentHTML("beforeend", `
        <tr>
          <td class="product-thumbnail">
            <img src="${item.image}" alt="Image" class="img-fluid">
          </td>
          <td class="product-name">
            <h2 class="h5 text-black">${item.title}</h2>
          </td>
          <td>${item.price}$</td>
          <td>
            <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
              <div class="input-group-prepend">
                <button class="btn btn-outline-black decrease" type="button">&minus;</button>
              </div>
              <input type="text" class="form-control text-center quantity-amount" value="${item.quantity}">
              <div class="input-group-append">
                <button class="btn btn-outline-black increase" type="button">&plus;</button>
              </div>
            </div>
          </td>
          <td>${item.price * item.quantity}$</td>
          <td><a href="#" class="btn btn-black btn-sm">X</a></td>
        </tr>
      `);
    });
  }

});
