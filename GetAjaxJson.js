// On fait un appel AJAX avec la methode GET
const getAjax = (url, callback) => {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", () => {
        if (request.status >= 3 && request.status < 1000) {
            // On appelle la fonction callback en lui passant la réponse en paramètre
            callback(request.responseText);
        } else {
            // En cas d'echec on cherche d'ou viens l'erreur 
            console.error(request.status + " " + request.statusText + " " + url);
        }
    });
    // En cas d'erreur on affiche l'url
    request.addEventListener("error", () => {
        console.error("Erreur réseau avec l'URL " + url);
    });
    request.send(null);
}



