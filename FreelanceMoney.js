function CalculGain() {
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
    let total = gainHeure + gainJour + gainExtras;

    document.getElementById('resultatBrut').innerText = total+'€';
}

