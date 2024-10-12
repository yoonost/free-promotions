import steam from './stores/steam'
import epicgames from './stores/epicgames'
import telegram from './messagers/telegram'

console.log('app started')

setInterval((): void => {
    steam.getPromotions().then()
    epicgames.getPromotions().then()
}, 1800000)

export function sendAllMessages (
    header: string,
    platform: string,
    name: string,
    link: string,
    description: string
): void {
    telegram.sendMessage(header, platform, name, link, description)
}