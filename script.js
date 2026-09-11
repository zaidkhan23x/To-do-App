 
        let time= new Date().toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' });
         document.getElementById("time").textContent=time;

         const btn = document.getElementById("darkModeBtn");

          btn.addEventListener("click", () => {
         document.body.classList.toggle("dark-mode");
         localStorage.setItem('theme', document.body.classList.contains("dark-mode") ? 'dark' : 'light');
        });
        if(localStorage.getItem('theme') === 'dark')
          document.body.classList.add('dark-mode');
         //Global variable
         const tasks_container = document.getElementById("tasks-container");
         let isFirstTime = true; //flag define
        const input_form = document.querySelector("#input-form");
        const inputdata = document.getElementById("input-value");
        let datalist = JSON.parse(localStorage.getItem('details')) || []; 
        const workOption = document.querySelector('.workOption');
        const priorityOption = document.querySelector('.priorityOption');
        const dueDate = document.querySelector('.dueDate');

        //start event listener
        input_form.addEventListener("submit",function (evt){
            evt.preventDefault();
         datalist.push({
          text: inputdata.value,
          workOption: workOption.value,
          priorityOption: priorityOption.value,
          completed: false,
          dueDate: dueDate || null,
          CreatedAt: Date.now()
         });
         localStorage.setItem("details",JSON.stringify(datalist)); //data key saved as details name
         tasks_container.textContent='';
         
         showdata(); //display data on screen
         this.reset(); //clear Entered data
        });

        function showdata(){
              if(isFirstTime){
            tasks_container.textContent="";
            isFirstTime=false;
            }
          let count = 0;
          console.log(datalist);
          datalist.forEach((item) => {
            if(item.completed == true)
            count++;
            console.log(count);
            const li = document.createElement("li");
            li.classList.add("task-box");
            const textdiv = document.createElement("div");
            textdiv.classList.add("textarea");
            const ptext = document.createElement('p');
            ptext.classList.add('text');
            const metadiv = document.createElement("div");
            metadiv.classList.add("metabox");
            const checkdiv = document.createElement("div");
            checkdiv.classList.add("checkdiv");
            const checkbox = document.createElement("input");
            checkbox.setAttribute('type','checkbox');
            checkbox.className = 'checkbox';
            const actiondiv = document.createElement("div"); //edit delete button container
            actiondiv.classList.add("edit-del-box");
            const editbtn = document.createElement("button"); // create edit button
            editbtn.setAttribute('aria-label','Edit task');
            editbtn.classList.add('editBtn');
            editbtn.textContent = '✎';
            const delbtn = document.createElement("button"); //create delete botton
            delbtn.setAttribute('aria-label','Delete task');
            delbtn.classList.add('delBtn');
            delbtn.textContent = '✕';
            
            const work_span = document.createElement('span');//create meta options
            work_span.classList.add('work-span');
            const priority_span = document.createElement('span');
            priority_span.classList.add('priority-span');
            
            actiondiv.appendChild(editbtn);
            actiondiv.appendChild(delbtn);
            checkdiv.appendChild(checkbox);
            textdiv.appendChild(ptext);
            textdiv.appendChild(metadiv);
            metadiv.appendChild(work_span);
            metadiv.appendChild(priority_span);
            li.appendChild(checkdiv);
            li.appendChild(textdiv);
            li.appendChild(actiondiv);
            
            if(item.priorityOption === 'high')
            tasks_container.prepend(li);
            else
              tasks_container.appendChild(li);

            ptext.textContent=item.text;
            if(!item.workOption) // we can use if like this for cheking blank text
             work_span.style.display = 'none';
           else
            work_span.textContent=item.workOption;
        
          if(item.priorityOption !== '') // we can use if condition like this
            priority_span.textContent = item.priorityOption;
          else
            priority_span.style.display='none';
          //if checkbox already checked ho to 
          if(item.completed == true){
              checkbox.checked = true;
            const taskDone = document.createElement("span");
            taskDone.className = "taskDone";
            taskDone.style.color = 'green';
            taskDone.textContent = 'Done';
            metadiv.appendChild(taskDone);
            ptext.style.textDecoration = 'line-through';
            }
          });
          
        }
        
        showdata(); //showdata function calling 

        const del_all = document.querySelector(".del-allBtn"); //Delete all btn working
        del_all.addEventListener("click", function(){
          localStorage.removeItem('details');
          datalist = [];
          tasks_container.innerHTML = '';
        });

      // below code written for del edit checkbox button make working
     if (datalist.length !== 0) {
    let tasks_container = document.getElementById("tasks-container");
    tasks_container.addEventListener("click", function(evt){    //event listener on main parent tag ul
        // delete button pe click hone pe action
        if(evt.target.closest('.delBtn')){
          const li = evt.target.closest('li');
          // get wo text jis pe click hua 
          const tasktext = li.querySelector('.text').innerText.trim();
           const currentindex = datalist.findIndex((item)=>item.text === tasktext);
          if(currentindex >= 0){
          datalist = datalist.filter(text => text.text !== tasktext);
          localStorage.setItem('details', JSON.stringify(datalist));
          console.log(currentindex + " index task is deleted succesfully");
        }
          li.remove();
        console.log(tasktext + " is Deleted from the list");
        }
        // checkbox pe click hone pe aciton
         if(evt.target.closest('.checkbox')){ 
          const checkbox = evt.target.closest('.checkbox');
          const li = evt.target.closest('li');
           const text = li.querySelector('.text');
          const currentindex = datalist.findIndex((item)=>item.text === text.textContent);
            if(checkbox.checked == true){
            console.log("("+text.innerText+')' + " task compelte");
            text.style.textDecoration = 'line-through';
            const taskDone = document.createElement("span");
            taskDone.className = "taskDone";
            taskDone.style.color = 'green';
            taskDone.textContent = 'Done';
            const metabx = li.querySelector('.metabox');
            metabx.appendChild(taskDone);
            if(currentindex >= 0)
            {
              datalist[currentindex].completed = true;
             localStorage.setItem("details",JSON.stringify(datalist));
            }
          }else{
            text.style.textDecoration = 'none';
            const taskDn = li.querySelector('.taskDone');
            taskDn?.remove();
             if(currentindex >= 0)
             datalist[currentindex].completed = false;
              localStorage.setItem("details",JSON.stringify(datalist));
            }
        }
        //edit button pe click karne pe action
        if(evt.target.closest('.editBtn')){
            const editbtn = evt.target.closest('.editBtn');
            const li = evt.target.closest("li");
            const pTag = li.querySelector('.text');
            const checkbox = li.querySelector('.checkbox');
             if(editbtn.innerText === '✎')
           {
            const dataToEdit = pTag.textContent.trim();
            const currentindex = datalist.findIndex((item)=>item.text === dataToEdit);
            console.log(currentindex);
            const inputTag = document.createElement('input');
             inputTag.type = 'text';
            inputTag.className = 'text';
            inputTag.dataset.targetIndex = currentindex;
            inputTag.value = pTag.innerText;
            console.log(inputTag.value);
            pTag.replaceWith(inputTag);
            inputTag.focus();
            if(checkbox.checked == true)
            inputTag.style.textDecoration = "line-through";
            editbtn.innerText = 'save';
           } else{  //ye save btn pe click karne se kaam kare yani data save karega;
            afterEdit();
           } 
           
           //yaha Enter button dabaane se data save
           li.addEventListener("keydown", function(evt){
            if(evt.key === "Enter"){
                afterEdit();
            }
           });
        // function start
         function afterEdit(){
            const newPtag = document.createElement('p');
            newPtag.classList.add('text');
            const inputTag = li.querySelector('.text')
            const indexToReplace = Number(inputTag.dataset.targetIndex);
           const editedValue = inputTag.value;
           newPtag.textContent = editedValue;
           inputTag.replaceWith(newPtag);
            editbtn.innerText = "✎";
            if(indexToReplace >= 0){
            datalist[indexToReplace].text = editedValue; //yaha pe Splice function bhi use kar sakte hai
            localStorage.setItem('details',JSON.stringify(datalist));
             console.log(indexToReplace + ' index data updated succesfully');
            }
            if(checkbox.checked == true)
            newPtag.style.textDecoration = "line-through";
           }   //function end
        }
        });
      } 