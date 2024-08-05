<?php 

namespace DummyTrader\Sdk;

class UrlManager {
    // account
    const GET_ACCOUNT = 'https://www.capitaltrading.me/app/api/getAccount';
    const LOGIN = 'https://www.capitaltrading.me/app/api/loginDummyTrader';
    const SEND_MESSAGE_TO_CHANNEL = 'https://www.capitaltrading.me/app/api/sendMessageToChannel';
    const SEND_IMAGE_TO_CHANNEL = 'https://www.capitaltrading.me/app/api/sendImageToChannel';

    /* BINANCE */
    const BINANCE_SEND_MARKET_ORDER = 'http://localhost:3000/account/order/market';
}