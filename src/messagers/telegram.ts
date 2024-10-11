import axios from 'axios'

export default class telegram {
    private static  _BOT_TOKEN = ''
    private static  _BOT_CHAT = ''

    public static sendMessage (
        id: string,
        name: string,
        header: string,
        description: string
    ): void {
        axios.get(`https://api.telegram.org/bot${this._BOT_TOKEN}/sendPhoto`, {
            params: {
                chat_id: this._BOT_CHAT,
                photo: header,
                caption: `В Steam стартовала раздача [${name}](https://store.steampowered.com/app/${id}/)\n\n${description}`,
                parse_mode: 'Markdown'
            }
        }).then()
    }
}