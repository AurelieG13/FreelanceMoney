function CalculGain() {
    //on vérifie les inputs
    CheckInputs();

    //On récupère le formulaire dans le html    
    let myForm = document.getElementById("formCalculGain");
    //On le transforme en objet FormData
    let formObj = new FormData(myForm);

    //on récupère les input de notre form par leurs name
    let tauxHoraire = formObj.get('TH');
    let tauxJournalier = formObj.get('TJM');
    let extras = formObj.get('Extras');

    let qtetauxHoraire = formObj.get('QteTH');
    let qtetauxJournalier = formObj.get('QteTJM');
    let qteextras = formObj.get('QteExtras');

    let charges = formObj.get('Charges');

    //calculs
    let gainHeure = tauxHoraire * qtetauxHoraire;

    let gainJour = tauxJournalier * qtetauxJournalier;

    let gainExtras = extras * qteextras;

    //TOTAL
    let totalBrut = gainHeure + gainJour + gainExtras;

    document.getElementById('resultatBrut').innerText = totalBrut+'€';

    let chargeADeduire = (totalBrut * (charges/100));
    let totalNet = totalBrut - chargeADeduire;

    document.getElementById('resultatBrut').innerText = totalBrut.toFixed(2)+"€";
    document.getElementById('resultatDifference').innerText = chargeADeduire.toFixed(2)+"€";
    document.getElementById('resultatNet').innerText = totalNet.toFixed(2)+"€";
}

function CheckInputs() {
    let mesInputs = document.querySelectorAll('#formCalculGain input.form-control');

    mesInputs.forEach(monInput => {
        //vérifier s'il vaut 0 ou plus
        if(monInput.value < 0) {
            monInput.value = 0;
        }
        saveElementInCookies(monInput);
    });
}

function saveElementInCookies(input) {
    document.cookie = input.name+'='+input.value;
}



function getCookie(input){
    let mesCookies = document.cookie;

    const name = input.name + '='; 
    const tableauCookies = mesCookies.split('; ');
    let valeurCookie = null;
    tableauCookies.forEach(cookie =>{
        if(cookie.indexOf(name) === 0){
            //on a chopé le bon cookie
            valeurCookie = cookie.substring(name.length);
            console.log(valeurCookie);
        }
    });
    return valeurCookie;
}

//ajout des evenements

let btn = document.getElementById('buttonValidation');
btn.addEventListener('click',CalculGain);

let mesInputs = document.querySelectorAll('#formCalculGain input.form-control');


mesInputs.forEach(monInput => {
    //si l'input a une val en cookie lui affectuer
    let cookie = getCookie(monInput);

    if(cookie != undefined && cookie != null){
        monInput.value = cookie;
    }

    monInput.addEventListener('keyup', CalculGain);
    monInput.addEventListener('change', CalculGain);
});


