function Validator2(options) {

  const formElement = document.querySelectorAll(options.form)[1];

  function Validate2(inputElement,rule) {

    // Lấy ra element cha
    function getParentElement(element,select) {
      // Duyệt từng phần tử mà có element cha 
      while(element.parentElement) {

        // Nếu mà tìm thấy element cha mà tham số select truyền vào , trả về element cha đó
        if(element.parentElement.matches(select))
          return element.parentElement;

        //Nếu không tìm thấy , ta gắn element cha vào element mới và tiếp tục tìm
        
        element = element.parentElement;
      } 
    }

    var getParent = getParentElement(inputElement,options.formGroup);

    var errorSelector = getParent.querySelector(options.errorSelector);

    var errorMessage;

    var rules = ruleSelector[rule.selector];

    console.log(errorSelector);

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

    if(errorMessage) {
      errorSelector.innerText = errorMessage;
      getParent.classList.add('invalid');
    }
    else {
      errorSelector.innerText = '';
      getParent.classList.remove('invalid');
    }
    // Nếu mà không có lỗi , trả về false
    return !errorMessage;

  }
  // Tạo ra object rỗng dùng để lưu trữ các rules
  var ruleSelector = {};

  if(formElement) {


    formElement.onsubmit = (e) => {
      e.preventDefault(); //Ngăn chặn hành vi mặc định

      let isFormValid = false;

      options.rules.forEach((rule) => {

        var inputElement = document.querySelector(rule.selector);

        let isValid = Validate2(inputElement,rule);

        if(isValid)
          isFormValid = true

      })

      if(isFormValid) {

      }
      else {

        const errorOverlay = document.querySelectorAll(options.errorOverlay)[1];

        const formContainer = document.querySelectorAll(options.formContainer)[1];

        const errorCloseBtn = document.querySelectorAll(options.errorClose)[1];

        const modalError = document.querySelectorAll(options.modalError)[2];

        function closeFormLogin() {
          formContainer.classList.remove('error');
        }

        console.log(modalError);

        errorCloseBtn.onclick = () => {
          closeFormLogin();
        }

        errorOverlay.onclick = () => {
           closeFormLogin(); 
        }

        modalError.onclick = (e) => {
          e.stopPropagation();
        }

        formContainer.classList.add('error');

        errorOverlay.classList.add('open');

      }
      
    }

    options.rules.forEach((rule) => {

      if(Array.isArray(ruleSelector[rule.selector]))
        ruleSelector[rule.selector].push(rule.check);
      else
        ruleSelector[rule.selector] = [rule.check];  

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach((inputElement) => {

        // Khi người dùng chưa nhập gì mà blur chuột ra ngoài , thông báo lỗi
        inputElement.onblur = () => {
          Validate2(inputElement,rule);
        }

        // Khi người dùng đang nhập thông tin , không hiển thị thông báo lỗi
        inputElement.addEventListener('input',() => {
          var getParent = getParentElement(inputElement,options.formGroup);
          var errorSelector = getParent.querySelector(options.errorSelector);
          errorSelector.innerText = '';
          getParent.classList.remove('invalid');
        })

      })
    })
  }
}

// Rules

Validator2.isRequired = (selector,form) => {
  return {
    selector:selector,
    check:(value) => {
      switch(document.querySelector(`${form} ${selector}`).type) {
        case "radio":
        case "checkbox":
          return value ? undefined : 'Vui lòng đánh vào chỗ này!';
        default:
          return value.trim() ? undefined : 'Vui lòng điền vào chỗ này!';    
      }
    }
  }
}

Validator2.isEmail = (selector) => {
  return {
    selector:selector,
    check:(value) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return value.match(emailRegex) ? undefined : 'Vui lòng nhập email hợp lệ!';
    }
  }
}