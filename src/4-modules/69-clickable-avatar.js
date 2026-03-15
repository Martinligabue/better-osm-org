//<editor-fold desc="" defaultstate="collapsed">

function setupClickableAvatar() {
    const miniAvatar = document.querySelector(".user_thumbnail_tiny:not([patched-for-click])")
    if (!miniAvatar || miniAvatar.setAttribute("patched-for-click", "true")) {
        return
    }
    miniAvatar.onclick = e => {
        if (!e.isTrusted) return
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        const baseURL = document.querySelector('.dropdown-item[href^="/user/"]').getAttribute("href")
        const isHistoryPage = location.pathname.match(/\/user\/.+\/history/)
        const targetURL = isHistoryPage ? baseURL : baseURL + "/history"
        if (targetURL === location.pathname) {
            miniAvatar.click() // dirty hack for hide dropdown
            return
        }
        if (e.ctrlKey || e.metaKey) {
            window.open(targetURL, "_blank")
        } else {
            if (!isHistoryPage) {
                try {
                    getWindow().OSM.router.route(targetURL)
                } catch {
                    window.location.pathname = targetURL
                }
            } else {
                window.location.pathname = targetURL
            }
        }
        miniAvatar.click() // dirty hack for hide dropdown
    }
}

//</editor-fold>
