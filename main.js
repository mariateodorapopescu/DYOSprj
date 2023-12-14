document.addEventListener('DOMContentLoaded', function() {
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
    wallpaper.style.backgroundSize = 'cover';  // optional: to cover the entire element 
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
    // statusBar.style.backgroundColor = 'rgba(255,255,255,0.5)';
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
    statusBar.style.alignItems = 'center';  // Adjusted to 'center'
    statusBar.style.flexDirection = 'row';
    statusBar.style.flexWrap = 'wrap';
    statusBar.style.justifyContent = 'flex-start';
    statusBar.style.backdropFilter = 'blur(80px)';
    statusBar.style.gap = '1%';
    upContainer.appendChild(statusBar);

    var menu = document.createElement('div');
    menu.className = 'menu';
    menu.style.backgroundColor = 'rgba(0,0,0,0)';
    menu.style.width = '5%';
    menu.style.height = '5%';
    menu.style.position = 'relative';
    menu.style.display = 'block';
    menu.style.zIndex = '3';
    upContainer.appendChild(menu);

    var logo = document.createElement('div');
    logo.className = 'logo';
    logo.style.backgroundColor = 'white';
    logo.style.width = '2%';
    logo.style.height = '75%';
    logo.style.position = 'relative';
    logo.style.zIndex = '3';
    logo.style.border = 'none';
    logo.style.top = '0.2%';
    logo.style.left = '0.2%';
    statusBar.appendChild(logo);

    var items = ["Despre", "Configurari", "AppStore", "Recenre", "PKill", "Standby", "Hibernare", "Reboot", "shutdown", "Lockscreen", "LogOut"];

    var dropdn = document.createElement('div');
    dropdn.className = 'dropdown';
    dropdn.style.position = 'absolute';
    dropdn.style.top = '95%';
    dropdn.style.left = '16%';
    dropdn.style.width = 'auto';
    dropdn.style.backgroundColor = 'rgba(50,50,50,0.5)';
    // dropdn.style.backgroundColor = 'rgba(255,255,255,0.5)';
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
    // dropdn.style.display = 'none';
    menu.appendChild(dropdn);

    var itemHeight = 22;
    var separatorHeight = 1;
    var maxItemWidth = 0;

    for (var i = 0; i < items.length; i++) {
        var drpitem = document.createElement('div');
        drpitem.className = 'drpitem';
        drpitem.style.fontFamily = 'Arial';
        drpitem.style.color = 'white';
        drpitem.style.padding = '0.5%';
        drpitem.style.position = 'relative';
        drpitem.style.top = '5px';
        drpitem.style.left = '10px';
        drpitem.style.backdropFilter = 'pink';

        var linkk = document.createElement('a');
        linkk.href = "#";
        linkk.innerText = items[i];
        linkk.style.textDecoration = 'none';
        linkk.style.color = 'white';
        linkk.style.fontFamily = 'Arial';

        (function(link) {
            link.addEventListener('mouseenter', function() {
                drpitem.style.backgroundColor = 'pink';
                drpitem.style.backdropFilter = 'blur(0px)';
                link.style.backgroundColor = 'pink';
                link.style.color = 'black';
            });

            link.addEventListener('mouseleave', function() {
                link.style.color = 'white';
                link.style.backgroundColor = 'rgba(0,0,0,0)';
                drpitem.style.backgroundColor = 'rgba(50,50,50,0)';
                drpitem.style.backdropFilter = 'blur(0px)';
            });
        })(linkk);

        drpitem.appendChild(linkk);
        dropdn.appendChild(drpitem);
        maxItemWidth = Math.max(maxItemWidth, drpitem.offsetWidth);

        if (i === 2) {
            var separator = document.createElement('div');
            separator.style.height = separatorHeight + 'px';
            separator.style.marginTop = '2px';
            separator.style.marginBottom = '2px';
            separator.style.backgroundColor = 'rgba(100,100,100,1)';
            dropdn.appendChild(separator);
        }
    }

    dropdn.style.width = maxItemWidth * 2 + 'px';
    dropdn.style.height = items.length * itemHeight + separatorHeight * (items.length - 1) + 'px';

    var menu2 = document.createElement('div');
    menu2.className = 'menu';
    menu2.style.backgroundColor = 'rgba(0,0,0,0)';
    menu2.style.left = '5%';
    menu2.style.width = '5%';
    menu2.style.height = '5%';
    menu2.style.position = 'relative';
    menu2.style.display = 'block';
    menu2.style.zIndex = '3';
    upContainer.appendChild(menu2);

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
    statusBar.appendChild(name);
    
    var items = ["Despre", "Configurari", "Servicii", "Minimizare", "Ascunde Tot", "Goleste Cosul"];
    
    var dropdn1 = document.createElement('div'); // Create a new dropdown
    dropdn1.className = 'dropdown';
    dropdn1.style.position = 'absolute';
    dropdn1.style.top = '95%';
    dropdn1.style.left = '60%';
    dropdn1.style.width = 'auto';
    dropdn1.style.backgroundColor = 'rgba(50,50,50,0.5)';
    // dropdn1.style.backgroundColor = 'rgba(255,255,255,0.5)';
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
    // dropdn1.style.display = 'none';
    menu.appendChild(dropdn1);
    
    var itemHeight = 22;
    var separatorHeight = 0.5;
    var maxItemWidth = 0;
    
    for (var i = 0; i < items.length; i++) {
        var drpitem = document.createElement('div');
        drpitem.className = 'drpitem';
        drpitem.style.fontFamily = 'Arial';
        drpitem.style.color = 'white';
        drpitem.style.padding = '0.5%';
        drpitem.style.position = 'relative';
        drpitem.style.top = '5px';
        drpitem.style.left = '10px';
        drpitem.style.backdropFilter = 'pink';
    
        var linkk = document.createElement('a');
        linkk.href = "#";
        linkk.innerText = items[i];
        linkk.style.textDecoration = 'none';
        linkk.style.color = 'white';
        linkk.style.fontFamily = 'Arial';
    
        (function(link) {
            link.addEventListener('mouseenter', function() {
                link.style.backgroundColor = 'pink';
                link.style.color = 'black';
            });
    
            link.addEventListener('mouseleave', function() {
                link.style.color = 'white';
                link.style.backgroundColor = 'rgba(0,0,0,0)';
            });
        })(linkk);
    
        drpitem.appendChild(linkk);
        dropdn1.appendChild(drpitem);
        maxItemWidth = Math.max(maxItemWidth, drpitem.offsetWidth);
    
        if (i === 2) {
            var separator = document.createElement('div');
            separator.style.height = separatorHeight + 'px';
            separator.style.marginTop = '2px';
            separator.style.marginBottom = '2px';
            separator.style.backgroundColor = 'rgba(100,100,100,1)';
            // separator.style.backgroundColor = 'rgba(200,200,200,1)';
            dropdn1.appendChild(separator);
        }
    }
    
    dropdn1.style.width = maxItemWidth * 2 + 'px';
    dropdn1.style.height = items.length * itemHeight + separatorHeight * (items.length - 1) + 'px';
    
    menu2.addEventListener('mouseenter', function() {
        dropdn1.style.display = 'block';
    });
    
    menu2.addEventListener('mouseleave', function() {
        dropdn1.style.display = 'none';
    });
    
    menu.addEventListener('mouseenter', function() {
        dropdn.style.display = 'inline-block';
    });
    
    menu.addEventListener('mouseleave', function() {
        dropdn.style.display = 'none';
    });

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
    // appbar.style.backgroundColor = 'rgba(255,255,255,0.4)';
    appbar.style.backdropFilter = 'blur(30px)';
    appbar.style.zIndex = '4';
    appbar.style.gap = '5px';
    appbar.style.borderColor = 'rgba(100,100,100,1)';
    // appbar.style.borderColor = 'rgba(100,100,100,1)';
    appbar.style.borderStyle = 'solid';
    appbar.style.borderWidth = '0.5px';
    appbar.style.borderRadius = '20px';
    appbar.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.4)';
    dscontainer.appendChild(appbar);

    var appIcons = [];

    for (var i = 0; i < 19; i++) {
        var appIcon = document.createElement('div');
        appIcon.style.width = '45px';
        appIcon.style.height = '45px';
        appIcon.style.position = 'relative';
        appIcon.style.zIndex = '5';
        appIcon.style.border = 'none';
        appIcon.style.borderRadius = '15%';
        appIcons.push(appIcon);
        appbar.appendChild(appIcon);
        appIcon.className = 'icon';
        appIcon.style.backgroundColor = getColorByIndex(i);
        appIcon.style.marginRight = '1vw'; // 1% of viewport width
        appIcon.style.boxShadow = '0px 2px 2px 0px rgba(50,50,50,0.2)';
        appIcons.push(appIcon);
        appbar.appendChild(appIcon);
    }

    // Function to get color based on index
    function getColorByIndex(index) {
        const colors = ['red', 'darkorange', 'orange', 'yellow', 'green', 'lightgreen', 'cyan', 'lightblue', 'blue', 'darkblue', 'purple', 'violet',
        'pink', 'magenta', 'salmon', 'coral', 'brown', 'grey', 'white'];
        return colors[index] || 'black'; // Fallback to black if out of bounds
    }

    // Update app bar width on window resize
    window.addEventListener('resize', updateAppBarWidth);

    // Initial update
    updateAppBarWidth();

    // Function to update app bar width based on the screen width
    function updateAppBarWidth() {
        var totalIconWidth = appIcons.reduce((total, icon) => total + icon.offsetWidth - 12 + parseInt(icon.style.marginRight), 0);

        // Set the width of the appbar
        appbar.style.width = totalIconWidth + 'px';

        // Add media queries for responsiveness
        if (window.innerWidth < 600) {
            appbar.style.minWidth = '30%';
        } else if (window.innerWidth < 900) {
            appbar.style.minWidth = '50%';
        } else {
            appbar.style.minWidth = '1%';
        }
    }


});

function calculate(a, b) {
    return {
        add :  () => {
            return a + b;
          },
        substract : (function () {
            return a - b;
          }),
        multiply : (function () {
            return a * b;
          }),
        divide : (function () {
            return a / b;
          })
        }
    }
const calculator = calculate(10, 5);
console.log(calculator.add());
console.log(calculator.substract());
console.log(calculator.multiply());
console.log(calculator.divide());

//ypu don't know js -> ghithub book
