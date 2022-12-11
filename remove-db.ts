import * as fs from "fs";

const path = 'prisma/dev.db'

try {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log("database was removed")
    } else {
        console.log("database was not found")
    }
} catch(err) {
    console.error(err)
}