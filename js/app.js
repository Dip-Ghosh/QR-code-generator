
const form        = document.getElementById('generate-form');
const qr          = document.getElementById('qrcode');
const spinner     = document.getElementById('spinner')

const onGenerateSubmit = (event) => {
    event.preventDefault();

    let url = document.getElementById('url').value;
    let size = document.getElementById('size').value;

    if (url === '') {
        alert(" Url is required. ")
    }
    else {
        spinnerShow();
        clearUI();
        setTimeout(() => {
            spinnerHide();
            generateQRCode(url, size);
            createSaveBtn(url);
            setTimeout( ()=> {
                const saveUrl = qr.querySelector('img').src;
                if (saveUrl) {
                    createSaveBtn(saveUrl);
                }

            },50)
        }, 1000);
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode(qr, {
        text: url,
        width: size,
        height: size
    });
}

const createSaveBtn = (saveUrl) => {
    const link     = document.createElement('a');
    link.id        = 'save-link';
    link.classList = 'bf-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href      = saveUrl;
    link.download  = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
}

let spinnerShow = () => {
    spinner.style.display = 'block';
}

let spinnerHide = () => {
    spinner.style.display = 'none';
}

const clearUI     = () => {
    qr.innerHTML= '';
    // document.getElementById('generated').remove();
}

form.addEventListener('submit', onGenerateSubmit);