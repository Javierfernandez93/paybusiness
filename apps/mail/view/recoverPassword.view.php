<h3><?php $Translator->t('email.recover_password'); ?></h3>

<h3>
    <?php echo $Translator->t('email.recover_password_text',[
        'email' => $email
    ]); ?>
</h3>

<h3>
    <a href="<?php echo HCStudio\Connection::getMainPath(); ?>/apps/login/newPassword?token=<?php echo $token;?>"><?php echo $Translator->t('email.recover_password'); ?></a>
</h3>

<h3>
    <b>
        <?php echo $Translator->t('email.team') ?> <?php echo Site\SystemVar::_getValue("company_name");?>
    </b>
</h3>