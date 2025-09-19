const profileInputName = document.querySelector("#fnamemodal")
const profileInputEmail = document.querySelector("#email")
const modalFormProfile = document.querySelector(".modal-form")
const username = document.querySelector(".user-name")
const useremail = document.querySelector(".user-email")
let profileInputNameValue = profileInputName.value
let profileInputEmailValue = profileInputEmail.value
console.log(localStorage.getItem("name"))
modalFormProfile.addEventListener("submit", (norefresh) =>{
    localStorage.setItem("name", profileInputNameValue)
    localStorage.setItem("email", profileInputEmailValue)
    norefresh.preventDefault();
    username.innerHTML= `${profileNameHTML}`
    useremail.innerHTML=`${localStorage.getItem("email")}`
})
const editProfileName = document.querySelector("#fname1")
const editProfileEmail = document.querySelector("#fname2")
const editProfileBtn = document.querySelector("#editprofilebtn")
editProfileBtn.addEventListener("click",(evt) =>{
    let editProfileNameValue = editProfileName.value
    let editProfileEmailValue = editProfileEmail.value
    username.innerHTML= `${editProfileNameValue}`
    useremail.innerHTML=`${editProfileEmailValue}`
    if (profileInputNameValue != "" && profileInputNameValue != "" && editProfileNameValue != "" && editProfileEmailValue != ""){
        profileInputName.value = "";
        profileInputEmail.value = "";
        editProfileEmail.value = "";
        editProfileName.value = "";
    }
})