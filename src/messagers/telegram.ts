import axios from 'axios'

export default class telegram {
    private static  _BOT_TOKEN = ''
    private static  _BOT_CHAT = ''

    public static sendMessage (
        header: string,
        platform: string,
        name: string,
        link: string,
        description: string
    ): void {
        axios.get(`https://api.telegram.org/bot${this._BOT_TOKEN}/sendPhoto`, {
            params: {
                chat_id: this._BOT_CHAT,
                photo: header,
                caption: `В ${platform} стартовала раздача [${name}](${link})\n\n${description}`,
                parse_mode: 'Markdown'
            }
        }).then()
    }
}