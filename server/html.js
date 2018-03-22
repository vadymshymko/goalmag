const renderHTML = ({
  title = '',
  meta = '',
  innerHTML = '',
  preloadedState = {},
}) => (`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      ${title}
      ${meta}

      <link href="/bundle.css" rel="stylesheet" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28a745">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/mstile-144x144.png">
      <meta name="theme-color" content="#ffffff">
    </head>
    <body>
      <div class="root" id="root">${innerHTML}</div>

      <noscript id="deferred-styles">
        <link href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
      </noscript>

      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>

      <script>
        var loadDeferredStyles = function() {
          var addStylesNode = document.getElementById("deferred-styles");
          var replacement = document.createElement("div");
          replacement.innerHTML = addStylesNode.textContent;
          document.body.appendChild(replacement)
          addStylesNode.parentElement.removeChild(addStylesNode);
        };

        var raf = (
          window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
        );

        if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
        else window.addEventListener('load', loadDeferredStyles);
      </script>

      <script src="/bundle.js" async></script>
    </body>
  </html>
`);

export default renderHTML;
