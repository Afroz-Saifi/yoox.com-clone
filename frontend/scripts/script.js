const base_url = "https://real-blue-dragonfly-suit.cyclic.app/products";
const login_url = "https://real-blue-dragonfly-suit.cyclic.app/users/login";
const products_container = document.querySelector(".products_container");
let pageNo = Number(document.querySelector("#page_no").textContent)||1;
let leftPage = document.querySelector("#page_left");
const rightPage = document.querySelector("#page_right");
const login_form_el = document.getElementById("login_form");
const logged_user_name = localStorage.getItem("user_name");
const logged_user_token = localStorage.getItem("token");

if (logged_user_name) {
  document.getElementById("reistration_box").style.display = "none"
  document.getElementById("user_name_box").style.display = "flex";
  document.getElementById("display_user_name").textContent = logged_user_name;
  document.getElementById("login_form_container").style.display = "none"
  document.getElementById("logout_user").style.display = "flex";
}

fetchMe(base_url, pageNo);

// apply pagination
leftPage.addEventListener("click", () => {
  pageNo = Number(document.querySelector("#page_no").textContent);
  if (pageNo > 1) {
    document.querySelector("#page_no").textContent = --pageNo;
    fetchMe(base_url, pageNo);
  }
});
rightPage.addEventListener("click", () => {
  pageNo = Number(document.querySelector("#page_no").textContent);
  document.querySelector("#page_no").textContent = ++pageNo;
  fetchMe(base_url, pageNo);
});

// apply sort filter
document.getElementById("sort_fileter").addEventListener("change", () => {
  document.querySelector("#page_no").textContent = 1;
  fetchMe(base_url, 1);
});

// open categories
document.getElementById("open_categories").addEventListener("click", () => {
  document.getElementById("categories_options").style.maxHeight = "300px";
  document.getElementById("categories_options").style.visibility = "visible";
});
document.getElementById("categories").addEventListener("mouseleave", () => {
  document.getElementById("categories_options").style.maxHeight = "0px";
  document.getElementById("categories_options").style.visibility = "hidden";
});
// open brands filter
document.getElementById("open_brands").addEventListener("click", () => {
  document.getElementById("brands_options").style.maxHeight = "300px";
  document.getElementById("brands_options").style.visibility = "visible";
});
document.getElementById("brands").addEventListener("mouseleave", () => {
  document.getElementById("brands_options").style.maxHeight = "0px";
  document.getElementById("brands_options").style.visibility = "hidden";
});
// open prizes filter
document.getElementById("open_prize").addEventListener("click", () => {
  document.getElementById("prize_options").style.maxHeight = "300px";
  document.getElementById("prize_options").style.visibility = "visible";
});
document.getElementById("prizes").addEventListener("mouseleave", () => {
  document.getElementById("prize_options").style.maxHeight = "0px";
  document.getElementById("prize_options").style.visibility = "hidden";
});
// min prize filter
document.getElementById("min_range_input").addEventListener("change", (e) => {
  let rangeValue = e.target.value;
  document.getElementById("rangeValue").innerHTML = `US$ ${rangeValue}`;
  document.querySelector("#page_no").textContent = 1;
  fetchMe(base_url, 1);
});
// max prize filter
document.getElementById("max_range_input").addEventListener("change", (e) => {
  let rangeValue = e.target.value;
  document.getElementById("maxrangeValue").innerHTML = `US$ ${rangeValue}`;
  document.querySelector("#page_no").textContent = 1;
  fetchMe(base_url, 1);
});

// brands filter
function filterBrands() {
  // Get all checkboxes
  const brand_checkboxes = document.querySelectorAll(".brand_filter_option");

  // Get checked checkboxes
  const brand_checkedCheckboxes = Array.from(brand_checkboxes).filter(
    (checkbox) => checkbox.checked
  );

  // Get checked checkbox values
  const brand_checkedValues = brand_checkedCheckboxes.map(
    (checkbox) => checkbox.value
  );

  if (brand_checkedValues.length == 0) return "";
  return brand_checkedValues.join(" ");
}
document.querySelectorAll(".brand_filter_option").forEach((ele) => {
  ele.addEventListener("change", () => {
    document.querySelector("#page_no").textContent = 1;
    fetchMe(base_url, 1);
  });
});

// categories filter
function filterCategories() {
  // Get all checkboxes
  const brand_checkboxes = document.querySelectorAll(".category_filter_option");

  // Get checked checkboxes
  const brand_checkedCheckboxes = Array.from(brand_checkboxes).filter(
    (checkbox) => checkbox.checked
  );

  // Get checked checkbox values
  const brand_checkedValues = brand_checkedCheckboxes.map(
    (checkbox) => checkbox.value
  );

  if (brand_checkedValues.length == 0) return "";
  return brand_checkedValues.join(",");
}
document.querySelectorAll(".category_filter_option").forEach((ele) => {
  ele.addEventListener("change", () => {
    document.querySelector("#page_no").textContent = 1;
    fetchMe(base_url, 1);
  });
});

// main fetch products
function fetchMe(url, pageNo) {
  let sort = document.getElementById("sort_fileter").value;
  let min = document.getElementById("rangeValue").textContent;
  let max = document.getElementById("maxrangeValue").textContent;
  const brands_filter = filterBrands();
  let categories_filter = filterCategories();
  min = min.substring(4);
  max = max.substring(4);
  fetch(
    `${base_url}?page=${pageNo}&sort=${sort}&min=${min}&max=${max}&brands=${brands_filter}&cats=${categories_filter}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyODg3YmMyMTk5ODEzN2JhMDQ1OGYiLCJpYXQiOjE2ODAyMzgzMTAsImV4cCI6MTY4MDI0OTExMH0.A0cH-Wf0cStOxRbuPrz-_-YjkyC6de-5FP9I9M6AR2M",
      },
    }
  )
    .then((req) => req.json())
    .then((res) => appendMe(res))
    .catch((err) => {
      products_container.innerHTML = "<h1> No products found </h1>";
    });
}

// append all the products
const appendMe = (data) => {
  products_container.innerHTML = data
    .map((ele) => {
      return `
        <div class="product_card" id=${ele._id} onclick="{get_solo_product(this)}"> 
            <div class="card_image">
                <img src="${ele.image}" />
            </div>
            <div class="view_fav">
                <div class="col-1"> 
                    <i class="fa-regular fa-eye fa-xl" style="color: #000333;"></i>
                    <i class="fa-regular fa-heart fa-xl" style="color: #000333;"></i>
                </div>
                <div class="discount"> 
                    <p> ${ele.off || ""} </p>
                </div>
            </div>
            <div class="description">
                <p class="brand"> ${ele.brand} </p>
                <p class="microcategory"> ${ele.microcategory} </p>
                <p class="oldprice"> ${ele.oldprice || ""} </p>
                <p class="newprice"> ${
                  ele.newprice ? "US$ " + ele.newprice + ".00" : "SOLD OUT"
                } </p>
                <p class="size"> ${ele.size} </p>
            </div>
        </div>
        `;
    })
    .join("");
};

// login user
login_form_el.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    email: login_form_el.user_email.value,
    password: login_form_el.user_password.value,
  };
  fetch(login_url, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" },
  })
    .then((req) => req.json())
    .then((res) => loged_in_success(res))
    .catch((err) => alert("Wrong crendencials"));
});
function loged_in_success(data) {
  const { msg, user_name, token } = data;
  if (!token) {
    alert("wrong credencials");
    return;
  }
  localStorage.setItem("user_name", user_name);
  localStorage.setItem("token", token);
  location.reload();
}

// logout user
document.getElementById("logout_user").addEventListener("click", (e) => {
  localStorage.clear();
  location.reload()
})
// open login form
function open_login_form(){
  document.getElementById("login_form").style.visibility = "visible";
}
document.getElementById("open_login_form").addEventListener("click", () => { 
  open_login_form()
});  
// close login form
function close_login_form(){
  document.getElementById("login_form").style.visibility = "hidden";
}
document.getElementById("close_login_form").addEventListener("click", () => {
  close_login_form()
});


// get solo product
function get_solo_product(e){
  localStorage.setItem("solo_id", e.id)
  location.href = "../files/solo.html"
}