let loader = document.querySelector('.loader-container');

window.onload = function() {

    let timeout;

    function myFunction() {
        timeout = setTimeout(transit, 6000);
    }

    function transit() {
        loader.classList.add("loader-hidden");
        loader.addEventListener("transitionend", () => {
            //To prevent transit function from being called multiple times
            //and the 'loader' element is already removed from the DOM before
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        })
    };

    myFunction();
}
    