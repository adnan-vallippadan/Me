let site = {
    initialize: function() {        
        site.setCurrentYear();
        site.initializeLoader();
    },

    initializeLoader: function() {
        setTimeout(() => {
            let element = document.getElementById("loading-animation");
            element.style.display = 'none';
        }, 800);
    },

    setCurrentYear: function() {
        const year = new Date().getFullYear();
        document.getElementById('year').textContent = year;
    }
}