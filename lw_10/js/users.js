function main() {
  async function get_users() {
    const response = await fetch('get-users.php');
    if (response.ok) {
      const users = document.createElement('div');
      users.classList.add('users');
      document.body.appendChild(users)

      const json = await response.json();
      if (!json.length) {
        users.innerText = 'Пользователи не найдены';
      } else {
        json.forEach(element => {
          const user = document.createElement('div');
          user.classList.add('user');
          users.appendChild(user);

          const user_info = document.createElement('div');
          user_info.classList.add('user-info');
          user.appendChild(user_info);

          const user_img_div = document.createElement('div');
          user_img_div.classList.add('user-image');
          user_info.appendChild(user_img_div);

          const user_img = document.createElement('img');
          user_img.src = './images/user.svg';
          user_img_div.appendChild(user_img);

          const name = document.createElement('p');
          name.innerText = element.username;
          user_info.appendChild(name);

          const mail = document.createElement('p');
          mail.innerText = element.email;
          user_info.appendChild(mail);

          const profession = document.createElement('p');
          profession.innerText = element.profession;
          user_info.appendChild(profession);

          const agree = document.createElement('p');
          agree.innerText = (element.agree) ? 'Согласен получать': 'Не согласен получать';
          user_info.appendChild(agree);
        });
      }
    } else {
      console.log('bad request');
    }
  }

  const btn_get = document.getElementsByClassName('get-button')[0];
  btn_get.addEventListener('click', get_users);
  
}  

main();