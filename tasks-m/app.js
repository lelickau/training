const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {

  //1 переводим массив тасков в объект объектов:
  const objOfTask = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  //темы
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  // предыдущее состояние селектора выбора темы (для случая отмены изменения темы)
  let lastSelectedTheme =  localStorage.getItem('app_theme') || 'default';
  setTheme(lastSelectedTheme);

  //получаем чекбокс для установки темы
  const themeSelect = document.querySelector('#themeSelect');

  //получим список куда добавим фрагиент кода сразметкой
  const listContainer = document.querySelector('.tasks-list-section .list-group');

  //получаем форму
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  //2 функция вывода задачь на страницу
  const renderAllTask = (tasksList) => {
    //проверка наличия переданного списка
    if (!tasksList) {
      console.error('not list')
      return
    }
    //3 создаем фрагмент который будем выгружать на страницу
    const fragment = document.createDocumentFragment();
            //переберем объект вернув его массивом
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    })
    listContainer.appendChild(fragment);
  }

  //4 функц которая создаст элемент li
  function listItemTemplate({_id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

    li.setAttribute('data-task-id', _id);
    
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    deleteBtn.textContent = 'Delete';

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li
  }
  //5 обработка события отправки формы
  function onFormSubmit(e) {
    e.preventDefault();
    const titleVal = inputTitle.value;
    const bodyVal = inputBody.value;
    if(!titleVal || !bodyVal) {
      alert('text the message');
      return
    }
    const task = createNewTask(titleVal, bodyVal);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  //6 функ создания новой задачи и добавление ее в основной объект с задачами
  function createNewTask(title, body) {
    const newTask = {
      title, 
      body,
      completed: false,
      _id: `task-${Math.floor((Math.random())*1000000)}-${Math.floor((Math.random())*10000000)}`,
    }
    objOfTask[newTask._id] = newTask;
    return {...newTask}
  }

//7 удаление постов через делигирование (через родительский элемент)
  function onDeleteHandler({target}){
    if(target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);
    }
  }

  function deleteTask( id) {
    const {title} = objOfTask[id];
    const isConfirm = confirm(`Do you wont delete post '${title}'?`);
    if(!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }

  function deleteTaskFromHTML(confirm, el) {
    if(!confirm) return;
    el.remove();
  }

  // 8 функции для тем
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirm = confirm(`To change the theme to ${selectedTheme}`);
    if(!isConfirm) {
      themeSelect.value = lastSelectedTheme;
      return;
    };
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }

  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    })
  }

  //вызовы 
  renderAllTask(objOfTask);
  form.addEventListener('submit', onFormSubmit);
listContainer.addEventListener('click', onDeleteHandler);
themeSelect.addEventListener('change', onThemeSelectHandler);

})(tasks);
