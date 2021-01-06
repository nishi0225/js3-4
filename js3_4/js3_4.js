'use strict'
//入力値,追加Button,表示場所を取得
const input = document.getElementById('inputValue');
const addTaskButton = document.getElementById('addTaskButton');
const addTaskTarget = document.getElementById('addTaskTarget');
//ラジオButtonを取得
const radioButtonAll = document.getElementById('All');
const radioButtonWorking = document.getElementById('Working');
const radioButtonDone = document.getElementById('Done');

//入力値を格納する配列を作成
const taskList = [];
//追加Buttonクリック時の処理
addTaskButton.addEventListener('click', () => {
  const todos = {
    id: taskList.length,
    task: input.value,
    status: '作業中',
  }
  taskList.push(todos);
  addShowTask(taskList);
})

//入力されたtaskを追加し表示する関数
const addShowTask = (taskList) => {
  //表示箇所を初期化
  addTaskTarget.textContent = '';

  //オブジェクトに追加されたtask,idを順に表示
  taskList.forEach((todos, index) => {
    //taskを追加する行を作成
    const newTr = document.createElement('tr');
    addTaskTarget.appendChild(newTr);
    //tr要素へ追加するtdを作成
    const tdTaskElement = document.createElement('td');
    const tdIdElement = document.createElement('td');
    const tdStatusButton = document.createElement('td');
    const tdDeleteButton = document.createElement('td');

    //id.taskを作成
    tdIdElement.textContent = index;
    tdTaskElement.textContent = todos.task;
    //td要素へButtonを追加
    tdStatusButton.appendChild(createStatusButton(newTr, todos));
    tdDeleteButton.appendChild(createDeleteButton(index));
    //td要素をtr要素へ追加
    addTaskTarget.appendChild(tdIdElement);
    addTaskTarget.appendChild(tdTaskElement);
    addTaskTarget.appendChild(tdStatusButton);
    addTaskTarget.appendChild(tdDeleteButton);

    input.value = '';
    input.focus();
  });
}
//状態Buttonを作成する関数
const createStatusButton = (newTr, todos) => {
  const statusButton = document.createElement('button');
  statusButton.textContent = todos.status;
  //状態,テキストの変更
  statusButton.addEventListener('click', () => {
    //行番号を取得
    const tr = newTr.rowIndex;
    if (statusButton.textContent === '作業中') {
      taskList[tr].status = '完了';
      statusButton.textContent = todos.status;
    } else if (statusButton.textContent === '完了') {
      taskList[tr].status = '作業中';
      statusButton.textContent = todos.status;
    }
  })
  return statusButton;
}
//削除Buttonを作成する関数
const createDeleteButton = (index) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除'; 

  deleteButton.addEventListener('click', () => {
    taskList.splice(index, 1);
    for (let i = index; i < taskList.length; i++) {
      taskList[i].id = i;
    }
    addShowTask(taskList);
  })
  return deleteButton;
}
//ラジオButton押した際の表示切替
const radioFilterling = () => {
  if (radioButtonAll.checked) {
    return addShowTask(taskList);
  };
  if (radioButtonWorking.checked) {
    const workingTask = taskList.filter(todos => {
      return todos.status === '作業中';
    })
    return addShowTask(workingTask);
  };
  if (radioButtonDone.checked) {
    const doneTask = taskList.filter(todos => {
      return todos.status === '完了';
    })
    return addShowTask(doneTask);
  };
}

//ラジオButtonクリック時
radioButtonAll.addEventListener('click', () => {
  radioFilterling();
});
radioButtonWorking.addEventListener('click', () => {
  radioFilterling();
});
radioButtonDone.addEventListener('click', () => {
  radioFilterling();
});





