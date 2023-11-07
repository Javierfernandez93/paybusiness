<h2>Hola <b><?php echo $names; ?></b> felices de tenerte con nosotros</h2>

<h3>
    Por favor para verificar tu cuenta haz clic <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/apps/login/verify?secret=<?php echo $secret;?>&email=<?php echo $email;?>">aquí</a>
</h3>

<h3>
    Bienvenido a esta maravillosa aventura. 
</h3>

<h3>
    <b>
        Equipo <?php echo Unlimited\SystemVar::_getValue("company_name");?>
    </b>
</h3>