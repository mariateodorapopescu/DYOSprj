document.addEventListener('DOMContentLoaded', function() {
    // Variabile globale
    let openWindows = [];
    let windowZIndex = 1000;
    
    var dscontainer = document.createElement('div');
    dscontainer.className = 'desktop-container';
    dscontainer.style.width = '100%';
    dscontainer.style.height = '100%';
    dscontainer.style.display = 'flex';
    dscontainer.style.justifyContent = 'center';
    dscontainer.style.alignItems = 'center';
    dscontainer.style.flexDirection = 'column';
    document.body.appendChild(dscontainer);

    var wallpaper = document.createElement('div');
    wallpaper.className = 'wallpaper';
    wallpaper.style.backgroundImage = 'url(https://4kwallpapers.com/images/wallpapers/macos-ventura-macos-13-macos-2022-stock-dark-mode-5k-retina-2048x1536-8133.jpg)';
    wallpaper.style.backgroundRepeat = 'no-repeat';
    wallpaper.style.backgroundSize = 'cover';
    wallpaper.style.width = '100%';
    wallpaper.style.height = '100%';
    wallpaper.style.zIndex = '1';
    wallpaper.style.position = 'absolute';
    wallpaper.style.top = '0';
    wallpaper.style.left = '0';
    dscontainer.appendChild(wallpaper);

    var upContainer = document.createElement('div');
    upContainer.style.position = 'absolute';
    upContainer.style.top = '0';
    upContainer.style.left = '0';
    upContainer.style.width = '100%';
    upContainer.style.height = '50%';
    dscontainer.appendChild(upContainer);

    var statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    statusBar.style.backgroundColor = 'rgba(50,50,50,0.3)';
    statusBar.style.width = '100%';
    statusBar.style.height = '2.5%';
    statusBar.style.top = '0';
    statusBar.style.left = '0';
    statusBar.style.display = 'flex';
    statusBar.style.position = 'absolute';
    statusBar.style.top = '0';
    statusBar.style.left = '0';
    statusBar.style.zIndex = '2';
    statusBar.style.padding = '0.5%';
    statusBar.style.alignItems = 'center';
    statusBar.style.flexDirection = 'row';
    statusBar.style.flexWrap = 'wrap';
    statusBar.style.justifyContent = 'space-between'; // Schimbat pentru a pune ceasul la dreapta
    statusBar.style.backdropFilter = 'blur(80px)';
    statusBar.style.gap = '1%';
    upContainer.appendChild(statusBar);

    // Partea stanga a status bar
    var leftStatusSection = document.createElement('div');
    leftStatusSection.style.display = 'flex';
    leftStatusSection.style.alignItems = 'center';
    leftStatusSection.style.gap = '1%';
    statusBar.appendChild(leftStatusSection);

    var menu = document.createElement('div');
    menu.className = 'menu';
    menu.style.backgroundColor = 'rgba(0,0,0,0)';
    menu.style.width = '5%';
    menu.style.height = '5%';
    menu.style.position = 'relative';
    menu.style.display = 'block';
    menu.style.zIndex = '3';
    leftStatusSection.appendChild(menu);

    var logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = '🍎'; // Apple logo emoji
    logo.style.backgroundColor = 'rgba(0,0,0,0)';
    logo.style.width = '2%';
    logo.style.height = '75%';
    logo.style.position = 'relative';
    logo.style.zIndex = '3';
    logo.style.border = 'none';
    logo.style.top = '0.2%';
    logo.style.left = '0.2%';
    logo.style.fontSize = '16px';
    logo.style.cursor = 'pointer';
    logo.style.userSelect = 'none';
    leftStatusSection.appendChild(logo);

    var name = document.createElement('div');
    name.className = 'logo';
    name.innerText = "Desktop";
    name.style.color = 'white';
    name.style.fontFamily = 'Arial';
    name.style.width = '2%';
    name.style.height = '75%';
    name.style.position = 'relative';
    name.style.zIndex = '3';
    name.style.border = 'none';
    name.style.fontWeight = 'bold';
    name.style.cursor = 'pointer';
    name.style.padding = '5px 8px';
    name.style.borderRadius = '4px';
    name.style.userSelect = 'none';
    leftStatusSection.appendChild(name);

    // Partea dreapta - ceas si indicatori
    var rightStatusSection = document.createElement('div');
    rightStatusSection.style.display = 'flex';
    rightStatusSection.style.alignItems = 'center';
    rightStatusSection.style.gap = '10px';
    rightStatusSection.style.fontSize = '13px';
    rightStatusSection.style.color = 'white';
    statusBar.appendChild(rightStatusSection);

    var wifiIcon = document.createElement('div');
    wifiIcon.innerHTML = '📶';
    wifiIcon.style.cursor = 'pointer';
    wifiIcon.style.fontSize = '14px';
    rightStatusSection.appendChild(wifiIcon);

    var batteryIcon = document.createElement('div');
    batteryIcon.innerHTML = '🔋';
    batteryIcon.style.cursor = 'pointer';
    batteryIcon.style.fontSize = '14px';
    rightStatusSection.appendChild(batteryIcon);

    var clock = document.createElement('div');
    clock.style.fontFamily = 'Arial';
    clock.style.fontWeight = '500';
    clock.style.fontSize = '13px';
    rightStatusSection.appendChild(clock);

    // Functie pentru actualizarea ceasului
    function updateClock() {
        var now = new Date();
        var timeString = now.toLocaleTimeString('ro-RO', {
            hour: '2-digit',
            minute: '2-digit'
        });
        var dateString = now.toLocaleDateString('ro-RO', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        clock.innerHTML = dateString + ' ' + timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Dropdown pentru meniul Apple - actualizat cu toate functiile
    var items = [
        "Despre acest Mac", 
        "Preferințe de sistem", 
        "App Store", 
        "separator",
        "Forțează închiderea", 
        "Repornire", 
        "Oprire", 
        "separator",
        "Blocare ecran", 
        "Deconectare"
    ];

    var dropdn = document.createElement('div');
    dropdn.className = 'dropdown';
    dropdn.style.position = 'absolute';
    dropdn.style.top = '95%';
    dropdn.style.left = '16%';
    dropdn.style.width = 'auto';
    dropdn.style.backgroundColor = 'rgba(50,50,50,0.5)';
    dropdn.style.backdropFilter = 'blur(25px)';
    dropdn.style.borderColor = 'rgba(100,100,100,1)';
    dropdn.style.borderStyle = 'solid';
    dropdn.style.borderWidth = '1px';
    dropdn.style.borderRadius = '10px';
    dropdn.style.flexDirection = 'column';
    dropdn.style.alignContent = 'start';
    dropdn.style.justifyContent = 'left';
    dropdn.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
    dropdn.style.zIndex = '4';
    dropdn.style.display = 'none';
    dropdn.style.padding = '6px 0';
    menu.appendChild(dropdn);

    var itemHeight = 22;
    var separatorHeight = 1;
    var maxItemWidth = 0;

    for (var i = 0; i < items.length; i++) {
        if (items[i] === "separator") {
            var separator = document.createElement('div');
            separator.style.height = separatorHeight + 'px';
            separator.style.marginTop = '2px';
            separator.style.marginBottom = '2px';
            separator.style.backgroundColor = 'rgba(100,100,100,1)';
            dropdn.appendChild(separator);
            continue;
        }

        var drpitem = document.createElement('div');
        drpitem.className = 'drpitem';
        drpitem.style.fontFamily = 'Arial';
        drpitem.style.color = 'white';
        drpitem.style.padding = '8px 16px';
        drpitem.style.position = 'relative';
        drpitem.style.cursor = 'pointer';
        drpitem.style.fontSize = '13px';

        var linkk = document.createElement('a');
        linkk.href = "#";
        linkk.innerText = items[i];
        linkk.style.textDecoration = 'none';
        linkk.style.color = 'white';
        linkk.style.fontFamily = 'Arial';

        // Closure pentru event handlers
        (function(link, itemText) {
            drpitem.addEventListener('mouseenter', function() {
                drpitem.style.backgroundColor = 'rgba(0, 122, 255, 0.8)';
                link.style.color = 'white';
            });

            drpitem.addEventListener('mouseleave', function() {
                link.style.color = 'white';
                drpitem.style.backgroundColor = 'rgba(50,50,50,0)';
            });

            drpitem.addEventListener('click', function() {
                dropdn.style.display = 'none';
                executeMenuAction(itemText);
            });
        })(linkk, items[i]);

        drpitem.appendChild(linkk);
        dropdn.appendChild(drpitem);
        maxItemWidth = Math.max(maxItemWidth, drpitem.offsetWidth);
    }

    dropdn.style.width = (maxItemWidth + 40) + 'px';

    // Menu pentru Desktop
    var menu2 = document.createElement('div');
    menu2.className = 'menu';
    menu2.style.backgroundColor = 'rgba(0,0,0,0)';
    menu2.style.width = '5%';
    menu2.style.height = '5%';
    menu2.style.position = 'relative';
    menu2.style.display = 'block';
    menu2.style.zIndex = '3';
    leftStatusSection.appendChild(menu2);

    var desktopItems = ["Despre Desktop", "Schimbă fundal", "separator", "Minimizează tot", "Ascunde tot", "separator", "Golește coșul"];

    var dropdn1 = document.createElement('div');
    dropdn1.className = 'dropdown';
    dropdn1.style.position = 'absolute';
    dropdn1.style.top = '95%';
    dropdn1.style.left = '0%';
    dropdn1.style.width = 'auto';
    dropdn1.style.backgroundColor = 'rgba(50,50,50,0.5)';
    dropdn1.style.backdropFilter = 'blur(25px)';
    dropdn1.style.borderColor = 'rgba(100,100,100,1)';
    dropdn1.style.borderStyle = 'solid';
    dropdn1.style.borderWidth = '0.5px';
    dropdn1.style.borderRadius = '10px';
    dropdn1.style.flexDirection = 'column';
    dropdn1.style.alignContent = 'start';
    dropdn1.style.justifyContent = 'left';
    dropdn1.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.3)';
    dropdn1.style.zIndex = '5';
    dropdn1.style.display = 'none';
    dropdn1.style.padding = '6px 0';
    menu2.appendChild(dropdn1);

    for (var i = 0; i < desktopItems.length; i++) {
        if (desktopItems[i] === "separator") {
            var separator = document.createElement('div');
            separator.style.height = '1px';
            separator.style.marginTop = '2px';
            separator.style.marginBottom = '2px';
            separator.style.backgroundColor = 'rgba(100,100,100,1)';
            dropdn1.appendChild(separator);
            continue;
        }

        var drpitem = document.createElement('div');
        drpitem.className = 'drpitem';
        drpitem.style.fontFamily = 'Arial';
        drpitem.style.color = 'white';
        drpitem.style.padding = '8px 16px';
        drpitem.style.position = 'relative';
        drpitem.style.cursor = 'pointer';
        drpitem.style.fontSize = '13px';

        var linkk = document.createElement('a');
        linkk.href = "#";
        linkk.innerText = desktopItems[i];
        linkk.style.textDecoration = 'none';
        linkk.style.color = 'white';
        linkk.style.fontFamily = 'Arial';

        (function(link, itemText) {
            drpitem.addEventListener('mouseenter', function() {
                drpitem.style.backgroundColor = 'rgba(0, 122, 255, 0.8)';
                link.style.color = 'white';
            });

            drpitem.addEventListener('mouseleave', function() {
                link.style.color = 'white';
                drpitem.style.backgroundColor = 'rgba(50,50,50,0)';
            });

            drpitem.addEventListener('click', function() {
                dropdn1.style.display = 'none';
                executeDesktopAction(itemText);
            });
        })(linkk, desktopItems[i]);

        drpitem.appendChild(linkk);
        dropdn1.appendChild(drpitem);
    }

    dropdn1.style.width = '180px';

    // Event listeners pentru dropdown-uri - REPARAT!
    logo.addEventListener('click', function(e) {
        e.stopPropagation();
        var isVisible = dropdn.style.display === 'block';
        hideAllDropdowns();
        if (!isVisible) {
            dropdn.style.display = 'block';
        }
    });

    name.addEventListener('click', function(e) {
        e.stopPropagation();
        var isVisible = dropdn1.style.display === 'block';
        hideAllDropdowns();
        if (!isVisible) {
            dropdn1.style.display = 'block';
        }
    });

    function hideAllDropdowns() {
        dropdn.style.display = 'none';
        dropdn1.style.display = 'none';
    }

    document.addEventListener('click', hideAllDropdowns);

    // Functii pentru actiunile din meniu
    function executeMenuAction(action) {
        switch(action) {
            case "Despre acest Mac":
                showModal("Despre acest Mac", `
                    <h3>macOS Desktop Simulator</h3>
                    <p><strong>Versiune:</strong> 1.0</p>
                    <p><strong>Procesor:</strong> Simulator CPU</p>
                    <p><strong>Memorie:</strong> Virtual RAM</p>
                    <p><strong>Grafică:</strong> Web Renderer</p>
                    <br>
                    <p>© 2024 Desktop Simulator</p>
                `);
                break;
            case "Preferințe de sistem":
                openSystemPreferences();
                break;
            case "App Store":
                openAppStore();
                break;
            case "Forțează închiderea":
                showForceQuit();
                break;
            case "Repornire":
                confirmAction("Repornire", "Ești sigur că vrei să repornești?", function() {
                    location.reload();
                });
                break;
            case "Oprire":
                confirmAction("Oprire", "Ești sigur că vrei să oprești computerul?", function() {
                    document.body.style.background = 'black';
                    document.body.innerHTML = '<div style="text-align:center; color:white; padding-top:50vh; font-family: Arial;">Sistemul s-a oprit</div>';
                });
                break;
            case "Blocare ecran":
                lockScreen();
                break;
            case "Deconectare":
                confirmAction("Deconectare", "Ești sigur că vrei să te deconectezi?", function() {
                    location.reload();
                });
                break;
        }
    }

    function executeDesktopAction(action) {
        switch(action) {
            case "Despre Desktop":
                showModal("Despre Desktop", `
                    <h3>Informații Desktop</h3>
                    <p><strong>Nume:</strong> Desktop</p>
                    <p><strong>Dimensiune ecran:</strong> ${window.innerWidth} x ${window.innerHeight}</p>
                    <p><strong>Aplicații deschise:</strong> ${openWindows.length}</p>
                `);
                break;
            case "Schimbă fundal":
                changeWallpaper();
                break;
            case "Minimizează tot":
                minimizeAllWindows();
                break;
            case "Ascunde tot":
                hideAllWindows();
                break;
            case "Golește coșul":
                showModal("Golire coș", "Coșul este gol!");
                break;
        }
    }

    // Functii utilitare
    function showModal(title, content) {
        var modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.zIndex = '10000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.backdropFilter = 'blur(10px)';

        var modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'rgba(40, 40, 40, 0.95)';
        modalContent.style.margin = '10% auto';
        modalContent.style.padding = '20px';
        modalContent.style.border = '1px solid rgba(100,100,100,0.3)';
        modalContent.style.borderRadius = '15px';
        modalContent.style.width = '400px';
        modalContent.style.color = 'white';
        modalContent.style.backdropFilter = 'blur(25px)';
        modalContent.style.boxShadow = '0px 20px 40px rgba(0,0,0,0.5)';
        modalContent.style.fontFamily = 'Arial';

        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.color = '#999';
        closeBtn.style.float = 'right';
        closeBtn.style.fontSize = '28px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = function() { modal.remove(); };

        var titleElement = document.createElement('h2');
        titleElement.innerText = title;

        var contentElement = document.createElement('div');
        contentElement.innerHTML = content;

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(titleElement);
        modalContent.appendChild(contentElement);
        modal.appendChild(modalContent);

        modal.onclick = function(e) {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    }

    function confirmAction(title, message, callback) {
        var modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.zIndex = '10000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.backdropFilter = 'blur(10px)';

        var modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'rgba(40, 40, 40, 0.95)';
        modalContent.style.margin = '15% auto';
        modalContent.style.padding = '20px';
        modalContent.style.border = '1px solid rgba(100,100,100,0.3)';
        modalContent.style.borderRadius = '15px';
        modalContent.style.width = '350px';
        modalContent.style.color = 'white';
        modalContent.style.backdropFilter = 'blur(25px)';
        modalContent.style.boxShadow = '0px 20px 40px rgba(0,0,0,0.5)';
        modalContent.style.fontFamily = 'Arial';
        modalContent.style.textAlign = 'center';

        var titleElement = document.createElement('h3');
        titleElement.innerText = title;

        var messageElement = document.createElement('p');
        messageElement.innerText = message;

        var buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.textAlign = 'right';

        var cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Anulează';
        cancelBtn.style.background = '#666';
        cancelBtn.style.color = 'white';
        cancelBtn.style.border = 'none';
        cancelBtn.style.padding = '10px 20px';
        cancelBtn.style.borderRadius = '6px';
        cancelBtn.style.cursor = 'pointer';
        cancelBtn.style.marginRight = '10px';
        cancelBtn.onclick = function() { modal.remove(); };

        var confirmBtn = document.createElement('button');
        confirmBtn.innerText = 'Confirmă';
        confirmBtn.style.background = '#007AFF';
        confirmBtn.style.color = 'white';
        confirmBtn.style.border = 'none';
        confirmBtn.style.padding = '10px 20px';
        confirmBtn.style.borderRadius = '6px';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.onclick = function() {
            modal.remove();
            callback();
        };

        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(confirmBtn);

        modalContent.appendChild(titleElement);
        modalContent.appendChild(messageElement);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }

    function openSystemPreferences() {
        createWindow("Preferințe de sistem", `
            <h3>Preferințe de sistem</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
                <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                    <div style="font-size: 24px; margin-bottom: 5px;">🎨</div>
                    <div>Desktop</div>
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                    <div style="font-size: 24px; margin-bottom: 5px;">🔊</div>
                    <div>Sunet</div>
                </div>
                <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                    <div style="font-size: 24px; margin-bottom: 5px;">🌐</div>
                    <div>Rețea</div>
                </div>
            </div>
        `);
    }

    function openAppStore() {
        createWindow("App Store", `
            <h3>App Store</h3>
            <div style="margin-top: 20px;">
                <h4>Aplicații recomandate:</h4>
                <div style="display: flex; gap: 15px; margin-top: 15px;">
                    <div style="background: rgba(70,70,70,0.5); padding: 15px; border-radius: 8px; flex: 1;">
                        <h5>📝 TextEdit Pro</h5>
                        <p style="font-size: 12px; color: #ccc;">Editor de text avansat</p>
                        <button style="background: #007AFF; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Instalează</button>
                    </div>
                    <div style="background: rgba(70,70,70,0.5); padding: 15px; border-radius: 8px; flex: 1;">
                        <h5>🎵 Music Player</h5>
                        <p style="font-size: 12px; color: #ccc;">Player audio modern</p>
                        <button style="background: #007AFF; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Instalează</button>
                    </div>
                </div>
            </div>
        `);
    }

    function showForceQuit() {
        var apps = openWindows.length > 0 ? openWindows.map(w => w.title).join('<br>') : 'Nu există aplicații deschise';
        showModal("Forțează închiderea", `
            <h3>Aplicații deschise:</h3>
            <div style="margin: 20px 0; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px;">
                ${apps}
            </div>
        `);
    }

    function lockScreen() {
        var lockDiv = document.createElement('div');
        lockDiv.style.position = 'fixed';
        lockDiv.style.top = '0';
        lockDiv.style.left = '0';
        lockDiv.style.width = '100%';
        lockDiv.style.height = '100%';
        lockDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        lockDiv.style.zIndex = '20000';
        lockDiv.style.display = 'flex';
        lockDiv.style.flexDirection = 'column';
        lockDiv.style.justifyContent = 'center';
        lockDiv.style.alignItems = 'center';
        lockDiv.style.color = 'white';
        lockDiv.style.fontFamily = 'Arial';

        var timeDisplay = document.createElement('div');
        timeDisplay.style.fontSize = '72px';
        timeDisplay.style.fontWeight = '200';
        timeDisplay.style.marginBottom = '10px';
        var now = new Date();
        timeDisplay.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        var dateDisplay = document.createElement('div');
        dateDisplay.style.fontSize = '24px';
        dateDisplay.style.fontWeight = '300';
        dateDisplay.style.marginBottom = '50px';
        dateDisplay.innerText = now.toLocaleDateString('ro-RO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        var unlockBtn = document.createElement('button');
        unlockBtn.innerText = 'Apasă pentru a debloca';
        unlockBtn.style.background = 'rgba(255,255,255,0.2)';
        unlockBtn.style.border = '2px solid rgba(255,255,255,0.3)';
        unlockBtn.style.color = 'white';
        unlockBtn.style.padding = '15px 30px';
        unlockBtn.style.borderRadius = '25px';
        unlockBtn.style.fontSize = '16px';
        unlockBtn.style.cursor = 'pointer';
        unlockBtn.style.backdropFilter = 'blur(10px)';
        unlockBtn.onclick = function() { lockDiv.remove(); };

        lockDiv.appendChild(timeDisplay);
        lockDiv.appendChild(dateDisplay);
        lockDiv.appendChild(unlockBtn);
        document.body.appendChild(lockDiv);
    }

    function changeWallpaper() {
        var wallpapers = [
            'https://4kwallpapers.com/images/wallpapers/macos-ventura-macos-13-macos-2022-stock-dark-mode-5k-retina-2048x1536-8133.jpg',
            'https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-blue-light-waves-5k-6016x6016-4957.jpg',
            'https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg'
        ];
        var currentWallpaper = wallpaper.style.backgroundImage;
        var nextIndex = 0;
        for (var i = 0; i < wallpapers.length; i++) {
            if (currentWallpaper.includes(wallpapers[i])) {
                nextIndex = (i + 1) % wallpapers.length;
                break;
            }
        }
        wallpaper.style.backgroundImage = 'url(' + wallpapers[nextIndex] + ')';
    }

    function minimizeAllWindows() {
        openWindows.forEach(function(window) {
            window.element.style.transform = 'scale(0.1)';
            window.element.style.opacity = '0';
            setTimeout(function() {
                window.element.style.display = 'none';
            }, 300);
        });
    }

    function hideAllWindows() {
        openWindows.forEach(function(window) {
            window.element.style.opacity = '0';
            setTimeout(function() {
                window.element.style.display = 'none';
            }, 200);
        });
    }

    function createWindow(title, content) {
        var windowElement = document.createElement('div');
        windowElement.style.position = 'absolute';
        windowElement.style.background = 'rgba(50, 50, 50, 0.95)';
        windowElement.style.border = '1px solid rgba(100,100,100,0.3)';
        windowElement.style.borderRadius = '10px';
        windowElement.style.minWidth = '400px';
        windowElement.style.minHeight = '300px';
        windowElement.style.backdropFilter = 'blur(25px)';
        windowElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
        windowElement.style.zIndex = ++windowZIndex;
        windowElement.style.left = (50 + openWindows.length * 30) + 'px';
        windowElement.style.top = (100 + openWindows.length * 30) + 'px';

        var windowHeader = document.createElement('div');
        windowHeader.style.height = '30px';
        windowHeader.style.background = 'rgba(60, 60, 60, 0.8)';
        windowHeader.style.borderRadius = '10px 10px 0 0';
        windowHeader.style.display = 'flex';
        windowHeader.style.alignItems = 'center';
        windowHeader.style.padding = '0 10px';
        windowHeader.style.borderBottom = '1px solid rgba(100,100,100,0.2)';
        windowHeader.style.cursor = 'move';

        var windowControls = document.createElement('div');
        windowControls.style.display = 'flex';
        windowControls.style.gap = '6px';

        var closeBtn = document.createElement('div');
        closeBtn.style.width = '12px';
        closeBtn.style.height = '12px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.backgroundColor = '#ff5f57';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = function() {
            windowElement.remove();
            openWindows = openWindows.filter(function(w) { return w.element !== windowElement; });
        };

        var minimizeBtn = document.createElement('div');
        minimizeBtn.style.width = '12px';
        minimizeBtn.style.height = '12px';
        minimizeBtn.style.borderRadius = '50%';
        minimizeBtn.style.backgroundColor = '#ffbd2e';
        minimizeBtn.style.cursor = 'pointer';
        minimizeBtn.onclick = function() {
            windowElement.style.transform = 'scale(0.1)';
            windowElement.style.opacity = '0.5';
        };

        var maximizeBtn = document.createElement('div');
        maximizeBtn.style.width = '12px';
        maximizeBtn.style.height = '12px';
        maximizeBtn.style.borderRadius = '50%';
        maximizeBtn.style.backgroundColor = '#28ca42';
        maximizeBtn.style.cursor = 'pointer';
        maximizeBtn.onclick = function() {
            if (windowElement.style.width === '100%') {
                windowElement.style.width = '400px';
                windowElement.style.height = '300px';
                windowElement.style.left = (50 + openWindows.length * 30) + 'px';
                windowElement.style.top = (100 + openWindows.length * 30) + 'px';
            } else {
                windowElement.style.width = '100%';
                windowElement.style.height = '100%';
                windowElement.style.left = '0';
                windowElement.style.top = '0';
            }
        };

        windowControls.appendChild(closeBtn);
        windowControls.appendChild(minimizeBtn);
        windowControls.appendChild(maximizeBtn);

        var windowTitle = document.createElement('div');
        windowTitle.style.flex = '1';
        windowTitle.style.textAlign = 'center';
        windowTitle.style.color = 'white';
        windowTitle.style.fontSize = '13px';
        windowTitle.style.fontWeight = '500';
        windowTitle.style.fontFamily = 'Arial';
        windowTitle.innerText = title;

        windowHeader.appendChild(windowControls);
        windowHeader.appendChild(windowTitle);

        var windowContent = document.createElement('div');
        windowContent.style.padding = '20px';
        windowContent.style.color = 'white';
        windowContent.style.height = 'calc(100% - 51px)';
        windowContent.style.overflow = 'auto';
        windowContent.style.fontFamily = 'Arial';
        windowContent.innerHTML = content;

        windowElement.appendChild(windowHeader);
        windowElement.appendChild(windowContent);

        // Drag functionality
        makeDraggable(windowElement, windowHeader);

        windowElement.onclick = function() {
            windowElement.style.zIndex = ++windowZIndex;
        };

        dscontainer.appendChild(windowElement);
        openWindows.push({ title: title, element: windowElement });
    }

    function makeDraggable(element, handle) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        handle.onmousedown = function(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = function() {
                document.onmouseup = null;
                document.onmousemove = null;
            };
            document.onmousemove = function(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            };
        };
    }

    // Iconite pe desktop
    var desktopIcons = [
        { name: 'Trash', icon: '🗑️', x: 90, y: 15 },
        { name: 'Documents', icon: '📁', x: 90, y: 25 },
        { name: 'Photos', icon: '🖼️', x: 90, y: 35 },
        { name: 'Music', icon: '🎵', x: 90, y: 45 },
        { name: 'Downloads', icon: '⬇️', x: 90, y: 55 },
        { name: 'Applications', icon: '📱', x: 90, y: 65 }
    ];

    desktopIcons.forEach(function(iconData) {
        var iconElement = document.createElement('div');
        iconElement.style.position = 'absolute';
        iconElement.style.left = iconData.x + '%';
        iconElement.style.top = iconData.y + '%';
        iconElement.style.width = '80px';
        iconElement.style.zIndex = '50';
        iconElement.style.cursor = 'pointer';
        iconElement.style.textAlign = 'center';
        iconElement.style.color = 'white';
        iconElement.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
        iconElement.style.fontFamily = 'Arial';
        iconElement.style.fontSize = '12px';
        iconElement.style.transition = 'transform 0.2s ease';
        iconElement.style.userSelect = 'none';

        var iconImage = document.createElement('div');
        iconImage.innerHTML = iconData.icon;
        iconImage.style.width = '64px';
        iconImage.style.height = '64px';
        iconImage.style.fontSize = '32px';
        iconImage.style.display = 'flex';
        iconImage.style.alignItems = 'center';
        iconImage.style.justifyContent = 'center';
        iconImage.style.background = 'rgba(255,255,255,0.1)';
        iconImage.style.backdropFilter = 'blur(10px)';
        iconImage.style.borderRadius = '15px';
        iconImage.style.margin = '0 auto 5px auto';
        iconImage.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';

        var iconLabel = document.createElement('div');
        iconLabel.innerText = iconData.name;
        iconLabel.style.marginTop = '5px';

        iconElement.appendChild(iconImage);
        iconElement.appendChild(iconLabel);

        iconElement.addEventListener('mouseenter', function() {
            iconElement.style.transform = 'scale(1.1)';
        });

        iconElement.addEventListener('mouseleave', function() {
            iconElement.style.transform = 'scale(1)';
        });

        iconElement.ondblclick = function() {
            switch(iconData.name) {
                case 'Trash':
                    createWindow('Coș', '<p>Coșul este gol.</p>');
                    break;
                case 'Documents':
                    createWindow('Documente', `
                        <h4>Documente recente:</h4>
                        <div style="margin-top: 10px;">
                            <div style="padding: 8px; background: rgba(70,70,70,0.5); margin: 5px 0; border-radius: 4px;">📄 Document1.txt</div>
                            <div style="padding: 8px; background: rgba(70,70,70,0.5); margin: 5px 0; border-radius: 4px;">📄 Raport.docx</div>
                            <div style="padding: 8px; background: rgba(70,70,70,0.5); margin: 5px 0; border-radius: 4px;">📊 Date.xlsx</div>
                        </div>
                    `);
                    break;
                case 'Photos':
                    createWindow('Fotografii', `
                        <h4>Album foto:</h4>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 15px;">
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 8px;"></div>
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #45b7d1, #96ceb4); border-radius: 8px;"></div>
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #f9ca24, #f0932b); border-radius: 8px;"></div>
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #eb4d4b, #6c5ce7); border-radius: 8px;"></div>
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #a29bfe, #fd79a8); border-radius: 8px;"></div>
                            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #00b894, #00cec9); border-radius: 8px;"></div>
                        </div>
                    `);
                    break;
                case 'Music':
                    createWindow('Muzică', `
                        <h4>🎵 Player muzical</h4>
                        <div style="text-align: center; margin: 30px 0;">
                            <div style="font-size: 48px; margin-bottom: 20px;">🎧</div>
                            <h5>Acum se redă: Cântec de test</h5>
                            <div style="margin: 20px 0;">
                                <button style="background: none; border: none; color: white; font-size: 24px; margin: 0 10px; cursor: pointer;">⏮️</button>
                                <button style="background: none; border: none; color: white; font-size: 32px; margin: 0 10px; cursor: pointer;">⏯️</button>
                                <button style="background: none; border: none; color: white; font-size: 24px; margin: 0 10px; cursor: pointer;">⏭️</button>
                            </div>
                            <div style="background: rgba(70,70,70,0.5); height: 4px; border-radius: 2px; margin: 20px 0;">
                                <div style="background: #007AFF; height: 100%; width: 30%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    `);
                    break;
                case 'Downloads':
                    createWindow('Descărcări', `
                        <h4>Fișiere descărcate:</h4>
                        <div style="margin-top: 15px;">
                            <div style="display: flex; align-items: center; padding: 10px; background: rgba(70,70,70,0.5); margin: 5px 0; border-radius: 6px;">
                                <span style="margin-right: 10px;">📄</span>
                                <div style="flex: 1;">
                                    <div>document_important.pdf</div>
                                    <div style="font-size: 11px; color: #999;">2.3 MB - Azi, 14:30</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; padding: 10px; background: rgba(70,70,70,0.5); margin: 5px 0; border-radius: 6px;">
                                <span style="margin-right: 10px;">🖼️</span>
                                <div style="flex: 1;">
                                    <div>imagine_desktop.jpg</div>
                                    <div style="font-size: 11px; color: #999;">1.8 MB - Ieri, 16:45</div>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                case 'Applications':
                    createWindow('Aplicații', `
                        <h4>Aplicații instalate:</h4>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px;">
                            <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;">
                                <div style="font-size: 32px; margin-bottom: 8px;">🔢</div>
                                <div style="font-size: 12px;">Calculator</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;">
                                <div style="font-size: 32px; margin-bottom: 8px;">📝</div>
                                <div style="font-size: 12px;">Note</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;">
                                <div style="font-size: 32px; margin-bottom: 8px;">💻</div>
                                <div style="font-size: 12px;">Terminal</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;">
                                <div style="font-size: 32px; margin-bottom: 8px;">🕐</div>
                                <div style="font-size: 12px;">Ceas</div>
                            </div>
                        </div>
                    `);
                    break;
            }
        };

        dscontainer.appendChild(iconElement);
    });

    // DOCK - Codul tau original pentru appbar, dar imbunatatit
    var appbar = document.createElement('div');
    appbar.className = 'bar';
    appbar.style.top = "90%";
    appbar.style.position = 'absolute';
    appbar.style.display = 'flex';
    appbar.style.justifyContent = 'center';
    appbar.style.alignItems = 'center';
    appbar.style.flexDirection = 'row';
    appbar.style.minHeight = '8%';
    appbar.style.backgroundColor = 'rgba(50,50,50,0.4)';
    appbar.style.backdropFilter = 'blur(30px)';
    appbar.style.zIndex = '4';
    appbar.style.gap = '5px';
    appbar.style.borderColor = 'rgba(100,100,100,1)';
    appbar.style.borderStyle = 'solid';
    appbar.style.borderWidth = '0.5px';
    appbar.style.borderRadius = '20px';
    appbar.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.4)';
    appbar.style.left = '50%';
    appbar.style.transform = 'translateX(-50%)';
    appbar.style.padding = '10px 15px';
    dscontainer.appendChild(appbar);

    var appIcons = [];
    var colors = ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6', '#e67e22', '#95a5a6', '#2c3e50', '#34495e'];
    var icons = ['📁', '🌐', '📧', '📅', '🖼️', '🎵', '⚙️', '💻', '📝'];

    for (var i = 0; i < 9; i++) {
        var appIcon = document.createElement('div');
        appIcon.style.width = '50px';
        appIcon.style.height = '50px';
        appIcon.style.position = 'relative';
        appIcon.style.zIndex = '5';
        appIcon.style.border = 'none';
        appIcon.style.borderRadius = '12px';
        appIcon.style.backgroundColor = colors[i];
        appIcon.style.display = 'flex';
        appIcon.style.alignItems = 'center';
        appIcon.style.justifyContent = 'center';
        appIcon.style.fontSize = '24px';
        appIcon.style.cursor = 'pointer';
        appIcon.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        appIcon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        appIcon.innerHTML = icons[i];
        
        appIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) translateY(-8px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
        });
        
        appIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        appIcon.addEventListener('click', function() {
            // Click animation
            this.style.transform = 'scale(0.9)';
            var self = this;
            setTimeout(function() {
                self.style.transform = 'scale(1.1)';
                setTimeout(function() {
                    self.style.transform = 'scale(1)';
                }, 100);
            }, 50);
        });

        appIcons.push(appIcon);
        appbar.appendChild(appIcon);
    }

    // Context menu pentru desktop
    dscontainer.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        var existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();
        
        var contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        contextMenu.style.background = 'rgba(50,50,50,0.95)';
        contextMenu.style.backdropFilter = 'blur(25px)';
        contextMenu.style.border = '1px solid rgba(100,100,100,0.5)';
        contextMenu.style.borderRadius = '8px';
        contextMenu.style.padding = '8px 0';
        contextMenu.style.minWidth = '180px';
        contextMenu.style.zIndex = '1000';
        contextMenu.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
        contextMenu.style.color = 'white';
        contextMenu.style.fontSize = '13px';
        contextMenu.style.fontFamily = 'Arial';
        
        var menuItems = [
            { text: 'Folder nou', action: function() { showModal('Info', 'Folder nou creat!'); } },
            { text: 'Fișier nou', action: function() { showModal('Info', 'Fișier nou creat!'); } },
            { text: 'Schimbă fundalul', action: changeWallpaper },
            { text: 'Proprietăți desktop', action: function() { executeDesktopAction('Despre Desktop'); } }
        ];
        
        menuItems.forEach(function(item) {
            var menuItem = document.createElement('div');
            menuItem.style.padding = '8px 16px';
            menuItem.style.cursor = 'pointer';
            menuItem.innerText = item.text;
            
            menuItem.addEventListener('mouseenter', function() {
                menuItem.style.background = 'rgba(0, 122, 255, 0.8)';
            });
            
            menuItem.addEventListener('mouseleave', function() {
                menuItem.style.background = 'transparent';
            });
            
            menuItem.addEventListener('click', function() {
                contextMenu.remove();
                item.action();
            });
            
            contextMenu.appendChild(menuItem);
        });
        
        document.body.appendChild(contextMenu);
        
        setTimeout(function() {
            document.addEventListener('click', function removeMenu() {
                if (contextMenu.parentNode) contextMenu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    });

    // Update app bar width on resize - codul tau original
    function updateAppBarWidth() {
        var totalIconWidth = 0;
        for (var i = 0; i < appIcons.length; i++) {
            totalIconWidth += 60; // 50px width + 10px gap
        }
        appbar.style.width = totalIconWidth + 'px';

        if (window.innerWidth < 600) {
            appbar.style.minWidth = '30%';
        } else if (window.innerWidth < 900) {
            appbar.style.minWidth = '50%';
        } else {
            appbar.style.minWidth = '1%';
        }
    }
    
    window.addEventListener('resize', updateAppBarWidth);
    updateAppBarWidth();

    console.log('macOS Desktop Simulator încărcat cu succes!');
});

// Codul tau original pentru calculator si fetch
function calculate(a, b) {
    return {
        add: function() {
            return a + b;
        },
        substract: function() {
            return a - b;
        },
        multiply: function() {
            return a * b;
        },
        divide: function() {
            return a / b;
        }
    }
}
const calculator = calculate(10, 5);
console.log(calculator.add());
console.log(calculator.substract());
console.log(calculator.multiply());
console.log(calculator.divide());

fetch("https://jsonplaceholder.typicode.com/users/2")
.then(response => response.json())
.then(json => console.log("name: " + json.name + "; street:" + json.address.street)) 
.catch(error => console.log(error));
