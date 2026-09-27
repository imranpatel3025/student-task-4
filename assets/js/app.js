
const cl = console.log;

// localStorage.setItem('studentArr', JSON.stringify(studentArr))

let studentArr = JSON.parse( localStorage.getItem('studentArr')) || [];
// cl(studentArr)

const stdForm = document.getElementById('stdForm')
const stdList = document.getElementById('stdList')
const addStdBtn = document.getElementById('addStdBtn')
const updateStdBtn = document.getElementById('updateStdBtn')


function snackBar(msg, icon){
    Swal.fire({
        title:msg,
        icon : icon,
        
    })
}


function showStdList(arr){
    let result = ``
    arr.forEach((stdArr, i) => {
        result += `<tr id=${stdArr.id}>
                            <td>${i + 1}</td>
                            <td>${stdArr.fname}</td>
                            <td>${stdArr.lname}</td>
                            <td>${stdArr.contact}</td>
                            <td>${stdArr.email}</td>
                            <td><i onclick="onEditStd(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                            <td><i onclick="onremoveStd(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i></td>
                    </tr>`
    })
    stdList.innerHTML = result;
}
showStdList(studentArr)


function onEditStd(ele){
    let editId = ele.closest('tr').id;
    // cl(editId)
    let editObj = studentArr.find(s => s.id === editId)
    // cl(editObj)
    fname.value = editObj.fname,
    lname.value = editObj.lname,
    contact.value = editObj.contact,
    email.value = editObj.email;

    addStdBtn.classList.add('d-none')
    updateStdBtn.classList.remove('d-none')

    updateStdBtn.setAttribute('edit-id', editId)

}

function onUpdateStd(eve){
    let updateId = this.getAttribute("edit-id")
    eve.target.removeAttribute("edit-id")
    cl(updateId)

    let updateObj = {
        fname : fname.value,
        lname : lname.value,
        contact : contact.value,
        email : email.value,
        id : updateId
    }
    // cl(updateObj)

    let getIndex = studentArr.findIndex(s => s.id === updateId)
    // cl(getIndex)
    studentArr[getIndex] = updateObj
    localStorage.setItem('studentArr', JSON.stringify(studentArr))
    let tr = document.getElementById(updateId).children
    tr[1].innerHTML = updateObj.fname,
    tr[2].innerHTML = updateObj.lname
    tr[3].innerHTML = updateObj.contact
    tr[4].innerHTML = updateObj.email
    snackBar(`Student with id ${updateId} is Updated Successfully!!!`, 'success')
    stdForm.reset()
    updateStdBtn.classList.add('d-none')
    addStdBtn.classList.remove('d-none')
}

function onSubmit(eve){
    eve.preventDefault()

    let newObj = {
        fname : fname.value,
        lname : lname.value,
        contact : contact.value,
        email : email.value,
        id : Date.now().toString()
    }
    // cl(newObj)
    studentArr.push(newObj)
    localStorage.setItem('studentArr', JSON.stringify(studentArr))

    stdForm.reset()
    let tr = document.createElement('tr');
    tr.id = newObj.id;
    tr.innerHTML = `        <td>${studentArr.length}</td>
                            <td>${newObj.fname}</td>
                            <td>${newObj.lname}</td>
                            <td>${newObj.contact}</td>
                            <td>${newObj.email}</td>
                            <td><i onclick="onEditStd(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                            <td><i onclick="onremoveStd(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i></td>
                            `
                stdList.append(tr);

    snackBar(`Student with ${newObj.id} is Added Successfully!!!`, 'success')


}

function srNo() {
    let tds = [...document.querySelectorAll("#stdList tr td:first-child")];
        tds.forEach((td, i) =>{
            td.innerText = i + 1;
        })
}

function onremoveStd(ele){
    let REMOVE_ID = ele.closest('tr').id;
    // cl(REMOVE_ID)

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
 
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
     let getIndex = studentArr.findIndex(s => s.id === REMOVE_ID)
    // cl(getIndex)

    studentArr.splice(getIndex, 1);
   
    localStorage.setItem('studentArr', JSON.stringify(studentArr))
    ele.closest('tr').remove()
    srNo()   
    snackBar(`Student with id ${REMOVE_ID} is Removed Successfully!!!`, 'success')
  }
});
    
}

stdForm.addEventListener('submit', onSubmit)
updateStdBtn.addEventListener('click', onUpdateStd)