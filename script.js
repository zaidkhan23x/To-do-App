 
        let time= new Date().toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' });
         document.getElementById("time").textContent=time;

         const tasks_container = document.getElementById("tasks-container");
         let isFirstTime = true; //flag define
        let input_form = document.querySelector("#input-form");
        let inputdata = document.getElementById("input-value");
        let datalist = JSON.parse(localStorage.getItem('details')) || []; //Global variable

        //start event listener
        input_form.addEventListener("submit",function (evt){
            evt.preventDefault();

       
         datalist.push(inputdata.value);
         localStorage.setItem("details",JSON.stringify(datalist)); //data key saved as details name
         tasks_container.textContent='';
         showdata();
         this.reset();
        });

        function showdata(){
              if(isFirstTime){
            tasks_container.textContent="";
            isFirstTime=false;
            }
          //let datalist = JSON.parse(localStorage.getItem("details")); //iske name se uper global variable hai
          console.log(datalist);
          datalist.forEach((item) => {

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
            
            actiondiv.appendChild(editbtn);
            actiondiv.appendChild(delbtn);
            checkdiv.appendChild(checkbox);
            textdiv.appendChild(ptext);
            textdiv.appendChild(metadiv);
            li.appendChild(checkdiv);
            li.appendChild(textdiv);
            li.appendChild(actiondiv);
            tasks_container.prepend(li);   
            ptext.textContent=item;
          });
          
        }
        showdata(); //showdata function calling 

        const del_all = document.querySelector(".del-allBtn");
        del_all.addEventListener("click", function(){
          localStorage.removeItem('details');
          datalist = [];
          tasks_container.innerHTML = '';
        });
     if (datalist.length !== 0) {
    let tasks_container = document.getElementById("tasks-container");
    tasks_container.addEventListener("click", function(evt){    //event listener on main parent tag ul
        // delete button pe click hone pe action
        if(evt.target.closest('.delBtn')){
          const li = evt.target.closest('li');
          // get wo text jis pe click hua 
          const tasktext = li.querySelector('.text').innerText.trim();
           const currentindex = datalist.indexOf(tasktext);
          if(currentindex >= 0){
          datalist = datalist.filter(text => text !== tasktext);
          localStorage.setItem('details', JSON.stringify(datalist));
          console.log(currentindex + " index data is deleted succesfully");
        }
          li.remove();
        console.log(tasktext + " is Deleted from the list");
        }
        // checkbox pe click hone pe aciton
         if(evt.target.closest('.checkbox')){ 
            const checkbox = evt.target.closest('.checkbox');
           const li = evt.target.closest('li');
            const text = li.querySelector('.text');
            console.log("("+text.innerText+')' + " task completed");
            text.style.textDecoration = 'line-through';
            if(checkbox.checked == false)
            text.style.textDecoration = 'none';
        }
        //edit button pe click karne pe action
        if(evt.target.closest('.editBtn')){
            const editbtn = evt.target.closest('.editBtn');
            const li = evt.target.closest("li");
            const pTag = li.querySelector('.text');
             if(editbtn.innerText === '✎')
           {
            const dataToEdit = pTag.textContent.trim();
            const currentindex = datalist.indexOf(dataToEdit);
            console.log(currentindex);
            const inputTag = document.createElement('input');
             inputTag.type = 'text';
            inputTag.className = 'text';
            inputTag.dataset.targetIndex = currentindex;
            inputTag.value = pTag.innerText;
            console.log(inputTag.value);
            pTag.replaceWith(inputTag);
            inputTag.focus();
            editbtn.innerText = 'save';
           } else{  //ye save btn pe click karne se kaam kare yani data save karega;
            afterEdit();
            console.log("else bhi chala");
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
            datalist[indexToReplace] = editedValue; //yaha pe Splice function bhi use kar sakte hai
            localStorage.setItem('details',JSON.stringify(datalist));
             console.log(indexToReplace + 'index data updated succesfully');
            }
           }   //function end
        }
        });
      } 