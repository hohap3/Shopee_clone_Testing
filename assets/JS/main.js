
function ModalRegister() {

  const modalRegisterElement = document.querySelector('.modal--register');

  const registerLinkElement = document.querySelector('.header__navbar--has-modal');

  const buttonCloseRegister = document.querySelector('.modal__close-btn');

  const secondButtonCloseRegister = document.querySelector('.modal__second-close-btn');

  const modalContainer = document.querySelector('.modal__container');



  // Khi người dùng click vào thì sẽ hiển thị ra modal

  registerLinkElement.addEventListener('click',() => {
    modalRegisterElement.classList.add('open');
  })

  // Khi người dùng bấm nút x , nút đóng hoặc click vào vùng ngoài sẽ không hiển thị modal
  function closeModal() {
    modalRegisterElement.classList.remove('open');
  }

  

  buttonCloseRegister.addEventListener('click',closeModal);

  secondButtonCloseRegister.addEventListener('click',closeModal);

  modalRegisterElement.addEventListener('click',closeModal);

  // Tránh hành vi nổi bọt

  modalContainer.addEventListener('click',(e) => {
    e.stopPropagation();
  })
}

function ModalLogin() {

  const modalLoginElement = document.querySelector('.modal--login');

  const loginLinkElement = document.querySelector('.header__navbar--has-modal--login');

  const buttonCloseRegister = document.querySelectorAll('.modal__close-btn')[1];

  const secondButtonCloseRegister = document.querySelectorAll('.modal__second-close-btn')[1];

  const modalContainer = document.querySelectorAll('.modal__container')[1];

  function closeModal() {
    modalLoginElement.classList.remove('open');
  }

  loginLinkElement.addEventListener('click',() => {
    modalLoginElement.classList.add('open');
  })

  buttonCloseRegister.addEventListener('click',closeModal);

  secondButtonCloseRegister.addEventListener('click',closeModal);

  modalLoginElement.onclick = () => {
    closeModal();
  }

  modalContainer.onclick = (e) => {
    e.stopPropagation();
  }

}

function notDisappearedHistoryHeader() {
  const headerHistoryList = document.querySelector('.header__search-history-list');

  // Khi người dùng rê chuột xuống , không biến mất phần lịch sử
  headerHistoryList.onmousedown = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định 
    console.log(e.target);
  }
}

function sliders() {

  var slideIndex = 1;
  showImg(slideIndex);

  // Next/Prev Button
  function plusSide(n) {
    showImg(slideIndex += n);
  }

  const nextBtn = document.querySelector('.next-btn');

  const prevBtn = document.querySelector('.prev-btn');

  function showImg(n) {

    const sliders = document.querySelectorAll('.slider-picture');

    

    // Nếu tham số n lớn hơn số lượng hình ảnh thì trả vế 1
    if(n > sliders.length)
      slideIndex = 1;
     // Nếu tham số n nhỏ hơn số lượng hình ảnh thì trả vế số lượng tối đa của hình ảnh 
    if(n < 1)
      slideIndex = sliders.length;  

    // Ẩn đi những hình ảnh còn lại
    for (var i = 0 ; i < sliders.length ; i++) {
      sliders[i].style.display = 'none';
    }

    // Hiển thị hình ảnh
    sliders[slideIndex - 1].style.display = 'block';
  }

  // Auto slider
  setInterval(() => {
    nextBtn.click();
  }, 3500);

  nextBtn.onclick = () => {
    plusSide(1);
  }

  prevBtn.onclick = () => {
    plusSide(-1);
  }
}

function eventSaleTime() {

  const eventSaleElement = document.querySelector('.product-event-sale-time');

  // Lấy ra ngày event
  var eventDate = new Date('Sep 18,2021 23:59:59').getTime();

  // Cập nhật ngày event
  var x = setInterval(() => {

    var now = new Date().getTime();

    // Tìm khoảng thời gian từ ngày event đến ngày hôm nay

    var distance = eventDate - now;

    // Suy ra ngày , giờ , phut
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    eventSaleElement.innerHTML = `${days} ngày - ${hours}:${minutes}:${seconds}`;

    if(distance <=0) {
      clearInterval(x);

      eventSaleElement.innerHTML = 'Sự kiện kết thúc';
    }

  },1000)
}

function sliderMail() {

  var sliderIndex = 1;
  showSliderImg(sliderIndex);

  // Prev / Next button

  function plusSide(n) {
    showSliderImg(sliderIndex += n);
  }

  // Hiển thị và ẩn hình ảnh
  function showSliderImg(n) {

    const sliders = document.querySelectorAll('.slider-maill-image');

    const prevButton = document.querySelector('.shopee-mail-prev-btn');

    const nextButton = document.querySelector('.shopee-mail-next-btn');

    var i;

    // Nếu tham số n lớn hơn số lượng hình ảnh thì trả vế 1
    if(n > sliders.length)
      sliderIndex = 1;
    
    //  Nếu tham số n nhỏ hơn 1 thì trả vế chính độ dài của tất cả hình ảnh
    if(n < 1)
      sliderIndex = sliders.length;

      // Ẩn hình ảnh đi
    for(i = 0 ;i<sliders.length ;i++) {
      sliders[i].style.display = 'none';
    }  

    sliders[sliderIndex - 1].style.display = 'block';

    prevButton.onclick = () => {
      plusSide(-1);
    }

    nextButton.onclick = () => {
      plusSide(1);
    }

  }

}

function showNavbar() {
  const navbarBtn = document.querySelector('.header__navbar-mobile-btn');

  const navbar = document.querySelector('.header__navbar-mobile-nav');

  const navbarContainer = document.querySelector('.header__navbar-mobile-container');

  navbarBtn.onclick = () => {
    navbar.classList.add('open');
  }

  function closeNavbar() {
    navbar.classList.remove('open');
  }

  navbar.onclick = () => {
    closeNavbar();
  }

  // Ngăn chặn hành vi nổi bọt
  navbarContainer.onclick = (e) => {
    e.stopPropagation();
  }


}

showNavbar();

sliderMail();

eventSaleTime();

sliders();

notDisappearedHistoryHeader();

ModalRegister();

ModalLogin();