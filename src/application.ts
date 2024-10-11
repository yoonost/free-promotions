import steam from './stores/steam'
import telegram from './messagers/telegram'

setInterval((): void => {
    steam.getPromotions().then()
}, 5000)

export function sendAllMessages (
    id: string,
    name: string,
    header: string,
    description: string
): void {
    telegram.sendMessage(id, name, header, description)
}