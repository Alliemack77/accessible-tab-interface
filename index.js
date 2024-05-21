window.addEventListener('load', () => {
    const tablist = document.querySelector('.tablist')
    const tabs = Array.from(document.querySelectorAll('.tab'))
    const tabpanels = Array.from(document.querySelectorAll('.tabpanel'))

    tablist.setAttribute('role', 'tablist')

    tabs.forEach(tab => {
        tab.setAttribute('role', 'tab')
        tab.parentNode.setAttribute('role', 'presentation')
        tab.setAttribute('aria-selected', 'false')
        tab.setAttribute('tabindex', '-1')

        if(tab.getAttribute('id') === 'tab-1') {
            tab.setAttribute('aria-selected', 'true')  
            tab.removeAttribute('tabindex')
        }

        tab.addEventListener('click', (e) => {
            e.preventDefault()
            selectTab(e.target)
        })

        tab.addEventListener('keydown', getKey)
    })

    tabpanels.forEach(tabpanel => {
        tabpanel.setAttribute('role', 'tabpanel')
        tabpanel.setAttribute('tabindex', '0')
        tabpanel.setAttribute('hidden', 'hidden')

        if(tabpanel.getAttribute('id') === 'tabpanel-1') {
            tabpanel.removeAttribute('hidden')
        }


    })


    function selectTab(target) {
        tabs.forEach(tab => {
            let tabId = tab.getAttribute('id')
            let selectedPanel = 
                document.querySelector(`.tabpanel[aria-labelledby=${tabId}]`)
            
            if (tab === target) {
                tab.focus()
                tab.setAttribute('aria-selected', 'true')
                tab.removeAttribute('tabindex')
                selectedPanel.removeAttribute('hidden')
            } else {
                tab.setAttribute('aria-selected', 'false')
                tab.setAttribute('tabindex', '-1')
                selectedPanel.hidden = 'hidden'
            }
        })
    }

    function selectNextTab(target) {
        const lastTab = tabs[tabs.length - 1]
        let index

        if (target === lastTab) {
            selectTab(tabs[0])
        } else {
            index = tabs.indexOf(target)
            selectTab(tabs[index + 1])
        }
    }

    function selectPrevTab(target) {
        const firstTab = tabs[0]
        let index

        if (target === firstTab) {
            selectTab(tabs[tabs.length - 1])
        } else {
            index = tabs.indexOf(target)
            selectTab(tabs[index - 1])
        }
    }


    function getKey(e) {
        switch (e.key) {
            case 'ArrowLeft':
                selectPrevTab(e.target)
                break

            case 'ArrowRight':
                selectNextTab(e.target)
                break

            case 'Tab':
                selectTab(e.target)
                break

            default:
                break
        }
    }


})