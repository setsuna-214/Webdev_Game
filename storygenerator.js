let isCtrlPressed = false;

document.addEventListener('keydown', event => {
  if (event.ctrlKey) {
    isCtrlPressed = true;
  }
});

document.addEventListener('keyup', event => {
  if (event.ctrlKey) {
    isCtrlPressed = false;
  }
});

const storyURL = 'storyline(en)_one.txt';
// 获取#story-container元素
const storyContainer = document.getElementById('newstory-container');
const options = []


function generateTextwithOptions(filename, optiontext, optioncallback) {
    return new Promise((resolve) => {
      let optionsContainer = document.querySelector('#options-container');
      if (!optionsContainer) {
        optionsContainer = document.createElement('div');
        optionsContainer.id = 'options-container';
        storyContainer.appendChild(optionsContainer);
      }
      
      const option = document.createElement('button');
      option.textContent = optiontext;
      option.id = 'option';
      optionsContainer.appendChild(option); // 将选项添加到选项容器中
    
      console.log('option added');
    //   const hideAllOptions = () => {
    //     const options = optionsContainer.querySelectorAll('button');
    //     // options.forEach((opt) => (opt.style.display = 'none'));
    //   };
      option.addEventListener('click', async () => {
        // 隐藏选项按钮
        // hideAllOptions();
  
        // 显示文本
        const decisionText = document.createElement('p');
        decisionText.textContent = "You've made your decision";
        storyContainer.appendChild(decisionText);
        storyContainer.innerHTML += '<br>';
  
        const response = await fetch(filename);
        const text = await response.text();
  
        const lineArray = text.split('\n');
        for ( let i = 0; i < lineArray.length; i++) {
          // 等待用户点击后再逐行显示
          await new Promise(resolve => {
            document.addEventListener('click', () => resolve(), { once: true });
          });
          // 逐个字符地显示当前行的文本
          const lineText = lineArray[i];
          for (let j = 0; j < lineText.length; j++) {
            await new Promise(resolve => setTimeout(resolve, 0.01));
            storyContainer.innerHTML += lineText[j];
            storyContainer.scrollTop = storyContainer.scrollHeight;
          }
          // 显示当前行的结尾符号和换行符
          storyContainer.innerHTML += '<br>';
          storyContainer.scrollTop = storyContainer.scrollHeight;
        }
        optioncallback();
        resolve();
      });
    });
  }
  

// 使用fetch函数异步获取文本文件内容
async function getText() {
  const response = await fetch(storyURL);
  const text = await response.text();
  return text;
}

// 等待文本文件内容获取完成后逐行显示
async function displayText() {
  const text = await getText();
  const lineArray = text.split('\n');
  for (let i = 0; i < lineArray.length; i++) {
    // 等待用户点击后再逐行显示
    await new Promise(resolve => {
      document.addEventListener('click', () => resolve(), { once: true });
    });

    //逐个字符地显示当前行的文本
    const lineText = lineArray[i];
    for (let j = 0; j < lineText.length; j++) {
      const delay  = isCtrlPressed ? 0.01 : 30;
      await new Promise(resolve => setTimeout(resolve, delay));
      storyContainer.innerHTML += lineText[j];
      storyContainer.scrollTop = storyContainer.scrollHeight;
    }

    // 显示当前行的结尾符号和换行符
    storyContainer.innerHTML += '<br>';
    storyContainer.scrollTop = storyContainer.scrollHeight;
  }
}

// 调用displayText函数开始逐行显示文本
let lastChosenOption = null;

displayText().then(async() => {
  await Promise.all([
    generateTextwithOptions('rest_op1.txt', 'Desperately break free', () => {
      lastChosenOption = 'Desperately break free';
      console.log('op1Clicked');
    }),
    generateTextwithOptions('rest_op2.txt', 'Cooperate first', () => {
      lastChosenOption = 'Cooperate first';
      console.log('op2Clicked');
    })
  ]);
}).then(async() => {
  if (lastChosenOption === 'Cooperate first') {
    await Promise.all([
      generateTextwithOptions('rest_runout_op1.txt', 'Rush to your room', () => {
        lastChosenOption = 'Rush to your room';
        console.log('op2_1Clicked');
      }),
      generateTextwithOptions('rest_runout_op2.txt', 'Rush to car', () => {
        lastChosenOption = 'Rush to car';
        console.log('op2_2Clicked');
      }),
      generateTextwithOptions('rest_runout_op3.txt', 'Take another look calmly', () => {
        lastChosenOption = 'Take another look calmly';
        console.log('op2_3Clicked');
      })
    ]);
  }   
});

