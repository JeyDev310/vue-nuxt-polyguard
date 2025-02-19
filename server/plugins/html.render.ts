// including Google Tag Manager in the head and body
// https://github.com/nuxt/framework/pull/6042

export default defineNitroPlugin((nitroApp) => {
  const inspectletHeadScript = `
    <!-- Begin Inspectlet Asynchronous Code -->
    <script type="text/javascript">
    (function() {
    window.__insp = window.__insp || [];
    __insp.push(['wid', 75076376]);
    var ldinsp = function(){
    if(typeof window.__inspld != "undefined") return; window.__inspld = 1; 
    var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; 
    insp.id = "inspsync"; 
    insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=75076376&r=' + Math.floor(new Date().getTime()/3600000); 
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
    setTimeout(ldinsp, 0);
    })();
    </script>
    <!-- End Inspectlet Asynchronous Code -->`

  const gtmId = 'GTM-TSKLGC6'

  const gtmHeadScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${gtmId}');</script>
    <!-- End Google Tag Manager -->`

  const gtmBodyScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`

  nitroApp.hooks.hook('render:html', (html) => {
    const runtimeConfig = useRuntimeConfig()
    if (runtimeConfig.public.env.context !== 'production') {
      return
    }

    html.head.push(inspectletHeadScript)
    html.head.push(gtmHeadScript)
    html.bodyAppend.push(gtmBodyScript)
  })
})
