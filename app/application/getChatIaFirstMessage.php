<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Unlimited\UserLogin;

if($UserLogin->logged === true)
{
    $items = [
        [
            'message' => '¿Cómo compro una cuenta MAM?'
        ],
        [
            'message' => '¿Cómo fondeo mi cuenta MAM?'
        ],
        [
            'message' => '¿Donde veo mis comisiones?'
        ],
        [
            'message' => '¿Donde esta mi billetera Unlimited?'
        ],
        [
            'message' => '¿Quién es mi patrocinador?'
        ],
        [
            'message' => '¿Qué es Bridge Markets?'
        ]
    ];

    shuffle($items);
    array_values($items);
    array_slice($items,0,5);

    $data['message'] = [
        'message' => 'Bienvenido, por favor escribe una pregunta o selecciona un tema de ayuda rápida',
        'items' => $items
    ];
    $data['r'] = 'DATA_OK';
    $data['s'] = 1;
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

echo json_encode($data); 