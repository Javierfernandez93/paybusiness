<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="../../src/img/apple-icon.png">
    <meta content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | pagos en segundos" name="author" />

    <link rel="icon" type="image/png" href="../../src/img/favicon.png?v=2.1.9"> 
    <link rel="shortcut icon" href="../../src/img/favicon.png" />

    <title>
        {{title}}
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    
    <link rel="preconnect" href="https://fonts.gloogleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap" rel="stylesheet">

    <link href="../../src/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../src/css/z-loader.css" />
    <link rel="stylesheet" href="../../src/css/general.css?v=1.2.8" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- CSS Files -->

    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.2.8" rel="stylesheet" />
</head>

<div class="bg-gradient-evox header-evox-signature" style="height: 0.3rem;">
</div>

<body class="g-sidenav-show bg-white">
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs fixed-start" id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand" href="<?php echo HCStudio\Connection::getMainPath(); ?>" target="_blank">
                <img src="../../src/img/logo-lg.svg" alt="logo" title="logo" class="w-100"/>
            </a>
        </div>
        
        <div class="collapse navbar-collapse w-auto h-auto ms-3" id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="card rounded-0 border border-3 shadow-none">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-xl-auto">
                                    <div class="avatar avatar-md">
                                        <img src="<?php echo $UserLogin->getProfileImage();?>" class="avatar avatar-md rounded-circle">
                                    </div>
                                </div>
                                <div class="col-12 col-xl">
                                    <div class="fw-semibold text-truncate text-dark">
                                        <?php echo $UserLogin->_data['user_data']['names'];?>
                                    </div>
                                    <div class="fw-semibold text-truncate text-primary my-2">
                                        <?php echo $UserLogin->_data['user_account']['landing'];?>
                                    </div>
                                    <div class="text-secondary cursor-pointer text-xs">
                                        <a href="../../apps/backoffice/profile">
                                            Editar perfil
                                        </a>
                                    </div>
                                    <div class="text-danger cursor-pointer mt-3 text-xs">
                                        <a href="../../apps/backoffice?logout=true">
                                            Cerrar sesión
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <?php if ($UserLogin->logged) { ?>
                    <div class="bg-light-dark mt-5">
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Backoffice])) { ?>active<?php } ?>" href="../../apps/backoffice">
                                <i class="bi d-none bi-cup-fill"></i>
                                <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::Backoffice); ?></span>
                            </a>
                        </li>



                    
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#profilePages" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Profile,JFStudio\Router::Referrals,JFStudio\Router::Invoices,JFStudio\Router::Multilevel,JFStudio\Router::Gains,JFStudio\Router::Wallet,JFStudio\Router::Gains,JFStudio\Router::Profile,JFStudio\Router::Notifications])) { ?>active<?php } ?>" aria-controls="profilePages" role="button" aria-expanded="false">
                                <i class="bi d-none bi-person-circle"></i>
                                <span class="nav-link-text ms-1">Perfil</span>
                            </a>
                            <div class="collapse" id="profilePages">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/multilevel">
                                            <span class="sidenav-normal"> Mi equipo </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/multilevel/directs">
                                            <span class="sidenav-normal"> Rangos </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/store/invoices">
                                            <span class="sidenav-normal"> Mis compras </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/gains">
                                            <span class="sidenav-normal"> Mis ganancias </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/wallet">
                                            <span class="sidenav-normal">Billetera Evox</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/backoffice/profile">
                                            <span class="sidenav-normal"> Ajustes de cuenta </span>
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/backoffice/notifications">
                                            <span class="sidenav-normal">Notificaciones</span>
                                        </a>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/backoffice/?logout=true">
                                            <span class="sidenav-normal"> Salir </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#profileAcademy" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::MarketingGains,JFStudio\Router::AcademyLesson,JFStudio\Router::EvoxMarketing,JFStudio\Router::MarketingCreate])) { ?>active<?php } ?>" aria-controls="profileAcademy" role="button" aria-expanded="false">
                                <i class="bi d-none bi-megaphone-fill"></i>
                                <span class="nav-link-text ms-1">Evox Marketing</span>
                            </a>
                            <div class="collapse" id="profileAcademy">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/marketing/">
                                            <span class="sidenav-normal"> Información </span>
                                        </a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a class="nav-link text-dark" href="../../apps/academy/gains">
                                            <span class="sidenav-normal"> Ganancias </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/academy/create">
                                            <span class="sidenav-normal"> Crear </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#evoxAcademy" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::EvoxAcademy,JFStudio\Router::Courses])) { ?>active<?php } ?>" aria-controls="evoxAcademy" role="button" aria-expanded="false">
                                <i class="bi d-none bi-cart"></i>
                                <span class="nav-link-text ms-1">Evox Academy</span>
                            </a>
                            <div class="collapse" id="evoxAcademy">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/academy/info">
                                            <span class="sidenav-normal"> Información </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/academy/">
                                            <span class="sidenav-normal"> Cursos grabados </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/academy/coming">
                                            <span class="sidenav-normal"> Próximas clases </span>
                                        </a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a class="nav-link text-dark" href="../../apps/academy/create">
                                            <span class="sidenav-normal"> Calendario semanal </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/academy/record">
                                            <span class="sidenav-normal"> Clases grabadas </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#evoxMentory" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::EvoxMentory])) { ?>active<?php } ?>" aria-controls="evoxMentory" role="button" aria-expanded="false">
                                <i class="bi d-none bi-cart"></i>
                                <span class="nav-link-text ms-1">Evox Mentory</span>
                            </a>
                            <div class="collapse" id="evoxMentory">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/mentory/">
                                            <span class="sidenav-normal"> Información </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/mentory/events?cvcid=3">
                                            <span class="sidenav-normal"> Próximas eventos </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/mentory/events?cvcid=4">
                                            <span class="sidenav-normal"> Eventos anteriores </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>



                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#mamp" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Exma,JFStudio\Router::PammyTrading])) { ?>active<?php } ?>" aria-controls="mamp" role="button" aria-expanded="false">
                            <i class="bi d-none bi-people"></i>
                                <span class="nav-link-text ms-1">Trading automático</span>
                            </a>
                            <div class="collapse" id="mamp">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/exma">
                                            <span class="sidenav-normal"> Cuenta PAMM Exma Trading </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/dummie/pammy">
                                            <span class="sidenav-normal text-wrap"> Cuenta PAMM Multibroker DummieTrading </span>
                                        </a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a class="nav-link text-dark" href="../../apps/trading">
                                            <span class="sidenav-normal"> Mis productos </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#semiauto" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Dummie,JFStudio\Router::Ati,JFStudio\Router::DummieTrading,JFStudio\Router::DummieTrading])) { ?>active<?php } ?>" aria-controls="semiauto" role="button" aria-expanded="false">
                            <i class="bi d-none bi-people"></i>
                                <span class="nav-link-text ms-1">Trading semi automático</span>
                            </a>
                            <div class="collapse" id="semiauto">
                                <ul class="nav ms-4">
                                    <?php if($UserLogin->hasUserAti()) { ?>
                                        <li class="nav-item">
                                            <a class="nav-link text-dark" href="../../apps/ati/account">
                                                <span class="sidenav-normal"> Cuenta ATI </span>
                                            </a>
                                        </li>
                                    <?php } ?>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/ati">
                                            <span class="sidenav-normal"> ATI </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/calculator-ati">
                                            <span class="sidenav-normal"> Calculadora ATI </span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <!-- <a class="nav-link text-dark" href="../../apps/store/package?cptid=7"> -->
                                        <a class="nav-link text-dark" href="../../apps/trading/dummie">
                                            <span class="sidenav-normal"> DummieTrading </span>
                                        </a>
                                    </li>

                                    <?php if($UserLogin->hasUserDummie()) { ?>
                                        <li class="nav-item">
                                            <a class="nav-link text-dark" href="../../apps/dummie/account">
                                                <span class="sidenav-normal"> Cuenta DummieTrading </span>
                                            </a>
                                        </li>
                                    <?php } ?>
                                    
                                    <li class="nav-item d-none">
                                        <a class="nav-link text-dark" href="../../apps/trading">
                                            <span class="sidenav-normal"> Mis productos </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        

                        <li class="nav-item d-none">
                            <a data-bs-toggle="collapse" href="#procducts" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Products,JFStudio\Router::Invoices])) { ?>active<?php } ?>" aria-controls="procducts" role="button" aria-expanded="false">
                                <i class="bi d-none bi-megaphone-fill"></i>
                                <span class="nav-link-text ms-1">Productos</span>
                            </a>
                            <div class="collapse" id="procducts">
                                <ul class="nav ms-4">
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/store/package">
                                            <span class="sidenav-normal"> Comprar </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item d-none">
                            <a data-bs-toggle="collapse" href="#bridgeFunds" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::BridgeFunds,JFStudio\Router::BridgeFundsGains])) { ?>active<?php } ?>" aria-controls="bridgeFunds" role="button" aria-expanded="false">
                                <i class="bi d-none bi-rocket-fill"></i>
                                <span class="nav-link-text ms-1">Brigde Funds</span>
                            </a>
                            <div class="collapse" id="bridgeFunds">
                                <ul class="nav ms-4">
                                    <li class="nav-item">
                                        <a class="nav-link text-dark" href="../../apps/funds">
                                            <span class="sidenav-normal"> <?php echo JFStudio\Router::getName(JFStudio\Router::BridgeFunds); ?> </span>
                                        </a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a class="nav-link text-dark" href="../../apps/funds/accounts">
                                            <span class="sidenav-normal"> <?php echo JFStudio\Router::getName(JFStudio\Router::BridgeFundsAccounts); ?> </span>
                                        </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link text-dark" href="../../apps/funds/gains">
                                            <span class="sidenav-normal"> <?php echo JFStudio\Router::getName(JFStudio\Router::BridgeFundsGains); ?> </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item d-none">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::BridgeMarkets])) { ?>active<?php } ?>" href="../../apps/markets">
                                <i class="bi d-none bi-bar-chart-fill"></i>
                                <span class="nav-link-text ms-1">Brigde Markets</span>
                            </a>
                        </li>


                        <li class="nav-item d-none">
                            <a class="nav-link <?php if (in_array($route,[JFStudio\Router::Community])) { ?>active<?php } ?>" href="../../apps/backoffice/community">
                                <i class="bi d-none bi-hearts"></i>
                                <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::Community); ?></span>
                            </a>
                        </li>
                        
                        
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route,[JFStudio\Router::Help])) { ?>active<?php } ?>" href="../../apps/ticket/">
                                <i class="bi d-none bi-chat-left-heart-fill"></i>
                                <span class="nav-link-text ms-1"><?php echo JFStudio\Router::getName(JFStudio\Router::Help); ?></span>
                            </a>
                        </li>
                    
                    </div>
                <?php } ?>
            </ul>
        </div>
    </aside>
    
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
            <div class="container py-2">
                <nav aria-label="breadcrumb">
                    <h6 class="fs-4 font-weight-bolder ms-2"></h6>
                </nav>
                <?php if ($UserLogin->logged) { ?>
                    <div class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/notifications" class="nav-link p-0 text-body" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-bell cursor-pointer" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <i class="bi bi-globe-americas"></i>
                                <select class="form-select border-0 pe-5" aria-label="Default select example">
                                    <option selected>ES</option>
                                    <option>EN</option>
                                </select>
                            </li>
                            <li class="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                                <a href="javascript:;" class="nav-link  p-0">
                                </a>
                                <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                                    <div class="sidenav-toggler-inner">
                                        <i class="sidenav-toggler-line"></i>
                                        <i class="sidenav-toggler-line"></i>
                                        <i class="sidenav-toggler-line"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                <?php } ?>
            </div>
        </nav>
        
        <div class="container bg-light-soft" style="margin-top:0.635rem">
            {{content}}
        </div>
    
        <footer class="footer fixesd-bottom p-3 row justify-content-center pt-5">
            <div class="col-12 col-xl-11">
                <div class="row align-items-center justify-content-lg-between">
                    <div class="col-lg-6 mb-lg-0 mb-4">
                        <div class="copyright text-center text-sm text-muted text-lg-start">
                            © <script>
                                document.write(new Date().getFullYear())
                            </script>,
                            made with <i class="fa fa-heart"></i> by
                            <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/" class="font-weight-bold" target="_blank"><?php echo JFStudio\Layout::PROYECT_NAME; ?></a>
                            for a better web.
                        </div>
                        <!-- <div id="google_translate_element"></div> -->
                    </div>
                    <div class="col-lg-6">
                        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                            <li class="nav-item">
                                <a href="" class="nav-link text-muted" target="_blank"><?php echo JFStudio\Layout::PROYECT_NAME; ?></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    
    <script src="../../src/js/constants.js?v=2.3.3" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.3.3" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=2.3.3" type="text/javascript"></script>
    <!-- Github buttons -->
    
    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>
      <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" integrity="sha256-nWBTbvxhJgjslRyuAKJHK+XcZPlCnmIAAMixz6EefVk=" crossorigin="anonymous"></script>

    <!-- Github buttons -->
    <script src="../../src/js/buttons.js" type="text/javascript"></script>
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.3.3"></script>
    <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" type="text/javascript"></script>
    
    
    <script src="../../src/js/vue.js?v=2.3.3" type="text/javascript"></script>
    <!-- <script src="../../src/js/translate.module.js?v=2.3.3" type="module"></script>
    
    <script src="../../src/js/translateInit.vue.js?v=2.3.3" type="module"></script> -->
    
    {{js_scripts}}
    {{css_scripts}}

    <!-- <script src="../../src/js/translate.js?v=2.3.3" type="text/javascript"></script> -->
</body>
</html>