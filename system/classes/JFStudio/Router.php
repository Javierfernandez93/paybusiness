<?php

namespace JFStudio;

class Router {
    const Backoffice = 1;
    const Profile = 2;
    const Gains = 3;
    const Referrals = 4;
    const Signup = 5;
    const Login = 6;
    const RecoverPassword = 7;
    const NewPassword = 8;
    const Notifications = 15;
    const Plans = 16;
    const TradingView = 22;
    const Wallet = 23;
    const Calculator = 25;
    const AddFunds = 28;
    const Launch = 39;
    const Landing = 40;
    const StoreNetwork = 46;
    const StoreMarketing = 47;
    const Invoices = 48;
    const WithdrawMethods = 51;
    const GainsReport = 52;
    const WalletProcess = 53;
    const ProfileSetting = 54;
    const AcademyLesson = 55;
    const Tools = 60;
    const Home = 61;
    const Landing2 = 63;
    const PayPal = 64;
    const Help = 67;
    const AdminTicket = 68;
    const BlockChain = 69;
    const ViewTransaction = 70;
    const ViewAddress = 71;
    const Keys = 72;
    const Payments = 73;
    const AddPayment = 74;
    const StoreCredit = 75;
    const ImagesBank = 83;
    const Store = 84;
    const Test = 85;
    const Account = 86;
    const Notice = 90;
    const About = 91;
    const UserApi = 94;
    const TronWallets = 95;
    const Documentation = 96;
    const DocumentationApi = 97;
    const UserApiMainWallet = 98;
    const Payouts = 99;
    const Items = 101;
    const AddItem = 102;
    const Customers = 103;
    const AddCustomer = 104;
    const Stats = 105;
    const SplitManager = 106;
    const Hosts = 107;
    const Multilevel = 108;
    const Products = 109;
    const MarketingGains = 110;
    const BridgeFunds = 111;
    const BridgeFundsGains = 112;
    const UnlimitedSynthetics = 113;
    const CopySynthetics = 114;
    const BridgeFundsAccounts = 115;
    const BridgeMarkets = 116;
    const AutoTrading = 117;
    const Courses = 118;
    const SignBridge = 119;
    const Community = 122;
    const Pel = 123;
    const UpdatePassword = 124;
    const MarketingCreate = 126;
    const SignExma = 130;
    const Conference = 132;
    const UnlimitedMentory = 133;
    const UnlimitedMarketing = 134;
    const Academy = 135;
    const Exma = 136;
    const Ati = 137;
    const Dummie = 138;
    const Aof = 139;
    const PammyTrading = 140;
    const Team = 145;
    
    /* admin */
    const AdminUsers = 9;
    const AdminActivations = 10;
    const AdminAdministrators = 11;
    const AdminBrokers = 12;
    const AdminLogin = 13;
    const AdmiActivation = 14;
    const AdminUserEdit = 19;
    const AdminUserAdd = 20;
    const AdminAdministratorsAdd = 21;
    const AdminAdministratorsEdit = 21;
    const AdminTransactions = 24;
    const AdminDash = 26;
    const AdminAddOldComissions = 27;
    const AdminDeposits = 29;
    const AdminTransactionsList = 30;
    const AdminNotices = 31;
    const AdminNoticesEdit = 32;
    const AdminNoticesAdd = 33;
    const AdminStats = 34;
    const AdminReport = 35;
    const AdminTemplates = 45;
    const AdminBuys = 50;
    const AdminWallet = 56;
    const AdminTools = 57;
    const AdminToolsAdd = 58;
    const AdminToolsEdit = 59;
    const AdminEmail = 62;
    const AdminExercise = 87;
    const AdminTrading = 88;
    const AdminGains = 89;
    const AdminLanding = 92;
    const AdminPaymentMethods = 93;
    const AdminCron = 100;
    const AdminMam = 120;
    const AdminTradingSignals = 121;
    const AdminBridge = 125;
    const AdminMarketing = 127;
    const AdminIntent = 128;
    const AdminBridgeUserAccount = 129;
    const DummieTrading = 131;
    const AdminAti = 141;
    const AdminAcademy = 142;
    const AdminConfig = 143;
    const AdminBanner = 144;

    static function getName(int $route = null)
    {
        return match($route) {
            self::Backoffice => 'Inicio',
            self::Profile => 'Perfil',
            self::Gains => 'Ganancias',
            self::Referrals => 'Referidos',
            self::Signup => 'Únete hoy mismo',
            self::Login => 'Ingresa a tu cuenta',
            self::RecoverPassword => 'Recuperar contraseña',
            self::NewPassword => 'Cambiar contraseña',
            self::Plans => 'Planes',
            self::Notifications => 'Notifications',
            self::TradingView => 'Resultados del broker',
            self::Wallet => 'Billetera Unlimited',
            self::Calculator => 'Calculadora',
            self::AddFunds => 'Añadir fondos',
            self::AdminDash => 'Home',
            self::AdminUsers => 'Usuarios',
            self::AdminUserEdit => 'Editar usuario',
            self::AdminUserAdd => 'Añadir usuario',
            self::AdminActivations => 'Activaciones',
            self::AdminAdministrators => 'Administradores',
            self::AdminAdministratorsAdd => 'Añadir administrador',
            self::AdminAdministratorsEdit => 'Editar administrador',
            self::AdminBrokers => 'Brokers',
            self::AdminLogin => 'Iniciar sesión admin',
            self::AdmiActivation => 'Activar en plan',
            self::AdminTransactions => 'Transacciones',
            self::AdminAddOldComissions => 'Añadir comisiones atrasadas',
            self::AdminTransactionsList => 'Lista de fondeos',
            self::AdminNotices => 'Listar noticias',
            self::AdminNoticesEdit => 'Editar noticia',
            self::AdminNoticesAdd => 'Añadir noticia',
            self::AdminDeposits => 'Ver fondeos',
            self::AdminStats => 'Estadísticas',
            self::AdminReport => 'Reporte',
            self::Launch => 'Pre Lanzamiento',
            self::Landing => 'Landing Page',
            self::AdminTemplates => 'Templates',
            self::StoreNetwork => 'Compra tu paquete',
            self::StoreMarketing => 'Tienda de Cursos',
            self::StoreMarketing => 'Tienda de Herramientas',
            self::Invoices => 'Mis compras',
            self::Academy => 'Academia',
            self::MarketingGains => 'Ganancias por marketing',
            self::WithdrawMethods => 'Métodos de retiro',
            self::AdminBuys => 'Compras',
            self::WalletProcess => 'Procesar pago',
            self::ProfileSetting => 'Account settings',
            self::AcademyLesson => 'Cursos de academia',
            self::AdminWallet => 'Ewallet',
            self::AdminTools => 'Herramientas',
            self::AdminToolsAdd => 'Añadir herramienta',
            self::AdminToolsEdit => 'Editar herramienta',
            self::Tools => 'Material de trabajo',
            self::Home => 'Página inicial',
            self::AdminEmail => 'Email',
            self::Landing2 => '¡Comienza una educación profesional!',
            self::PayPal => 'Pago seguro con PayPal',
            self::Help => 'Tickets de soporte',
            self::BlockChain => 'BlockChain',
            self::AdminTicket => 'Tickets',
            self::ViewTransaction => 'Ver transacción',
            self::ViewAddress => 'Ver dirección publica',
            self::Keys => 'Licencias',
            self::Payments => 'Pagos realizados a tus cuentas',
            self::AddPayment => 'Añadir pago de mensualidad',
            self::StoreCredit => 'Créditos',
            self::ImagesBank => 'Banco de imagenes',
            self::Store => 'Configurar tu paquete',
            self::Test => 'Pruebas',
            self::Account => 'Cuenta',
            self::AdminExercise => 'Ejercicios',
            self::AdminTrading => 'Trading',
            self::AdminGains => 'Ganancias',
            self::Notice => 'Noticia',
            self::About => 'Nosotros',
            self::AdminLanding => 'Lista de landings',
            self::AdminPaymentMethods => 'Métodos de pago',
            self::UserApi => 'Apis',
            self::TronWallets => 'Wallets',
            self::Documentation => 'Documentation',
            self::UserApiMainWallet => 'Dirección principal',
            self::DocumentationApi => 'Development Guide',
            self::Payouts => 'Payouts',
            self::AdminCron => 'Cronjobs',
            self::Items => 'Items',
            self::AddItem => 'Add Item',
            self::Customers => 'Customers',
            self::AddCustomer => 'Add Customer',
            self::Stats => 'Stats',
            self::SplitManager => 'Split Manager',
            self::Hosts => 'Hosts',
            self::Multilevel => 'Multilevel',
            self::Products => 'Productos Unlimited',
            self::BridgeFunds => 'Ver tipos de cuentas',
            self::BridgeFundsAccounts => 'Mis cuentas',
            self::BridgeFundsGains => 'Ganancias',
            self::UnlimitedSynthetics => 'Academia',
            self::CopySynthetics => 'Copy sintéticos',
            self::BridgeMarkets => 'Bridge Markets',
            self::AutoTrading => 'Trading automático',
            self::SignBridge => 'Crear cuenta en Bridge',
            self::SignExma => 'Crear cuenta en Exma',
            self::Courses => 'Cursos',
            self::AdminMam => 'Cuentas MAM',
            self::AdminTradingSignals => 'Señales trading',
            self::Community => 'Comunidad',
            self::Pel => 'Lpoa',
            self::UpdatePassword => 'Hora de actualizar contraseña',
            self::AdminBridge => 'Bridge',
            self::MarketingCreate => 'Crear',
            self::AdminMarketing => 'Marketing',
            self::AdminIntent => 'Entrenamiento IA',
            self::AdminBridgeUserAccount => 'Cuentas bridge',
            self::DummieTrading => 'DummieTrading',
            self::Conference => 'Próximas clases',
            self::UnlimitedMentory => 'UnlimitedMentory',
            self::UnlimitedMarketing => 'UnlimitedMarketing',
            self::Academy => 'Academy',
            self::Exma => 'Exma',
            self::Ati => 'Ati',
            self::Dummie => 'Dummie',
            self::Aof => 'Aof',
            self::PammyTrading => 'PammyTrading',
            self::AdminAcademy => 'Academia',
            self::AdminAti => 'Ati',
            self::AdminConfig => 'Configuración',
            self::AdminBanner => 'Eventos',
            self::Team => 'Team',
            default => 'Sin nombre'
        };
    }
}