
    // Parse query string to see if page request is coming from OAuth 2.0 server.
    var params = {};
    var regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(location.href)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
        localStorage.setItem('authInfo', JSON.stringify(params));
    }
    window.history.pushState({}, document.title, "/" + "dashboard.html");
    let info = JSON.parse(localStorage.getItem('authInfo'))
    console.log(info['access_token'])
    console.log(info['expires_in'])
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${info['access_token']}`
        }
    })
        .then(data => data.json())
        .then((info) => {
            console.log(info)
            document.getElementById('username').innerHTML += info.name
            document.getElementById('dp').setAttribute('src',info.picture)
        })
        function logout() {
        fetch("https://oauth2.googleapis.com/revoke?token=" + info['access_token'],
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            })
            .then((data) => {
                location.href = "http://127.0.0.1:5501/index.html"
            })
    }
