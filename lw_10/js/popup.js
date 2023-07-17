function main() {  
  const btns = document.getElementsByClassName('button');
  for (let index= 0; index < btns.length; index++) {
    btns[index].addEventListener('click', onBtnClick);
  }

  document.addEventListener('keydown', function(event) { // закрытие попапа по Esc
    const key = event.key;
    if (key === "Escape") {
        onPopupClose(event);
    }
  });
  
  function onBtnClick() {
    const popup_wrap = document.createElement('div');
    popup_wrap.classList.add('popup-wrap');
    document.body.appendChild(popup_wrap);

    const popup_bckgr = document.createElement('div');
    popup_bckgr.classList.add('background');
    popup_bckgr.addEventListener('click', onPopupClose);
    popup_wrap.appendChild(popup_bckgr);

    const popup = document.createElement('div');
    popup_wrap.appendChild(popup);
    popup.classList.add('popup');
    popup.classList.add('form-section');

    const popup_main_img = document.createElement('div');
    popup_main_img.classList.add("form-section__image");
    const main_img = document.createElement('img');
    main_img.src = './images/welcome.jpg';
    popup_main_img.appendChild(main_img);
    main_img.classList.add('popup-main-img');

    popup.appendChild(popup_main_img);

    const popup_close = document.createElement('div');
    popup_close.classList.add('popup-close');

    popup.appendChild(popup_close);
    
    const img = document.createElement('img');
    img.src = './images/close.svg';
    popup_close.appendChild(img);
    popup_close.addEventListener('click', onPopupClose);

    const popup_text = document.createElement('p');
    popup_text.classList.add('form-section__text');
    popup_text.textContent = 'Записаться на курс';
    
    popup.appendChild(popup_text);

    const form = document.createElement('form');
    form.classList.add('form-section__form');
    
    const username = document.createElement('input');
    username.setAttribute('id', 'username');
    username.setAttribute('type', 'text');
    username.setAttribute('name', 'username');
    username.setAttribute('placeholder', 'Ваше имя');
    if (enteredName) {
      username.value = enteredName;
      username.classList.add('choosed');
    } else {
      enteredName = null;
    };
    username.classList.add('form__input');
    form.appendChild(username);

    const email = document.createElement('input');
    email.setAttribute('id', 'email');
    email.setAttribute('type', 'email');
    email.setAttribute('name', 'email');
    email.setAttribute('placeholder', 'Email');
    if (enteredEmail) {
      email.value = enteredEmail;
      email.classList.add('choosed');
    } else {
      enteredEmail = null;
    };
    email.classList.add('form__input');
    form.appendChild(email);

    const profession = document.createElement('div');
    profession.setAttribute('id', 'profession');
    profession.classList.add('form__input');
    
    const profession_text = document.createElement('p');
    profession.appendChild(profession_text);

    if (choosedProfession === null) {
      profession_text.innerText = 'Деятельность';
    } else {
      profession_text.innerText = choosedProfession;
      profession.classList.add('choosed');
    }
    profession.addEventListener('click', selectOpen);
    form.appendChild(profession);

    const selector = document.createElement('div');
    selector.classList.add('selected');
    selector.classList.add('form__input');
    profession.appendChild(selector);

    let professions = ['Программист', 'Дизайнер', 'Маркетолог'];
    professions.forEach((element) => {
      let opt = document.createElement('div');
      opt.classList.add('form__input');
      opt.classList.add('select__option');
      opt.innerText = element;
      opt.addEventListener('click', selectOption);
      selector.appendChild(opt);
    });
    
    const arrow_img = document.createElement('img');
    profession.appendChild(arrow_img);
    arrow_img.src = './images/arrow.svg';
    arrow_img.classList.add('arrow');
    
    const checkbox_wrap = document.createElement('div');
    checkbox_wrap.classList.add('form__checkbox-block');

    const checkbox_btn = document.createElement('input');
    checkbox_btn.setAttribute('type', 'checkbox');
    checkbox_btn.setAttribute('name', 'checkbox-agree');
    checkbox_btn.setAttribute('id', 'checkbox-agree');
    checkbox_btn.classList.add('form__checkbox-button');

    checkbox_wrap.appendChild(checkbox_btn);

    const checkbox_label = document.createElement('label');
    checkbox_label.setAttribute('for', 'checkbox-agree');
    checkbox_label.htmlFor = 'checkbox-agree';
    checkbox_label.classList.add('form__checkbox-text');
    checkbox_label.textContent = 'Согласен получать информационные материалы о старте курса';

    checkbox_wrap.appendChild(checkbox_label);

    form.appendChild(checkbox_wrap);

    const popup_btn = document.createElement('div');
    popup_btn.innerText = 'Записаться на курс';
    popup_btn.classList.add('form__input');
    popup_btn.classList.add('form__button');
    popup_btn.addEventListener('click', formHandler);

    form.appendChild(popup_btn);

    popup.appendChild(form);

    document.body.classList.add('scroll_lock');
    popup_bckgr.classList.add('background_active');

    const footer = document.getElementById('footer');
    footer.classList.add('footer_changed');
    footer.addEventListener('transitionend', () => {
      popup.classList.add('popup_active');
      footer.classList.remove('footer_changed');
    })

    function selectOpen()
    {
      profession.classList.remove('empty-input');
      selector.classList.toggle('selected_on');
      popup.addEventListener('click', selectClose, {once: true});
      profession.addEventListener('click', selectClose, {once: true});
      selector.addEventListener('click', selectClose, {once: true});
      event.stopPropagation();
    }

    function selectClose()
    {
      console.log('close select');
      selector.classList.toggle('selected_on');
      popup.removeEventListener('click', selectClose);
      profession.removeEventListener('click', selectClose);
      selector.removeEventListener('click', selectOpen);
      event.stopPropagation();
    }

    function selectOption()
    {
      profession.addEventListener('click', selectClose, {once: true});
      selector.addEventListener('click', selectClose, {once: true});
      popup.removeEventListener('click', selectClose);
      if (this.innerText !== 'Деятельность') {
        profession.classList.add('choosed');
        choosedProfession = this.innerText;
        profession_text.innerText = choosedProfession;
      };
    }

    username.addEventListener('input', () => {
      username.classList.remove('error');
      username.classList.remove('empty-input');
      if (username.value.match(/([^a-zA-Zа-яА-Я0-9_]+)|(\d+)/) !== null) {
        enteredName = null;
      } else {
        enteredName = username.value;
      }
    });
    
    email.addEventListener('input', () => {
      email.classList.remove('error');
      email.classList.remove('empty-input');
      if (email.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) === null) {
        enteredEmail = null;
      } else {
        enteredEmail = email.value;
      }
    });
    function formHandler() {
      // // для теста ==============================
      // enteredName = 'michael';
      // enteredEmail = 'mail@mail.ru';
      // choosedProfession = 'prof';
      // // для теста ==============================
      if (checkbox_btn.checked) {console.log('checked')};
      console.log(enteredName, ' ', enteredEmail, ' ', choosedProfession);
      if (!enteredName || !enteredEmail || !choosedProfession) {
        if (!enteredName) {
          if (username.value) {
            username.classList.add('error');
          } else {
            username.classList.add('empty-input');
          }
        };

        if (!enteredEmail) {
          if (email.value) {
            email.classList.add('error');
          } else {
            email.classList.add('empty-input');
          }
        };

        if (!choosedProfession) {
          profession.classList.add('empty-input');
        };

      } else {
        const arr = {
          'username': enteredName,
          'email': enteredEmail,
          'profession': choosedProfession,
          'agree': checkbox_btn.checked? true: false
        }
        sendResp();
        async function sendResp() {
          const response = await fetch('http://localhost:8080/form.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Accept': 'application/json'
            },
            body: JSON.stringify(arr) 
          });
          if (response.ok) {
            const json = await response.json();
            console.log('ok, ', json);

            enteredName = null;
            enteredEmail= null;
            choosedProfession = null;

            onPopupClose();
          } else {
            console.log('not ok');
            popup.classList.add('error-message');
            popup.innerText = 'Упс... Произошла ошибка!'
          }
        }

      }
    }
  }
  
  function onPopupClose() {
    const popup_wrap = document.getElementsByClassName('popup-wrap')[0];
    const popup = document.getElementsByClassName('popup')[0];
    const popup_active = document.getElementsByClassName('popup_active')[0];
    const popup_bckgr = document.getElementsByClassName('background')[0];
    popup.classList.remove('popup_active');
    popup_active.addEventListener('transitionend', () => {
        popup_bckgr.classList.remove('background_active');
        document.body.removeChild(popup_wrap);
        document.body.classList.remove('scroll_lock');
      }, {once: true});
  }
}

let enteredName;
let enteredEmail
let choosedProfession = document.getElementById('profession');
let checked;

main();