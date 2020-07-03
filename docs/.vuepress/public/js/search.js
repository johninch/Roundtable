(function(global) {
    const SEARCH_DB_DATA = '_search_db_data_';
    let data = JSON.parse(localStorage.getItem(SEARCH_DB_DATA) || '[]');
    let searchResultList;

    function CssText() {
        const style = document.createElement('style');
        style.innerHTML = `
            .search-result-list {
                display: flex;
                flex-direction: column;
                line-height: 30px;
            }
            .search-result-list a {
                color: #1f1f1f;
                text-decoration: none;
            }

            .search-result-list .search-list-item {
                overflow: hidden;
                background-color: #eee;
            }

            .search-result-list .search-highlight {
                color: orange;
            }
        `;
        return style;
    }

    function fetchData() {
        data.length === 0 &&
        fetch('../db.json')
            .then(res => res.json())
            .then(res => {
                data = res
                localStorage.setItem(SEARCH_DB_DATA, JSON.stringify(res));
            })
    }

    function update() {
        localStorage.removeItem(SEARCH_DB_DATA);
        data.length = 0;
        fetchData();
    }

    function findStr(a, b) {
        if (!a || !b) return false;
        return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
    }

    function searchHandler(event) {
        const search = event.target.value;
        const list = search ? data.filter(item => {
            return findStr(item.title, search) || findStr(item.content, search);
        }) : [];
        SearchResultList.update(list, search);
    }

    function SearchBox() {
        const searchBox = document.createElement('input');
        searchBox.placeholder = '请输入要查询的关键字';
        searchBox.addEventListener('input', searchHandler);
        searchBox.addEventListener('focus', fetchData);
        return searchBox;
    }

    function SearchResultList() {
        searchResultList = document.createElement('div');
        searchResultList.className = 'search-result-list';
        SearchResultList.update();
        return searchResultList;
    }

    SearchResultList.update = function (list = [], search = '') {
        const reg = new RegExp(search, 'g');
        console.log(list)
        searchResultList.innerHTML = list.map(item => {
            let index = item.content?.indexOf(search);
            let content = item.content?.substring(index, index + 100) || '';
            content = search ? content.replace(reg, '<b class="search-highlight">$&</b>') : content;
            return `
                <div class="search-list-item">
                    <a href="${item.url}">${content}</a>
                <div>
            `
        }).join('\n');
    }

    function Container(...content) {
        const container = document.createElement('div');
        container.append(...content);
        return container;
    }

    function initial({
        $mount = document.querySelector('body')
    } = {}) {
        document.querySelector('head').appendChild(CssText());
        $mount.appendChild(
            Container(
                SearchBox(),
                SearchResultList()
            )
        );
    }

    global.$search = {
        update,
        initial
    }
})(window);
