//交互1：使用户点击按钮触发不同的事件
//   1.1：事件1，生成一些接下来的故事情节                           
//   1.2：事件2，将这个选项记入数据库，并显示在右侧的选项栏中

//交互2：有限制并且有引导地允许用户在输入框中输入一些文字
//   2.1：事件1，将这个选项记入数据库，并显示在右侧的选项栏中

//交互3：允许用户使用Ctrl键加速文本生成。

//互动效果1：一些看似紧急的选项加入倒计时元素
//互动效果2：一些紧急的选项加入bgm(暂定Too late - The Weeknd)
//互动效果3：一些紧急的选项加入震动/闪烁效果
//互动效果4（optional）：故事中可能会有一两个伏笔，在面临个别选项时，可能会需要用户进行一些推理才能正确地推进故事，但是允许用户使用一次提示机会，用完就没有了。这个提示叫做“本能”。

//节目效果1：进入页面时会有一个非常简短的故事，不会生硬地介绍主人公的背景，而是用一些有意义的语句来铺垫整个故事的氛围。
//节目效果2：在玩家达成所有的结局时（除了true end）给出一些标志性的效果，并且弹出右侧的选项栏好让用户知道在这个故事中还有什么结局是他们可以达成的。
//节目效果3：在玩家达成最终的结局时，进入片尾动画，给出staff样式的滚动名单，并且配有bgm（暂定Hardest to love - The Weeknd）



const storyURL = '/static/storyline(en)_one.txt';
// 获取#story-container元素
const storyContainer = document.getElementById('story-container');

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

  const option1 = document.createElement('button');
  option1.textContent = 'Desperately break free';
  option1.id = 'option1';

  option1.addEventListener('click', async () => {
    const response = await fetch('/static/rest_op1.txt');
    const text = await response.text();
    const lineArray = text.split('\n');

    // 将按钮元素设置为不可见
    option1.style.display = 'none';
    option2.style.display = 'none';

    // 显示文本
    const decisionText = document.createElement('div');
    decisionText.textContent = "You've made your decision";
    storyContainer.appendChild(decisionText);
    storyContainer.innerHTML += '<br>';

    for (let i = 0; i < lineArray.length; i++) {
      // 等待用户点击后再逐行显示
      await new Promise(resolve => {
        document.addEventListener('click', () => resolve(), { once: true });
      });
  
      // 逐个字符地显示当前行的文本
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
  });

  
//-----------------------------------------------------------------------------------option1 ends here
  const option2 = document.createElement('button');
  option2.textContent = 'Cooperate first';
  option2.id = 'option2';

  option2.addEventListener('click', async () => {
    const response = await fetch('/static/rest_op2.txt');
    const text = await response.text();
    const lineArray = text.split('\n');

    // 将按钮元素设置为不可见
    option1.style.display = 'none';
    option2.style.display = 'none';

    // 显示文本
    const decisionText = document.createElement('div');
    decisionText.textContent = "You've made your decision";
    storyContainer.appendChild(decisionText);
    storyContainer.innerHTML += '<br>';

    for (let i = 0; i < lineArray.length; i++) {
      // 等待用户点击后再逐行显示
      await new Promise(resolve => {
        document.addEventListener('click', () => resolve(), { once: true });
      });
  
      // 逐个字符地显示当前行的文本
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
//---------------------------------------------------------------------------------option2 ends here
      // option2文本生成完毕后创建新的选项
      
      const ro_op1 = document.createElement('button');
      ro_op1.textContent = 'Rush to your room';
      ro_op1.id = 'runout_op1';

      ro_op1.addEventListener('click', async () => {
        const response = await fetch('/static/rest_runout_op1.txt');
        const text = await response.text();
        const lineArray = text.split('\n');

        // 将按钮元素设置为不可见
        ro_op1.style.display = 'none';
        ro_op2.style.display = 'none';

        // 显示文本
        const decisionText = document.createElement('div');
        decisionText.textContent = "You've made your decision";
        storyContainer.appendChild(decisionText);
        storyContainer.innerHTML += '<br>';
        for (let i = 0; i < lineArray.length; i++) {
          // 等待用户点击后再逐行显示
          await new Promise(resolve => {
            document.addEventListener('click', () => resolve(), { once: true });
          });
      
          // 逐个字符地显示当前行的文本
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
      });

      const ro_op2 = document.createElement('button');
      ro_op2.textContent = 'Rush to car';
      ro_op2.id = 'runout_op2';
      
      ro_op2.addEventListener('click', async () => {
        const response = await fetch('/static/rest_runout_op2.txt');
        const text = await response.text();
        const lineArray = text.split('\n');

        // 将按钮元素设置为不可见
        ro_op1.style.display = 'none';
        ro_op2.style.display = 'none';

        // 显示文本
        const decisionText = document.createElement('div');
        decisionText.textContent = "You've made your decision";
        storyContainer.appendChild(decisionText);
        storyContainer.innerHTML += '<br>';
        for (let i = 0; i < lineArray.length; i++) {
          // 等待用户点击后再逐行显示
          await new Promise(resolve => {
            document.addEventListener('click', () => resolve(), { once: true });
          });
      
          // 逐个字符地显示当前行的文本
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
        
        const new_op1 = document.createElement('button');
        new_op1.textContent = 'Rush to your room';
        new_op1.id = 'new_op1';

        new_op1.addEventListener('click', async () => {
        const response = await fetch('/static/rest_runout_op1.txt');
        const text = await response.text();
        const lineArray = text.split('\n');

        // 将按钮元素设置为不可见
        new_op1.style.display = 'none';
        new_op3.style.display = 'none';

        // 显示文本
        const decisionText = document.createElement('div');
        decisionText.textContent = "You've made your decision";
        storyContainer.appendChild(decisionText);
        storyContainer.innerHTML += '<br>';
        for (let i = 0; i < lineArray.length; i++) {
          // 等待用户点击后再逐行显示
          await new Promise(resolve => {
            document.addEventListener('click', () => resolve(), { once: true });
          });
      
          // 逐个字符地显示当前行的文本
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
      });
// ---------------------------------------------------------------------------------ro_op2 ends here
        const new_op3 = document.createElement('button');
        new_op3.textContent = 'Take another look calmly';
        new_op3.id = 'new_op3';

        new_op3.addEventListener('click', async () => {
        const response = await fetch('/static/rest_runout_op3.txt');
        const text = await response.text();
        const lineArray = text.split('\n');

        // 将按钮元素设置为不可见
        new_op1.style.display = 'none';
        new_op3.style.display = 'none';

        // 显示文本
        const decisionText = document.createElement('div');
        decisionText.textContent = "You've made your decision";
        storyContainer.appendChild(decisionText);
        storyContainer.innerHTML += '<br>';
        for (let i = 0; i < lineArray.length; i++) {
          // 等待用户点击后再逐行显示
          await new Promise(resolve => {
            document.addEventListener('click', () => resolve(), { once: true });
          });
      
          // 逐个字符地显示当前行的文本
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

      // for the inputbox
          const inputText = document.createElement('div');
          storyContainer.appendChild(inputText);

          //添加一个输入框
          const inputBox = document.createElement('input');
          inputBox.type = 'text';
          inputBox.id = 'inputBox';

          inputBox.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
              const input = event.target.value;
              if (input.toLowerCase() === 'take off shoes') { // 如果输入正确
                // inputBox.addEventListener('click', async () => {
                const response = await fetch('/static/rest_runout_input_true.txt');
                const text = await response.text();
                const lineArray = text.split('\n');

                // 将按钮元素设置为不可见
                inputBox.style.display = 'none';

                storyContainer.innerHTML += '<br>';
                for (let i = 0; i < lineArray.length; i++) {
                  // 等待用户点击后再逐行显示
                  await new Promise(resolve => {
                    document.addEventListener('click', () => resolve(), { once: true });
                  });
              
                  // 逐个字符地显示当前行的文本
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

                const stage2_op1 = document.createElement('button');
                stage2_op1.textContent = 'Ignore and go ahead';
                stage2_op1.id = 'stage2_op1';

                stage2_op1.addEventListener('click', async () => {
                const response = await fetch('/static/rest_runout_stage2_op1.txt');
                const text = await response.text();
                const lineArray = text.split('\n');

                // 将按钮元素设置为不可见
                stage2_op1.style.display = 'none';
                stage2_op2.style.display = 'none';

                // 显示文本
                const decisionText = document.createElement('div');
                decisionText.textContent = "You've made your decision";
                storyContainer.appendChild(decisionText);
                storyContainer.innerHTML += '<br>';
                for (let i = 0; i < lineArray.length; i++) {
                  // 等待用户点击后再逐行显示
                  await new Promise(resolve => {
                    document.addEventListener('click', () => resolve(), { once: true });
                  });
              
                  // 逐个字符地显示当前行的文本
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

                const stage2_op1_be1 = document.createElement('button');
                stage2_op1_be1.textContent = 'Go east by instinct';
                stage2_op1_be1.id = 'stage2_op1_be1';

                stage2_op1_be1.addEventListener('click', async () => {
                const response = await fetch('/static/rest_runout_stage2_op1_be.txt');
                const text = await response.text();
                const lineArray = text.split('\n');

                // 将按钮元素设置为不可见
                stage2_op1_be1.style.display = 'none';
                stage2_op1_be2.style.display = 'none';

                // 显示文本
                const decisionText = document.createElement('div');
                decisionText.textContent = "You've made your decision";
                storyContainer.appendChild(decisionText);
                storyContainer.innerHTML += '<br>';
                for (let i = 0; i < lineArray.length; i++) {
                  // 等待用户点击后再逐行显示
                  await new Promise(resolve => {
                    document.addEventListener('click', () => resolve(), { once: true });
                  });
              
                  // 逐个字符地显示当前行的文本
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
              });
                
                const stage2_op1_be2 = document.createElement('button');
                stage2_op1_be2.textContent = '?';
                stage2_op1_be2.id = 'stage2_op1_be2';
                storyContainer.appendChild(stage2_op1_be1);
                storyContainer.appendChild(stage2_op1_be2);
              });
                

                const stage2_op2 = document.createElement('button');
                stage2_op2.textContent = 'Pick up the paper';
                stage2_op2.id = 'stage2_op2';

                stage2_op2.addEventListener('click', async () => {
                const response = await fetch('/static/rest_runout_stage2_op2.txt');
                const text = await response.text();
                const lineArray = text.split('\n');

                // 将按钮元素设置为不可见
                stage2_op1.style.display = 'none';
                stage2_op2.style.display = 'none';

                // 显示文本
                const decisionText = document.createElement('div');
                decisionText.textContent = "You've made your decision";
                storyContainer.appendChild(decisionText);
                storyContainer.innerHTML += '<br>';
                for (let i = 0; i < lineArray.length; i++) {
                  // 等待用户点击后再逐行显示
                  await new Promise(resolve => {
                    document.addEventListener('click', () => resolve(), { once: true });
                  });
              
                  // 逐个字符地显示当前行的文本
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

                const stage2_con_be = document.createElement('button');
                stage2_con_be.textContent = 'Go east by instinct';
                stage2_con_be.id = 'stage2_stage2_con_be';

                stage2_con_be.addEventListener('click', async () => {
                const response = await fetch('/static/rest_runout_stage2_op1_be.txt');
                const text = await response.text();
                const lineArray = text.split('\n');

                // 将按钮元素设置为不可见
                stage2_con_be.style.display = 'none';
                stage2_con_ge.style.display = 'none';

                // 显示文本
                const decisionText = document.createElement('div');
                decisionText.textContent = "You've made your decision";
                storyContainer.appendChild(decisionText);
                storyContainer.innerHTML += '<br>';
                for (let i = 0; i < lineArray.length; i++) {
                  // 等待用户点击后再逐行显示
                  await new Promise(resolve => {
                    document.addEventListener('click', () => resolve(), { once: true });
                  });
              
                  // 逐个字符地显示当前行的文本
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
              });

              const stage2_con_ge = document.createElement('button');
              stage2_con_ge.textContent = 'Take out the paper and read it';
              stage2_con_ge.id = 'stage2_con_ge';

              stage2_con_ge.addEventListener('click', async () => {
              const response = await fetch('/static/rest_runout_stage2_op2_continue.txt');
              const text = await response.text();
              const lineArray = text.split('\n');

              // 将按钮元素设置为不可见
              stage2_con_be.style.display = 'none';
              stage2_con_ge.style.display = 'none';

              // 显示文本
              const decisionText = document.createElement('div');
              decisionText.textContent = "You've made your decision";
              storyContainer.appendChild(decisionText);
              storyContainer.innerHTML += '<br>';
              for (let i = 0; i < lineArray.length; i++) {
                // 等待用户点击后再逐行显示
                await new Promise(resolve => {
                  document.addEventListener('click', () => resolve(), { once: true });
                });
            
                // 逐个字符地显示当前行的文本
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

                // for the inputbox
                const inputText_2 = document.createElement('div');
                storyContainer.appendChild(inputText_2);

                //添加一个输入框
                const inputBox_2 = document.createElement('input');
                inputBox_2.type = 'text';
                inputBox_2.id = 'inputBox_2';

                inputBox_2.addEventListener('keydown', async (event) => {
                  if (event.key === 'Enter') {
                    const input = event.target.value;
                    if (input === 'KDO1773') { // 如果输入正确
                      // inputBox.addEventListener('click', async () => {
                      const response = await fetch('/static/bus_input_true.txt');
                      const text = await response.text();
                      const lineArray = text.split('\n');

                      // 将按钮元素设置为不可见
                      inputBox_2.style.display = 'none';

                      storyContainer.innerHTML += '<br>';
                      for (let i = 0; i < lineArray.length; i++) {
                        // 等待用户点击后再逐行显示
                        await new Promise(resolve => {
                          document.addEventListener('click', () => resolve(), { once: true });
                        });
                    
                        // 逐个字符地显示当前行的文本
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
                      const final_op1 = document.createElement('button');
                      final_op1.textContent = '\"Relax, Sia, you can do it. Just like before.\"';
                      final_op1.id = 'final_op1';

                      final_op1.addEventListener('click', async () => {
                      const response = await fetch('/static/flight_end_allops.txt');
                      const text = await response.text();
                      const lineArray = text.split('\n');

                      // 将按钮元素设置为不可见
                      final_op1.style.display = 'none';
                      final_op2.style.display = 'none';
                      final_op3.style.display = 'none';

                      // 显示文本
                      const decisionText = document.createElement('div');
                      decisionText.textContent = "You've made your decision";
                      storyContainer.appendChild(decisionText);
                      storyContainer.innerHTML += '<br>';
                      for (let i = 0; i < lineArray.length; i++) {
                        // 等待用户点击后再逐行显示
                        await new Promise(resolve => {
                          document.addEventListener('click', () => resolve(), { once: true });
                        });
                    
                        // 逐个字符地显示当前行的文本
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
                      });

                      const final_op2 = document.createElement('button');
                      final_op2.textContent = '\"You\'re not alone, Sia. Life isn\'t that bad.\"';
                      final_op2.id = 'final_op2';

                      final_op2.addEventListener('click', async () => {
                      const response = await fetch('/static/flight_end_allops.txt');
                      const text = await response.text();
                      const lineArray = text.split('\n');

                      // 将按钮元素设置为不可见
                      final_op1.style.display = 'none';
                      final_op2.style.display = 'none';
                      final_op3.style.display = 'none';

                      // 显示文本
                      const decisionText = document.createElement('div');
                      decisionText.textContent = "You've made your decision";
                      storyContainer.appendChild(decisionText);
                      storyContainer.innerHTML += '<br>';
                      for (let i = 0; i < lineArray.length; i++) {
                        // 等待用户点击后再逐行显示
                        await new Promise(resolve => {
                          document.addEventListener('click', () => resolve(), { once: true });
                        });
                    
                        // 逐个字符地显示当前行的文本
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
                      });

                      const final_op3 = document.createElement('button');
                      final_op3.textContent = '"Don\'t care what other people think, live your own life."';
                      final_op3.id = 'final_op1';

                      final_op3.addEventListener('click', async () => {
                      const response = await fetch('/static/flight_end_allops.txt');
                      const text = await response.text();
                      const lineArray = text.split('\n');

                      // 将按钮元素设置为不可见
                      final_op1.style.display = 'none';
                      final_op2.style.display = 'none';
                      final_op3.style.display = 'none';

                      // 显示文本
                      const decisionText = document.createElement('div');
                      decisionText.textContent = "You've made your decision";
                      storyContainer.appendChild(decisionText);
                      storyContainer.innerHTML += '<br>';
                      for (let i = 0; i < lineArray.length; i++) {
                        // 等待用户点击后再逐行显示
                        await new Promise(resolve => {
                          document.addEventListener('click', () => resolve(), { once: true });
                        });
                    
                        // 逐个字符地显示当前行的文本
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
                      });
                      storyContainer.appendChild(final_op1);
                      storyContainer.appendChild(final_op2);
                      storyContainer.appendChild(final_op3);
                    } else {
                      inputBox_2.value = ''; // 清空输入框
                    }
                  }
                });
                storyContainer.appendChild(inputBox_2);
              });
              storyContainer.appendChild(stage2_con_be);
              storyContainer.appendChild(stage2_con_ge);
              });
            storyContainer.appendChild(stage2_op1);
            storyContainer.appendChild(stage2_op2);
              // });
            } 
              else {
                inputBox.value = ''; // 清空输入框
               }
      }
    });
        storyContainer.appendChild(inputBox);    
    });
        storyContainer.appendChild(new_op1);
        storyContainer.appendChild(new_op3);
      });
// --------------------------------------------------------------------------------- ends here
      storyContainer.appendChild(ro_op1);
      storyContainer.appendChild(ro_op2);
  });
  // 将按钮元素添加到页面
  storyContainer.appendChild(option1);
  storyContainer.appendChild(option2);
}

// 调用displayText函数开始逐行显示文本
displayText();
