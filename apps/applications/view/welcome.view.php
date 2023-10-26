<img src="https://www.unlimited.com/src/img/mail.jpg" alt="image" style="width:100%" title="image" />

<h2>¡Hola! <b><?php echo $names; ?></b></h2>

<h4>
    Bienvenido/a a la primera comunidad gratuita dedicada al crecimiento financiero y personal. Aquí encontrarás recursos, consejos y herramientas de apoyo para alcanzar tus objetivos. Estamos emocionados de acompañarte en este viaje de transformación.
</h4>

<h4>
    Como dato adicional te queremos recordar que la contraseña que elegiste es <strong><?php echo $password;?></strong>.
</h4>


<h3>
    Por favor para verificar tu cuenta haz clic <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/apps/login/verify?secret=<?php echo $secret;?>&email=<?php echo $email;?>">aquí</a>
</h3>

<h3>
    <b>
        Gracias de parte del equipo de <?php echo Unlimited\SystemVar::_getValue("company_name");?>
    </b>
</h3>