import fs from 'node:fs/promises';

export const checkFiles = async (pach, createIfMissing) => {
    
        try {
            await fs.access(pach)
        } catch (error) {
            console.error(error);
            if (createIfMissing) {
                await fs.writeFile(pach, JSON.stringify([]));
                console.error(`File created ${pach}`);
                return true;
            }
            return false;
        }
        return true;
    
    
    try {
        await fs.access(pach)
    } catch (error) {
        console.error(error);
        console.error(`File not found ${pach}`);
        return false;
    }
    
}