<!DOCTYPE html>
<html lang="en">

<head>
    <!--
    Basic Page Needs
    ==================================================
    -->
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <meta name="description" content="<?php echo Unlimited\SystemVar::_getValue("metadata_description") ?>">
    <meta name="author" content="<?php echo Unlimited\SystemVar::_getValue("metadata_author") ?>">
    <meta name="keywords" content="<?php echo Unlimited\SystemVar::_getValue("metadata_keywords") ?>">
    <!--
    Mobile Specific Metas
    ==================================================
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--
    CSS
    ==================================================
    -->
    <link href="../../template/fonts/fonts.css" rel="stylesheet">
    <link href="../../template/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="../../template/vendor/elegant-icons/style.css" rel="stylesheet">
    <link href="../../template/vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../template/vendor/owl.carousel/dist/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="../../template/vendor/css-hamburgers/dist/hamburgers.min.css" rel="stylesheet">
    <link href="../../template/vendor/chosen/chosen.css" rel="stylesheet">
    <link href="../../template/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="../../template/vendor/plyr/plyr.min.css" rel="stylesheet">
    <link href="../../template/vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
    <link href="../../template/vendor/revolution/css/layers.css" rel="stylesheet">
    <link href="../../template/vendor/revolution/css/navigation.css" rel="stylesheet">
    <link href="../../template/vendor/revolution/css/settings.css" rel="stylesheet">
    <link href="../../template/css/main.css" rel="stylesheet">
    <link href="../../template/css/switcher.css" rel="stylesheet">
    <link href="../../template/css/colors/primary.css" rel="stylesheet" id="colors">
    <link href="../../template/css/retina.css" rel="stylesheet">
    <!--
    Favicons
    ==================================================
    -->
    <link rel="shortcut icon" href="favicon.png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png">
    <script src="../../template/js/modernizr-custom.js"></script>
</head>

<body>
    <!-- page load-->
    <div class="page-loader">
        <div class="loader"></div>
    </div>
    <header>
        <!-- header / start-->
        <div class="hidden-tablet-landscape-up">
            <div class="header header-mobile-1">
                <div class="top-header">
                    <div class="container-fluid">
                        <div class="logo">
                            <a href="index.html">
                                <img src="../../src/img/logo-horizontal.svg" alt="<?php echo Unlimited\SystemVar::_getValue("company_name") ?>" />
                            </a>
                        </div>
                        <div class="search-widget search-widget-1">
                            <div class="icon-search">
                                <i class="icon_search"></i>
                            </div>
                            <input class="animated" type="text" placeholder="Search" />
                        </div>
                        <button class="hamburger hamburger--spin hidden-tablet-landscape-up" id="toggle-icon">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="au-navbar-mobile navbar-mobile-1">
                    <ul class="au-navbar-menu">
                        <li class="drop">
                            <a href="../../apps/home">Inicio</a>
                        </li>
                        <li>
                            <a href="#services">SERVICIOS</a>
                        </li>
                        <li>
                            <a href="#memberships">MEMBRESÍAS</a>
                        </li>
                        <li>
                            <a href="#academy">ACADEMIA DE NEGOCIOS </a>
                        </li>
                        <li>
                            <a href="#our">FILOSOFÍA</a>
                        </li>
                        <li>
                            <a href="#abc">El ABC</a>
                        </li>
                        <li>
                            <a href="#rights">NUESTROS VALORES </a>
                        </li>
                        <li>
                            <a href="#agents">AGENTES </a>
                        </li>
                        <li>
                            <a href="#contact">CONTACTO</a>
                        </li>
                    </ul>
                </div>
                <div class="container-fluid">
                    <div class="contact-widget d-none contact-widget-1">
                        <div class="icon-box icon-box-1">
                            <div class="icon">
                                <i class="icon_phone"></i>
                            </div>
                            <div class="content">
                                <p>1-800-123-6889</p>
                                <p>contact@site.com</p>
                            </div>
                        </div>
                        <div class="icon-box icon-box-1">
                            <div class="icon">
                                <i class="icon_pin"></i>
                            </div>
                            <div class="content">
                                <p>8th floor, 379 Hudson St</p>
                                <p>New York, NY 10018</p>
                            </div>
                        </div>
                        <div class="icon-box icon-box-1">
                            <div class="icon">
                                <i class="icon_clock"></i>
                            </div>
                            <div class="content">
                                <p>09:30 am – 06:00 pm</p>
                                <p>Every Day</p>
                            </div>
                        </div>
                        <a class="hidden-tablet-landscape au-btn au-btn-primary" href="#">Get A Quote</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden-tablet-landscape">
            <div class="topbar topbar-1 bg-black">
                <div class="container">
                    <div class="block-left">
                        <p class="text-block">We are experts in consulting services and solutions</p>
                    </div>
                    <div class="block-right">
                        <div class="chosen-lang m-r-25">
                            <select class="chosen-select">
                                <option value="2" selected="">Español</option>
                            </select>
                        </div>
                        <ul class="horizontal-list">
                            <li class="social-item-1">
                                <a href="<?php echo Unlimited\SystemVar::_getValue("social_facebook");?>" class="fa fa-facebook"></a>
                            </li>
                            <li class="social-item-1">
                                <a href="<?php echo Unlimited\SystemVar::_getValue("social_instagram");?>" class="fa fa-instagram"></a>
                            </li>
                            <li class="social-item-1">
                                <a href="<?php echo Unlimited\SystemVar::_getValue("social_youtube");?>" class="fa fa-youtube"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="header header-1">
                <div class="container">
                    <div class="block-left">
                        <div class="logo">
                            <a href="index.html">
                                <img src="../../src/img/logo-horizontal.svg" alt="<?php echo Unlimited\SystemVar::_getValue("company_name") ?>" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-navbar-1 bg-grey hidden-tablet-landscape" id="js-navbar-fixed">
            <div class="container">
                <div class="block-left">
                    <div class="logo-mobile">
                        <a href="index.html">
                            <img src="../../src/img/logo-horizontal.svg" alt="<?php echo Unlimited\SystemVar::_getValue("company_name") ?>">
                        </a>
                    </div>
                    <nav>
                        <div class="au-navbar navbar-1">
                            <ul class="au-navbar-menu">
                                <li class="drop">
                                    <a href="../../apps/home">INICIO</a>
                                </li>
                                <li>
                                    <a href="#services">SERVICIOS</a>
                                </li>
                                <li>
                                    <a href="#memberships">MEMBRESÍAS</a>
                                </li>
                                <li>
                                    <a href="#academy">ACADEMIA DE NEGOCIOS </a>
                                </li>
                                <li>
                                    <a href="#our">FILOSOFÍA</a>
                                </li>
                                <li>
                                    <a href="#abc">El ABC</a>
                                </li>
                                <li>
                                    <a href="#rights">NUESTROS VALORES </a>
                                </li>
                                <li>
                                    <a href="#agents">AGENTES </a>
                                </li>
                                <li>
                                    <a href="#contact">CONTACTO</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <!-- header / end-->
    </header>
    <section>
        <!-- START REVOLUTION SLIDER 5.0-->
        <div class="slider-1">
            <div class="rev_slider" id="js-slider" style="display:none;">
                <ul>
                    <li class="item-1" data-transition="fade">
                        <!-- MAIN IMAGE-->
                        <img class="rev-slidebg" src="../../template/images/carousel-01.jpg" alt="#" />
                        
                        <h3 class="tp-caption tp-resizeme caption-1" data-frames="[{&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:900,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;to&quot;:&quot;y:-50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power2.easeIn&quot;}]" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['middle']" data-voffset="['-100']" data-width="['770', '770', '770', '480']">CONVIERTETE EN TU PROYECTO MÁS IMPORTANTE</h3>
                        <div class="tp-caption tp-resizeme caption-2" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:[100%];s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['center']" data-voffset="['0', '0', '0', '40']" data-width="['770', '770', '770', '480']">Se el cambio que quieres ver en el mundo.</div>
                        
                        <div class="tp-caption tp-resizeme caption-3" data-frames="[{&quot;delay&quot;:2000,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" data-responsive="on" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['center']" data-voffset="['100', '100', '100', '140']" data-width="['770', '770', '770', '480']">
                            <a class="au-btn au-btn-primary m-r-5" href="../../apps/signup">Registrarme</a>
                            <a class="au-btn au-btn-white m-l-5" href="../../apps/login">Ingresar a mi cuenta</a>
                        </div>
                    </li>
                    <li class="item-1" data-transition="fade">
                        <!-- MAIN IMAGE-->
                        <img class="rev-slidebg" src="../../template/images/carousel-02.jpg" alt="#" />
                        
                        <h3 class="tp-caption tp-resizeme caption-1" data-frames="[{&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:900,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;to&quot;:&quot;y:-50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power2.easeIn&quot;}]" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['middle']" data-voffset="['-100']" data-width="['770', '770', '770', '480']">SOMOS PERSONAS DE VALOR</h3>
                        <div class="tp-caption tp-resizeme caption-2" data-frames="[{&quot;delay&quot;:1000,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:[100%];s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['center']" data-voffset="['0', '0', '0', '40']" data-width="['770', '770', '770', '480']">Que valoramos a las personas y aportamos valor a ellas</div>
                        
                        <div class="tp-caption tp-resizeme caption-3" data-frames="[{&quot;delay&quot;:2000,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" data-responsive="on" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['center']" data-voffset="['100', '100', '100', '140']" data-width="['770', '770', '770', '480']">
                            <a class="au-btn au-btn-primary m-r-5" href="../../apps/signup">Registrarme</a>
                            <a class="au-btn au-btn-white m-l-5" href="../../apps/login">Ingresar a mi cuenta</a>
                        </div>
                    </li>
                    <li class="item-1" data-transition="fade">
                        <!-- MAIN IMAGE-->
                        <img class="rev-slidebg" src="../../template/images/carousel-03.jpg" alt="#" />
                        
                        <h3 class="tp-caption tp-resizeme caption-1" data-frames="[{&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:900,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;to&quot;:&quot;y:-50px;opacity:0;&quot;,&quot;ease&quot;:&quot;Power2.easeIn&quot;}]" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['middle']" data-voffset="['-100']" data-width="['770', '770', '770', '480']">INSPIRA A SOÑAR MÁS</h3>
                        
                        <div class="tp-caption tp-resizeme caption-3" data-frames="[{&quot;delay&quot;:2000,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" data-responsive="on" data-x="['center']" data-hoffset="['0', '0', '0', '0']" data-y="['center']" data-voffset="['100', '100', '100', '140']" data-width="['770', '770', '770', '480']">
                            <a class="au-btn au-btn-primary m-r-5" href="../../apps/signup">Registrarme</a>
                            <a class="au-btn au-btn-white m-l-5" href="../../apps/login">Ingresar a mi cuenta</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <!-- section / start-->
    <div class="section bg-white p-t-70 p-b-40" id="services">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6">
                    <div class="icon-box icon-box-2">
                        <div class="icon">
                            <i class="fa fa-line-chart"></i>
                        </div>
                        <div class="title text-uppercase">
                            <h3>Network marketing</h3>
                            <h3>Marketing digital</h3>
                            <h3>Ventas</h3>
                        </div>
                        <div class="content">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="icon-box icon-box-2">
                        <div class="icon">
                            <i class="fa fa-rocket"></i>
                        </div>
                        <div class="title text-uppercase">
                            <h3>Liderazgo crecimiento y desarrollo personal</h3>
                        </div>
                        <div class="content">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="icon-box icon-box-2">
                        <div class="icon">
                            <i class="fa fa-black-tie"></i>
                        </div>
                        <div class="title text-uppercase">
                            <h3>Educación financiera</h3>
                            <h3>Trading</h3>
                            <h3>Mercados de Capitales</h3>
                        </div>
                        <div class="content">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="icon-box icon-box-2">
                        <div class="icon">
                            <i class="fa fa-money"></i>
                        </div>
                        <div class="title text-uppercase">
                            <h3>Idiomas</h3>
                            <h3>Marca personal</h3>
                        </div>
                        <div class="content">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- section / end-->
    <!-- Our Services / start-->
    <section class="section bg-primary p-t-70 p-b-40" id="memberships">
        <div class="container">
        
            <div class="heading-section heading-section-1 light">
                <h3>MEMBRESÍAS</h3>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="image">
                        <a href="../../apps/signup">
                            <img src="../../template/images/services-01.jpg" alt="Pay Business" style="width:100%"/>
                        </a>
                    </div>
                    <h3 class="title">
                        <a href="../../apps/signup">Pay Business</a>
                    </h3>
                    <div class="content">
                        <p>Conviértete en un Profesional de Redes de Mercadeo liderando equipos de alto rendimiento y generando múltiples ingresos día a día. </p>
                        <p>Construye regalías para tu plan de retiro.</p>
                    </div>
                    <div class="link">
                        <a href="../../apps/signup">
                            <i class="fa fa-caret-right"></i>
                            <span>Más</span>
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="image">
                        <a href="../../apps/signup">
                            <img src="../../template/images/services-02.jpg" alt="Pay Academy" style="width:100%"/>
                        </a>
                    </div>
                    <h3 class="title">
                        <a href="../../apps/signup">Pay Academy</a>
                    </h3>
                    <div class="content">
                        <p>Edúcate por tu libertad; aprovechando al máximo nuestras herramientas y nuestro modelo educativo, desarróllate en el área en el cual mejor te identifiques y/o aprovecha todo el conocimiento que tenemos para ti. Convierte tu vida en un instrumento de múltiples habilidades y ponle acción a la información (Conocimiento Aplicado)</p>
                    </div>
                    <div class="link">
                        <a href="../../apps/signup">
                            <i class="fa fa-caret-right"></i>
                            <span>Más</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Our Services / end-->
    <!-- Why Choose Us / start-->
    <section class="section why-choose-us-section-1 bg-cover bg-cover js-waypoint" id="academy">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <img src="../../template/images/almax.png">
                </div>
                <div class="col-md-6 p-t-90 p-b-75">
                    <div class="heading-section heading-section-1 dark">
                        <h3>UNLIMITED BUSINESS ACADEMY</h3>
                    </div>
                    <p class="text-block m-b-25">Por qué sabemos que tienes el potencial para llegar a donde tú quieras, queremos ir de la mano contigo y cumplir tus sueños juntos. </p>
                    <p class="text-block m-b-25">Queremos proporcionarte las herramientas necesarias y el conocimiento oportuno para hacer de ti esa mejor versión que buscas.</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Why Choose Us / end-->
    <!-- Testimonials / start-->

    <div class="section bg-parallax p-t-100 p-b-70 bg-cover" id="our" style="background: url(../../template/images/statistic-01.png) center center no-repeat;" data-paroller-type="background" data-paroller-factor="-0.3" data-paroller-direction="vertical">
        <div class="bg-overlayS"></div>
        <div class="container">
            <div class="ro">
                <div class="col-12">
                    <div class="text-white text-center">
                        <div class="h1 text-warning fw-bold" style="margin-bottom: 12px;">NUESTRA FILOSOFIA</div>
                        <div class="h3 text-white" style="margin-bottom: -12px;">IMPACTAR POSITIVAMENTE EN LA VIDA Y EN LA ECONOMÍA</div>
                        <div class="h3 text-white">DE TANTAS PERSONAS COMO SEA POSIBLE</div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 col-sm-4">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                                <span class="avatar bg-warning text-dark avatar-xl">
                                    A
                                </span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="h3 m-0 text-white">mamos la industrial del</div>
                            <div class="h1 m-0 text-white">NETWORK MARKETING</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                                <span class="avatar bg-warning text-dark avatar-xl">
                                    D
                                </span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="h2 m-0 text-white">ios en primer lugar</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                                <span class="avatar bg-warning text-dark avatar-xl">
                                    N
                                </span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="h3 m-0 text-white">utrimos tu mentalidad con </div>
                            <div class="h1 m-0 text-white">EDUCACIÓN QUE TE TRANSFORMA</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- section / end-->

    <section class="section-end bg-xdark section p-t-100 p-b-70" id="abc">
        <div class="container">
            <div class="row justify-content-start align-items-center">
                <div class="col-md-6">
                    <div class="text-warning h1 text-uppercase mb-5">
                        EL ABC DEL NEGOCIO
                    </div>
                    <div class="row mb-5 justify-content-center align-items-center">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                            <span class="avatar avatar-xl h1 text-dark fw-bold bg-warning">A</span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="lead mb-0  text-white">
                            ntes de empezar <b class="text-warning">SE CONSCIENTE</b> de donde
                            estas,
                            </div>
                            <div class="h3 mt-0 fw-bold text-white" style="letter-spacing: -1px">
                            para donde te diriges y el vehículo al que estas subiendo.
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5 justify-content-center align-items-center">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                            <span class="avatar avatar-xl h1 text-dark fw-bold bg-warning">B</span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="lead mb-0 text-white"> 
                                usca convertirte en <b class="text-warning">TÚ MEJOR VERSIÓN</b> aprendiendo
                            </div>
                            <div class="h3 mt-0 fw-bold text-white" style="letter-spacing: -1px"> 
                                y descubriendo nuevas habilidades
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5 justify-content-center align-items-center">
                        <div class="col-md-2">
                            <div class="avatar avatar-xl">
                            <span class="avatar avatar-xl h1 text-dark fw-bold bg-warning">C</span>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="lead mb-0  text-white">
                            onéctate a nuestro SISTEMA mínimo 5 años y tu
                            </div>
                            <div class="h3 mt-0 fw-bold text-white" style="letter-spacing: -1px">
                            éxito te lo garantizarás
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Projects / start-->
    <section class="section bg-white p-t-60 p-b-50" id="rights">
        <div class="container">
            <div class="relative">
                <div class="heading-section heading-section-1 dark">
                    <h3>Nuestros Valores</h3>
                </div>
                <div class="owl-carousel dark nav-style-1" data-carousel-margin="7" data-carousel-nav="true" data-carousel-loop="true" data-carousel-items="4">
                    <div class="image-card image-card-3">
                        <div class="image">
                            <img src="../../template/images/projects-01.jpg" alt="Business growth solutions" />
                        </div></h3>
                    </div>
                    <div class="image-card image-card-3">
                        <div class="image">
                            <img src="../../template/images/projects-02.jpg" alt="Complex consumer behavior" />
                        </div>
                    </div>
                    <div class="image-card image-card-3">
                        <div class="image">
                            <img src="../../template/images/projects-03.jpg" alt="Experience in finance" />
                        </div>
                    </div>
                    <div class="image-card image-card-3">
                        <div class="image">
                            <img src="../../template/images/projects-04.jpg" alt="Global consumer insights" />
                        </div>
                    </div>
                </div>
                <div class="h2 text-center">AMOR POR LO QUE HACEMOS Y NUESTRA GENTE, TRANSPARENCIA, EMPATÍA, PASIÓN, RESPONSABILIDAD, TRANSFORMACIÓN, LIDERAZGO Y RESPETO</div>
            </div>
        </div>
    </section>
    <!-- Our Projects / end-->
    <!-- section / start-->
    <div class="section d-none bg-parallax p-t-120 p-b-120" style="background: url(../../template/images/banner-01.jpg) no-repeat;" data-paroller-type="background" data-paroller-factor="-0.3" data-paroller-direction="vertical">
        <div class="bg-overlay"></div>
        <div class="container">
            <p class="text-block text-white text-center p-l-100 p-r-100 relative text-lead">Somos expertos en marketing digital, llevaremos tus sueños a </p>
        </div>
    </div>
    <!-- section / end-->
    <!-- Latest News / start-->
    <section class="section p-t-70 p-b-30 bg-white" id="agents"> 
        <div class="container">
            <div class="relative">
                <div class="heading-section heading-section-1 dark">
                    <h3>Agentes de transformación</h3>
                </div>
                <div class="owl-carousel dark nav-style-1" data-carousel-margin="45" data-carousel-nav="true" data-carousel-loop="true">
                    <div class="image-card image-card-4">
                        <div class="image">
                            <a href="../../apps/signup">
                                <video width="320" height="240" muted autoplay loop>
                                    <source src="../../template/includes/vid-1.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </a>
                        </div>
                        <h3 class="title">
                            <a href="../../apps/signup">TRANSFORMA TU MENTE</a>
                        </h3>
                    </div>
                    <div class="image-card image-card-4">
                        <div class="image">
                            <a href="../../apps/signup">
                                <video width="320" height="240" muted autoplay loop>
                                    <source src="../../template/includes/vid-2.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </a>
                        </div>
                        <h3 class="title">
                            <a href="../../apps/signup">TRANSFORMA TU ECONOMÍA</a>
                        </h3>
                    </div>
                    <div class="image-card image-card-4">
                        <div class="image">
                            <a href="../../apps/signup">
                                <video width="320" height="240" muted autoplay loop>
                                    <source src="../../template/includes/vid-3.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </a>
                        </div>
                        <h3 class="title">
                            <a href="../../apps/signup">TRANSFORMA TU VIDA</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Partner / end-->
    <footer id="footer">
        <!-- Footer / start-->
        <div class="footer footer-1 bg-black">
            <div class="top-footer p-t-50 p-b-50">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="footer-block-1">
                                <div class="logo">
                                    <img src="../../src/img/logo.svg" alt="<?php echo Unlimited\SystemVar::_getValue("company_name") ?>" />
                                </div>
                                <div class="quick-link">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-6">
                                            <ul>
                                                <li>
                                                    <a href="#">Business Academy</a>
                                                </li>
                                                <li>
                                                    <a href="#">Pay Business</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6 col-sm-6">
                                            <ul>
                                                <li>
                                                    <a href="#">Insurance Consulting</a>
                                                </li>
                                                <li>
                                                    <a href="#">Retirement Strategies</a>
                                                </li>
                                                <li>
                                                    <a href="#">Business Loan</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="footer-block-2">
                                <div class="title">
                                    <h3>Contact us</h3>
                                </div>
                                <div class="contact-list">
                                    <ul>
                                        <li>Address: <?php echo Unlimited\SystemVar::_getValue("company_address") ?></li>
                                        <li>Phone: <?php echo Unlimited\SystemVar::_getValue("social_whatsapp") ?></li>
                                        <li>Email: <?php echo Unlimited\SystemVar::_getValue("company_email") ?></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="footer-block-3">
                                <div class="title">
                                    <h3>Follow us</h3>
                                </div>
                                <div class="social-list">
                                    <ul class="horizontal-list">
                                        <li class="social-item-2 social-item-1">
                                            <a href="<?php echo Unlimited\SystemVar::_getValue("social_facebook");?>" class="fa fa-facebook"></a>
                                        </li>
                                        <li class="social-item-2 social-item-1">
                                            <a href="<?php echo Unlimited\SystemVar::_getValue("social_youtube");?>"  class="fa fa-youtube"></a>
                                        </li>
                                        <li class="social-item-2 social-item-1">
                                            <a href="<?php echo Unlimited\SystemVar::_getValue("social_instagram");?>"  class="fa fa-instagram"></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bot-footer">
                <div class="container">
                    <div class="block-inner p-t-35 p-b-60">
                        <div class="block-left">
                            <span>© 2017 AuThemes. All rights reserved.</span>
                        </div>
                        <div class="block-right">
                            <div class="quick-link">
                                <ul>
                                    <li>
                                        <a href="#">About</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Term & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Sites Map</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer / end-->
    </footer>
    <div id="up-to-top">
        <i class="fa fa-angle-up"></i>
    </div>
    <!--
    Javascripts
    ==================================================
    -->
    <script src="../../template/vendor/jquery/dist/jquery.min.js"></script>
    <script src="../../template/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="../../template/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
    <script src="../../template/vendor/owl.carousel/dist/owl.carousel.min.js"></script>
    <script src="../../template/vendor/headroom/headroom.min.js"></script>
    <script src="../../template/vendor/matchHeight/dist/jquery.matchHeight-min.js"></script>
    <script src="../../template/vendor/SmoothScroll/SmoothScroll.js"></script>
    <script src="../../template/vendor/isotope/imagesloaded.pkgd.min.js"></script>
    <script src="../../template/vendor/isotope/isotope.pkgd.min.js"></script>
    <script src="../../template/vendor/plyr/plyr.min.js"></script>
    <script src="../../template/vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
    <script src="../../template/vendor/jquery-accordion/js/jquery.accordion.js"></script>
    <script src="../../template/vendor/chosen/chosen.jquery.js"></script>
    <script src="../../template/vendor/waypoints/lib/jquery.waypoints.min.js"></script>
    <script src="../../template/vendor/jquery.counterup/jquery.counterup.min.js"></script>
    <script src="../../template/vendor/paroller.js/jquery.paroller.min.js"></script>
    <script src="../../template/vendor/retinajs/dist/retina.min.js"></script>
    <script src="../../template/js/owl-custom.js"></script>
    <script src="../../template/js/main.js"></script>
    <script src="../../template/js/switcher-custom.js"></script>
    <script src="../../template/vendor/revolution/js/jquery.themepunch.tools.min.js"></script>
    <script src="../../template/vendor/revolution/js/jquery.themepunch.revolution.min.js"></script>
    <!--
    | (Load Extensions only on Local File Systems !
    | The following part can be removed on Server for On Demand Loading)
    -->
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.video.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.actions.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.migration.min.js"></script>
    <script type="text/javascript" src="../../template/vendor/revolution/js/extensions/revolution.extension.parallax.min.js"></script>
    <script src="../../template/js/revo-slider-custom.js"></script>
    <!--
    End Document
    ==================================================
    -->
</body>

</html>