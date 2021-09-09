
const productInCart = "http://localhost:3000/Product_in_cart";

function start() {
  getProducts((products) => {
    renderProducts(products);

    showProductItem(products);

  })
}

start();

// Lấy ra tất cả products có trong database
function getProducts(callback) {

  fetch(productInCart)
      .then((response) => response.json())

      .then(callback)

      .catch(() => {
        window.alert('Không thể kết nối được máy chủ');
      })
}

// Hiển thị ra tất cả products có trong database ra ngoài website

function renderProducts(products) {

  const headerCartListElement = document.querySelector('.header__cart-list-item');

  var html = products.map((product) => {
    return `<li class="header__cart-item header__cart-item-${product.id}">
    <a href="#" class="header__cart-link">
      <img src=${product.img} alt="" class="header__cart-item-img">

      <div class="header__cart-item-info">
        <div class="header__cart-head">
          <span class="header__cart-item-name">${product.name}</span>

          <div class="header__cart-price-amount">
            <span class="header__cart-price">${product.price}</span>
            <span class="header__cart-x">x</span>
            <span class="header__cart-amount">${product.amount}</span>
          
          </div>
        </div>

        <div class="header__cart-bottom">
          <span class="header__cart-des">${product.description}</span>

          <button class="header__cart-delete-icon" title="Xóa sản phẩm" onclick="handledDelete(${product.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>

      </div>

    </a>
  </li>`;
  }).join('');

  headerCartListElement.innerHTML = html;
}

// Hiển thị số lượng sản phẩm có trong cart

function showProductItem(products) {
  const headerCartNotice = document.querySelector('.header__cart-notice');
  var productsCartAmount = products.length;
  headerCartNotice.innerText = productsCartAmount;
}

// Xóa sản phẩm

function handledDelete(id) {

  let deleteConfirmed = confirm('Bạn có muốn xóa sản phẩm này?');
  // Nếu người dùng bấm nút OK thì mới thực thi xóa sản phẩm trong DB
  if(deleteConfirmed) {

    var options = {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }

    fetch(productInCart+'/'+id,options)
        .then((response) => response.json())

        .then(() => {
          const productItem = document.querySelector('header__cart-item-'+id);
          productItem.remove();
        })

        .catch(() => alert(''));

  }

}