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
