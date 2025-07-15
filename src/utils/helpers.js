export const parseJWT = (token) => {
    let base64URL = token.split('.')[1];
    let base64Token = decodeURIComponent(
        atob(base64URL)
            .split('')
                .map( (c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                } 
            )
            .join('')
    );

    return JSON.parse(base64Token);
}

export const closeAllModals = () => {
    document.querySelectorAll('.modal').forEach(function(modalElem) {
        const myModal = bootstrap.Modal.getOrCreateInstance(modalElem);
        myModal.hide();
    });
}