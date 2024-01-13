const blurDivs = document.querySelectorAll(".blur-loading")
blurDivs.forEach(div => {
    const img = div.querySelector("img")

    function loaded(){
        // show img
        div.classList.add("loaded")
    }

    if(img.complete){
        loaded()
    }
    else{
        img.addEventListener('load', loaded)
    }
})
