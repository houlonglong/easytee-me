<!-- Simple splash screen-->
<div class="splash"> <div class="color-line"></div><div class="splash-title"><h1>易衫网</h1><p>加载中......</p><img src="/static/images/loading-bars.svg" width="64" height="64" /> </div> </div>
<!--[if lt IE 7]>
<p class="alert alert-danger">You are using an <strong>outdated</strong> browser. Please <a href="../../browsehappy.com/default.htm">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<style>
    #logo.light-version{
        background-color: #ff4400;
        border-bottom: 1px solid #e4e5e7;
        text-align: left;
        background-image: url(/resources/public/image/site-logo.png);
        text-indent: -99999px;
        cursor:pointer;
    }
</style>
<!-- Header -->
<div id="header">
    <div class="color-line">
    </div>
    <div id="logo" class="light-version" onclick="location.href='/'">
        <span>
            易衫网
        </span>
    </div>
    <nav role="navigation">
        <div class="header-link hide-menu"><i class="fa fa-bars"></i></div>
        <div class="small-logo" onclick="location.href='/'" style="cursor: pointer;         ">
            <span class="text-primary">易衫网</span>
        </div>
        <form role="search" class="navbar-form-custom hide" method="post" action="#">
            <div class="form-group">
                <input type="text" placeholder="Search something special" class="form-control" name="search">
            </div>
        </form>
        <div class="navbar-right">
            <ul class="nav navbar-nav no-borders">
                <li>
                    <a href="/design">发起活动</a>
                </li>
                <li class="dropdown">
                    <a href="/api?model=user/auth&action=logout">
                        <i class="pe-7s-upload pe-rotate-90"></i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</div>