function ShowUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/api/users?page=1');
    // xhr.addEventListener('readystatechange', function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         console.log("Response = " + xhr.response);
    //     };
    // });
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //retour de l'appel ajax
                console.log("Response = " + xhr.response);
                const object = JSON.parse(xhr.response);

                let myhtml = "";
                object.data.forEach(element => {
                    myhtml += '<div><p>'+element.first_name+' '+element.last_name+'</p></div>'
                });
                document.getElementById('allUtilisateurs').innerHTML  = myhtml;
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