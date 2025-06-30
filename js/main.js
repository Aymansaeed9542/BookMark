let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteURL");


if (localStorage.getItem("bookmarks")) {
    bookMarksList = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark();
}
else {
    bookMarksList = [];
}

function addBookmark() {
    let name = siteName.value.trim();
    let url = siteUrl.value.trim();
    if (!validateInputs(name, url)) {
        showModal();
        return;
    }
        let obj = {
            name: name,
            url: url
        };
        bookMarksList.push(obj);
        displayBookmark()
        clearInputs();
        saveProductsToLocalStorage();
}
function validateInputs(name, url) {
    let urlPattern = /^(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\S*)$/;

    if (name.length < 3) return false;
    if (!urlPattern.test(url)) return false;

    return true;
}

function showModal() {
    document.getElementById("validationModal").classList.remove("d-none");
}

function closeModal() {
    document.getElementById("validationModal").classList.add("d-none");
}


function displayBookmark(){
    let box = "";
    for (let i = 0; i < bookMarksList.length; i++) {
        box += `<tr>
        <td>${bookMarksList[i].name}</td>
                <td>${bookMarksList[i].url}</td>
                <td><button class="btn-visit" onclick="visitSite('${bookMarksList[i].url}')"><i></i>visit <span></span></button></td>
                <td><button class="btn-delete" onclick="deleteBookmark(${i})"><i></i>delete <span></span></button></td>
        </tr>`

    }
    document.getElementById("bookmarkList").innerHTML = box;
}

function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
}

function visitSite(url){
    if (!url.startsWith("http")) {
        url = "https://" + url;
    }
    window.open(url, "_blank");
}

function deleteBookmark(index) {
    bookMarksList.splice(index, 1);
    displayBookmark();
    saveProductsToLocalStorage();
}

function saveProductsToLocalStorage(){
    localStorage.setItem("bookmarks", JSON.stringify(bookMarksList));
}