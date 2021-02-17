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
  radioFilterling();
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
    tdStatusButton.appendChild(createStatusButton(index, todos));
    tdDeleteButton.appendChild(createDeleteButton(index,));
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
const createStatusButton = (index, todos) => {
  const statusButton = document.createElement('button');
  statusButton.textContent = todos.status;
  //状態,テキストの変更
  statusButton.addEventListener('click', () => {
    if (radioButtonAll.checked && statusButton.textContent === '作業中') {
      taskList[index].status = '完了';
      statusButton.textContent = todos.status;
    } else if (radioButtonAll.checked && statusButton.textContent === '完了') {
      taskList[index].status = '作業中';
      statusButton.textContent = todos.status;
    } 
    if (radioButtonWorking.checked && statusButton.textContent === '作業中') {
      const workTask = taskList.filter(todos => {
        return todos.status === '作業中';
      })
      workTask[index].status = '完了';
      idReset(workTask);
      radioFilterling();
    }
    if (radioButtonDone.checked && statusButton.textContent === '完了') {
      const endTask = taskList.filter(todos => {
        return todos.status === '完了';
      })
      endTask[index].status = '作業中';
      idReset(endTask);
      radioFilterling();
    }
  })
  return statusButton;
}
//削除Buttonを作成する関数
const createDeleteButton = (index,) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除'; 
  //削除Buttonクリック時の処理
  deleteButton.addEventListener('click', () => {
    taskList.splice(index, 1);
    idReset(taskList);
    //削除Buttonを押したラジオButtonの配列を作成し表示
    if (radioButtonAll.checked) {
      addShowTask(taskList);
    } else if (radioButtonWorking.checked) {
      const arrayWork = taskList.filter(todos => {
        return todos.status === '作業中';
      })
      addShowTask(arrayWork);
    } else if (radioButtonDone.checked) {
      const arrayDone = taskList.filter(todos => {
        return todos.status === '完了';
      })
      addShowTask(arrayDone);
    }
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
//オブジェクト内のidをリセット
const idReset = (result) => {
  for (let i = 0; i < result.length; i++) {
    result[i].id = i;
  }
  return;
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