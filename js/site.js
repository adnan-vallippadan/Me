let site = {
    initialize: function () {
        site.setCurrentYear();
        site.initializeLoader();
        site.initScroll();

        window.addEventListener('scroll', site.initScroll);
    },

    initializeLoader: function () {
        setTimeout(() => {
            let element = document.getElementById("loading-animation");
            element.style.display = 'none';
        }, 800);
    },

    setCurrentYear: function () {
        const year = new Date().getFullYear();
        document.getElementById('year').textContent = year;
    },

    initScroll: function () {
        const myDiv = document.getElementById('nav-header');
        if (window.scrollY > 0) {
            myDiv.classList.add('bg-primary-900');
        } else {
            myDiv.classList.remove('bg-primary-900');
        }
    }
}