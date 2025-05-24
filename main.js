document.addEventListener('DOMContentLoaded', function() {
            // Variables globale
            let currentTime = new Date();
            let openWindows = [];
            let windowZIndex = 100;
            
            // Container principal
            var dscontainer = document.createElement('div');
            dscontainer.className = 'desktop-container';
            dscontainer.style.width = '100%';
            dscontainer.style.height = '100%';
            dscontainer.style.display = 'flex';
            dscontainer.style.justifyContent = 'center';
            dscontainer.style.alignItems = 'center';
            dscontainer.style.flexDirection = 'column';
            dscontainer.style.position = 'relative';
            document.body.appendChild(dscontainer);

            // Wallpaper
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

            // Container superior
            var upContainer = document.createElement('div');
            upContainer.style.position = 'absolute';
            upContainer.style.top = '0';
            upContainer.style.left = '0';
            upContainer.style.width = '100%';
            upContainer.style.height = '50%';
            upContainer.style.zIndex = '10';
            dscontainer.appendChild(upContainer);

            // Status Bar
            var statusBar = document.createElement('div');
            statusBar.className = 'status-bar';
            statusBar.style.backgroundColor = 'rgba(50,50,50,0.3)';
            statusBar.style.width = '100%';
            statusBar.style.height = '30px';
            statusBar.style.top = '0';
            statusBar.style.left = '0';
            statusBar.style.display = 'flex';
            statusBar.style.position = 'absolute';
            statusBar.style.zIndex = '20';
            statusBar.style.padding = '0 10px';
            statusBar.style.alignItems = 'center';
            statusBar.style.flexDirection = 'row';
            statusBar.style.justifyContent = 'space-between';
            statusBar.style.backdropFilter = 'blur(80px)';
            upContainer.appendChild(statusBar);

            // Partea stângă a status bar
            var leftSection = document.createElement('div');
            leftSection.style.display = 'flex';
            leftSection.style.alignItems = 'center';
            leftSection.style.gap = '10px';
            statusBar.appendChild(leftSection);

            // Logo Apple
            var logo = document.createElement('div');
            logo.className = 'apple-logo';
            logo.innerHTML = '🍎';
            logo.style.fontSize = '16px';
            logo.style.cursor = 'pointer';
            logo.style.userSelect = 'none';
            leftSection.appendChild(logo);

            // Meniul principal Apple
            var menu = document.createElement('div');
            menu.className = 'menu';
            menu.style.position = 'relative';
            menu.style.display = 'inline-block';
            leftSection.appendChild(menu);

            // Desktop name
            var desktopName = document.createElement('div');
            desktopName.innerText = "Desktop";
            desktopName.style.color = 'white';
            desktopName.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            desktopName.style.fontWeight = 'bold';
            desktopName.style.fontSize = '14px';
            desktopName.style.cursor = 'pointer';
            desktopName.style.padding = '5px 8px';
            desktopName.style.borderRadius = '4px';
            desktopName.style.userSelect = 'none';
            leftSection.appendChild(desktopName);

            // Partea dreaptă a status bar (ceas și alți indicatori)
            var rightSection = document.createElement('div');
            rightSection.style.display = 'flex';
            rightSection.style.alignItems = 'center';
            rightSection.style.gap = '10px';
            rightSection.style.fontSize = '13px';
            rightSection.style.color = 'white';
            statusBar.appendChild(rightSection);

            // Indicatori sistem
            var wifiIcon = document.createElement('div');
            wifiIcon.innerHTML = '📶';
            wifiIcon.style.cursor = 'pointer';
            rightSection.appendChild(wifiIcon);

            var batteryIcon = document.createElement('div');
            batteryIcon.innerHTML = '🔋';
            batteryIcon.style.cursor = 'pointer';
            rightSection.appendChild(batteryIcon);

            // Ceas
            var clock = document.createElement('div');
            clock.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            clock.style.fontWeight = '500';
            rightSection.appendChild(clock);

            // Dropdown pentru meniul Apple
            var appleDropdown = createDropdown([
                { text: "Despre acest Mac", action: () => showAboutDialog() },
                { separator: true },
                { text: "Preferințe de sistem", action: () => openSystemPreferences() },
                { text: "App Store", action: () => openAppStore() },
                { separator: true },
                { text: "Forțează închiderea", action: () => showForceQuit() },
                { text: "Repornire", action: () => confirmRestart() },
                { text: "Oprire", action: () => confirmShutdown() },
                { separator: true },
                { text: "Blocare ecran", action: () => lockScreen() },
                { text: "Deconectare", action: () => confirmLogout() }
            ]);
            
            menu.appendChild(appleDropdown);

            // Dropdown pentru Desktop
            var desktopDropdown = createDropdown([
                { text: "Despre Desktop", action: () => showDesktopInfo() },
                { text: "Schimbă fundal", action: () => changeWallpaper() },
                { separator: true },
                { text: "Minimizează tot", action: () => minimizeAllWindows() },
                { text: "Ascunde tot", action: () => hideAllWindows() },
                { separator: true },
                { text: "Golește coșul", action: () => emptyTrash() }
            ]);
            
            var desktopMenu = document.createElement('div');
            desktopMenu.style.position = 'relative';
            desktopMenu.style.display = 'inline-block';
            desktopMenu.appendChild(desktopDropdown);
            leftSection.appendChild(desktopMenu);

            // Funcție pentru crearea dropdown-urilor
            function createDropdown(items) {
                var dropdown = document.createElement('div');
                dropdown.className = 'dropdown';
                dropdown.style.position = 'absolute';
                dropdown.style.top = '100%';
                dropdown.style.left = '0';
                dropdown.style.minWidth = '200px';
                dropdown.style.backgroundColor = 'rgba(50,50,50,0.95)';
                dropdown.style.backdropFilter = 'blur(25px)';
                dropdown.style.borderColor = 'rgba(100,100,100,0.5)';
                dropdown.style.borderStyle = 'solid';
                dropdown.style.borderWidth = '1px';
                dropdown.style.borderRadius = '8px';
                dropdown.style.boxShadow = '0px 8px 25px rgba(0,0,0,0.4)';
                dropdown.style.zIndex = '1000';
                dropdown.style.display = 'none';
                dropdown.style.padding = '6px 0';

                items.forEach((item, index) => {
                    if (item.separator) {
                        var separator = document.createElement('div');
                        separator.style.height = '1px';
                        separator.style.backgroundColor = 'rgba(100,100,100,0.3)';
                        separator.style.margin = '6px 0';
                        dropdown.appendChild(separator);
                    } else {
                        var menuItem = document.createElement('div');
                        menuItem.style.padding = '8px 16px';
                        menuItem.style.color = 'white';
                        menuItem.style.fontSize = '13px';
                        menuItem.style.cursor = 'pointer';
                        menuItem.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
                        menuItem.innerText = item.text;
                        
                        menuItem.addEventListener('mouseenter', function() {
                            menuItem.style.backgroundColor = 'rgba(0, 122, 255, 0.8)';
                        });
                        
                        menuItem.addEventListener('mouseleave', function() {
                            menuItem.style.backgroundColor = 'transparent';
                        });
                        
                        menuItem.addEventListener('click', function() {
                            dropdown.style.display = 'none';
                            if (item.action) item.action();
                        });
                        
                        dropdown.appendChild(menuItem);
                    }
                });

                return dropdown;
            }

            // Event listeners pentru dropdown-uri
            logo.addEventListener('click', function(e) {
                e.stopPropagation();
                var dropdown = menu.querySelector('.dropdown');
                var isVisible = dropdown.style.display === 'block';
                hideAllDropdowns();
                if (!isVisible) {
                    dropdown.style.display = 'block';
                }
            });

            desktopName.addEventListener('click', function(e) {
                e.stopPropagation();
                var dropdown = desktopMenu.querySelector('.dropdown');
                var isVisible = dropdown.style.display === 'block';
                hideAllDropdowns();
                if (!isVisible) {
                    dropdown.style.display = 'block';
                }
            });

            // Funcție pentru ascunderea tuturor dropdown-urilor
            function hideAllDropdowns() {
                var dropdowns = document.querySelectorAll('.dropdown');
                dropdowns.forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
            }

            // Ascunde dropdown-urile când se face click în altă parte
            document.addEventListener('click', hideAllDropdowns);

            // Funcții pentru acțiunile din meniu
            function showAboutDialog() {
                showModal("Despre acest Mac", `
                    <h3>macOS Desktop Simulator</h3>
                    <p><strong>Versiune:</strong> 1.0</p>
                    <p><strong>Procesor:</strong> Simulator CPU</p>
                    <p><strong>Memorie:</strong> Virtual RAM</p>
                    <p><strong>Grafică:</strong> Web Renderer</p>
                    <br>
                    <p>© 2024 Desktop Simulator. Toate drepturile rezervate.</p>
                `);
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
                        <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                            <div style="font-size: 24px; margin-bottom: 5px;">🔒</div>
                            <div>Securitate</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                            <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
                            <div>Energie</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px; cursor: pointer;">
                            <div style="font-size: 24px; margin-bottom: 5px;">👤</div>
                            <div>Utilizatori</div>
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
                var apps = openWindows.map(w => w.title).join('<br>');
                if (apps === '') apps = 'Nu există aplicații deschise';
                
                showModal("Forțează închiderea", `
                    <h3>Selectează aplicația de închis:</h3>
                    <div style="margin: 20px 0; padding: 15px; background: rgba(70,70,70,0.5); border-radius: 8px;">
                        ${apps}
                    </div>
                    <button onclick="this.closest('.modal').remove()" style="background: #FF3B30; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Închide tot</button>
                `);
            }

            function confirmRestart() {
                showModal("Repornire", `
                    <h3>Ești sigur că vrei să repornești?</h3>
                    <p>Toate aplicațiile deschise vor fi închise.</p>
                    <div style="margin-top: 20px; text-align: right;">
                        <button onclick="this.closest('.modal').remove()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 10px;">Anulează</button>
                        <button onclick="location.reload()" style="background: #007AFF; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Repornește</button>
                    </div>
                `);
            }

            function confirmShutdown() {
                showModal("Oprire", `
                    <h3>Ești sigur că vrei să oprești computerul?</h3>
                    <p>Toate datele nesalvate vor fi pierdute.</p>
                    <div style="margin-top: 20px; text-align: right;">
                        <button onclick="this.closest('.modal').remove()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 10px;">Anulează</button>
                        <button onclick="document.body.style.background='black'; document.body.innerHTML='<div style=\\'text-align:center; color:white; padding-top:50vh; font-family: -apple-system;\\'>Sistemul s-a oprit</div>'" style="background: #FF3B30; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Oprește</button>
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
                lockDiv.style.zIndex = '10000';
                lockDiv.style.display = 'flex';
                lockDiv.style.flexDirection = 'column';
                lockDiv.style.justifyContent = 'center';
                lockDiv.style.alignItems = 'center';
                lockDiv.style.color = 'white';
                lockDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
                
                var timeDisplay = document.createElement('div');
                timeDisplay.style.fontSize = '72px';
                timeDisplay.style.fontWeight = '200';
                timeDisplay.style.marginBottom = '10px';
                timeDisplay.innerText = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                var dateDisplay = document.createElement('div');
                dateDisplay.style.fontSize = '24px';
                dateDisplay.style.fontWeight = '300';
                dateDisplay.style.marginBottom = '50px';
                dateDisplay.innerText = currentTime.toLocaleDateString('ro-RO', { 
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
                
                unlockBtn.onclick = () => lockDiv.remove();
                
                lockDiv.appendChild(timeDisplay);
                lockDiv.appendChild(dateDisplay);
                lockDiv.appendChild(unlockBtn);
                document.body.appendChild(lockDiv);
            }

            function confirmLogout() {
                showModal("Deconectare", `
                    <h3>Ești sigur că vrei să te deconectezi?</h3>
                    <p>Toate aplicațiile deschise vor fi închise.</p>
                    <div style="margin-top: 20px; text-align: right;">
                        <button onclick="this.closest('.modal').remove()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 10px;">Anulează</button>
                        <button onclick="location.reload()" style="background: #007AFF; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Deconectează</button>
                    </div>
                `);
            }

            function showDesktopInfo() {
                showModal("Despre Desktop", `
                    <h3>Informații Desktop</h3>
                    <p><strong>Nume:</strong> Desktop</p>
                    <p><strong>Dimensiune ecran:</strong> ${window.innerWidth} x ${window.innerHeight}</p>
                    <p><strong>Aplicații deschise:</strong> ${openWindows.length}</p>
                    <p><strong>Timp activitate:</strong> ${Math.floor((Date.now() - currentTime.getTime()) / 1000)} secunde</p>
                `);
            }

            function changeWallpaper() {
                var wallpapers = [
                    'https://4kwallpapers.com/images/wallpapers/macos-ventura-macos-13-macos-2022-stock-dark-mode-5k-retina-2048x1536-8133.jpg',
                    'https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-blue-light-waves-5k-6016x6016-4957.jpg',
                    'https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg'
                ];
                var currentWallpaper = wallpaper.style.backgroundImage;
                var nextIndex = wallpapers.findIndex(w => currentWallpaper.includes(w)) + 1;
                if (nextIndex >= wallpapers.length) nextIndex = 0;
                wallpaper.style.backgroundImage = `url(${wallpapers[nextIndex]})`;
            }

            function minimizeAllWindows() {
                openWindows.forEach(window => {
                    window.element.style.transform = 'scale(0.1)';
                    window.element.style.opacity = '0';
                    setTimeout(() => {
                        window.element.style.display = 'none';
                    }, 300);
                });
            }

            function hideAllWindows() {
                openWindows.forEach(window => {
                    window.element.style.opacity = '0';
                    setTimeout(() => {
                        window.element.style.display = 'none';
                    }, 200);
                });
            }

            function emptyTrash() {
                showModal("Golire coș", `
                    <h3>Coșul este gol</h3>
                    <p>Nu există elemente de șters.</p>
                `);
            }

            // Funcții utilitare pentru modal și ferestre
            function showModal(title, content) {
                var modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>${title}</h2>
                        ${content}
                    </div>
                `;
                
                var closeBtn = modal.querySelector('.close');
                closeBtn.onclick = () => modal.remove();
                
                modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                };
                
                document.body.appendChild(modal);
            }

            function createWindow(title, content) {
                var windowElement = document.createElement('div');
                windowElement.className = 'app-window';
                windowElement.style.left = (50 + openWindows.length * 30) + 'px';
                windowElement.style.top = (100 + openWindows.length * 30) + 'px';
                windowElement.style.zIndex = ++windowZIndex;
                
                windowElement.innerHTML = `
                    <div class="window-header">
                        <div class="window-controls">
                            <div class="window-control window-close"></div>
                            <div class="window-control window-minimize"></div>
                            <div class="window-control window-maximize"></div>
                        </div>
                        <div class="window-title">${title}</div>
                    </div>
                    <div class="window-content">
                        ${content}
                    </div>
                `;
                
                // Event listeners pentru controalele ferestrei
                var closeBtn = windowElement.querySelector('.window-close');
                var minimizeBtn = windowElement.querySelector('.window-minimize');
                var maximizeBtn = windowElement.querySelector('.window-maximize');
                var header = windowElement.querySelector('.window-header');
                
                closeBtn.onclick = () => {
                    windowElement.remove();
                    openWindows = openWindows.filter(w => w.element !== windowElement);
                };
                
                minimizeBtn.onclick = () => {
                    windowElement.style.transform = 'scale(0.1)';
                    windowElement.style.opacity = '0.5';
                };
                
                maximizeBtn.onclick = () => {
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
                
                // Drag functionality
                makeDraggable(windowElement, header);
                
                // Focus pe click
                windowElement.onclick = () => {
                    windowElement.style.zIndex = ++windowZIndex;
                };
                
                dscontainer.appendChild(windowElement);
                openWindows.push({ title, element: windowElement });
            }

            function makeDraggable(element, handle) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                
                handle.onmousedown = dragMouseDown;
                
                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }
                
                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    element.style.top = (element.offsetTop - pos2) + "px";
                    element.style.left = (element.offsetLeft - pos1) + "px";
                }
                
                function closeDragElement() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

            // Iconițe pe desktop
            var desktopIcons = [
                { name: 'Trash', icon: '🗑️', x: 90, y: 15 },
                { name: 'Documents', icon: '📁', x: 90, y: 25 },
                { name: 'Photos', icon: '🖼️', x: 90, y: 35 },
                { name: 'Music', icon: '🎵', x: 90, y: 45 },
                { name: 'Downloads', icon: '⬇️', x: 90, y: 55 },
                { name: 'Applications', icon: '📱', x: 90, y: 65 }
            ];

            desktopIcons.forEach(iconData => {
                var iconElement = document.createElement('div');
                iconElement.className = 'desktop-icon';
                iconElement.style.position = 'absolute';
                iconElement.style.left = iconData.x + '%';
                iconElement.style.top = iconData.y + '%';
                iconElement.style.width = '80px';
                iconElement.style.zIndex = '50';
                
                var iconImage = document.createElement('div');
                iconImage.className = 'desktop-icon-placeholder';
                iconImage.innerHTML = iconData.icon;
                iconImage.style.background = 'rgba(255,255,255,0.1)';
                iconImage.style.backdropFilter = 'blur(10px)';
                
                var iconLabel = document.createElement('div');
                iconLabel.innerText = iconData.name;
                iconLabel.style.fontSize = '12px';
                iconLabel.style.marginTop = '5px';
                iconLabel.style.textAlign = 'center';
                
                iconElement.appendChild(iconImage);
                iconElement.appendChild(iconLabel);
                
                iconElement.ondblclick = () => {
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
                                <h4>🎵 Playerul muzical</h4>
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
                                    <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;" onclick="createWindow('Calculator', '<div style=\\'text-align: center;\\'>🔢<br><br>Calculator simplu<br><input type=\\'text\\' style=\\'width: 200px; padding: 10px; margin: 10px; background: rgba(100,100,100,0.5); border: none; border-radius: 6px; color: white; text-align: center;\\' placeholder=\\'Introduceți calcule...\\'/></div>')">
                                        <div style="font-size: 32px; margin-bottom: 8px;">🔢</div>
                                        <div style="font-size: 12px;">Calculator</div>
                                    </div>
                                    <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;" onclick="createWindow('Note', '<div>📝<br><br><textarea style=\\'width: 100%; height: 200px; background: rgba(100,100,100,0.5); border: none; border-radius: 6px; color: white; padding: 10px;\\' placeholder=\\'Scrie aici notițele tale...\\'/></div>')">
                                        <div style="font-size: 32px; margin-bottom: 8px;">📝</div>
                                        <div style="font-size: 12px;">Note</div>
                                    </div>
                                    <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;" onclick="createWindow('Terminal', '<div style=\\'font-family: monospace; background: black; color: lime; padding: 15px; border-radius: 6px; height: 200px; overflow-y: auto;\\'>user@desktop:~$ <span style=\\'color: white;\\'>echo \\'Bine ai venit în terminal!\\'</span><br>Bine ai venit în terminal!<br>user@desktop:~$ <span style=\\'animation: blink 1s infinite;\\'>_</span></div>')">
                                        <div style="font-size: 32px; margin-bottom: 8px;">💻</div>
                                        <div style="font-size: 12px;">Terminal</div>
                                    </div>
                                    <div style="text-align: center; padding: 15px; background: rgba(70,70,70,0.3); border-radius: 12px; cursor: pointer;" onclick="createWindow('Ceas', '<div style=\\'text-align: center;\\'>🕐<br><br>Ora curentă:<br><h2 id=\\'currentTime\\'></h2><script>setInterval(() => document.getElementById(\\'currentTime\\').innerText = new Date().toLocaleTimeString(), 1000);</script></div>')">
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

            // Dock (bara de aplicații)
            var dock = document.createElement('div');
            dock.className = 'dock';
            dock.style.position = 'absolute';
            dock.style.bottom = '20px';
            dock.style.left = '50%';
            dock.style.transform = 'translateX(-50%)';
            dock.style.display = 'flex';
            dock.style.alignItems = 'center';
            dock.style.justifyContent = 'center';
            dock.style.backgroundColor = 'rgba(50,50,50,0.4)';
            dock.style.backdropFilter = 'blur(30px)';
            dock.style.borderRadius = '20px';
            dock.style.padding = '10px 15px';
            dock.style.gap = '8px';
            dock.style.border = '1px solid rgba(100,100,100,0.3)';
            dock.style.boxShadow = '0px 8px 25px rgba(0,0,0,0.4)';
            dock.style.zIndex = '60';
            dscontainer.appendChild(dock);

            // Aplicații în dock
            var dockApps = [
                { name: 'Finder', color: '#3498db', icon: '📁' },
                { name: 'Safari', color: '#e74c3c', icon: '🌐' },
                { name: 'Mail', color: '#f39c12', icon: '📧' },
                { name: 'Calendar', color: '#2ecc71', icon: '📅' },
                { name: 'Photos', color: '#9b59b6', icon: '🖼️' },
                { name: 'Music', color: '#e67e22', icon: '🎵' },
                { name: 'Settings', color: '#95a5a6', icon: '⚙️' },
                { name: 'Terminal', color: '#2c3e50', icon: '💻' },
                { name: 'TextEdit', color: '#34495e', icon: '📝' }
            ];

            dockApps.forEach(app => {
                var dockIcon = document.createElement('div');
                dockIcon.style.width = '50px';
                dockIcon.style.height = '50px';
                dockIcon.style.backgroundColor = app.color;
                dockIcon.style.borderRadius = '12px';
                dockIcon.style.display = 'flex';
                dockIcon.style.alignItems = 'center';
                dockIcon.style.justifyContent = 'center';
                dockIcon.style.fontSize = '24px';
                dockIcon.style.cursor = 'pointer';
                dockIcon.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                dockIcon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                dockIcon.innerHTML = app.icon;
                dockIcon.title = app.name;
                
                dockIcon.addEventListener('mouseenter', () => {
                    dockIcon.style.transform = 'scale(1.2) translateY(-5px)';
                    dockIcon.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
                });
                
                dockIcon.addEventListener('mouseleave', () => {
                    dockIcon.style.transform = 'scale(1) translateY(0)';
                    dockIcon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                
                dockIcon.addEventListener('click', () => {
                    // Animație de click
                    dockIcon.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        dockIcon.style.transform = 'scale(1.1)';
                        setTimeout(() => dockIcon.style.transform = 'scale(1)', 100);
                    }, 50);
                    
                    // Deschide aplicația
                    switch(app.name) {
                        case 'Finder':
                            createWindow('Finder', `
                                <div style="display: flex; height: 100%;">
                                    <div style="width: 150px; background: rgba(60,60,60,0.5); padding: 10px; border-right: 1px solid rgba(100,100,100,0.3);">
                                        <h5 style="margin-top: 0;">Locații</h5>
                                        <div style="padding: 5px 0; cursor: pointer;">🏠 Acasă</div>
                                        <div style="padding: 5px 0; cursor: pointer;">🖥️ Desktop</div>
                                        <div style="padding: 5px 0; cursor: pointer;">📁 Documente</div>
                                        <div style="padding: 5px 0; cursor: pointer;">⬇️ Descărcări</div>
                                    </div>
                                    <div style="flex: 1; padding: 20px;">
                                        <h4>📁 Desktop</h4>
                                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
                                            <div style="text-align: center; padding: 15px;">📄<br>Document1.txt</div>
                                            <div style="text-align: center; padding: 15px;">🖼️<br>imagine.jpg</div>
                                            <div style="text-align: center; padding: 15px;">📊<br>date.xlsx</div>
                                        </div>
                                    </div>
                                </div>
                            `);
                            break;
                        case 'Safari':
                            createWindow('Safari', `
                                <div style="background: rgba(60,60,60,0.3); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
                                    <input type="text" value="https://www.apple.com" style="width: 100%; background: rgba(100,100,100,0.3); border: none; padding: 8px; border-radius: 4px; color: white;" readonly>
                                </div>
                                <div style="text-align: center; padding: 50px 20px;">
                                    <h2>🌐 Safari Browser</h2>
                                    <p>Simulare browser web</p>
                                    <div style="margin-top: 30px; display: flex; justify-content: center; gap: 15px;">
                                        <div style="padding: 20px; background: rgba(70,70,70,0.5); border-radius: 8px; width: 100px; text-align: center;">
                                            📰<br><small>Știri</small>
                                        </div>
                                        <div style="padding: 20px; background: rgba(70,70,70,0.5); border-radius: 8px; width: 100px; text-align: center;">
                                            🛒<br><small>Shopping</small>
                                        </div>
                                        <div style="padding: 20px; background: rgba(70,70,70,0.5); border-radius: 8px; width: 100px; text-align: center;">
                                            🎮<br><small>Jocuri</small>
                                        </div>
                                    </div>
                                </div>
                            `);
                            break;
                        default:
                            createWindow(app.name, `
                                <div style="text-align: center; padding: 50px;">
                                    <div style="font-size: 64px; margin-bottom: 20px;">${app.icon}</div>
                                    <h3>${app.name}</h3>
                                    <p>Aplicația ${app.name} este acum deschisă!</p>
                                </div>
                            `);
                    }
                });
                
                dock.appendChild(dockIcon);
            });

            // Actualizare ceas
            function updateClock() {
                currentTime = new Date();
                clock.innerHTML = currentTime.toLocaleString('ro-RO', {
                    hour: '2-digit',
                    minute: '2-digit',
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
            }

            // Actualizare ceas la fiecare secundă
            updateClock();
            setInterval(updateClock, 1000);

            // Context menu pentru desktop
            dscontainer.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                
                // Elimină meniul existent dacă există
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
                contextMenu.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
                
                var menuItems = [
                    { text: 'Folder nou', action: () => alert('Creare folder nou') },
                    { text: 'Fișier nou', action: () => alert('Creare fișier nou') },
                    { separator: true },
                    { text: 'Schimbă fundalul', action: changeWallpaper },
                    { text: 'Aranjează icoane', action: () => alert('Aranjare icoane') },
                    { separator: true },
                    { text: 'Proprietăți desktop', action: showDesktopInfo }
                ];
                
                menuItems.forEach(item => {
                    if (item.separator) {
                        var separator = document.createElement('div');
                        separator.style.height = '1px';
                        separator.style.background = 'rgba(100,100,100,0.3)';
                        separator.style.margin = '6px 0';
                        contextMenu.appendChild(separator);
                    } else {
                        var menuItem = document.createElement('div');
                        menuItem.style.padding = '8px 16px';
                        menuItem.style.cursor = 'pointer';
                        menuItem.innerText = item.text;
                        
                        menuItem.addEventListener('mouseenter', () => {
                            menuItem.style.background = 'rgba(0, 122, 255, 0.8)';
                        });
                        
                        menuItem.addEventListener('mouseleave', () => {
                            menuItem.style.background = 'transparent';
                        });
                        
                        menuItem.addEventListener('click', () => {
                            contextMenu.remove();
                            item.action();
                        });
                        
                        contextMenu.appendChild(menuItem);
                    }
                });
                
                document.body.appendChild(contextMenu);
                
                // Elimină meniul la click în altă parte
                setTimeout(() => {
                    document.addEventListener('click', function removeMenu() {
                        contextMenu.remove();
                        document.removeEventListener('click', removeMenu);
                    });
                }, 100);
            });

            console.log('macOS Desktop Simulator încărcat cu succes!');
        });
