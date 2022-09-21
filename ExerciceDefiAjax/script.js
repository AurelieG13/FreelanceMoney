let users = []

const sendForm = (email, password) => {
    setTimeout(() => {
        const token = 'ffghthfzszsz654412dsvcds';

        const headers = new Headers();
        headers.append('Authorization', token);

        const init = {
            method :'GET',
            headers : headers,
        };

        fetch('https://reqres.in/api/users?page=1', init)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response)
            })
            .catch(error => alert('Erreur : '+error));
    }, 2000)
}