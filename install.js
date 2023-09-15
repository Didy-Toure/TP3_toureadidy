let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden'); 
}

function installPWA(evt) {
    deferredInstallPrompt.prompt();
    installButton.setAttribute('hidden', true); 
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted', choice);
            } else {
                console.log('User dismissed', choice);
            }
            deferredInstallPrompt = null; 
        });
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt) {
    console.log('Elo was installed.', evt);
}
