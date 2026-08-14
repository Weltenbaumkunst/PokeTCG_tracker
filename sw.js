let deferredPrompt = null;

    // Fängt das native Android/Chrome Installations-Event ab
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('PWA Installations-Event bereit.');
    });

    async function installPWA() {
        if (deferredPrompt) {
            // Nativer Android/Chrome Dialog
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Installations-Status: ${outcome}`);
            deferredPrompt = null;
        } else {
            // Hilfestellung für iOS (Safari) oder Browser ohne natives Event
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            
            if (isIOS) {
                alert('📱 App auf iOS installieren:\n\n1. Tippe unten in Safari auf das Teilen-Symbol (Viereck mit Pfeil nach oben).\n2. Scrolle nach unten und wähle "Zum Home-Bildschirm".');
            } else {
                alert('📱 App installieren:\n\n1. Öffne das Browser-Menü (3 Punkte oben rechts).\n2. Wähle "App installieren" oder "Zum Startbildschirm hinzufügen".\n\n(Hinweis: Falls die Option fehlt, lade die Seite einmal mit Strg+F5 neu).');
            }
        }
    }

    // Button ausblenden, sobald die App bereits installiert wurde
    window.addEventListener('appinstalled', () => {
        console.log('PWA wurde erfolgreich installiert!');
        const installBtn = document.getElementById('pwaInstallBtn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    });

    // Prüfen, ob die Seite bereits als Standalone-App geöffnet ist
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        const installBtn = document.getElementById('pwaInstallBtn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }