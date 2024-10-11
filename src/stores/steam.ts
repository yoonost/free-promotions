import axios from 'axios'
import { chromium, Browser, Page, Locator } from 'playwright'
import { sendAllMessages } from '../application'

export default class steam {
    public static async getPromotions (): Promise<void> {
        const browser: Browser = await chromium.launch()
        const page: Page = await browser.newPage()

        await page.goto('https://store.steampowered.com/search/results?maxprice=free&specials=1&ndl=1')
        await page.waitForSelector('#search_resultsRows')
        const searchResults: Locator = await page.locator('#search_resultsRows a')
        const count: number = await searchResults.count()

        for (let i = 0; i < count; i++) {
            const element: Locator = searchResults.nth(i)
            const appId: string | null = await element.getAttribute('data-ds-appid')
            const appInfo: any = await this.getAppInfo(appId)
            if (appInfo) sendAllMessages(appInfo.steam_appid, appInfo.name, appInfo.header_image, appInfo.short_description)
        }

        await browser.close()
    }
    public static async getAppInfo(appId: string | null): Promise<any> {
        if (!appId) return false
        const { data } = await axios.get(`https://store.steampowered.com/api/appdetails`, {
            params: {
                appids: appId,
                l: 'russian'
            }
        })
        return data[appId].data
    }
}