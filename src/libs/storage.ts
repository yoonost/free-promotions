import fs from 'fs'
import path from 'path'

export default class storage {
    private filePath: string
    private appIds: Set<string>

    constructor(fileName: string) {
        this.filePath = path.resolve(`${process.cwd()}/storage`, fileName)
        this.appIds = this.load()
    }

    private load(): Set<string> {
        if (fs.existsSync(this.filePath)) {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8')
            const data: string[] = JSON.parse(fileContent)
            return new Set(data)
        }
        return new Set()
    }

    public save(): void {
        const arrayData = Array.from(this.appIds)
        fs.writeFileSync(this.filePath, JSON.stringify(arrayData, null, 2), 'utf-8')
    }

    public addAppId(appId: string): void {
        this.appIds.add(appId)
        this.save()
    }

    public hasAppId(appId: string): boolean {
        return this.appIds.has(appId)
    }

    public removeMissingAppIds(currentAppIds: Set<string>): void {
        this.appIds.forEach(appId => {
            if (!currentAppIds.has(appId)) {
                this.appIds.delete(appId)
            }
        })
        this.save()
    }
}