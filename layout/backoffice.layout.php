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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <link rel="preconnect" href="https://fonts.gloogleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap" rel="stylesheet">

    <link href="../../src/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../src/css/z-loader.css" />
    
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- CSS Files -->

    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?v=1.2.8" rel="stylesheet" />
</head>

<div class="bg-gradient-primary position-fixed top-0 w-100" style="height: 0.5rem;z-index:10000 !important">
</div>

<body class="g-sidenav-show bg-light mt-3">
    <aside class="sidenav navbar navbar-vertical shadow-none navbar-expand-xs bg-white fixed-start" id="sidenav-main">
        <div class="sidenav-header p-4">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            
            <a class="navbar-brand text-center" href="<?php echo HCStudio\Connection::getMainPath(); ?>" target="_blank">
                <img src="../../src/img/logo-lg.svg" alt="logo" title="logo" class="w-50"/>
            </a>
        </div>
        
        <div class="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
            <ul class="navbar-nav container">
                <?php if ($UserLogin->logged) { ?>
                    <div class=" mt-5">
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Backoffice])) { ?>active<?php } ?>" href="../../apps/backoffice">
                                <i class="bi bi-house"></i>
                                <span class="nav-link-text ms-1">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Profile])) { ?>active<?php } ?>" href="../../apps/backoffice/profile">
                                <i class="bi bi-person-circle"></i>
                                <span class="nav-link-text ms-1">Profile</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Wallet,JFStudio\Router::WithdrawMethods])) { ?>active<?php } ?>" href="../../apps/ewallet">
                                <i class="bi bi-wallet2"></i>
                                <span class="nav-link-text ms-1">My Wallet</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Store,JFStudio\Router::Products,JFStudio\Router::WalletProcess])) { ?>active<?php } ?>" href="../../apps/store/package">
                                <i class="bi bi-cart4"></i>
                                <span class="nav-link-text ms-1">Buy</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Gains])) { ?>active<?php } ?>" href="../../apps/gains">
                                <i class="bi bi-currency-dollar"></i>
                                <span class="nav-link-text ms-1">Bonus</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a data-bs-toggle="collapse" href="#profilePages" class="nav-link collapsed <?php if (in_array($route,[JFStudio\Router::Team])) { ?>active<?php } ?>" aria-controls="profilePages" role="button" aria-expanded="false">
                                <i class="bi bi-people"></i>
                                <span class="nav-link-text ms-1">Team</span>
                            </a>
                            <div class="collapse" id="profilePages">
                                <ul class="nav ms-4">
                                    <li class="nav-item">

                                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Team])) { ?>active<?php } ?>" href="../../apps/team/list">
                                            
                                            <span class="nav-link-text ms-1">Mi equipo</span>
                                        </a>
                                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Team])) { ?>active<?php } ?>" href="../../apps/team">
                                            
                                            <span class="nav-link-text ms-1">Binario</span>
                                        </a>
                                        <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Team])) { ?>active<?php } ?>" href="../../apps/team/unilevel">
                                            
                                            <span class="nav-link-text ms-1">Unilevel</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        
                        
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::KyC])) { ?>active<?php } ?>" href="../../apps/backoffice/kyc">
                                <i class="bi bi-folder-fill"></i>
                                <span class="nav-link-text ms-1">KyC</span>
                            </a>
                        </li>

                        <?php if($UserLogin->hasProductPermission(Unlimited\Product::ACADEMY)) { ?>
                            <li class="nav-item">
                                <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Academy,JFStudio\Router::AcademyLesson])) { ?>active<?php } ?>" href="../../apps/academy">
                                    <i class="bi bi-mortarboard"></i>
                                    <span class="nav-link-text ms-1">Business Academy</span>
                                </a>
                            </li>
                        <?php } ?>
                        
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Tools])) { ?>active<?php } ?>" href="../../apps/backoffice/tools">
                                <i class="bi bi-gear"></i>
                                <span class="nav-link-text ms-1">Tools</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php if (in_array($route, [JFStudio\Router::Help])) { ?>active<?php } ?>" href="../../apps/ticket/">
                                <i class="bi bi-headset"></i>
                                <span class="nav-link-text ms-1">Customer Service</span>
                            </a>
                        </li>
                    </div>
                <?php } ?>
            </ul>

            <div id="noticeApp">
                <noticewidget-viewer></noticewidget-viewer>
            </div>
        </div>
    </aside>
    
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
            <div class="container py-2">
                <nav aria-label="breadcrumb" class="w-100">
                    <h6 class="fs-4 font-weight-bolder ms-2"></h6>
                    <div id="topApp">
                        <lastsignedwidget-viewer></lastsignedwidget-viewer>
                    </div>
                </nav>
                <?php if ($UserLogin->logged) { ?>
                    <div class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">

                        </div>
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/notifications" class="nav-link p-0 text-body">
                                    <i class="fa fa-bell cursor-pointer lead" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="nav-item dropdown pe-3 d-flex align-items-center">
                                <a href="../../apps/backoffice/?logout=true" class="nav-link p-0 text-body">
                                    <i class="bi bi-box-arrow-right lead"></i>
                                </a>
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
        
        <div>
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
                            made with <i class="bi bi-heart"></i> by
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

    <div id="chatApp">
        <chat-viewer></chat-viewer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js" type="text/javascript"></script>
    <script src="../../src/js/plugins/chartjs.min.js" type="text/javascript"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>
    
    <script src="../../src/js/constants.js?v=2.4.7" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.4.7" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?v=2.4.7" type="text/javascript"></script>
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
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.4.7"></script>
    <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" type="text/javascript"></script>
    <link rel="stylesheet" href="../../src/css/general.css?v=1.2.8" />
    
    <script src="../../src/js/vue.js?v=2.4.7" type="text/javascript"></script>
    <script src="../../src/js/top.vue.js?v=2.4.7" type="module"></script>
    <script src="../../src/js/notice.vue.js?v=2.4.7" type="module"></script>
    <script src="../../src/js/chat.vue.js?v=2.4.7" type="module"></script>
    <!-- <script src="../../src/js/translate.module.js?v=2.4.7" type="module"></script>
    
    <script src="../../src/js/translateInit.vue.js?v=2.4.7" type="module"></script> -->
    
    {{js_scripts}}
    {{css_scripts}}

    <!-- <script src="../../src/js/translate.js?v=2.4.7" type="text/javascript"></script> -->
</body>
</html>