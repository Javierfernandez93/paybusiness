<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Unlimited trading platform" name="author" />
    <meta content="Unlimited trading platform" name="description" />

    <meta name="theme-color" content="#2D2250">

    <meta name="keywords" content="trading, cripto, Unlimited">
    <meta name="robots" value="index, follow">

    <meta name="googlebot" content="index, follow">
    <meta name="googlebot-news" content="index, follow">

    <meta property="og:site_name" content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Unlimited trading platform">
    <meta property="og:title" content="<?php echo JFStudio\Layout::PROYECT_NAME; ?> | Unlimited trading platform" />
    <meta property="og:description" content="Unlimited trading platform" />
    <meta property="og:image" itemprop="image" content="<?php echo HCStudio\Connection::getMainPath() ?>/src/img/logo.png">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="300">
    <meta property="og:image:height" content="300">

    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="1664070388" />
    <meta property="og:url" content="<?php echo HCStudio\Connection::getMainPath() ?>">


    <!-- App favicon -->
    <link rel="icon" type="image/png" href="../../src/img/favicon.png">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link rel="stylesheet" href="../../src/css/nucleo-icons.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />
    <!-- Font Awesome Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css">
    
    <link rel="stylesheet" href="../../src/css/general.css" />
    <link rel="stylesheet" href="../../src/css/nucleo-svg.css" />

    <!-- plugin css -->
    <link id="pagestyle" href="../../src/css/soft-ui-dashboard.css?af=1" rel="stylesheet" />
</head>

<body>
    <div class="bg-gradient-Unlimited" style="height: 0.3rem;">
    </div>
    
    <div class="position-fixed z-index-2 bg-special w-100" id="navbar">
        <div class="container">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <a href="../../apps/home" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img src="../../src/img/logo.svg" class="" style="width: 7rem;">
                </a>


                <div class="col-md-auto text-end">
                    <?php if($UserLogin->logged == false) { ?>
                        <a href="../../apps/login/" type="button" class="btn mb-0 mb-0 shadow-none btn-light">Entrar</a>
                        <a href="../../apps/signup/" type="button" class="btn mb-0 mb-0 shadow-none btn-dark">Regístrate</a>
                    <?php } else { ?>
                        <a href="../../apps/backoffice/" type="button" class="btn mb-0 mb-0 shadow-none btn-dark">Backoffice</a>
                    <?php } ?>
                </div>
            </header>
        </div>
    </div>

    <div class="">
        {{content}}    
    </div>

    <footer class="bg-dark py-5">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl-10">
                    <div class="row">
                        <div class="col-12 col-xl-6 text-white">
                            <div class="fs-3 opacity-50">AYUDA</div>
                            <div class="my-2">Contacta un asesor</div>
                            <div class="lead text-md opacity-50">Copyright © 2023 Unlimited todos los derechos reservados</div>
                        </div>
                        <div class="col-12 col-xl-6 text-end">
                            <div class="row justify-content-end">
                                <div class="col-auto">
                                    <div class="row justify-content-end">
                                        <div class="col">
                                            <a href="https://t.me/+0bHlDgNSnkxjMWIx" target="_blank" title="telegram">
                                                <i class="bi text-white opacity-50 fs-3 bi-telegram"></i>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a href="https://www.facebook.com/Unlimitedcommunity" target="_blank" title="telegram">
                                                <i class="bi text-white opacity-50 fs-3 bi-facebook"></i>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a href="https://www.tiktok.com/@Unlimitedcommunity" target="_blank" title="telegram">
                                                <i class="bi text-white opacity-50 fs-3 bi-tiktok"></i>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a href="https://www.instagram.com/Unlimitedcommunity/ target="_blank" title="telegram">
                                                <i class="bi text-white opacity-50 fs-3 bi-instagram"></i>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a href="https://www.youtube.com/channel/UCXHyDHlBMU1vYPpdLFb_gyA" target="_blank" title="telegram">
                                                <i class="bi text-white opacity-50 fs-3 bi-youtube"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="../../src/img/Unlimited-logo-footer.png" alt="Unlimited logo footer" title="Unlimited logo footer"/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>


    <!--   Core JS Files   -->
    <script src="../../src/js/plugins/perfect-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/smooth-scrollbar.min.js"></script>
    <script src="../../src/js/plugins/chartjs.min.js"></script>
    <script src="../../src/js/42d5adcbca.js" type="text/javascript"></script>

    <script src="../../src/js/constants.js?v=2.3.3" type="text/javascript"></script>
    <script src="../../src/js/alertCtrl.js?v=2.3.3" type="text/javascript"></script>
    <script src="../../src/js/jquery-3.5.1.min.js" type="text/javascript"></script>
    <script src="../../src/js/general.js?m=2" type="text/javascript"></script>

    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>

    <!-- Github buttons -->

    <script async defer src="../../src/js/buttons.js"></script>
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="../../src/js/soft-ui-dashboard.min.js?v=2.3.3"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="../../src/js/vue.js"></script>

    {{js_scripts}}
    {{css_scripts}}
</body>

</html>