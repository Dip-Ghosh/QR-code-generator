
const form        = document.getElementById('generate-form');
const qr          = document.getElementById('qrcode');
const spinner     = document.getElementById('spinner')


const onGenerateSubmit = (event) => {
    event.preventDefault();

    let url = document.getElementById('url').value;
    let size = document.getElementById('size').value;
    let btn =  document.getElementById('save-link');

    if (url === '') {
        alert(" Url is required. ")
    }
    else {

        if (btn)  clearUI();
        spinnerShow();

        setTimeout(() => {
            spinnerHide();
            generateQRCode(url, size);

            setTimeout( ()=> {
                let saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
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


let createSaveBtn = (saveUrl) => {
    let link     = document.createElement('a');
    link.id        = 'save-link';
    link.classList = 'bf-red-500 bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5 btn btn-info';
    link.href      = saveUrl;
    link.type      ='btn btn-sm'
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

const clearUI = () => {
    qr.innerHTML= '';
    document.getElementById('save-link').remove();
}

form.addEventListener('submit', onGenerateSubmit);