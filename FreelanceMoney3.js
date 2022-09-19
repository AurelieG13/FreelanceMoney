function CalculGain() {
    //on vérifie les inputs
    CheckInputs();

    //On récupère le formulaire dans le html    
    let myForm = document.getElementById("formCalculGain");
    //On le transforme en objet FormData
    let formObj = new FormData(myForm);

    //on récupère les input de notre form par leurs name
    let myCalculDatas = {
        tauxHoraire : formObj.get('TH'),
        tauxJournalier : formObj.get('TJM'),
        extras : formObj.get('Extras'),
        qtetauxHoraire : formObj.get('QteTH'),
        qtetauxJournalier : formObj.get('QteTJM'),
        qteextras : formObj.get('QteExtras'),
        charges : formObj.get('Charges'),

        gainHeure : this.tauxHoraire * this.qtetauxHoraire,
        gainJour : this.tauxJournalier * this.qtetauxJournalier,
        gainExtras : this.extras * this.qteextras,

        totalBrut : this.gainHeure + this.gainJour + this.gainExtras,   
        chargeADeduire : (this.totalBrut * (this.charges/100)),
        totalNet : this.totalBrut - this.chargeADeduire,
    };

//animer le résultat
animateCompteur("resultatBrut",myCalculDatas.totalBrut);
animateCompteur("resultatDifference",myCalculDatas.chargeADeduire);
animateCompteur("resultatNet",myCalculDatas.totalNet);
}

async function animateCompteur(idARemplacer, total){
    let cpt = 0;
    let animationDuration = 70;
    let monElementHtmlDeResultat = document.getElementById(idARemplacer);
    //total c'est 140
    //compter 140 en 1000 ms

    if(monElementHtmlDeResultat.innerText != total.toFixed(2)+" €"){
        let increment = Math.round(total / 10);
        if(increment == 0)
            increment =1;
        while(cpt <= total){
            monElementHtmlDeResultat.innerText = cpt.toFixed(2)+" €";
            await timer(animationDuration);
            cpt += increment;
        }

        monElementHtmlDeResultat.innerText = total.toFixed(2)+" €";
    }
} 

function timer(ms) {
    return new Promise(res => setTimeout(res, ms)); 
    }

    // let tauxHoraire = formObj.get('TH');
    // let tauxJournalier = formObj.get('TJM');
    // let extras = formObj.get('Extras');

    // let qtetauxHoraire = formObj.get('QteTH');
    // let qtetauxJournalier = formObj.get('QteTJM');
    // let qteextras = formObj.get('QteExtras');

    // let charges = formObj.get('Charges');

    //calculs
    // let gainHeure = tauxHoraire * qtetauxHoraire;

    // let gainJour = tauxJournalier * qtetauxJournalier;

    // let gainExtras = extras * qteextras;

    //TOTAL
    // let totalBrut = gainHeure + gainJour + gainExtras;

    // document.getElementById('resultatBrut').innerText = totalBrut+'€';

    // let chargeADeduire = (totalBrut * (charges/100));
    // let totalNet = totalBrut - chargeADeduire;

    // document.getElementById('resultatBrut').innerText = totalBrut.toFixed(2)+"€";
    // document.getElementById('resultatDifference').innerText = chargeADeduire.toFixed(2)+"€";
    // document.getElementById('resultatNet').innerText = totalNet.toFixed(2)+"€";
// }

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


CalculGain();