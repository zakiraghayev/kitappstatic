
function bookmark() {

    let bookMark = document.querySelectorAll(".bookmark"),bookCard = document.querySelectorAll(".book-card");
    let bookMarkIndex = [];
    for(let i = 0;i < bookMark.length;i++) bookMarkIndex[i] = true;

    for(let i = 0;i < bookMark.length;i++){
        bookMark[i].onclick = function(){
            MarkUnMark(bookMark[i].dataset.unique);

            if(!bookMarkIndex[i]){
                bookMark[i].setAttribute("src", "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark-red.svg");
                bookMarkIndex[i] = true;
            }
            else{
                bookMark[i].setAttribute("src", "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark.svg");
                bookMarkIndex[i] = false;
            }

        }

        if(bookMarkIndex[i]){
            bookMark[i].style.top = "100%";
        }
        bookCard[i].onmouseover = function(){
            bookMark[i].style.top = "0";
            bookMark[i].style.opacity = "1";
        }

        bookCard[i].onmouseout = function(){
                bookMark[i].style.opacity = "0";
                if(bookMarkIndex[i]){
                bookMark[i].style.top = "100%";
                bookMark[i].style.opacity = "1";
                }
            }
    }

}//function end


// !!!!!!!!!!!!!!!!!!!

let loadMore = document.querySelectorAll(".load-more"),
loadingBar = document.querySelectorAll(".loading-bar");

var next_page_markedbooks = '/bookmark-api/listbooks';
ListBooks();

function ListBooks() {
    // body...
    if (!next_page_markedbooks) {
        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "none";
        return
    }

    loadMore[0].style.display = "none";
    loadingBar[0].parentElement.children[1].style.display = "block";

    const request = new XMLHttpRequest();
    request.open("GET", next_page_markedbooks, true);

    request.onload = ()=>{

        try {
            /* code */

            let res = JSON.parse(request.responseText)
            next_page_markedbooks = res['next']

            const temp = Handlebars.compile(document.querySelector("#bookmark-instance").innerHTML);
            document.querySelector("#book-sell").children[0].innerHTML +=temp({"book":res.results})
            bookmark(); // add bookmark functionality to book cards (bookmark.js)

            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";

            if (!next_page_markedbooks) {
                loadingBar[0].style.display = "none";
                loadMore[0].style.display = "none";
                return
            }

        } catch (e) {
            console.log(e)
            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";
        }
    }

    request.send()
}

function MarkUnMark(id){
    const request = new XMLHttpRequest();
    request.open("PATCH","/bookmark-api/markabook/" + id);
    request.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value)
    request.onload = ()=>{

    }
    request.send()

}