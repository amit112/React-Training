import * as Sentry from '@sentry/browser';

function init() {
    Sentry.init({dsn: "https://3fa724cd38164105a89290c4ff6c9c4d@sentry.io/1868161"});
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log
}
