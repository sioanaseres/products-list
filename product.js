const productDom = document.querySelector(".product");
const url = `https://course-api.com/javascript-store-single-product`;

const fetchPoduct = async () => {
  try {
    productDom.innerHTML = '<h4 class="product-loading"> Loading ... </h4> ';
    // console.log(window.location.search);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDom.innerHTML =
      '<p class="error"> There was a problem loading the product. Please try again later. </p> ';
  }
};

const displayProduct = (product) => {
  const {
    company,
    colors,
    description,
    name: title,
    price,
    image,
  } = product.fields;
  const { url: img } = image[0];
  const formatedPrice = price / 100;
  document.title = title.toUpperCase();

  //colors
  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join("");
  productDom.innerHTML = ` <div class="product-wrapper">
  <img src="${img}" alt="" class="img" />
  <div class="product-info">
    <h3>${title}</h3>
    <h5>${company}</h5>
    <span>$${formatedPrice}</span>
    <div class="colors">
    ${colorsList}
  
    </div>
    <p>
    ${description}
    </p>
    <button class="btn">Add to cart</button>
  </div>
</div>`;
};

const start = async () => {
  const data = await fetchPoduct();
  displayProduct(data);
};

start();
