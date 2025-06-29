const zod = require('zod')


const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(3).max(16)
const text = zod.string()

module.exports = {
    emailSchema,
    passwordSchema,
    text
}