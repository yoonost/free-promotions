import steam from './stores/steam'
import epicgames from './stores/epicgames'
import telegram from './messagers/telegram'

function interval (): void {
    steam.getPromotions().then()
    epicgames.getPromotions().then()
}

export function sendAllMessages (
    header: string,
    platform: string,
    name: string,
    link: string,
    description: string
): void {
    telegram.sendMessage(header, platform, name, link, description)
}

setInterval((): void => {
    interval()
}, 1800)

interval()