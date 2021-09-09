function Validator(options) {

  const formElement = document.querySelector(options.form);

  // Tạo ra hàm riêng để tìm kiếm element cha

  function getParentElement(element,selector) {

    //Dùng while để tìm kiếm element cha
    while(element.parentElement) {
      // Nếu tìm thấy element cha mà trùng với tham số selector truyền vào , ta trả về element cha đó
      if(element.parentElement.matches(selector))
        return element.parentElement;

      // Nếu không tìm thấy , ta lấy element cha tiếp theo
      element = element.parentElement; 
    }

  }

  // Tạo ra hàm riêng dùng để xử lý lỗi

  function Validate(inputElement,rule) {

    var getParent = getParentElement(inputElement,options.formGroup);

    var errorSelector = getParent.querySelector(options.errorSelector);

    var errorMessage;

    var rules = ruleSelector[rule.selector];

    // Sử dụng vòng lặp để hiển thị lỗi cho chính xác
    for (let index in rules) {
      switch(inputElement.type) {
        case 'radio':
        case 'checkbox':
           errorMessage = rules[index](formElement.querySelector(rule.selector+':checked'));
           break;
        default:
          errorMessage = rules[index](inputElement.value);
      }
      if(errorMessage) break;  
    }

    // Nếu có lỗi , hiển thị lỗi
    if(errorMessage) {
      errorSelector.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${errorMessage}`;
      getParent.classList.add('invalid');
    }
    else {
      errorSelector.innerHTML = '';
      getParent.classList.remove('invalid');
    }

    return !errorMessage;

  }

  // Tạo ra biến dùng để lưu trữ các function check
  var ruleSelector = {};

  if(formElement) {

    formElement.onsubmit = (e) => {
      e.preventDefault(); //Ngăn chặn hành vi mặc định

      let isFormValid = true;

      options.rules.forEach((rule) => {

        var inputElement = formElement.querySelector(rule.selector);

        let isValid = Validate(inputElement,rule);

        if(!isValid)
          isFormValid = false;

      });

      if(isFormValid) {

      }
      else {
        const errorElement = document.querySelector(options.modalError);

        const errorCloseBtn = document.querySelector(options.modalErrorCloseBtn);

        const formContainer = document.querySelector(options.formContainer);

        var errorOverlay = document.querySelector(options.modalErrorOverlay);

        function closeError() {
          errorOverlay.classList.remove('open');
        }

        errorOverlay.onclick = () => {
          closeError();
        }

        errorElement.onclick = (e) => {
          e.stopPropagation();
        }

        errorCloseBtn.addEventListener('click',closeError);

        formContainer.classList.add('error');

        errorOverlay.classList.add('open');
      } 

      // errorOverlay.onkeypress = function() {
      //   console.log('Hello');
      // }
        
    }
    
    options.rules.forEach((rule) => {

      // Nếu biến ruleSelector mà không phải là array thì ta biến phần tử đầu tiên thành array
      // Nếu là array , thì ta thêm từng thành phần vào
      if(Array.isArray(ruleSelector[rule.selector]))
        ruleSelector[rule.selector].push(rule.check);
      else
        ruleSelector[rule.selector] = [rule.check];  

      var inputElements = formElement.querySelectorAll(rule.selector);
      // Trả về nodeLists

      // Sử dụng array.from để biến thành array
      // Duyệt qua từng thành phần input để thực thi event của người dùng

      Array.from(inputElements).forEach((inputElement) => {

        // Khi người dùng blur chuột ra ngoài , mà chưa nhập gì thì báo lỗi
        inputElement.addEventListener('blur',() => {
          Validate(inputElement,rule);
        })

        // Khi người đang điền thông tin , thì sẽ loại bỏ đi thông báo lỗi
        inputElement.addEventListener('input',() => {
          var getParent = getParentElement(inputElement,options.formGroup);
          var errorSelector = getParent.querySelector(options.errorSelector);
          errorSelector.innerHTML = '';
          getParent.classList.remove('invalid');
        })
      })
    })
  }
}

// Rules
/**
 * Khi người dùng nhập lỗi , hiển thị thông báo lỗi
 * Khi người dùng nhập đúng , hiển thị undefined
 */

Validator.isRequired = (selector,form) => {
  return {
    selector:selector,
    check:(value) => {
      switch(document.querySelector(`${form} ${selector}`).type) {
        case 'radio':
        case 'checkbox':
          return value ? undefined : 'Vui lòng đánh vào trường này';
        default:
          return value.trim() ? undefined : 'Vui lòng điền vào trường này';    
      }
    }
  }
}

Validator.isEmail = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return value.match(emailRegex) ? undefined : 'Vui lòng nhập email hợp lệ!';
    }
  }
}

Validator.isMinLengthPassword = (selector,min) => {
  return {
    selector:selector,
    check:(value) => value.length >= min ? undefined : `Vui lòng nhập mật khẩu từ ${min} kí tự trở lên`
  }
}

Validator.isConfirmedPassword = (selector,isConfirmed) => {
  return {
    selector:selector,
    check:(value) => value === isConfirmed() ? undefined : 'Mật khẩu nhập lại không đúng'
  }
}