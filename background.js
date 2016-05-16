chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        id: 'main',
        bounds: { width: 420, height: 700 },
        minWidth: 405,
        minHeight: 550
    });
});