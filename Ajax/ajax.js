// function ShowUsers() {
//     const nbPage = document.getElementById('numberPageUsers').value;
//     getUsers(nbPage);

//     // const xhr = new XMLHttpRequest();
//     // xhr.open('GET', 'https://reqres.in/api/users?page=1');
//     // // xhr.addEventListener('readystatechange', function () {
//     // //     if (xhr.readyState === 4 && xhr.status === 200) {
//     // //         console.log("Response = " + xhr.response);
//     // //     };
//     // // });
//     // xhr.addEventListener('readystatechange', function () {
//     //     if (xhr.readyState === 4) {
//     //         if (xhr.status === 200) {
//     //             //retour de l'appel ajax
//     //             console.log("Response = " + xhr.response);
//     //             const object = JSON.parse(xhr.response);

//     //             let myhtml = "";
//     //             object.data.forEach(element => {
//     //                 myhtml += '<div><p>'+element.first_name+' '+element.last_name+'</p></div>'
//     //             });
//     //             document.getElementById('allUtilisateurs').innerHTML  = myhtml;
//     //         }
//     //         else if(xhr.status === 404) {
//     //             alert("impossible de trouver l'url de la requete.");
//     //         }
//     //         else {
//     //             alert('une erreur est survenue')
//     //         }
//     //     };
//     // });
//     // xhr.send();
// }

const loader = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';


//appel AJAX
//rqte GET
function getUsers(numeroPage) {
    document.getElementById('allUtilisateurs').innerHTML = loader;
    document.getElementById('pagination').innerHTML = '';
    const xhr = new XMLHttpRequest();
    const url = 'https://reqres.in/api/users?delay=1&page='+numeroPage;
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //retour de l'appel ajax
                console.log("Response = " + xhr.response);
                const object = JSON.parse(xhr.response);
                setUsersInPage(object);
            }
            else if(xhr.status === 404) {
                alert("impossible de trouver l'url de la requete.");
            }
            else {
                alert('une erreur est survenue')
            }
        };
    });
    xhr.send();
}

function setUsersInPage(listUsers) {
    //on ajoute la liste des utilisateurs
    let myhtml = "";
    listUsers.data.forEach(element => {
        myhtml += '<div><img src="'+element.avatar+'"/><p>'+ element.first_name + ' ' + element.last_name + '</p></div>'
    });
    document.getElementById('allUtilisateurs').innerHTML = myhtml;

    //on créé la pagination
    let nbPage = listUsers.total_pages;
    let currentPage = listUsers.page;

    let htmlPagination = "";
    for(let i = 1; i <= nbPage; i++) {
        if(i == currentPage) {
            htmlPagination += '<button class="btn active" disabled>'+i+'</button>'
        }
        else {
            htmlPagination += '<button class="btn" onclick="getUsers('+i+')">'+i+'</button>';
        }
    }
    document.getElementById('pagination').innerHTML = htmlPagination;
}

document.addEventListener("DOMContentLoaded", function() {
    getUsers(1);
});

function createUsers(){
    const xhr = new XMLHttpRequest();
    const url = 'https://reqres.in/api/users';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                //retour de l'appel ajax
                console.log("Response = " + xhr.response);
                const object = JSON.parse(xhr.response);
                console.log(object);
            }
            else if(xhr.status === 404) {
                alert("impossible de trouver l'url de la requete.");
            }
            else {
                alert('une erreur est survenue')
            }
        };
    });

    let myForm = new FormData();
    myForm.append('name', 'Aurélie');
    myForm.append('job', 'Dev');
    var object = {};
    myForm.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    xhr.send(json);
}


function createUserApiFetch() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    const body = JSON.stringify({
        name: document.getElementById('nom').value,
        job: document.getElementById('job').value
    });
    const init = {
        method :'POST',
        headers : headers,
        body: body };

    fetch('https://reqres.in/api/users', init)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
        })
        .catch(error => alert('Erreur : '+error));
}

function deleteUser() {
    const headers = new Headers();

    const init = {
        method :'DELETE',
        headers : headers,
    };

    fetch('https://reqres.in/api/user/2', init)
        .then((response) => {
            if(response.status == 204){
                alert('l\'utilisateur a bien été supprimé')
            }
            else{
                alert('impossible de supprimer')
            }
        })
        .catch(error => alert('Erreur : '+error));
}

function editUserApiFetch() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    const body = JSON.stringify({
        name: document.getElementById('nom').value,
        job: document.getElementById('job').value
    });
    const init = {
        method :'PUT',
        headers : headers,
        body: body };

    fetch('https://reqres.in/api/users/2', init)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
        })
        .catch(error => alert('Erreur : '+error));
}