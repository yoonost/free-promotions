import axios from 'axios'
import { sendAllMessages } from '../application'
import storage from '../libs/storage'

export default class epicgames {
    private static storage: storage = new storage('epicAppIds.json')

    public static async getPromotions (): Promise<void> {
        const { data }: { data: any } = await axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions',{ params: { locale: 'ru' } })
        const games: any = data.data.Catalog.searchStore.elements.filter((game: any): boolean => game.price.totalPrice.discountPrice === 0)
        const currentAppIds: Set<string> = new Set()

        for (let i = 0; i < games.length; i++) {
            const game: any = games[i]
            currentAppIds.add(game.id)

            if (!this.storage.hasAppId(game.id)) {
                sendAllMessages(game.keyImages[0].url, 'Epic Games', game.title, `https://store.epicgames.com/ru-RU/p/${game.catalogNs.mappings[0]?.pageSlug}`, game.description)
                this.storage.addAppId(game.id)
            }
        }

        this.storage.removeMissingAppIds(currentAppIds)
    }
}