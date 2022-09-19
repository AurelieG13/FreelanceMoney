// function AfficherNom(){
//     //mon humain est représenté dans ces 3 variables
//     let nom = 'GUICHARDON';
//     let prenom = 'Aurélie';
//     let age = 24;

// }

//déclarer l'objet
let user = new Object()
    user.firstName = 'GUICHARDON';
    user.lastName = 'Aurélie';
    user.age = 38;
    user.email = 'guichardon.aurelie@gmail.com';
    user.phoneNumber = '0624729309';
    user.fullName = function() {
        return this.firstName + ' ' + this.lastName
    };

alert(user.fullName());
